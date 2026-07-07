export const CATEGORIES = [
  "한식",
  "중식",
  "일식",
  "양식",
  "분식",
  "고기/구이",
  "카페/디저트",
  "치킨/버거",
  "술집",
  "기타",
] as const;

export type Category = (typeof CATEGORIES)[number];

export interface Restaurant {
  id: string;
  name: string;
  address: string;
  naverLink: string;
  category: Category | null;
  signatureMenu: string | null;
  lat: number | null;
  lng: number | null;
  updatedAt: string;
}

export interface RawRestaurantRow {
  name: string;
  address: string;
  naverLink: string;
}
