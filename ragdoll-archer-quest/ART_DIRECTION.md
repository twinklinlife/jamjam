# Defeat Dark Lord WOO — Art Direction (시안 단계)

> 상태: **캐릭터·무기 시안 단계 문서(역사적 기록)**. 실제 통합 단계에서 아래 섹션 9~22가 설명하는
> "공용 base rig(머리/몸통/팔/다리 파츠 교체)" 방식 대신, 보스별로 완성된 전신 일러스트 포즈
> (idle/attack/hit/defeat, 보스는 awakened 포함)를 통째로 스왑하는 방식으로 최종 구현되었다
> (`index.html`의 `createSpriteCharacter`/`TEXTURES` 참조). 아래 내용은 시안 단계의 설계 의도를
> 남겨두는 기록이며, 캐릭터 이름·게임명은 최신으로 갱신되어 있다.

## 1. 프로젝트 정보
- 게임명: Defeat Dark Lord WOO
- project subfolder: `ragdoll-archer-quest`
- 장르: 싱글 플레이 라그돌 아처 배틀
- 화면: 16:9 가로형 / 단일 `index.html` / PagePort iframe
- 핵심 플레이: 드래그 조준 → 발사 → 부위별 명중=데미지
- 참고: 외부 레퍼런스 이미지 없음. "포레스트 아일랜드" 느낌(따뜻하고 부드러운 캐주얼 모바일 톤)을 설명 기반으로 추출
- game-jam-mvp-director 결과: N/A (이미 완성된 게임의 사후 아트 패스)
- 캐릭터 비율: 사용자 확정 — **지금과 비슷한 스틱피겨형(4~5등신) 유지**, 파츠 두께·마감만 업그레이드

## 2. 아트 방향성 한 줄 정의
따뜻한 파스텔 톤과 둥글고 두꺼운(chunky) 실루엣으로, 부위별 타격이 한눈에 읽히는 장난감 피규어 느낌의 캐주얼 아처 배틀 비주얼.

## 3. 핵심 스타일 키워드
Rounded / Chunky / Warm pastel / Soft cel-shaded / Toy-figure / Clean silhouette / High readability / Friendly

## 4. 레퍼런스 분석 → 제작 규칙
- 형태: 직각 대신 둥근 모서리, 두꺼운 비율의 캡슐형 파츠
- 색상: 톤다운되지 않은 선명한 중채도 파스텔 (탁하지 않게)
- 명암: 2-tone cel shading (base color + 1단 soft shadow), 복잡한 그라디언트 없음
- silhouette: 전 파츠 공통 두꺼운 outline으로 배경과 분리
- camera: 2D side view 고정 (기존 유지)
- composition: 캐릭터·무기가 배경보다 항상 채도 높음
- UI: 둥근 corner radius + soft drop shadow (기존 코드 기반 유지, 이번 범위 아님)

## 5. 차별화 방향 (원본 그대로 베끼지 않기 위한 요소)
1. 참고작들의 "섬/건물/농장" 소재가 아니라 **전투/아처 캐릭터**에 동일한 둥글고 따뜻한 질감을 적용 — 소재 자체가 다름
2. 머리·몸통·팔다리가 분리된 **라그돌 관절 구조**를 그대로 유지 — 참고작에 없는, 물리적으로 반응하는 인형 같은 독자적 재미
3. 무기 등급색(gray/green/blue/purple)을 단순 색 변경이 아니라 **소재 질감 차이**로 표현 — gray=나무, green=강화목, blue=금속 장식, purple=은은한 마법 발광

## 6. 반드시 유지할 시각 원칙
- 플레이어(파랑 톤)·적(빨강 톤)은 배경보다 항상 채도 높게
- 머리/몸통/팔다리는 각각 명확히 구분되는 형태 + 동일 outline
- 무기는 항상 활 든 팔의 손 위치에 붙어서 렌더링
- **조준 드래그 중에는 시위에 걸린 화살이 항상 노출**
- 전 파츠 동일 outline 두께 + 광원 방향(좌상단) 통일
- 등급색은 무기 전체가 아니라 시위·장식 포인트에만 강조 적용

## 7. 피해야 할 표현
- 사실적 인체 비례·피부 질감
- 과도한 detail(옷 주름, 세밀 장신구)
- camera angle 혼용
- 배경과 비슷한 채도의 캐릭터 색
- 무기마다 완전히 다른 구조(실루엣 형태는 통일하고 색·장식만 차등)

