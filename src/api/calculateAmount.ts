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

const rateFor = (printingMode: string) => {
  return rates[printingMode] ?? rates.monochromatic;
};

const countSelectedPages = (
  pageRanges: string[],
  maxPages: number
): number => {
  const selected = new Set<number>();

  for (const range of pageRanges) {
    const trimmed = range.trim();

    // range like 1-5
    if (trimmed.includes("-")) {
      const parts = trimmed.split("-");

      if (parts.length !== 2) continue;

      let start = Number(parts[0].trim());
      let end = Number(parts[1].trim());

      if (Number.isNaN(start) || Number.isNaN(end)) {
        continue;
      }

      if (start > end) {
        [start, end] = [end, start];
      }

      for (let i = start; i <= end; i++) {
        if (i >= 1 && i <= maxPages) {
          selected.add(i);
        }
      }
    } else {
      // single page like 5
      const page = Number(trimmed);

      if (
        !Number.isNaN(page) &&
        page >= 1 &&
        page <= maxPages
      ) {
        selected.add(page);
      }
    }
  }

  return selected.size;
};

export const calculateAmount = async ({
  items,
}: CalculateInput): Promise<number> => {

  let total = 0;

  for (const { file, config } of items) {

    const numOfPages =
      file.pages ??
      Math.floor(Math.random() * 10) + 1;

    const copies = config.copies || 1;

    const pageLayout =
      Number(config.page_layout) || 1;

    const printingMode =
      config.printing_mode;

    const printingSide =
      config.printing_side;

    const selectedPages = countSelectedPages(
      config.page_range || [],
      numOfPages
    );

    const finalSelectedPages =
      selectedPages || numOfPages;

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