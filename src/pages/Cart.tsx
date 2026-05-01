import { Link } from "react-router-dom";
import DocumentConfigCard from "../components/DocumentConfigCard";
import { useState } from "react";
import ViewModal from "../components/ViewModal";
import Button from "../components/Button";
import { UploadedFile } from "../types";
import { useCart } from "../contexts/CartContext"; 
import { calculateAmountApi } from "../api/calculateAmount";

function Cart() {
  const { items, updateConfig, removeConfig, applyToAll } = useCart();
  const [viewerFile, setViewerFile] = useState<UploadedFile | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const calculateAmount = async () => {
    setLoading(true);
    const result = await calculateAmountApi({ items });
    setTotal(result);
    setLoading(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };

  if (!items.length) {
    return (
      <div className="text-center mt-20">
        <p className="mb-4">Your cart is empty!</p>
        <Link to="/upload">
          <Button>Upload files</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl flex flex-col m-auto gap-5">
      {total !== null && (
        <div id="checkout" className="flex justify-between items-center bg-white shadow px-6 py-4 rounded-lg">
          <span className="text-lg font-medium">
            Total: ₹{total.toFixed(2)}
          </span>

          <Link to="/checkout" state={{amount:total}}>
            <Button>Checkout</Button>
          </Link>
        </div>
      )}

      {items.map(({ file, config }) => (
        <DocumentConfigCard
          key={config.id} 
          configs={config}
          onUpdate={updateConfig}
          onRemove={removeConfig}
          onApplyToAll={applyToAll}
          onView={() => setViewerFile(file)}
        />
      ))}

      <ViewModal
        file={viewerFile}
        onClose={() => setViewerFile(null)}
      />

      <div className="mt-10 sticky bottom-8 flex gap-3 z-10 w-full justify-center">
        <Button onClick={async () =>{
          await calculateAmount();
          scrollToTop();
        }} disabled={loading}>
          {loading ? "Calculating..." : "Calculate amount"}
        </Button>
        <Link to="/upload">
          <Button>Upload more</Button>
        </Link>
      </div>
    </div>
  );
}

export default Cart;