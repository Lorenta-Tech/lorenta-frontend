import { Link } from "react-router-dom";
import DocumentConfigCard from "../components/DocumentConfigCard";
import { useState } from "react";
import ViewModal from "../components/ViewModal";
import Button from "../components/Button";
import { UploadedFile } from "../types";
import { useCart } from "../contexts/CartContext"; 
import { calculateAmount } from "../api/calculateAmount";

function Cart() {
  const { items, totalAmount, setTotalAmount } = useCart();

  const [viewerFile, setViewerFile] = useState<UploadedFile | null>(null);
  const [loading, setLoading] = useState(false);

  const calculate = async () => {
    setLoading(true);
    const result = await calculateAmount({ items });
    setTotalAmount(result);
    setLoading(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
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

      {totalAmount > 0 && (
        <div className="flex justify-between items-center bg-white shadow px-6 py-4 rounded-lg">
          <span className="text-lg font-medium">
            Total: ₹{totalAmount.toFixed(2)}
          </span>

          <Link to="/checkout" state={{ amount: totalAmount }}>
            <Button>Checkout</Button>
          </Link>
        </div>
      )}

      {items.map(({ file, config }) => (
        <DocumentConfigCard
          key={config.file_id}
          config={config}
          file={file}
          onView={() => setViewerFile(file)}
        />
      ))}

      <ViewModal
        file={viewerFile}
        onClose={() => setViewerFile(null)}
      />

      <div className="mt-10 sticky bottom-8 flex gap-3 z-10 w-full justify-center">
        <Button
          onClick={async () => {
            await calculate();
            scrollToTop();
          }}
          disabled={loading}
        >
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