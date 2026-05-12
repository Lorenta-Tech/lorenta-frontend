import { UploadedFile, DocumentConfig } from "../types";
import uploadConfirm from "./uploadConfirm";
import apiFetch from "./api";

type CartItem = {
  file: UploadedFile;
  config: DocumentConfig;
};

type UploadInitPayload = {
  file_name: string;
  content_type: string;
};

type UploadInitResponse = {
  data: {
    expires_at: string;
    session_id: string;
    token: number;
    files: {
      file_id: string;
      file_name: string;
      staging_key: string;
      upload_url: string;
    }[];
  };
};

export async function getUploadSession(
  metadata: UploadInitPayload[]
): Promise<UploadInitResponse["data"]> {

  const json = await apiFetch<UploadInitResponse>(
    "/files/upload/init",
    {
      method: "POST",
      body: JSON.stringify({
        files: metadata,
      }),
    }
  );

  return json.data;
}

export async function uploadCart(
  items: CartItem[]
): Promise<any> {

  const metadata = items.map(({ file }) => ({
    file_name: file.name,
    content_type:
      file.type || getMimeTypeFromName(file.name),
  }));

  const response = await getUploadSession(metadata);

  const session_id = response.session_id;

  const DBfiles = response.files;

  const fileMap = new Map(
    DBfiles.map((f) => [f.file_name, f])
  );

  await Promise.all(
    items.map(async ({ file, config }) => {

      const match = fileMap.get(file.name);

      if (!match) {
        throw new Error(
          `Missing upload URL for ${file.name}`
        );
      }

      config.file_id = match.file_id;

      return uploadToS3(
        file.content as File,
        match.upload_url
      );
    })
  );

  return uploadConfirm(
    session_id,
    items.map((item) => item.config)
  );
}

async function uploadToS3(
  file: File,
  url: string
) {

  const res = await fetch(url, {
    method: "PUT",
    body: file,
  });

  if (!res.ok) {
    throw new Error("S3 upload failed");
  }
}

function getMimeTypeFromName(
  name: string
): string {

  const ext = name
    .split(".")
    .pop()
    ?.toLowerCase();

  switch (ext) {

    case "png":
      return "image/png";

    case "jpg":
    case "jpeg":
      return "image/jpeg";

    case "pdf":
      return "application/pdf";

    default:
      return "application/octet-stream";
  }
}