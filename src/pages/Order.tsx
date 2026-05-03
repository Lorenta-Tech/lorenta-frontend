import { useParams } from "react-router-dom";

function Order() {
  const { id } = useParams();

  return (
    <div className="min-h-[80vh] bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Order Details
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Track and verify your order
          </p>
        </div>

        {/* Order ID */}
        <div className="mb-6">
          <label className="block text-sm text-gray-500 mb-1">
            Order ID
          </label>
          <div className="border border-gray-200 rounded-lg px-4 py-3 text-gray-800 font-medium">
            {id}
          </div>
        </div>

        {/* OTP */}
        <div className="mb-6">
          <label className="block text-sm text-gray-500 mb-1">
            OTP
          </label>
          <div
            className=" h-12 flex items-center justify-center border border-gray-300 rounded-lg text-lg font-semibold text-gray-700"
          >
            XXXXXX
          </div>
        </div>

      </div>
    </div>
  );
}

export default Order;