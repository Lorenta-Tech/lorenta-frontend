import { useParams, Link, useLocation } from "react-router-dom";
import { MdCheckCircle, MdError } from "react-icons/md";

function Order() {

  const { id } = useParams();

  const location = useLocation();

  const state = location.state as any;

  const success = state?.success ?? true;

  const totalAmount = state?.totalAmount ?? 0;

  const token = state?.token ?? "------";

  return (
    <div className="min-h-[80vh] bg-bgprimary flex items-center justify-center px-4">

      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md">

        {/* =========================
            SUCCESS STATE
        ========================= */}
        {success ? (
          <>

            <div className="flex flex-col items-center text-center">

              <MdCheckCircle
                className="text-green-500"
                size={90}
              />

              <h1 className="text-3xl font-bold mt-4 text-textprimary">
                Payment Successful
              </h1>

              <p className="text-gray-500 mt-3 leading-relaxed">
                Your documents were uploaded successfully.
                Please collect your printouts from the kiosk
                by entering the OTP shown below.
              </p>

            </div>

            {/* =========================
                ORDER ID
            ========================= */}
            <div className="mt-8">

              <label className="text-sm text-gray-500">
                Order ID
              </label>

              <div className="mt-2 border border-gray-200 rounded-xl px-4 py-3 font-semibold text-gray-800 bg-gray-50">
                {id}
              </div>

            </div>

            {/* =========================
                ORDER TOKEN
            ========================= */}
            <div className="mt-5">

              <label className="text-sm text-gray-500">
                Print OTP
              </label>

              <div className="mt-2 h-14 flex items-center justify-center rounded-xl border-2 border-dashed border-bgsecondary bg-blue-50 text-2xl tracking-[0.3em] font-bold text-bgsecondary">
                {token}
              </div>

            </div>

            {/* =========================
                TOTAL AMOUNT
            ========================= */}
            <div className="mt-5">

              <label className="text-sm text-gray-500">
                Total Amount
              </label>

              <div className="mt-2 border border-gray-200 rounded-xl px-4 py-3 font-semibold text-gray-800 bg-gray-50">
                ₹ {totalAmount}
              </div>

            </div>

            {/* =========================
                BUTTONS
            ========================= */}
            <div className="mt-8 flex flex-col gap-3">

              <Link
                to="/history"
                className="w-full bg-bgsecondary text-white py-3 rounded-2xl text-center font-semibold hover:opacity-90 transition"
              >
                View Orders
              </Link>

              <Link
                to="/upload"
                className="w-full border border-gray-300 py-3 rounded-2xl text-center font-semibold hover:bg-gray-100 transition"
              >
                Upload More Files
              </Link>

            </div>

          </>
        ) : (

          /* =========================
              FAILURE STATE
          ========================= */
          <>
            <div className="flex flex-col items-center text-center">

              <MdError
                className="text-red-500"
                size={90}
              />

              <h1 className="text-3xl font-bold mt-4 text-textprimary">
                Payment Failed
              </h1>

              <p className="text-gray-500 mt-3 leading-relaxed">
                Something went wrong while processing your payment.
                Please re-upload your documents and try again.
              </p>

            </div>

            {/* =========================
                BUTTONS
            ========================= */}
            <div className="mt-8 flex flex-col gap-3">

              <Link
                to="/upload"
                className="w-full bg-red-500 text-white py-3 rounded-2xl text-center font-semibold hover:opacity-90 transition"
              >
                Retry Upload
              </Link>

              <Link
                to="/"
                className="w-full border border-gray-300 py-3 rounded-2xl text-center font-semibold hover:bg-gray-100 transition"
              >
                Go Home
              </Link>

            </div>

          </>
        )}

      </div>

    </div>
  );
}

export default Order;