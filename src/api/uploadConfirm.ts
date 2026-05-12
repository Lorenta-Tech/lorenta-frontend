import { DocumentConfig } from "../types";
import apiFetch from "./api";

async function uploadConfirm(
  session: string,
  files: DocumentConfig[],
): Promise<string> {

  const json = await apiFetch<any>(
    "/files/upload/confirm",
    {
      method: "POST",
      body: JSON.stringify({
        session_id: session,
        files,
      }),
    }
  );

  return json.data;
}

export default uploadConfirm;