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
      <div className="bg-white shadow-lg rounded-2xl p-4 flex flex-col gap-4">
        <h3 className="text-xl">Order Date: {orderDate}</h3>
        <p className="md:text-xl">Total pages: {totalpages}</p>
        <p className="md:text-xl">Price: {price}</p>
        <p className="md:text-xl">Claimed: {status}</p>

        <Button onClick={() => setOpen(true)}>View details</Button>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-lg relative">
            
            <button
              className="absolute top-3 right-3 text-xl"
              onClick={() => setOpen(false)}
            >
              <IoMdClose/>
            </button>

            <h2 className="text-xl font-semibold mb-4">Details</h2>

            <ul className="flex flex-col gap-4 max-h-[400px] overflow-y-auto">
              {files.map((file, index) => (
                <li
                  key={file.file_id || index}
                  className="border p-4 rounded-lg flex flex-col gap-1 hover:bg-gray-50"
                >
                  <p><strong>File:</strong> {file.file_name}</p>
                  <p><strong>Status:</strong> {file.file_status}</p>
                  <p><strong>Pages:</strong> {file.number_of_pages ?? "N/A"}</p>
                  <p><strong>Copies:</strong> {file.copies ?? "N/A"}</p>
                  <p><strong>Print:</strong> {file.printing_mode ?? "N/A"}</p>
                  <p><strong>Side:</strong> {file.printing_side ?? "N/A"}</p>
                  <p><strong>Price:</strong> ₹{file.price ?? "N/A"}</p>

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