// import { Link } from "react-router-dom";
// import DocumentConfigCard from "../components/DocumentConfigCard";
// import { useState, useEffect } from "react";
// import ViewModal from "../components/ViewModal";
// import Button from "../components/Button";
// import { UploadedFile } from "../types";
// import { useCart } from "../contexts/CartContext"; 
// import { calculateAmount } from "../api/calculateAmount";

// function Cart() {
//   const { items, totalAmount, setTotalAmount } = useCart();

//   const [viewerFile, setViewerFile] = useState<UploadedFile | null>(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const updateAmount = async () => {
//       if (!items.length) return;

//       setLoading(true);

//       try {
//         const result = await calculateAmount({ items });
//         setTotalAmount(result);
//       } catch (error) {
//         console.error("Failed to calculate amount:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     updateAmount();
//   }, [items, setTotalAmount]);


//   if (!items.length) {
//     return (
//       <div className="mx-auto mt-16 grid max-w-lg justify-items-center gap-4 rounded-2xl border border-white/15 bg-white/5 p-8 text-center shadow-sm">
//         <h1 className="text-3xl font-extrabold text-white">Your cart is empty</h1>
//         <p className="text-white/70">Upload files to start configuring your print order.</p>
//         <Link to="/upload">
//           <Button>Upload files</Button>
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="mx-auto grid w-full max-w-3xl min-w-0 gap-6 pb-6">

//       {totalAmount > 0 && (
//         <div className="flex min-w-0 items-center justify-between gap-4 border-b border-white/10 pb-5">
//           <div className="min-w-0">
//             <p className="text-xs font-bold uppercase tracking-wide text-white/70">Estimated total</p>
//             <p className="text-2xl font-extrabold text-white">₹{totalAmount.toFixed(2)}</p>
//           </div>

//           <Link to="/checkout" state={{ amount: totalAmount }} className="shrink-0">
//             <Button className="min-w-32 px-6">Checkout</Button>
//           </Link>
//         </div>
//       )}

//       {items.map(({ file, config }) => (
//         <DocumentConfigCard
//           key={config.file_id}
//           config={config}
//           file={file}
//           onView={() => setViewerFile(file)}
//         />
//       ))}

//       <ViewModal
//         file={viewerFile}
//         onClose={() => setViewerFile(null)}
//       />

//       <div className="sticky bottom-4 z-10 mx-1 flex min-w-0 flex-col justify-center gap-3 bg-darkbg/95 px-1 py-4 backdrop-blur sm:mx-0 sm:flex-row sm:p-3">
//         {loading && (
//           <p className="text-white/70"> Calculating amount...</p>
//         )}

//         <Link to="/upload" className="min-w-0">
//           <Button className="w-full border border-white/15 bg-white/5 text-lg text-primary hover:border-primary hover:bg-primary/15 sm:w-auto">
//             Upload more
//           </Button>
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default Cart;


import { Link } from "react-router-dom";
import DocumentConfigCard from "../components/DocumentConfigCard";
import { useState, useEffect } from "react";
import ViewModal from "../components/ViewModal";
import Button from "../components/Button";
import { UploadedFile } from "../types";
import { useCart } from "../contexts/CartContext";
import { calculateAmount } from "../utils/calculateAmount";

function Cart() {
  const { items, totalAmount, setTotalAmount } = useCart();

  const [viewerFile, setViewerFile] = useState<UploadedFile | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const updateAmount = async () => {
      if (!items.length) return;

      setLoading(true);

      try {
        const result = await calculateAmount({ items });
        setTotalAmount(result);
      } catch (error) {
        console.error("Failed to calculate amount:", error);
      } finally {
        setLoading(false);
      }
    };

    updateAmount();
  }, [items, setTotalAmount]);


  if (!items.length) {
    return (
      <div className="mx-auto mt-16 grid max-w-lg justify-items-center gap-4 rounded-2xl border border-white/15 bg-white/5 p-8 text-center shadow-sm">
        <h1 className="text-3xl font-extrabold text-white">Your cart is empty</h1>
        <p className="text-white/70">Upload files to start configuring your print order.</p>
        <Link to="/upload">
          <Button>Upload files</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto grid w-full max-w-3xl min-w-0 gap-6 pb-40">

      {/* Document Config Cards */}
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

      {/* Sticky Bottom Floating Bar */}
      <div className="fixed bottom-4 left-0 right-0 z-20 mx-auto w-full max-w-3xl px-4 sm:px-6">
        <div className="flex min-w-0 flex-col gap-3 rounded-4xl border border-white/10 bg-darkbg/95 px-4 py-4 shadow-2xl backdrop-blur-md sm:flex-row sm:items-center sm:justify-between sm:px-5">

          {/* Left — Upload more + Calculating */}
          <div className="flex min-w-0 items-center gap-3">
            {/* <Link to="/upload" className="min-w-0">
              <Button className="w-full border border-white/15 bg-white/5 text-base text-primary hover:border-primary hover:bg-primary/15 sm:w-auto">
                + Upload more
              </Button>
            </Link> */}

            {loading && (
              <span className="animate-pulse text-sm text-white/50">
                Calculating...
              </span>
            )}
          </div>

          {/* Right — Total + Checkout */}
          <div className="flex min-w-0 items-center justify-between gap-4 sm:justify-end">

            {totalAmount > 0 && (
              <div className="min-w-0 text-left sm:text-right">
                <p className="text-xs font-bold uppercase tracking-widest text-white/40">
                  Grand Total
                </p>
                <p className="text-xl font-extrabold text-white">
                  ₹{totalAmount.toFixed(2)}
                </p>
              </div>
            )}

            {totalAmount > 0 && (
              <Link to="/checkout" state={{ amount: totalAmount }} className="shrink-0">
                <Button className="min-w-28 px-6">
                  Checkout
                </Button>
              </Link>
            )}

          </div>

        </div>
      </div>

    </div>
  );
}

export default Cart;