import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../components/Button";
import Loader from "../components/Loader";

import { useCart } from "../contexts/CartContext";

import { uploadCart } from "../api/uploadInit";
import {
  createRazorpayOrder,
  openRazorpay,
} from "../api/payment";

const Checkout = () => {

  const navigate = useNavigate();

  const {
    items,
    totalAmount,
    setTotalAmount,
    clearCart,
  } = useCart();

  const [loading, setLoading] = useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const handleCompleteOrder = async () => {

    if (!items.length || loading) return;

    try {

      setLoading(true);

      setError(null);

      // =========================
      // Upload files + create session
      // =========================
      const uploadResponse = await uploadCart(items);

      const {
        session_id,
        total_amount,
      } = uploadResponse;

      setTotalAmount(total_amount);

      // =========================
      // Create Razorpay order
      // =========================
      const paymentOrder =
        await createRazorpayOrder({
          session_id,
          amount_paise: total_amount,
        });

      // =========================
      // Open payment gateway
      // =========================
      const job =
        await openRazorpay(paymentOrder);

      clearCart();

      navigate("/order", {
        state: { job },
      });

    } catch (err: any) {

      console.error("Checkout Error:", err);

      if (err?.message === "Payment cancelled") {

        setError(
          "Payment was cancelled. Please try again."
        );

        return;
      }

      navigate("/order", {
        state: { failed: true },
      });

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-[calc(100vh-170px)] place-items-center px-4">

      <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-xl backdrop-blur-sm">

        <div className="space-y-2">

          <h1 className="text-3xl font-bold text-white">
            Checkout
          </h1>

          <p className="text-sm text-white/60">
            Complete your payment to process the print order.
          </p>

        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">

          <p className="text-sm font-medium text-white/60">
            Total Amount
          </p>

          <p className="mt-2 text-4xl font-extrabold tracking-tight text-white">
            ₹{totalAmount}
          </p>

        </div>

        {error && (
          <div className="mt-5 rounded-2xl border border-[#f2cb07]/30 bg-[#f2cb07]/10 px-4 py-3 text-sm font-medium text-[#f2cb07]">
            {error}
          </div>
        )}

        <div className="mt-6 space-y-4">

          <Button
            onClick={handleCompleteOrder}
            disabled={loading}
            className="w-full"
          >
            {loading
              ? "Processing Payment..."
              : "Continue to Payment"}
          </Button>

          {loading && (
            <div className="flex flex-col items-center gap-3 py-2">

              <Loader size={18} />

              <p className="text-center text-sm text-white/60">
                Redirecting you to Razorpay...
              </p>

            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default Checkout;