import React, { useState } from "react";
import Button from "./Button";
import { IoMdClose } from "react-icons/io";

type OrderCardProps = {
  totalpages: number;
  price: number;
  orderDate: string;
  status: string;
  files: any[];
};

const OrderCard: React.FC<OrderCardProps> = ({
  totalpages,
  price,
  orderDate,
  status,
  files,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="grid gap-4 rounded-2xl border border-white/15 bg-white/5 p-5 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-wide text-white/70">Order date</p>
            <h3 className="mt-1 truncate text-lg font-extrabold text-white">{orderDate}</h3>
          </div>
          <span className="w-max rounded-full bg-primary/15 px-3 py-1.5 text-xs font-extrabold capitalize text-primary">
            {status}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-white/5 p-3">
            <p className="text-xs font-bold uppercase tracking-wide text-white/70">Total pages</p>
            <p className="mt-1 font-extrabold text-white">{totalpages ?? "N/A"}</p>
          </div>
          <div className="rounded-xl bg-white/5 p-3">
            <p className="text-xs font-bold uppercase tracking-wide text-white/70">Price</p>
            <p className="mt-1 font-extrabold text-white">{price == null ? "N/A" : `₹${price}`}</p>
          </div>
        </div>

        <Button onClick={() => setOpen(true)}>View details</Button>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-darkbg/70 p-3 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div className="flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-darkbg shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex min-h-[60px] items-center justify-between gap-3 border-b border-white/15 px-4">
              <h2 className="font-bold text-white">Details</h2>
              <button
                type="button"
                className="grid size-10 place-items-center rounded-xl text-white/60 transition hover:bg-white/5 hover:text-white"
                onClick={() => setOpen(false)}
                aria-label="Close details"
              >
                <IoMdClose/>
              </button>
            </div>

            <ul className="grid gap-3 overflow-auto bg-white/5 p-4">
              {files.map((file, index) => (
                <li
                  key={file.file_id || index}
                  className="grid gap-3 rounded-2xl border border-white/15 bg-white/5 p-4"
                >
                  <p className="break-words font-bold text-white">{file.file_name}</p>
                  <div className="grid gap-2 text-sm text-white/70 sm:grid-cols-2">
                    <p><strong>Status:</strong> {file.file_status}</p>
                    <p><strong>Pages:</strong> {file.number_of_pages ?? "N/A"}</p>
                    <p><strong>Copies:</strong> {file.copies ?? "N/A"}</p>
                    <p><strong>Print:</strong> {file.printing_mode ?? "N/A"}</p>
                    <p><strong>Side:</strong> {file.printing_side ?? "N/A"}</p>
                    <p><strong>Price:</strong> ₹{file.price ?? "N/A"}</p>
                  </div>

                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderCard;
