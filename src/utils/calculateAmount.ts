import {
  DocumentConfig,
  UploadedFile,
} from "../types";

type CartItem = {
  file: UploadedFile;
  config: DocumentConfig;
};

type CalculateInput = {
  items: CartItem[];
};

const rates: Record<string, number> = {
  monochromatic: 1,
  color: 5,
};

const rateFor = (printingMode: string) => {
  return rates[printingMode] ?? rates.monochromatic;
};

export const calculateAmount = async ({
  items,
}: CalculateInput): Promise<number> => {

  let total = 0;

  for (const { config } of items) {

    const copies = config.copies || 1;

    const pageLayout =
      Number(config.page_layout) || 1;

    const printingMode =
      config.printing_mode;

    const printingSide =
      config.printing_side;

    const finalSelectedPages = config.num_of_pages;

    const pagesPerSheet =
      printingSide === "double_side"
        ? pageLayout * 2
        : pageLayout;

    const sheetsPerCopy = Math.ceil(
      finalSelectedPages / pagesPerSheet
    );

    const costPerSide =
      rateFor(printingMode);

    let totalSides = 0;

    if (printingSide === "single_side") {

      totalSides = sheetsPerCopy;

    } else {

      const fullSheets = Math.floor(
        finalSelectedPages / (pageLayout * 2)
      );

      const remainingPages =
        finalSelectedPages % (pageLayout * 2);

      if (remainingPages === 0) {

        totalSides = fullSheets * 2;

      } else if (
        remainingPages <= pageLayout
      ) {

        totalSides = fullSheets * 2 + 1;

      } else {

        totalSides = fullSheets * 2 + 2;
      }
    }

    totalSides *= copies;

    total += totalSides * costPerSide;
  }

  return total;
};