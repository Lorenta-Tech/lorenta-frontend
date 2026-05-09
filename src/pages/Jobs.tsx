import { useEffect, useState } from "react";
import OrderCard from "../components/OrderCard.tsx";

function Jobs() {

  const [jobs, setJobs] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {

    const fetchJobs = async () => {

      try {

        setLoading(true);

        const response = await fetch(
          "https://unfearingly-heterozygous-brittny.ngrok-free.dev/files/jobs/recent",
          {
            method: "GET",

            credentials: "omit",

            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {

          const text = await response.text();

          console.error(text);

          throw new Error("Failed to fetch jobs");
        }

        const json = await response.json();

        console.log(json);

        setJobs(json.data.jobs || []);

      } catch (err) {

        console.error(err);

        setError("Failed to load active jobs");

      } finally {

        setLoading(false);
      }
    };

    fetchJobs();

  }, []);

  // =========================
  // Loading
  // =========================
  if (loading) {
    return (
      <div className="mt-20 text-center text-lg text-gray-600">
        Loading active jobs...
      </div>
    );
  }

  // =========================
  // Error
  // =========================
  if (error) {
    return (
      <div className="mt-20 text-center text-red-500 text-lg">
        {error}
      </div>
    );
  }

  // =========================
  // Empty
  // =========================
  if (jobs.length === 0) {
    return (
      <div className="mt-20 text-center text-gray-500 text-lg">
        No active jobs found
      </div>
    );
  }

  return (
    <div className="mt-10 px-4">

      <div className="max-w-5xl mx-auto">

        <div className="flex items-center justify-between mb-8">

          <h1 className="text-4xl font-bold text-textprimary">
            Active Jobs
          </h1>

          <span className="bg-bgsecondary text-white px-4 py-2 rounded-full text-sm font-semibold">
            {jobs.length} Jobs
          </span>

        </div>

        <ul className="flex flex-col gap-7">

          {jobs.map((job) => {

            const {
              session_id,
              status,
              total_amount,
              total_sheets,
              created_at,
              files,
            } = job;

            return (
              <li key={session_id}>

                <OrderCard
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