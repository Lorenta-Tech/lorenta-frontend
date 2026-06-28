import apiFetch from "./api";

export type LocalFile = {
  id: string;
  title: string;
  file_type: string;
  uploaded_at: string;
  original_filename: string;
  file_size_bytes: number;
  isNew?: boolean;
  localFile?: File;
};

type UploadInitPayload = {
  module_id: string;
  title: string;
  description: string;
  file_type: string;
  original_filename: string;
  file_size_bytes: number;
};

type UploadInitResponse = {
  data: {
    note_id: string;
    upload_url: string;
  };
};

export async function getDeptUploadSession(
  payload: UploadInitPayload
): Promise<UploadInitResponse["data"]> {
  const json = await apiFetch<UploadInitResponse>(
    "/admin/notes/upload/init",
    {
      method: "POST",
      body: JSON.stringify(payload),
    }
  );

  return json.data;
}

export async function confirmUpload(
  noteId: string
) {
  return apiFetch(
    "/admin/notes/upload/confirm",
    {
      method: "POST",
      body: JSON.stringify({
        note_id: noteId,
      }),
    }
  );
}

async function uploadToS3(
  file: File,
  uploadUrl: string
) {
  const response = await fetch(uploadUrl, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type":
        file.type ||
        "application/octet-stream",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to upload ${file.name}`
    );
  }

  return response;
}

export async function uploadFiles(
  moduleId: string,
  files: LocalFile[]
) {
  await Promise.all(
    files.map(async (file) => {
      if (!file.localFile) {
        throw new Error(
          `No File object found for ${file.title}`
        );
      }

      const initResponse =
        await getDeptUploadSession({
          module_id: moduleId,
          title: file.title,
          description: "",
          file_type: file.file_type,
          original_filename:
            file.original_filename,
          file_size_bytes:
            file.file_size_bytes,
        });

      await uploadToS3(
        file.localFile,
        initResponse.upload_url
      );

      await confirmUpload(
        initResponse.note_id
      );
    })
  );
}