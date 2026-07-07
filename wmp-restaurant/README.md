# 우리 회사 가맹 식당 찾기

판교 지역 가맹 식당 리스트를 검색/필터링하고, 오늘 뭐 먹을지 랜덤으로 추천받을 수 있는 사내 웹앱입니다.

## 로컬 개발

```bash
npm install
npm run dev
```

`http://localhost:3000` 에서 확인할 수 있습니다.

로컬 개발 환경에서는 데이터가 `.data/restaurants.json` 파일에 저장됩니다 (Cloudflare KV 없이도 전체 기능
테스트 가능). `.env.local` 에 `ADMIN_PASSWORD` 값을 설정해야 `/admin` 로그인이 동작합니다.

```
ADMIN_PASSWORD=원하는_비밀번호
```

## 데이터 시드(최초 1회, 또는 원본 엑셀 갱신 시)

`scripts/source-data/restaurants.xlsx` 를 원본 파일로 교체한 뒤:

```bash
npm run seed
```

- 네이버 링크가 없는 행은 자동으로 제외됩니다 (링크가 병합 키로 쓰이기 때문).
- `scripts/enrichment-result.json` 이 있으면 네이버 링크 기준으로 카테고리/대표메뉴를 함께 채워 넣습니다.

## 배포 후 실제로 데이터를 갱신하려면 (관리자 화면)

배포된 사이트에서 `/admin` 으로 접속 → 비밀번호 입력 후:

- 각 식당의 **카테고리 / 대표메뉴**를 표에서 직접 수정하고 "저장" 클릭
- 엑셀 파일을 다시 받으면 "엑셀 재업로드" 로 업로드 → 네이버 링크 기준으로 자동 병합 (기존 태그는
  유지되고, 새 식당은 추가, 리스트에서 빠진 식당은 제거됩니다)

## Cloudflare Pages/Workers 배포 (최초 1회 설정)

이 프로젝트는 [OpenNext for Cloudflare](https://opennext.js.org/cloudflare) 어댑터로 Cloudflare Workers에
배포됩니다. GitHub 저장소에 코드가 올라간 뒤, Cloudflare 대시보드에서 아래 순서로 진행하세요.

1. **KV 네임스페이스 생성**: Cloudflare 대시보드 → `Storage & Databases` → `KV` → `Create namespace` →
   이름은 자유롭게 (예: `wmp-restaurant-kv`). 생성 후 나오는 **Namespace ID**를 복사해두세요.
2. **Worker 생성 (Git 연동)**: `Workers & Pages` → `Create application` → `Connect to Git` → 이 저장소와
   `main` 브랜치 선택.
3. **빌드 설정**: Build command는 `npx opennextjs-cloudflare build` 로 지정합니다. (대시보드 화면 구성이
   버전에 따라 다를 수 있으니, "Workers Builds" 관련 안내 문구를 참고해 맞는 필드에 입력하세요.)
4. **KV 바인딩 연결**: 첫 배포가 끝난 뒤, 해당 Worker의 `Settings` → `Bindings` → `Add` → `KV Namespace` →
   변수명(Variable name)은 반드시 **`RESTAURANTS_KV`** 로 입력 → 1번에서 만든 네임스페이스 선택 → 저장.
   - 또는, 1번에서 받은 Namespace ID를 알려주시면 `wrangler.jsonc` 의 `REPLACE_WITH_KV_NAMESPACE_ID` 부분에
     직접 반영해드릴 수 있습니다.
5. **관리자 비밀번호 설정**: `Settings` → `Variables and Secrets` → `Add` → 이름 `ADMIN_PASSWORD`, 타입은
   `Secret` 으로 → 원하는 비밀번호 입력 → 저장.
6. 바인딩/시크릿을 추가한 뒤에는 **재배포를 한 번 더** 해야 반영됩니다.
7. 배포 후 스모크 테스트: 메인 페이지에서 목록이 보이는지 → `/admin` 로그인 → 아무 식당 하나 카테고리
   수정 후 저장 → 메인 페이지에서 바로 반영되는지 확인해보세요.

## 알려진 제한사항 (다음에 추가 가능)

- 네이버 평점은 표시하지 않습니다 (요청사항).
- 지도 임베드 대신 "네이버 지도에서 보기" 외부 링크만 제공합니다.
- 위믹스타워 기준 거리순 정렬은 아직 없습니다. 카카오/네이버 지도 API 키를 준비하시면 추가할 수 있습니다.
- 카테고리/대표메뉴는 다이닝코드 등에서 자동 수집을 시도했지만, 일부 식당(특히 소규모 개인 식당)은
  정보를 찾지 못해 비어 있습니다 — `/admin` 에서 점진적으로 채워나가면 됩니다.