## 8. Color System
| 용도 | HEX | 비고 |
|---|---|---|
| Player primary | `#6FB7E0` | 파스텔 블루 |
| Player accent | `#3B6FA0` | 진한 블루 (그림자/외곽) |
| Enemy primary | `#E08585` | 파스텔 코랄레드 |
| Enemy accent | `#A04040` | 진한 레드 |
| Skin/wood base | `#F0D8B0` | 웜 아이보리 |
| Background gradient | `#2A3446` → `#3C4A5E` | 저채도 네이비 |
| Rarity gray | `#B8BEC4` | |
| Rarity green | `#7ED07E` | |
| Rarity blue | `#6FB0E8` | |
| Rarity purple | `#C08FE0` | |
| UI panel | `#F5F0E6` | 크림 화이트 (기존 유지) |

## 9. Shape and Silhouette Rules
- 캐릭터 파츠: 둥근 캡슐/스타디움 형태 (직사각형 대신 둥근 모서리)
- 머리: 원형 유지, 비율상 살짝 강조
- 무기: 활 전체는 두꺼운 실루엣, 시위만 얇은 선으로 대비
- outline: 전 파츠 공통 두께(에셋 기준 약 4~6px, 게임 내 표시 크기 대비 일정 비율)
- shadow 방향: 좌측 하단 (광원 좌상단 기준)
- corner radius: 파츠 두께의 30~40%

## 10. Character Rules
> 게임 기획 변경(60초 제한)으로 스테이지는 총 2개로 축소됨. 일반(non-boss) enemy는 더 이상 존재하지 않고, **두 스테이지 모두 회사 조직장 컨셉의 고유 보스 캐릭터**임.
- 캐릭터 수: player 1종(generic hero) + boss 2종(Stage 1 The Conqueror LIM, Stage 2 Dark Lord WOO)
- base rig은 공용(머리/몸통/팔전/팔후/다리), tint·얼굴 특징·의상만 캐릭터별로 교체하는 구조 유지 (물리·구조 코드 변경 없음)
- 비율: 4~5등신 스틱피겨형 유지, 파츠 두께를 키우고 모서리를 둥글려 "장난감 피규어" 톤으로 업그레이드
- 표정: 기본은 단순한 점 눈 + 약한 볼터치, 보스는 캐릭터별 특징(안경·얼굴형·미소 등)만 최소한으로 추가
- pose: 무기를 쥔 팔(front arm)은 무기 방향으로 고정된 pose, 반대팔(back arm)은 시위를 당기는 pose로 별도 표현
- view: 2D side view 고정
- 필요한 상태: idle pose 1개, drawn(시위 당김) pose 1개 — 나머지 관절 반응은 기존 Matter physics 그대로 사용

### 10-1. Player — Generic Hero
- 특정 인물 얼굴 지정 없음. 기존 계획대로 공용 base rig(파랑 톤)을 그대로 사용
- **닉네임은 플레이어가 직접 입력** ✅ 구현 완료 — 게임 종료(승리/사망) 시 `promptNickname()`이 HTML
  `<input>` 오버레이를 띄워 입력받고, 그 이름이 `SAVE.nickname`으로 저장되어 로컬 리더보드에 표시됨
  (`index.html` 참조, 기존 자동 생성 `Archer####`는 입력이 비어 있을 때의 기본값으로만 남음)

### 10-2. Stage 1 Boss — "The Conqueror LIM"
- 체형: 다른 보스보다 크고 호리호리한(slender) 비율
- 얼굴: 긴 얼굴형, 작은 눈, 안경 없음, 살짝 미소 짓는 표정
- 헤어: 짧은 머리 (Dark Lord WOO와 동일한 길이감)
- 의상: 셔츠(소매 걷음) + 슬랙스 — 오피스 캐주얼, 안경 쓴 Dark Lord WOO와 실루엣으로 구분되도록 색은 차분한 톤(네이비/그레이 계열) 제안
- 컨셉 톤: 보스의 오른팔이자 정복자(Conqueror) 이미지 — 위협적이라기보다 능글맞고 여유로운 미소로 캐주얼하게 표현

### 10-3. Stage 2 Boss (최종 보스) — "Dark Lord WOO"
- 체형: The Conqueror LIM보다 살짝 작은 키
- 얼굴: 하관이 넓은 얼굴형, 작은 눈, 검은 테 안경
- 헤어: 스포츠컷(짧고 단정한 헤어)
- 의상: 검정 티셔츠 + 청바지 — 캐주얼하지만 존재감 있는 "Dark Lord"다운 실루엣
- 컨셉 톤: 최종 보스답게 Stage 1의 The Conqueror LIM보다 살짝 더 강조된 색상 채도·아이콘(장식)으로 위엄 부여

