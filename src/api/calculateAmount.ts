import { DocumentConfig, UploadedFile } from "../types";

type CartItem = {
  file: UploadedFile;
  config: DocumentConfig;
};

type CalculateInput = {
  items: CartItem[];
};

export const calculateAmount = async ({
  items,
}: CalculateInput): Promise<number> => {
  let total = 0;

  items.forEach(({ file, config }) => {
    const pages =
      file.pages ?? Math.floor(Math.random() * 10) + 1;

    const isColor = config.printing_mode;
    const isDuplex = config.printing_side;

    let pricePerPage = 0;

    if (isDuplex) {
      pricePerPage = isColor ? 3 : 1;
    } else {
      pricePerPage = isColor ? 4 : 1.5;
    }

    total += pages * pricePerPage * config.copies;
  });

  return total;
};