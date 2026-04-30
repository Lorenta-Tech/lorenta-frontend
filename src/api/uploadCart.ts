import getSKeys from "./getSKeys";
import { UploadedFile, DocumentConfig } from "../types";

type CartItem = {
  file: UploadedFile;
  config: DocumentConfig;
};

function uploadCart(items: CartItem[]){
  const data: []= items.map(({file, config}) => {
    return {
      file_id: file.id,
      file_name: file.name,
      content_type: file.type
    }
  })
  const s_keys = getSKeys(data);
  return;
}

export default uploadCart;