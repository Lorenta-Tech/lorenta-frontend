const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://kiosk-server-production.duckdns.org";

type ApiOptions = RequestInit & {
  auth?: boolean;
};

export async function apiFetch<T = any>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<T> {

  const token = localStorage.getItem("token");
  const isFormData = options.body instanceof FormData;

  const headers: HeadersInit = {

    ...(!isFormData && {
      "Content-Type": "application/json",
    }),

    ...(options.auth !== false &&
      token && {
        Authorization: `bearer ${token}`,
      }),

    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {

    const errorText = await response.text();

    console.error("API Error:", errorText);

    throw new Error(errorText || "Request failed");
  }

  const contentType = response.headers.get("content-type");

  if (contentType?.includes("application/json")) {
    return response.json();
  }

  return response.text() as T;
}

export default apiFetch;