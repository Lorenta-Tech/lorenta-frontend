import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useCart } from "../contexts/CartContext";
import { uploadCart } from "../api/uploadInit";

const Checkout = () => {
  const location = useLocation();
  const { items, clearCart } = useCart();
  const navigate = useNavigate();
  const amount = location.state?.amount;

  const handleCompleteOrder = async () => {
    await uploadCart(items);
    clearCart();
    navigate("/");
  }

  return (
    <div>
      <h1>Checkout</h1>
      <p>Total: ₹{amount ?? 0}</p>
      <Button onClick={handleCompleteOrder}>Pay and submit</Button>
    </div>
  );
};

export default Checkout;