## 11. Background Rules
(이번 시안 범위 아님 — 기존 배경 유지, 후속 세션에서 별도 진행 권장)

## 12. Game Object Rules — 무기 (이번 시안 핵심)
**Bow (활)**
- gameplay role: 플레이어/적 장비, 조준 시 시각 연출의 핵심
- silhouette: 완만한 곡선의 활대 + 손잡이
- base size: 캐릭터 몸통 높이의 약 1.1~1.3배
- 색상: 등급 시스템(섹션 8) 반영, 포인트는 시위·장식부에만
- state:
  - **idle**: 팔에 들려 있는 기본 상태 (화살 없음)
  - **drawn**: 시위가 당겨지고 화살이 노출된 상태 (드래그 조준 중)
  - fired 반동: 별도 이미지 없이 code tween(스케일 반동)으로 처리
- transparent background 필요
- Phaser Graphics로도 대체 가능하지만, 무기가 이번 요청의 핵심 연출 요소이므로 imagegen으로 실제 이미지 제작 권장

**Arrow (화살, nocked 상태)**
- drawn 상태의 활과 함께 보이는 소형 화살 — 시위 중앙에 걸린 모습
- 발사된 화살(비행 중)은 기존 도형(얇은 사각형) 유지 가능, 필요 시 후속 제작

## 13. UI Rules
(이번 범위 아님, 기존 code-based 버튼/패널 유지)

## 14. Typography Direction
(이번 범위 아님, 기존 Phaser text 유지)

## 15. Animation and Effects
- **weapon draw**: 드래그 거리에 비례해 시위·화살이 손 위치 쪽으로 이동 (position lerp, code 처리, 새 프레임 애니메이션 불필요)
- **등급 발광**: purple(에픽) 무기만 은은한 alpha pulse(0.8↔1.0, 900ms loop)
- **발사 반동**: 활 스케일 1.0 → 1.08 → 1.0, 80ms Tween

## 16. Required Asset List (이번 1차 시안 범위)

**반드시 제작**
| file name | 용도 | 크기 | transparent | priority |
|---|---|---|---|---|
| `char-head.png` | 캐릭터 머리(공용, tint로 팀 구분) | 128x128 | Y | 1 |
| `char-torso.png` | 몸통(공용) | 128x160 | Y | 1 |
| `char-arm-front.png` | 무기 쥔 팔 (활 결합 위치 포함) | 96x160 | Y | 1 |
| `char-arm-back.png` | 시위 당기는 팔 | 96x160 | Y | 2 |
| `char-leg.png` | 다리 (좌우 공용, 반전 사용) | 80x160 | Y | 1 |
| `bow-gray-idle.png` | Worn Bow, 기본 상태 | 96x224 | Y | 1 |
| `bow-gray-drawn.png` | Worn Bow, 시위 당겨진 상태 + 화살 | 128x224 | Y | 1 |

**보스 캐릭터 (2종 — 얼굴·헤어·의상만 교체, base rig 공용)**
| file name | 용도 | 크기 | transparent | priority |
|---|---|---|---|---|
| `boss-stage1-head.png` | The Conqueror LIM 머리 (긴 얼굴형, 작은 눈, 미소) | 128x128 | Y | 1 |
| `boss-stage1-torso.png` | The Conqueror LIM 몸통 (셔츠+슬랙스, 슬림 체형) | 128x176 | Y | 1 |
| `boss-stage2-head.png` | Dark Lord WOO 머리 (넓은 하관, 작은 눈, 검은 테 안경, 스포츠컷) | 128x128 | Y | 1 |
| `boss-stage2-torso.png` | Dark Lord WOO 몸통 (검정 티셔츠+청바지, 살짝 작은 키) | 128x152 | Y | 1 |

**시간 남으면**
- `bow-green/blue/purple-idle.png`, `-drawn.png` — 스타일 확정 후 색상/소재만 바꿔 파생 생성
- `arrow-nocked.png`를 별도 분리 (활과 통합 대신 독립 asset으로 관리하고 싶을 경우)
- 보스 전용 팔/다리 variant (지금은 공용 char-arm/char-leg에 tint만 적용해 재사용)

**코드/도형 대체**
- 방어구(Armor)는 이번 1차 시안 제외
- UI 전부 기존 code-based 유지
- 일반(non-boss) enemy는 더 이상 존재하지 않음 (2 스테이지 전부 보스) — 두 보스 모두 고유 얼굴·의상 적용

