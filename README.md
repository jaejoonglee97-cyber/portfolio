# 이재중 포트폴리오 웹사이트

사회복지 현장의 디지털 전환·AI 활용 경험을 담은 프로젝트 아카이브형 포트폴리오.

> 핵심 메시지: **사람이 할 일에, 사람이 집중할 수 있도록.**

## 구조

빌드 도구 없는 순수 정적 사이트입니다. GitHub Pages에 그대로 배포할 수 있습니다.

```
Portfolio/
├─ index.html            # 홈 (소개·활동 흐름·대표 프로젝트·아카이브·AI 작업 방식·연락)
├─ project.html          # 프로젝트 상세 (?slug= 로 렌더)
├─ assets/
│  ├─ css/style.css      # Warm Editorial Archive 테마 (라이트/다크)
│  └─ js/
│     ├─ data.js         # ★ 프로젝트 메타데이터 (여기만 수정하면 됨)
│     ├─ main.js         # 홈 렌더·필터·테마
│     └─ project.js      # 상세 렌더
└─ README.md
```

## 프로젝트 추가 방법

`assets/js/data.js`의 `PROJECTS` 배열에 객체 하나를 추가하면 홈 아카이브·필터·상세 페이지에 자동 반영됩니다. 코드는 수정할 필요 없습니다.

- `visibility: "public"` 인 항목만 노출됩니다 (허용 목록 방식).
- `tier: "featured"` 는 대표 프로젝트 카드로 노출됩니다.
- 수치·성과는 확인된 사실만 기입합니다.

## 로컬에서 보기

브라우저에서 `index.html`을 직접 열거나:

```
python -m http.server 8000
# http://localhost:8000
```

## GitHub Pages 배포

1. GitHub 저장소 생성 후 이 폴더 전체를 push
2. Settings → Pages → Branch: `main`, 폴더 `/ (root)` 선택
3. 끝. (빌드 단계 없음)

## 공개 전 확인 (TODO)

- [~] 프로젝트 대표 화면 스크린샷
  - [x] 출석 시스템 / Teams 학습 / 맛집 실험 — 캡처 완료 (`assets/img/`, 개인정보 없는 화면만)
  - [ ] 열매똑똑 신청·심사 / 해커톤 / 매뉴얼 / 런게임 / AI블로그 / 한글캐치 — 소스·라이브 URL 확인 후 캡처 필요
  - 사용법: `data.js` 프로젝트에 `image: "assets/img/파일.png"` (카드+상세 대표) 또는 `gallery: [{src, caption}]` (상세 여러 장) 추가
- [ ] 이력서 PDF 추가 후 히어로 버튼 활성화 (`index.html`의 `aria-disabled` 버튼)
- [ ] 이메일 공개 여부 최종 확인 (`data.js`의 `emailUser`/`emailDomain`)
- [ ] 참여기관 수·심사 건수 등 공개 가능한 정량 성과 확인 후 `data.js` 상세에 반영
- [x] OG 대표 이미지 (`assets/og-image.png`) + 파비콘 (`assets/favicon.svg`) — 배포 후 og:image를 절대 URL로 변경
- [ ] 프로젝트 아이콘은 임시 — 실제 스크린샷 준비되면 교체
- [ ] 라이브 서비스 링크·저장소 공개 여부 확인 후 프로젝트 상세에 링크 추가

## 개인정보 원칙

- 전화번호·생년월일 등 개인 식별 정보는 게시하지 않습니다.
- 이메일은 스팸 수집 방지를 위해 JS로 조립해 표시합니다.
- 프로젝트 화면은 실데이터가 아닌 샘플 데이터 기준으로만 게시합니다.
- 이 사이트는 방문자 정보를 수집하지 않습니다 (폼·쿠키·분석 도구 없음).
