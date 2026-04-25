import { UploadedFile } from "../types";

export default function uploadFiles(files: File[]): UploadedFile[] {
  return files.map((f) => ({
    id: crypto.randomUUID(),
    name: f.name,
    type: f.type,
    size: f.size,
    content: f, 
  }));
}