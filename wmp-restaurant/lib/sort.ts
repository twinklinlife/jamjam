export const SORT_ORDERS = ["가나다순", "가까운순"] as const;
export type SortOrder = (typeof SORT_ORDERS)[number];