## 17. Asset Folder Structure
```
ragdoll-archer-quest/
  index.html
  ART_DIRECTION.md
  assets/
    characters/
    weapons/
```
최종 반영 시 base64 inline 또는 (실패 시) 기존 Phaser Graphics 도형으로 fallback.

## 18. Common Image-Generation Prompt
```
2D casual mobile game asset,
optimized for a 16:9 iframe game screen,
rounded and chunky toy-figure silhouette,
clean readable shapes with thick soft outlines,
warm bright pastel color palette,
simple two-tone cel shading,
consistent soft lighting from the upper left,
side view, 2D game character asset,
polished but simple, limited detail,
high readability at small size,
isolated object, centered composition,
transparent background,
no text, no watermark, no logo,
lightweight game asset
```

## 19. Asset-Specific Image Prompts

**Character head**
```
[Common Style Prompt] +
a single round character head game asset, warm ivory skin tone,
simple dot eyes, subtle rosy cheeks, no hair detail needed,
front-facing readable side-view head shape,
game character part, isolated on transparent background
```

**Character torso**
```
[Common Style Prompt] +
a rounded capsule-shaped character torso game asset,
simple tunic shape, no team color baked in (will be tinted in-engine),
neutral warm base tone, side view,
game character part, isolated on transparent background
```

**Character arm (front, weapon-holding)**
```
[Common Style Prompt] +
a rounded chunky character arm holding a simple bow grip,
bent pose gripping a bow handle, side view,
game character limb part, isolated on transparent background
```

**Character arm (back, string-pulling)**
```
[Common Style Prompt] +
a rounded chunky character arm in a bowstring-pulling pose,
hand near the shoulder/chest as if drawing back a bowstring,
side view, game character limb part, isolated on transparent background
```

**Bow — idle (Worn Bow, gray tier)**
```
[Common Style Prompt] +
a small wooden toy-style recurve bow game asset, gently curved limbs,
worn plain wood texture, gray-toned grip wrap,
no arrow, unstrung look kept simple, side view,
core gameplay weapon asset, isolated on transparent background
```

**Bow — drawn (Worn Bow, gray tier, with nocked arrow)**
```
[Common Style Prompt] +
the same small wooden toy-style recurve bow, now drawn,
bowstring pulled back with a single short arrow nocked at the center,
visible arrowhead and fletching, side view,
core gameplay weapon asset, isolated on transparent background
```

**Boss head — Stage 2 final boss, "Dark Lord WOO"**
```
[Common Style Prompt] +
a stylized toy-figure character head game asset for a final boss character,
a slightly wider lower jaw and rounded chin, small narrow eyes,
thick black-framed glasses, short neat sporty buzz-style haircut,
warm ivory skin tone, calm confident expression,
game character head part, isolated on transparent background
```

**Boss torso — Stage 2 final boss, "Dark Lord WOO"**
```
[Common Style Prompt] +
a stylized toy-figure character torso game asset for a final boss character,
slightly shorter and sturdier build than other characters,
wearing a simple black t-shirt and blue jeans, side view,
game character torso part, isolated on transparent background
```

**Boss head — Stage 1 mid-boss, "The Conqueror LIM"**
```
[Common Style Prompt] +
a stylized toy-figure character head game asset for a mid-boss character,
an elongated face shape, small narrow eyes, no glasses,
short neat haircut, warm ivory skin tone, a subtle relaxed smile,
game character head part, isolated on transparent background
```

**Boss torso — Stage 1 mid-boss, "The Conqueror LIM"**
```
[Common Style Prompt] +
a stylized toy-figure character torso game asset for a mid-boss character,
a taller and slender build, wearing a rolled-sleeve collared shirt and slacks,
navy and gray tones, side view,
game character torso part, isolated on transparent background
```

## 20. Image Generation Order
1. **Bow idle + drawn (gray tier)** — 이번 요청의 핵심 연출(장전 노출) 검증 최우선
2. **Generic character 파츠 (head/torso/arm-front/arm-back/leg)** — 무기와 결합 확인, base rig 스타일 확정
3. **보스 head/torso (The Conqueror LIM → Dark Lord WOO 순)** — base rig 스타일이 확정된 뒤 얼굴·의상만 교체해 파생 생성
4. (승인 후) 등급별 무기 파생 3종
5. (후속) 배경·방어구

원칙: 핵심 asset(Bow, Character, Boss) 최대 2회 재생성 / 하나에 10분 이상 소요 시 즉시 스타일 단순화 / 반복 실패 시 기존 Phaser Graphics 도형 유지로 fallback.

