import { UploadedFile, DocumentConfig } from "../types";

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

export async function getSKeys(metadata: UploadInitPayload[]): Promise<UploadInitResponse> {
  console.log(JSON.stringify({files: metadata}));
  

  const url="http://localhost:17069/files/upload/init";
  
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "omit",
    body: JSON.stringify({files: metadata}),
  });

  if (!response.ok) {
    const text = await response.text();
    console.error("Upload init failed:", text);
    throw new Error("Upload init failed");
  }

  const json: UploadInitResponse = await response.json();
  return json;
}

export async function uploadCart(items: CartItem[]): Promise<string> { 
  const metadata = items.map(({ file }) => ({
    file_name: file.name,
    content_type: file.type || getMimeTypeFromName(file.name),
  }));

  const response =  await getSKeys(metadata);
  console.log("S3 keys received")
  const DBfiles = response.data.files;

  await Promise.all(
    items.map(({ file }) => {
      const match = DBfiles.find(
        (f) => f.file_name === file.name
      );

      if (!match) {
        throw new Error(`Missing upload URL for ${file.name}`);
      }

      return uploadToS3(file.content, match.upload_url);
    })
  );
  // const orderID :string = await uploadConfigs(items);
  //return orderID
  return "1";
}

async function uploadToS3(file: File, url: string) {
  const res = await fetch(url, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": file.type,
    },
  });

  if (!res.ok) {
    throw new Error("S3 upload failed");
  }
  console.log("Files uploaded to S3")
}


function getMimeTypeFromName(name: string): string {
  const ext = name.split(".").pop()?.toLowerCase();

  switch (ext) {
    case "png": return "image/png";
    case "jpg":
    case "jpeg": return "image/jpeg";
    case "pdf": return "application/pdf";
    default: return "application/octet-stream";
  }
}