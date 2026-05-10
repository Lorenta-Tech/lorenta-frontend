import { useEffect, useState } from "react";
import OrderCard from "../components/OrderCard";

function History() {

  const [orders, setOrders] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {

    const fetchOrders = async () => {

      try {

        setLoading(true);

        const response = await fetch(
  "http://localhost:17069/files/jobs/active",
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

          throw new Error("Failed to fetch orders");
        }

        const json = await response.json();

        console.log(json);

        // IMPORTANT FIX
        setOrders(json.data.jobs || []);

      } catch (err) {

        console.error(err);

        setError("Failed to load orders");

      } finally {

        setLoading(false);

      }
    };

    fetchOrders();

  }, []);

  // =========================
  // Loading State
  // =========================
  if (loading) {
    return (
      <div className="mt-20 text-center text-lg text-gray-600">
        Loading orders...
      </div>
    );
  }

  // =========================
  // Error State
  // =========================
  if (error) {
    return (
      <div className="mt-20 text-center text-red-500 text-lg">
        {error}
      </div>
    );
  }

  // =========================
  // Empty State
  // =========================
  if (orders.length === 0) {
    return (
      <div className="mt-20 text-center text-gray-500 text-lg">
        No active print jobs found
      </div>
    );
  }

  return (
    <div className="mt-10 px-4">

      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold mb-8 text-textprimary">
          Active Orders
        </h1>

        <ul className="flex flex-col gap-7">

          {orders.map((order) => {

            const {
              session_id,
              status,
              total_amount,
              total_sheets,
              created_at,
              files,
            } = order;

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

export default History;