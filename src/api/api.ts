const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://ec2-13-207-2-90.ap-south-1.compute.amazonaws.com";

type ApiOptions = RequestInit & {
  auth?: boolean;
};

export async function apiFetch<T = any>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<T> {

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNGNkYzBiNTAtZGMzMC00ZmZiLTkwM2ItODA1YzNlMTNiM2Y1IiwiZW1haWwiOiJqZXZpdGFwZWFybEBnbWFpbC5jb20iLCJuYW1lIjoiSmV2aXRhIFBlYXJsIiwiZXhwIjoxNzgxMjE2MTUwLCJpYXQiOjE3Nzg2MjQxNTB9.7xHT3XWsVyyRHWGhDxa-wNDwgNBW0qT0cDEhG_qQ6T8";

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