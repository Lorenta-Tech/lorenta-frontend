import apiFetch from "./api";

export async function deleteNote(
  noteId: string
) {
  return apiFetch(
    `/admin/notes/${noteId}`,
    {
      method: "DELETE",
    }
  );
}

export async function updateNote(
  noteId: string,
  payload: {
    title: string;
    description: string;
  }
) {
  return apiFetch(
    `/admin/notes/${noteId}`,
    {
      method: "PUT",
      body: JSON.stringify(payload),
    }
  );
}