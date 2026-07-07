import * as XLSX from "xlsx";
import type { RawRestaurantRow } from "./types";

/**
 * Parses the source workbook (가맹점명 / 주소 / 네이버 링크 in columns A/B/C, header in row 1).
 * Rows missing a name, address, or naver link are dropped — naverLink is the app's merge key,
 * so a restaurant without one can't be tracked across re-uploads.
 */
export function parseRestaurantWorkbook(input: ArrayBuffer | Buffer): RawRestaurantRow[] {
  const buffer = Buffer.isBuffer(input) ? input : Buffer.from(input);
  const workbook = XLSX.read(buffer, { type: "buffer" });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json<unknown[]>(sheet, { header: 1, blankrows: false });

  const result: RawRestaurantRow[] = [];
  for (const row of rows.slice(1)) {
    const name = String(row[0] ?? "").trim();
    const address = String(row[1] ?? "").trim();
    const naverLink = String(row[2] ?? "").trim();
    if (!name || !address || !naverLink) continue;
    result.push({ name, address, naverLink });
  }
  return result;
}
