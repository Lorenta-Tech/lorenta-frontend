import OrderCard from "../components/OrderCard";
import getOrderHistory from "../api/getOrderHistory";

function History() {
  const data: Array<JSON> = getOrderHistory();
  
  
  return (
    <div className="mt-10">
      <ul className="max-w-4xl flex flex-col m-auto gap-7">
        {
          data.map((item) => {
          const order = typeof item === "string" ? JSON.parse(item) : item;

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
        })
        }
      </ul>
      
    </div>
  );
}

export default History;