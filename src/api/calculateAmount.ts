import { DocumentConfig, UploadedFile } from "../types";

type CalculateInput = {
  configs: DocumentConfig[];
  fileMap: Record<string, UploadedFile>;
};

export const calculateAmountApi = async ({
  configs,
  fileMap,
}: CalculateInput): Promise<number> => {

  let total = 0;

  configs.forEach((config) => {
    const file = fileMap[config.fileId];
    if (!file) return;

    const pages = file.pages || Math.floor(Math.random() * 10) + 1;

    const isColor = config.isColor === true;
    const isDuplex = config.duplex;

    let pricePerPage = 0;

    if (isDuplex) {
      pricePerPage = isColor ? 3 : 1;
    } else {
      pricePerPage = isColor ? 4 : 1.5;
    }

    total += pages * pricePerPage;
  });

  return total;
};