## 21. Imagegen Skill Integration
imagegen 스킬 사용 가능 확인됨. 순서: (1) 위 asset 목록 제시 및 승인 (2) Bow idle/drawn부터 생성 (3) Common Style Prompt 동일 적용 (4) 결과가 게임 내 표시 시 실루엣만으로 식별 가능한지 확인 (5) 승인된 이미지만 최종 asset으로 채택.

## 22. Phaser 3 Implementation Rules (통합 시 적용 예정)
- base resolution 1280x720, Scale.FIT + CENTER_BOTH (기존 유지)
- 캐릭터 파츠는 현재 Matter body와 1:1 크기 매핑되는 텍스처로 교체 (Graphics 도형 → Image, 물리·충돌 로직은 변경 없음)
- 무기(Bow)는 팔(arm-front) 파츠의 자식처럼 매 프레임 위치·회전 동기화 (별도 Matter body 없이 순수 렌더링 오브젝트)
- drawn 상태 전환: `state==='AIMING' && isDragging` 일 때 bow 텍스처를 idle→drawn으로 스왑, 화살 노출 위치는 드래그 벡터에 따라 살짝 이동
- Tween: 발사 반동 Scale 1.0→1.08→1.0 (80ms), purple 등급 glow alpha 0.8↔1.0 (900ms loop)
- Depth order: 배경 < 다리 < 몸통 < back arm < bow < front arm < head (활이 앞팔과 뒤팔 사이에 오도록)
- texture smoothing off (선명한 clean silhouette 유지), Origin은 각 파츠의 관절 결합점 기준
- asset 로드 실패 시 기존 Phaser Graphics 도형으로 자동 fallback
- Stage 1/2 진입 시 boss별 텍스처 세트(The Conqueror LIM / Dark Lord WOO)를 로드 — 실제로는
  `createRagdoll()`이 아니라 `createSpriteCharacter()`가 `BOSSES` 테이블의 `key`(`lim`/`woo`)로
  텍스처를 스왑하는 방식으로 구현됨 (섹션 상단 구현 참고 노트 참조)

### 22-1. 플레이어 닉네임 직접 입력 — ✅ 구현 완료
`promptNickname()` (index.html)이 게임 종료(승리/사망) 시 HTML `<input>` 오버레이를 띄워 이름을
입력받고 `SAVE.nickname`에 저장, 로컬 리더보드에 그대로 표시된다. `defaultSave()`의
`Archer####` 자동 생성값은 입력을 건너뛰거나 비워둘 때의 기본값으로만 남아 있다.

## 23. Claude Code Asset Integration Rules (통합 시 적용 예정)
- 실제 workspace: `jamjam` repo root 확인 후 `ragdoll-archer-quest/` 안에서만 작업
- 기존 gameplay 로직(물리, 스테이지, 상점, 리더보드) 임의 변경 금지 — 렌더링 레이어만 교체
- 단일 `index.html` 제출이므로 이미지 asset은 base64 inline 처리
- 파츠 교체 후에도 라그돌 물리 반응(자세 회복, 넘어짐 등)이 기존과 동일하게 동작하는지 확인
- iframe 안에서 실제 표시 크기·조준 연출(화살 노출)이 의도대로 보이는지 테스트

## 24~28
이번은 5시간 게임잼 신규 제작이 아니라 **완성된 게임의 사후 아트 시안 단계**이므로 24(5시간 계획)·28(game-jam-mvp-director 연동)은 해당 없음. 25(축소 순서)·26(리스크)·27(QA 체크리스트)은 통합 단계에서 아래 요약 적용.

**축소 순서(시간 부족 시)**: 무기 등급 파생 3종 → drawn 상태 화살 별도 asset → arm-back 별도 파츠(간이 tween으로 대체) → 순으로 생략.

**리스크**: (1) transparent background edge 지저분 → 재생성 1회, 실패 시 Graphics 유지 (2) 캐릭터 파츠 결합부 어긋남 → Origin/anchor point 재조정 (3) 등급 발광이 과해 보임 → alpha 범위 축소.

**QA**: 작은 iframe에서도 무기 실루엣 식별 가능 / 드래그 중 화살 노출 명확 / 캐릭터 색이 배경과 명확히 구분 / 물리 반응(관절 회전) 이미지 교체 후에도 자연스러움.

## 29. Claude Code용 최종 아트 적용 프롬프트
> 시안(캐릭터·무기 이미지) 승인 후 확정. 현재는 섹션 16~19의 asset 목록·프롬프트까지가 이번 단계 산출물.
