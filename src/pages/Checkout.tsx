import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../components/Button";
import { useCart } from "../contexts/CartContext";
import { uploadCart } from "../api/uploadInit";
import Loader from "../components/Loader";

const Checkout = () => {
  const location = useLocation();
  const { items, clearCart } = useCart();
  const navigate = useNavigate();
  const amount = location.state?.amount;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCompleteOrder = async () => {
    if (!items.length) return;

    try {
      setLoading(true);
      setError(null);

      const orderID: string = await uploadCart(items);

      clearCart();
      navigate(`/order/${orderID}`);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
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
          <p className="text-3xl font-bold">₹{amount ?? 0}</p>
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