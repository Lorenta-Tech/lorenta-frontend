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
  color: 4,
};

export const calculateAmount = async ({
  items,
}: CalculateInput): Promise<number> => {

  let total = 0;

  items.forEach(({ file, config }) => {

    const numOfPages =
      file.pages ??
      Math.floor(Math.random() * 10) + 1;

    const copies = config.copies;

    const pageLayout =
      Number(config.page_layout) || 1;

    const printingMode =
      config.printing_mode;

    const printingSide =
      config.printing_side;

    // Pages printable per sheet
    let pagesPerSheet = pageLayout;

    if (printingSide === "double_side") {
      pagesPerSheet *= 2;
    }

    // Calculate printable sides
    let totalSides = 0;

    if (printingSide === "single_side") {

      totalSides = Math.ceil(
        numOfPages / pageLayout
      );

    } else {

      const pagesPerDoubleSheet =
        pageLayout * 2;

      const fullSheets = Math.floor(
        numOfPages / pagesPerDoubleSheet
      );

      const remainingPages =
        numOfPages % pagesPerDoubleSheet;

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

    // Final file cost
    const costPerSide =
      rates[printingMode] ?? 1;

    total +=
      totalSides *
      costPerSide *
      copies;
  });

  return total;
};