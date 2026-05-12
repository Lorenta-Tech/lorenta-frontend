import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../components/Button";
import { useCart } from "../contexts/CartContext";
import { uploadCart } from "../api/uploadInit";
import Loader from "../components/Loader";
import { createRazorpayOrder, openRazorpay } from "../api/payment";

const Checkout = () => {
  const { items, totalAmount, setTotalAmount, clearCart } = useCart();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCompleteOrder = async () => {
    if (!items.length) return;

    try {
      setLoading(true);
      setError(null);

      const data = await uploadCart(items);
      const { session_id, total_amount } = data;
      setTotalAmount(total_amount);

      const paymentOrder = await createRazorpayOrder({
        session_id,
        amount_paise: total_amount,
      });

      // ✅ FIXED: await openRazorpay and get job back
      const job = await openRazorpay(paymentOrder);

      console.log("✅ Payment success, job:", job);

      clearCart();

      // ✅ FIXED: navigate to /order with job in state
      navigate("/order", { state: { job } });

    } catch (err: any) {
      console.error("❌ Error:", err?.message);

      if (err?.message === "Payment cancelled") {
        // User closed modal — don't navigate, just show message
        setError("Payment was cancelled. Please try again.");
        return;
      }

      // Any other error — go to failure page
      navigate("/order", { state: { failed: true } });

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-[calc(100vh-170px)] place-items-center">
      <div className="grid w-full max-w-lg gap-6 rounded-2xl border border-white/15 bg-white/5 p-8 shadow-sm">

        <h1 className="text-3xl font-extrabold text-white">Checkout</h1>

        <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
          <p className="text-sm font-bold text-white/70">Total amount</p>
          <p className="mt-1 text-4xl font-extrabold text-white">₹{totalAmount}</p>
        </div>

        {error && (
          <div className="rounded-xl border border-cta/40 bg-cta/10 p-3 text-sm font-semibold text-cta">
            {error}
          </div>
        )}

        <div className="grid gap-3">
          {loading && <Loader size={18} />}

          <Button
            onClick={handleCompleteOrder}
            disabled={loading}
            className="w-full"
          >
            {loading
              ? "Processing..."
              : "Pay via UPI or RazorPay"}
          </Button>

          {loading && (
            <p className="text-center text-sm text-white/70">Please wait while we redirect you to the payment page...</p>
          )}
        </div>

      </div>
    </div>
  );
};

export default Checkout;
