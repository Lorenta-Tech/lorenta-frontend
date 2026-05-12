const ORDER_HISTORY_URL =
  "http://ec2-13-207-2-90.ap-south-1.compute.amazonaws.com/files/jobs/active";

async function getOrderHistory(): Promise<any[]> {
  const response = await fetch(ORDER_HISTORY_URL, {
    method: "GET",
    credentials: "omit",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const text = await response.text();
    console.error(text);
    throw new Error("Failed to fetch orders");
  }

  const json = await response.json();
  console.log(json);

  return json.data.jobs || [];
}

export default getOrderHistory;
