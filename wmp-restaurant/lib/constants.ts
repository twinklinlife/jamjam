export const KV_KEY = "restaurants";
export const FEEDBACK_KV_KEY = "feedback";
export const FEEDBACK_MAX_LENGTH = 500;
export const ADMIN_COOKIE_NAME = "admin_session";
export const ADMIN_COOKIE_MAX_AGE_SEC = 60 * 60 * 24 * 7; // 7 days

// 위믹스타워 (경기 성남시 분당구 대왕판교로644번길 49) — 거리 검증 시 확인된 좌표
export const OFFICE_LOCATION = { lat: 37.4006115, lng: 127.1123097 };

// 가맹 식당 리스트 갱신 이력 (최신 항목이 위로 오도록 추가) — 새 리스트 반영할 때마다 한 줄씩 추가
export const DATA_UPDATE_LOG = ["2026년 9월 업데이트 (신규 16개 추가)"] as const;
