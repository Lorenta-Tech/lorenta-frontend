import { useCart } from "../contexts/CartContext";

async function uploadConfigs(): Promise<string>{
  const { items } = useCart();

  const reqData = items.map((item) => item.config)
  const url="http://localhost:17069/files/upload/confirm";
  
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "omit",
    body: JSON.stringify({file_configs: reqData}),
  });

  if (!response.ok) {
    const text = await response.text();
    console.error("Upload confirm failed:", text);
    throw new Error("Upload confirm failed");
  }

  return "1";
  // const data = response.json()
  // return data["order_id"]
}

export default uploadConfigs;