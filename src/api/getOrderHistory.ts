import apiFetch from "./api";

async function getOrderHistory(): Promise<any[]> {

  const json = await apiFetch<any>(
    "/files/jobs/recent"
  );

  return json?.data?.jobs || [];
}

export default getOrderHistory;