export const countSelectedPages = (
  pageRanges: string[],
  maxPages: number
): number => {
  const selected = new Set<number>();

  for (const range of pageRanges) {
    const trimmed = range.trim();

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