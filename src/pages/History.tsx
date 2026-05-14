import { useEffect, useState } from "react";
import OrderCard from "../components/OrderCard";
import getOrderHistory from "../api/getOrderHistory";

function History() {

  const [orders, setOrders] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {

    const fetchOrders = async () => {

      try {

        setLoading(true);

        const jobs = await getOrderHistory();

        setOrders(jobs);

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
      <div className="mt-20 text-center text-lg text-white/70">
        Loading orders...
      </div>
    );
  }

  // =========================
  // Error State
  // =========================
  if (error) {
    return (
      <div className="mt-20 text-center text-lg text-cta">
        {error}
      </div>
    );
  }

  // =========================
  // Empty State
  // =========================
  if (orders.length === 0) {
    return (
      <div className="mt-20 text-center text-lg text-white/70">
        No active print jobs found
      </div>
    );
  }

  return (
    <div className="mt-4">

      <div className="mx-auto max-w-4xl">

        <h1 className="mb-8 text-4xl font-extrabold text-white">
          Order History
        </h1>

        <ul className="flex flex-col gap-7">

          {orders.map((order) => {

            const {
              token ,
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

export default History;
