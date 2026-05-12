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
      <div className="grid min-h-[calc(100vh-170px)] place-items-center px-4">

        <div className="w-full max-w-md rounded-2xl border border-white/15 bg-white/5 p-8 shadow-sm">

          <div className="flex flex-col items-center text-center">

            <MdError
              className="text-cta"
              size={90}
            />

            <h1 className="mt-4 text-3xl font-extrabold text-white">
              Payment Failed
            </h1>

            <p className="mt-3 text-white/70">
              Something went wrong while processing payment.
            </p>

          </div>

          <div className="mt-8 flex flex-col gap-3">

            <Link
              to="/upload"
              className="w-full rounded-xl bg-cta py-3 text-center font-semibold text-darkbg transition hover:bg-cta/90"
            >
              Retry Upload
            </Link>

            <Link
              to="/"
              className="w-full rounded-xl border border-white/15 py-3 text-center font-semibold text-white transition hover:border-primary hover:bg-primary/15 hover:text-primary"
            >
              Go Home
            </Link>

          </div>

        </div>

      </div>
    );
  }

  return (
    <div className="grid min-h-[calc(100vh-170px)] place-items-center px-4">

      <div className="w-full max-w-md rounded-2xl border border-white/15 bg-white/5 p-8 shadow-sm">

        <div className="flex flex-col items-center text-center">

          <MdCheckCircle
            className="text-primary"
            size={90}
          />

          <h1 className="mt-4 text-3xl font-extrabold text-white">
            Payment Successful
          </h1>

          <p className="mt-3 leading-relaxed text-white/70">
            Please collect your printouts using the OTP below.
          </p>

        </div>

        {/* SESSION ID */}
        <div className="mt-8">

          <label className="text-sm font-semibold text-white/70">
            Session ID
          </label>

          <div className="mt-2 break-all rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white">
            {job.session_id}
          </div>

        </div>


        <div className="mt-5">

          <label className="text-sm font-semibold text-white/70">
            Print OTP
          </label>

          <div className="mt-2 flex min-h-14 items-center justify-center rounded-xl border-2 border-dashed border-primary bg-primary/15 px-3 text-2xl font-extrabold tracking-[0.25em] text-primary">
            {job.token}
          </div>

        </div>

        {/* AMOUNT */}
        <div className="mt-5">

          <label className="text-sm font-semibold text-white/70">
            Total Amount
          </label>

          <div className="mt-2 rounded-xl border border-white/15 bg-white/5 px-4 py-3 font-semibold text-white">
            ₹ {job.total_amount}
          </div>

        </div>

        <div className="mt-8 flex flex-col gap-3">

          <Link
            to="/history"
            className="w-full rounded-xl bg-primary py-3 text-center font-semibold text-white transition hover:bg-primary/90"
          >
            View Orders
          </Link>

          <Link
            to="/upload"
            className="w-full rounded-xl border border-white/15 py-3 text-center font-semibold text-white transition hover:border-primary hover:bg-primary/15 hover:text-primary"
          >
            Upload More Files
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Order;
