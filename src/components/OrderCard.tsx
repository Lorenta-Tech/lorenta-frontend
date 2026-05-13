// OrderCard.tsx
import React, { useState } from "react";
import Button from "./Button";
import { IoMdClose } from "react-icons/io";
import { IoCopyOutline, IoCheckmarkOutline } from "react-icons/io5";

type OrderCardProps = {
  token: string;          // ← new
  totalpages: number;
  price: number;
  orderDate: string;
  status: string;
  files: any[];
};

// Formats "2026-05-13T02:11:40.222109Z" → "13 May 2026 · 02:11 AM"
function formatDate(iso: string): { date: string; time: string } {
  const d = new Date(iso);
  const date = d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const time = d.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).toUpperCase();
  return { date, time };
}

const OrderCard: React.FC<OrderCardProps> = ({
  token,
  totalpages,
  price,
  orderDate,
  status,
  files,
}) => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const { date, time } = formatDate(orderDate);

  const handleCopy = () => {
    navigator.clipboard.writeText(token).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <>
      <div className="grid gap-4 rounded-2xl border border-white/15 bg-white/5 p-5 shadow-sm">

        {/* Top row: date + status */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-wide text-white/70">Order date</p>
            <h3 className="mt-1 text-lg font-extrabold text-white">{date}</h3>
            <p className="text-xs text-white/50">{time}</p>
          </div>
          <span className="w-max rounded-full bg-primary/15 px-3 py-1.5 text-xs font-extrabold capitalize text-primary">
            {status}
          </span>
        </div>

        {/* Token */}
        <div className="flex items-center justify-between gap-3 rounded-xl border border-primary/30 bg-primary/10 px-4 py-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-primary/70">
              Pickup Token
            </p>
            <p className="mt-0.5 text-2xl font-black tracking-widest text-primary">
              {token}
            </p>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="grid size-9 place-items-center rounded-lg bg-primary/20 text-primary transition hover:bg-primary/30"
            aria-label="Copy token"
          >
            {copied ? <IoCheckmarkOutline size={18} /> : <IoCopyOutline size={18} />}
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-white/5 p-3">
            <p className="text-xs font-bold uppercase tracking-wide text-white/70">Total pages</p>
            <p className="mt-1 font-extrabold text-white">{totalpages ?? "N/A"}</p>
          </div>
          <div className="rounded-xl bg-white/5 p-3">
            <p className="text-xs font-bold uppercase tracking-wide text-white/70">Price</p>
            <p className="mt-1 font-extrabold text-white">
              {price == null ? "N/A" : `₹${price}`}
            </p>
          </div>
        </div>

        <Button onClick={() => setOpen(true)}>View details</Button>
      </div>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-darkbg/70 p-3 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-darkbg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex min-h-[60px] items-center justify-between gap-3 border-b border-white/15 px-4">
              <div>
                <h2 className="font-bold text-white">Order Details</h2>
                <p className="text-xs text-white/50">
                  {date} · {time}
                </p>
              </div>
              <button
                type="button"
                className="grid size-10 place-items-center rounded-xl text-white/60 transition hover:bg-white/5 hover:text-white"
                onClick={() => setOpen(false)}
                aria-label="Close details"
              >
                <IoMdClose />
              </button>
            </div>

            {/* Token inside modal too */}
            <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-primary/10 px-4 py-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-primary/70">
                  Pickup Token
                </p>
                <p className="text-xl font-black tracking-widest text-primary">{token}</p>
              </div>
              <button
                type="button"
                onClick={handleCopy}
                className="grid size-9 place-items-center rounded-lg bg-primary/20 text-primary transition hover:bg-primary/30"
                aria-label="Copy token"
              >
                {copied ? <IoCheckmarkOutline size={18} /> : <IoCopyOutline size={18} />}
              </button>
            </div>

            {/* Files list */}
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