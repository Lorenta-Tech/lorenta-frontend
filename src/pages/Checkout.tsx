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
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-6 space-y-6">

        <h1 className="text-2xl font-semibold">Checkout</h1>

        <div className="border rounded-lg p-4 bg-gray-50">
          <p className="text-gray-600">Total Amount</p>
          <p className="text-3xl font-bold">₹{totalAmount}</p>
        </div>

        {error && (
          <div className="text-red-500 text-sm">
            {error}
          </div>
        )}

        <div className="w-full flex flex-col items-center gap-2">
          {loading && <Loader size={18} />}

          <Button
            onClick={handleCompleteOrder}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2"
          >
            {loading
              ? "Processing..."
              : "Pay via UPI or RazorPay"}
          </Button>

          {loading && (
            <p className="text-sm">Please wait while we redirect you to payment page...</p>
          )}
        </div>

      </div>
    </div>
  );
};

export default Checkout;