import { UploadedFile } from "../types";
import * as pdfjsLib from "pdfjs-dist"

async function getPageCount(f: File): Promise<number>{

  if (f.type === "application/pdf"){
    const arrayBuffer = await f.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({data: arrayBuffer}).promise;
    return pdf.numPages;
  }
  return 1;
}

export default async function uploadToCart(files: File[], showAlert:any): Promise<UploadedFile[]> {
  const results = await Promise.all(
    files.map(async (f) => {
      const pages = await getPageCount(f);

      if (pages>200){
        return null;
      }

      return {
        id: `${crypto.randomUUID()}`,
        name: f.name,
        type: f.type,
        size: f.size,
        content: f, 
        pages,
      };
    })
  );

  const hasLargeFile = results.some(r => r === null);

  if (hasLargeFile){
    showAlert("Files above 200+ are not supported", "error");
  }
  return results.filter((r): r is UploadedFile => r !== null);

}