// Jobs.tsx
import { useEffect, useState } from "react";
import OrderCard from "../components/OrderCard";
import apiFetch from "../api/api";

function Jobs() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError("");
        const json = await apiFetch<any>("/files/jobs/active");
        setJobs(json?.data?.jobs || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load active orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className="mt-20 text-center text-lg text-white/70">
        Loading active orders...
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-20 text-center text-lg text-cta">{error}</div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="mt-20 text-center text-lg text-white/70">
        No active orders found
      </div>
    );
  }

  return (
    <div className="mt-4">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-extrabold text-white">Active Orders</h1>
          <span className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white">
            {jobs.length} Jobs
          </span>
        </div>

        <ul className="flex flex-col gap-7">
          {jobs.map((job) => {
            const {
              session_id,
              status,
              token,           
              total_amount,
              total_sheets,
              created_at,
              files,
            } = job;

            return (
              <li key={session_id}>
                <OrderCard
                  token={token} 
                  totalpages={total_sheets}
                  price={total_amount}
                  orderDate={created_at}
                  status={status}
                  files={files}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Jobs;