import { Link, useLocation } from "react-router-dom";
import {
  MdCheckCircle,
  MdError,
} from "react-icons/md";

function Order() {

  const location = useLocation();

  const state = location.state as any;

  const failed = state?.failed;

  const job = state?.job;

  // ✅ FIXED: job must exist AND status must be "paid"
  const isPaid = job && String(job?.status).toLowerCase() === "paid";

  if (failed || !isPaid) {
    return (
      <div className="min-h-screen bg-bgprimary flex items-center justify-center px-4">

        <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md">

          <div className="flex flex-col items-center text-center">

            <MdError
              className="text-red-500"
              size={90}
            />

            <h1 className="text-3xl font-bold mt-4">
              Payment Failed
            </h1>

            <p className="text-gray-500 mt-3">
              Something went wrong while processing payment.
            </p>

          </div>

          <div className="mt-8 flex flex-col gap-3">

            <Link
              to="/upload"
              className="w-full bg-red-500 text-white py-3 rounded-2xl text-center font-semibold"
            >
              Retry Upload
            </Link>

            <Link
              to="/"
              className="w-full border border-gray-300 py-3 rounded-2xl text-center font-semibold"
            >
              Go Home
            </Link>

          </div>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bgprimary flex items-center justify-center px-4">

      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md">

        <div className="flex flex-col items-center text-center">

          <MdCheckCircle
            className="text-green-500"
            size={90}
          />

          <h1 className="text-3xl font-bold mt-4">
            Payment Successful
          </h1>

          <p className="text-gray-500 mt-3 leading-relaxed">
            Please collect your printouts using the OTP below.
          </p>

        </div>

        {/* SESSION ID */}
        <div className="mt-8">

          <label className="text-sm text-gray-500">
            Session ID
          </label>

          <div className="mt-2 border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 text-sm font-semibold break-all">
            {job.session_id}
          </div>

        </div>


        <div className="mt-5">

          <label className="text-sm text-gray-500">
            Print OTP
          </label>

          <div className="mt-2 h-14 flex items-center justify-center rounded-xl border-2 border-dashed border-bgsecondary bg-blue-50 text-2xl tracking-[0.3em] font-bold text-bgsecondary">
            {job.token}
          </div>

        </div>

        {/* AMOUNT */}
        <div className="mt-5">

          <label className="text-sm text-gray-500">
            Total Amount
          </label>

          <div className="mt-2 border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 font-semibold">
            ₹ {job.total_amount}
          </div>

        </div>

        <div className="mt-8 flex flex-col gap-3">

          <Link
            to="/history"
            className="w-full bg-bgsecondary text-white py-3 rounded-2xl text-center font-semibold"
          >
            View Orders
          </Link>

          <Link
            to="/upload"
            className="w-full border border-gray-300 py-3 rounded-2xl text-center font-semibold"
          >
            Upload More Files
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Order;