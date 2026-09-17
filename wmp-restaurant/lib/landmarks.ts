import { distanceMeters } from "./geo";

export const LANDMARKS = [
  { name: "삼환하이펙스", lat: 37.4020720004989, lng: 127.110443988466 },
  { name: "에이치스퀘어", lat: 37.40202672608591, lng: 127.10874075413574 },
  { name: "유스페이스", lat: 37.401517184, lng: 127.107277426 },
  { name: "골드타워", lat: 37.3973635431436, lng: 127.112063345367 },
  { name: "판교테크원", lat: 37.394859444, lng: 127.112232403 },
  { name: "알파리움", lat: 37.39519661999472, lng: 127.10913744118014 },
  { name: "아브뉴프랑", lat: 37.39730285082089, lng: 127.11334845615755 },
  { name: "NS홈쇼핑", lat: 37.4017699656978, lng: 127.101616015237 },
  { name: "알파돔타워·힐스테이트", lat: 37.393480801, lng: 127.110402585 },
] as const;

export type LandmarkName = (typeof LANDMARKS)[number]["name"] | "기타";

const OUTLIER_THRESHOLD_M = 600;

export function nearestLandmark(lat: number, lng: number): LandmarkName {
  let best: LandmarkName = "기타";
  let bestDistance = Infinity;
  for (const landmark of LANDMARKS) {
    const d = distanceMeters(lat, lng, landmark.lat, landmark.lng);
    if (d < bestDistance) {
      bestDistance = d;
      best = landmark.name;
    }
  }
  return bestDistance <= OUTLIER_THRESHOLD_M ? best : "기타";
}
