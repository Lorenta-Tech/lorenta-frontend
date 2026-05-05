import { DocumentConfig } from "../types";

async function uploadConfirm(
  session: string,
  files: DocumentConfig[],
): Promise<string> {

  const url = "http://localhost:17069/files/upload/confirm";

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      session_id: session,
      files,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    console.error("Upload confirm failed:", text);
    throw new Error("Upload confirm failed");
  }

  const json = await response.json();

  return json.data;
}

export default uploadConfirm;