/* =========================================================
   프로젝트 메타데이터
   - 새 프로젝트 추가: 이 파일에 객체 하나만 추가하면 됨 (코드 수정 불필요)
   - visibility: "public" 인 항목만 사이트에 노출
   - 수치·성과는 확인된 사실만 기입 (PRD §12.2)
   ========================================================= */

/* 스탯 카운터 (히어로 아래 숫자 띠)
   - "auto:projects" = 공개 프로젝트 수 자동 계산
   - "auto:live"     = 상태에 '운영'이 포함된 프로젝트 수 자동 계산 */
const STATS = [
  { value: "auto:projects", label: "제작한 프로젝트" },
  { value: 1000, label: "매뉴얼 진단 기관", suffix: "곳+" },
  { value: 11000, label: "누적 페이지 방문", suffix: "+" },
];

/* 프로젝트 썸네일 아이콘 (스크린샷 준비 전 임시) */
const ICONS = {
  clipboard:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v2H9z"/><path d="m9 13.5 2 2 4-4.5"/></svg>',
  trophy:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 4h8v5a4 4 0 0 1-8 0V4Z"/><path d="M8 5H5a3 3 0 0 0 3 4"/><path d="M16 5h3a3 3 0 0 1-3 4"/><path d="M12 13v4"/><path d="M8 20h8"/></svg>',
  book:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 6c-2-1.4-4.5-2-8-2v14c3.5 0 6 .6 8 2 2-1.4 4.5-2 8-2V4c-3.5 0-6 .6-8 2Z"/><path d="M12 6v14"/></svg>',
  gamepad:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="8" width="18" height="9" rx="4.5"/><path d="M8 10.8v3.4M6.3 12.5h3.4"/><circle cx="15.6" cy="11.3" r="0.4" fill="currentColor"/><circle cx="17.8" cy="13.6" r="0.4" fill="currentColor"/></svg>',
  pen:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m4 20 3.5-1L19 7.5a2.1 2.1 0 0 0-3-3L4.5 16 4 20Z"/><path d="m13.5 6 3 3"/></svg>',
  hand:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 12V6a1.5 1.5 0 0 1 3 0v5"/><path d="M11 11V4.5a1.5 1.5 0 0 1 3 0V11"/><path d="M14 11V6a1.5 1.5 0 0 1 3 0v6"/><path d="M17 12v2.5A5.5 5.5 0 0 1 11.5 20h-.4A5.6 5.6 0 0 1 5.5 14.4V10a1.5 1.5 0 0 1 3 0v2"/></svg>',
  qr:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><path d="M14 14h3v3"/><path d="M20 14v6h-6"/></svg>',
  gradcap:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m3 9 9-4.5L21 9l-9 4.5L3 9Z"/><path d="M7 11.5V16c0 1.2 2.2 2.5 5 2.5s5-1.3 5-2.5v-4.5"/><path d="M21 9v5"/></svg>',
  utensils:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 3v6a2 2 0 0 0 4 0V3"/><path d="M7 11v10"/><path d="M17 3c-1.6 2-2.2 4-2.2 6a3 3 0 0 0 2.2 3v9"/></svg>',
  ball:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 8.4l2.7 2-1 3.2h-3.4l-1-3.2L12 8.4Z"/><path d="M12 8.4V4.4M14.7 10.4l3.6-1.2M13.7 13.6l2.3 3.1M10.3 13.6 8 16.7M9.3 10.4 5.7 9.2"/></svg>',
  apple:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 7.5c-1.5-1.9-4.1-2.1-5.6-.6C4.6 8.5 4.8 11.5 6 14.5c.8 2 2 4 3.5 4 .9 0 1.1-.5 2.5-.5s1.6.5 2.5.5c1.5 0 2.7-2 3.5-4 1.2-3 1.4-6-.4-7.6-1.5-1.4-4.1-1.3-5.6.6Z"/><path d="M12 7.5c0-1.6.6-2.9 2.2-3.6"/></svg>',
  dashboard:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="4" width="7" height="9" rx="1.2"/><rect x="4" y="16" width="7" height="4" rx="1.2"/><rect x="13" y="4" width="7" height="4" rx="1.2"/><rect x="13" y="11" width="7" height="9" rx="1.2"/></svg>',
  route:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="6" cy="19" r="2.2"/><circle cx="18" cy="5" r="2.2"/><path d="M8 19h6.5a3 3 0 0 0 0-6h-5a3 3 0 0 1 0-6H16"/></svg>',
  megaphone:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 11.5 18 5v14l-15-6.5v-1Z"/><path d="M3 11.5v2a2 2 0 0 0 2 2h1.5"/><path d="M7 15.5V19a1 1 0 0 0 1 1h1.5a1 1 0 0 0 1-1v-2.2"/><path d="M20.5 9.5a3 3 0 0 1 0 5"/></svg>',
  pin:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-6.5-5.4-6.5-10.5a6.5 6.5 0 0 1 13 0C18.5 15.6 12 21 12 21Z"/><circle cx="12" cy="10.5" r="2.4"/></svg>',
};

const SITE = {
  name: "이재중",
  tagline: "사람이 할 일에, 사람이 집중할 수 있도록.",
  subTagline: "반복되는 일은 자동화로 덜고, 현장에 필요한 서비스를 직접 만들어 운영합니다.",
  fields: ["디지털 전환", "서비스 기획", "AI 활용", "운영 자동화"],
  // 이메일은 스팸 수집 방지를 위해 분리 보관 후 JS로 조립
  emailUser: "client_first",
  emailDomain: "naver.com",
  updated: "2026-07-15",
};

const PROJECTS = [
  {
    slug: "yeolmae-apply",
    no: "01",
    icon: "clipboard",
    image: "assets/img/apply-dashboard-1.png",
    title: "열매똑똑 3차년도 신청·심사 시스템",
    summary: "참여기관 모집부터 서류·면접심사와 최종선정까지 연결한 통합 운영 시스템",
    links: [{ label: "라이브 보기", url: "https://3rd-apply.vercel.app/" }],
    period: "2026.06 – 2026.07",
    status: "운영",
    tier: "featured",
    category: ["운영 시스템", "디지털 전환"],
    role: ["기획", "개발", "운영"],
    tags: ["신청 시스템", "심사 평가", "PDF", "관리자 화면"],
    ai: ["OpenAI Codex", "Claude Code"],
    featuredStory: "2026년 6월 초기 버전에서 한 달 만에 실제 운영 수준으로 발전시킨 시스템입니다.",
    visibility: "public",
    metrics: [
      { value: "4,000+", label: "페이지 방문" },
      { value: "69곳", label: "신청 기관" },
      { value: "23곳", label: "최종 선정" },
    ],
    detail: {
      problem:
        "참여기관 모집과 심사가 서류·수기 중심으로 진행되어, 신청기관·운영자·심사위원 모두가 반복적인 확인과 취합 작업을 감당해야 했습니다. 신청 서류의 누락 확인, 심사 점수의 수기 합산, 단계별 안내가 모두 사람 손에 의존했습니다.",
      users: "신청기관 담당자, 사업 운영자, 서류심사위원, 면접심사위원",
      roles:
        "사업 담당자로서 전체 신청·심사 절차를 설계하고, 시스템을 직접 만들었으며, 실제 모집·심사 기간 동안 운영을 담당했습니다.",
      features: [
        "참여 단계 선택과 자가진단",
        "6단계 신청 절차와 증빙 업로드",
        "신청서 PDF 생성",
        "운영자용 관리자 화면",
        "서류심사(6명)·면접심사(4명) 평가와 심사위원 서명",
        "점수 보정과 최종선정 처리",
      ],
      process:
        "2026년 6월 초기 버전을 만들어 내부 검토를 거친 뒤, 7월 실제 모집·심사에 맞춰 운영 수준으로 다듬었습니다. 요구사항 정리와 구조 설계는 Codex로, 구현은 Claude Code로 진행하고, 매 단계 사람이 검증했습니다.",
      trial:
        "실제 운영 중 신청기관의 문의와 심사위원의 사용 흐름을 보며 안내 문구·입력 검증·평가 화면을 계속 조정했습니다.",
      result:
        "오프라인 서류 중심 절차를 신청부터 최종선정까지 온라인 흐름 하나로 연결했습니다. 69개 기관이 신청해 23개 기관이 최종 선정되었고, 서류심사 6명·면접심사 4명의 평가를 별도 심사 시스템으로 함께 운영했습니다.",
      stack: "웹 서비스, PDF 생성, 관리자 화면 / Codex(기획·PRD), Claude Code(구현)",
      gallery: [
        { src: "assets/img/apply-dashboard-1.png", caption: "운영자 대시보드 — 참여 단계·선호 플랫폼·디지털 전환 준비도 등 신청 현황 집계" },
        { src: "assets/img/apply-dashboard-2.png", caption: "운영자 대시보드 — 기관 규모·서류심사 상태·자치구별 신청 분포" },
      ],
      note: "대시보드는 개인 식별정보 없는 집계 화면입니다. 신청서 등 개인정보가 포함된 화면은 샘플 데이터로 교체 후 게시할 예정입니다.",
    },
  },
  {
    slug: "yeolmae-hackathon",
    no: "02",
    icon: "trophy",
    image: "assets/img/hackathon-archive.png",
    title: "열매똑똑 해커톤 허브",
    summary: "사회복지 현장의 문제 해결 과정을 기록하고 협업·심사·결과 아카이브까지 지원한 행사 플랫폼",
    links: [{ label: "라이브 보기", url: "https://hackathon.sasw.or.kr/" }],
    period: "2026",
    status: "운영 완료",
    tier: "featured",
    category: ["참여형 경험", "운영 시스템"],
    role: ["기획", "개발", "운영"],
    tags: ["행사 플랫폼", "협업 보드", "심사", "아카이브"],
    ai: ["Gemini", "Claude Code"],
    featuredStory: "협력 중심 진행 보드에서 실제 행사 운영 플랫폼으로 확장했습니다.",
    visibility: "public",
    metrics: [
      { value: "40곳", label: "참여 기관" },
      { value: "80건", label: "제출작" },
      { value: "2,000+", label: "페이지 방문" },
    ],
    detail: {
      problem:
        "해커톤 참가자들의 문제 해결 과정이 흩어진 문서와 메신저에 남아, 행사가 끝나면 과정과 결과가 함께 사라졌습니다. 심사 역시 별도 취합이 필요했습니다.",
      users: "해커톤 참가자, 행사 운영자, 심사위원, 결과물을 참고하려는 현장 관계자",
      roles: "행사 기획과 플랫폼 제작, 행사 기간 실시간 운영을 담당했습니다.",
      features: [
        "팀별 프로젝트 기록 공간",
        "Help·Insight 요청과 댓글 협업",
        "마감 관리",
        "심사위원 평가와 Gemini 보조 평가",
        "결과물·활동사진 아카이브",
      ],
      process:
        "협력 중심 진행 보드로 시작해, 행사 운영에 필요한 심사·마감·아카이브 기능을 붙여 실제 행사 플랫폼으로 확장했습니다.",
      trial:
        "행사 진행 중 참가자 피드백을 받아 운영 흐름을 조정했고, AI 보조 평가는 심사위원의 판단을 돕는 참고 자료로만 사용하도록 명확히 했습니다.",
      result:
        "40개 기관이 참여해 80건의 결과물이 제출되었고, 행사 종료 후에도 문제 해결 과정과 결과물이 아카이브로 남아 참가하지 않은 현장 관계자도 참고할 수 있게 되었습니다.",
      stack: "웹 플랫폼, 댓글·협업 기능 / Gemini(보조 심사), Claude Code(구현)",
      gallery: [
        { src: "assets/img/hackathon-archive.png", caption: "결과물 아카이브 — 40개 기관 80건의 제출작을 트랙별로 열람" },
        { src: "assets/img/hackathon-home.jpg", caption: "행사 홈 화면 — 열매똑똑 스마트워크 소개와 활동 아카이브" },
      ],
      note: "활동사진은 초상권·공개 가능 여부를 확인한 자료입니다.",
    },
  },
  {
    slug: "smartwork-manual",
    no: "03",
    icon: "book",
    image: "assets/img/how_to_use_manual.png",
    title: "스마트워크 디지털 전환 매뉴얼 웹서비스",
    summary: "377페이지 매뉴얼을 19문항 자가진단과 맞춤 페이지 추천이 가능한 웹 경험으로 재구성",
    links: [{ label: "라이브 보기", url: "https://howtousemanual.vercel.app/" }],
    period: "2026",
    status: "완료",
    tier: "featured",
    category: ["디지털 전환"],
    role: ["기획", "개발"],
    tags: ["자가진단", "매뉴얼", "PDF"],
    ai: ["OpenAI Codex", "Claude Code"],
    featuredStory: "읽는 문서를, 행동으로 연결되는 서비스로 바꿨습니다.",
    visibility: "public",
    metrics: [
      { value: "5,000+", label: "매뉴얼 조회" },
      { value: "2,000+", label: "다운로드" },
      { value: "1,000곳+", label: "진단 실시 기관" },
    ],
    detail: {
      problem:
        "377페이지 분량의 디지털 전환 매뉴얼은 내용이 충실했지만, 기관 실무자가 자신에게 필요한 부분을 찾아 실행으로 옮기기 어려웠습니다.",
      users: "사회복지기관 실무자와 관리자",
      roles: "매뉴얼 구조 분석과 진단 설계, 웹서비스 제작을 담당했습니다.",
      features: [
        "매뉴얼 구조 안내",
        "3단계 · 19문항 자가진단",
        "달성률과 우선과제 제시",
        "진단 결과 기반 매뉴얼 페이지 추천",
        "결과 PDF 다운로드",
      ],
      process:
        "매뉴얼 전체를 분석해 진단 문항으로 재구성하고, 기관별 진단 결과가 곧바로 '어느 페이지를 보면 되는지'로 이어지도록 설계했습니다.",
      trial:
        "문항 수를 늘리면 정확해지지만 응답 부담이 커지는 문제가 있어, 3단계 19문항으로 압축하는 균형점을 찾았습니다.",
      result:
        "377페이지 문서를 19문항 진단으로 압축해, 기관이 자기 상황에 맞는 과제와 페이지를 바로 찾을 수 있게 했습니다. 매뉴얼은 5,000회 이상 조회, 2,000회 이상 다운로드되었고 1,000곳이 넘는 기관이 자가진단을 이용했습니다.",
      stack: "웹 서비스, 진단 로직, PDF / Codex(기획), Claude Code(구현)",
      gallery: [
        { src: "assets/img/how_to_use_manual.png", caption: "매뉴얼 웹서비스 첫 화면 — 실천 챕터·단계·분량 요약과 자가진단 진입" },
        { src: "assets/img/manual.png", caption: "열매똑똑 스마트워크 디지털 전환 매뉴얼 표지" },
        { src: "assets/img/manual-briefing.jpg", caption: "3차년도 사업설명회 — 매뉴얼의 3단계(기반형·운영형·확장형) 진단 체계를 직접 소개" },
      ],
      note: null,
    },
  },
  {
    slug: "smartwork-rungame",
    no: "04",
    icon: "gamepad",
    image: "assets/img/rungame.png",
    title: "스마트워크 성과공유회 런게임",
    summary: "성과공유회 참여를 높이기 위해 제작한 모바일 런게임",
    period: "2026",
    status: "운영 완료",
    tier: "major",
    category: ["참여형 경험"],
    role: ["기획", "개발", "운영"],
    tags: ["모바일 게임", "행사 운영"],
    ai: ["Lovable"],
    featuredStory: null,
    visibility: "public",
    metrics: [{ value: "600+", label: "참여 플레이" }],
    links: [{ label: "라이브 보기", url: "https://dxevent.vercel.app" }],
    detail: {
      problem: "성과공유회 현장의 참여와 몰입을 높일 가벼운 장치가 필요했습니다.",
      users: "성과공유회 참석자",
      roles: "게임 기획과 제작, 행사 전·중·후 운영 조건 설계를 담당했습니다.",
      features: ["점프 조작 런게임", "점수·순위", "결과 공유", "이벤트 조건", "행사 종료 후 자유 플레이 전환"],
      process: "토스의 '산타 출근시키기' 같은 이벤트형 러너 게임을 참고해, 참여 자체가 재미가 되는 단순한 조작으로 설계했습니다. Lovable을 제작 환경으로 빠르게 만들고 행사 일정에 맞춰 기능을 조정했습니다.",
      trial:
        "행사 중에는 이벤트 참여를 위해 최소한의 정보를 받았지만, 행사 종료 후에는 개인정보를 수집하지 않는 자유 플레이 모드로 전환했습니다. 운영 단계에 따라 수집 방식을 바꾼 판단이 이 프로젝트의 핵심 경험입니다.",
      result: "600회가 넘는 플레이로 행사 현장의 참여 장치 역할을 했고, 종료 후에는 개인정보 수집 없는 형태로 전환해 마무리했습니다.",
      stack: "모바일 웹 게임 / Lovable(제작 환경)",
      gallery: [
        { src: "assets/img/rungame.png", caption: "이벤트 랜딩 — 참여 안내와 경품 조건" },
        { src: "assets/img/rungame-play.jpg", caption: "게임 플레이 — 장애물을 피하며 점수를 쌓는 러너 게임" },
        { src: "assets/img/rungame-reference.png", caption: "참고한 레퍼런스 — 토스 '산타 출근시키기' 이벤트 (직접 제작물이 아닌 기획 참고용)" },
      ],
      note: null,
    },
  },
  {
    slug: "ai-blog",
    no: "05",
    icon: "pen",
    title: "AI 블로그 작성 자동화",
    summary: "리서치·작성·검수 역할을 분리한 동네 콘텐츠 제작용 AI 에이전트 워크플로",
    period: "2026",
    status: "AI 실험",
    tier: "experiment",
    category: ["AI 실험"],
    role: ["기획", "개발"],
    tags: ["AI 에이전트", "콘텐츠 자동화"],
    ai: ["AI 에이전트 워크플로"],
    featuredStory: null,
    visibility: "public",
    metrics: [{ value: "4건", label: "발행 글" }],
    detail: {
      problem: "AI에게 글을 한 번에 요청하면 사실 확인과 문체가 흔들리는 문제가 있었습니다.",
      users: "동네 콘텐츠를 만드는 운영자(본인)",
      roles: "역할 분리형 워크플로 설계와 구현을 담당했습니다.",
      features: ["다중 출처 조사", "문체 가이드 적용", "검색 노출 기준 반영", "초안 작성", "최종 HTML 미리보기"],
      process:
        "리서치 → 작성 → 검수를 서로 다른 역할로 분리하고, 각 단계 사이에 검증 지점을 두는 구조로 설계했습니다.",
      trial: "단계를 나눌수록 품질은 올라가지만 속도가 느려져, 자동화할 단계와 사람이 볼 단계를 구분했습니다.",
      result: "한 번의 요청이 아니라 역할과 검증 단계를 설계하는 방식으로 AI 활용의 기준을 세웠습니다.",
      stack: "AI 에이전트 워크플로",
      note: null,
    },
  },
  {
    slug: "hangul-catch",
    no: "06",
    icon: "hand",
    image: "assets/img/hangul-catch-play.png",
    title: "한글 캐치",
    summary: "손을 오므리는 동작으로 한글 음절을 잡아 단어를 완성하는 아동용 교육 게임",
    links: [{ label: "라이브 보기", url: "https://hangeul-game-zeta.vercel.app/" }],
    period: "2026 –",
    status: "프로토타입",
    tier: "rnd",
    category: ["아이디어·R&D"],
    role: ["기획", "개발"],
    tags: ["교육 게임", "손동작 인식", "MediaPipe"],
    ai: ["MediaPipe"],
    featuredStory: null,
    visibility: "public",
    detail: {
      problem: "아동이 몸을 움직이며 한글을 익힐 수 있는 놀이형 학습 도구를 만들고 싶었습니다.",
      users: "한글을 배우는 아동과 보호자",
      roles: "콘셉트 기획부터 손동작 인식 프로토타입 구현까지 진행했습니다.",
      features: [
        "카메라로 손동작(손 오므리기)을 인식",
        "화면에 비친 손으로 한글 음절 타일을 잡아 단어 완성",
        "마우스·터치 대체 조작",
        "난이도 조절",
      ],
      process:
        "MediaPipe 기반 손 인식으로, 화면에 비친 손을 오므려 음절 타일을 잡는 방식을 동작하는 프로토타입으로 구현했습니다.",
      trial:
        "아동 대상인 만큼, 카메라 영상을 저장하지 않고 기기 안에서만 처리하는 보수적인 설계를 원칙으로 세웠습니다.",
      result: "설계에 그치지 않고 손동작으로 실제 플레이되는 프로토타입까지 만들었습니다.",
      stack: "웹, MediaPipe(손동작 인식)",
      gallery: [
        { src: "assets/img/hangul-catch-play.png", caption: "게임 플레이 — 손을 움직여 음절 타일을 잡아 단어를 완성" },
        { src: "assets/img/hangul-catch-camera.png", caption: "카메라 준비 화면 — 카메라 없이도 플레이할 수 있는 대체 조작 제공" },
      ],
      note: "개인 프로토타입 프로젝트이며, 카메라 영상은 저장하지 않고 기기 안에서만 처리합니다.",
    },
  },
  {
    slug: "attendance",
    no: "07",
    icon: "qr",
    image: "assets/img/attendance.png",
    title: "행사 QR 출석·명찰 자동화 시스템",
    summary: "행사 접수 데스크의 수기 확인·명찰 수작업을 QR 스캔과 자동 인쇄 한 흐름으로 연결한 현장 운영 시스템",
    links: [{ label: "라이브 보기", url: "https://attendance-brown-eight.vercel.app/" }],
    period: "2026.04 – 2026.07",
    status: "운영",
    tier: "major",
    category: ["운영 시스템", "디지털 전환"],
    role: ["기획", "개발", "운영"],
    tags: ["QR 출석", "명찰 인쇄", "전자서명", "출석부 PDF"],
    ai: ["Claude Code"],
    featuredStory: null,
    visibility: "public",
    metrics: [
      { value: "4회", label: "적용 행사" },
      { value: "156명", label: "최대 행사 규모" },
    ],
    detail: {
      problem:
        "오프라인 행사마다 접수 데스크에서 명단을 수기로 찾아 확인하고, 명찰을 미리 뽑아 정렬해 두고, 종이 출석부에 서명을 받는 반복 작업이 발생했습니다. 참석자가 몰리는 시간대에는 대기 줄이 길어지고, 행사장 인터넷이 불안정하면 절차 전체가 멈추는 문제도 있었습니다.",
      users: "행사 참가자(사회복지사), 접수 데스크 스태프, 행사 담당 관리자",
      roles:
        "행사 담당자로서 접수 흐름을 설계하고, 참가자용·스태프용 웹과 현장 인쇄 연동까지 직접 만들어 실제 행사에서 운영했습니다.",
      features: [
        "참가자 본인 확인 후 QR 발급 (동명이인 구분 포함)",
        "개인정보 수집·이용 고지와 전자 서명",
        "스태프 콘솔: QR 스캔 → 출석 처리 → 명찰 자동 인쇄",
        "카메라·블루투스 스캐너·수동 입력 등 현장 상황별 스캔 방식",
        "행사장 인터넷 장애를 대비한 오프라인 캐시 설계",
        "서명이 들어간 공식 출석부 인쇄·PDF 저장",
        "스프레드시트 기반 행사별 명단·참석률 관리 자동화",
      ],
      process:
        "클라우드 웹 서비스와 현장 라벨 프린터를 연결하는 구조를 만들고, 여러 행사를 하나의 시트로 병행 관리하도록 운영 도구를 함께 설계했습니다. 2026년 4월 초안부터 7월까지 실제 행사 운영에 맞춰 계속 다듬었습니다.",
      trial:
        "행사장마다 다른 조건(인터넷 품질, 스캐너 유무, 참석 규모)에 부딪히며 스캔 방식 다변화, 오프라인 사전 동기화, 명찰 재인쇄 같은 현장 대응 기능을 하나씩 추가했습니다.",
      result:
        "이름 확인부터 명찰 수령까지의 접수 절차를 스캔 한 번으로 줄였고, 출석 기록·서명·출석부 작성이 자동으로 연결되게 했습니다. 일회성 도구가 아니라 매 행사마다 계속 사용하는 상시 운영 시스템으로 자리 잡았습니다. 적용 행사 수 등 정량 성과는 공개 범위 확인 후 기재 예정입니다.",
      stack:
        "Next.js, TypeScript, Google Sheets·Drive 연동, 로컬 인쇄 브리지(Express), Apps Script 자동화 / Claude Code(구현)",
      gallery: [
        { src: "assets/img/attendance.png", caption: "참가자 본인 확인 화면 — 이름 입력 시 입장 QR 발급" },
        { src: "assets/img/attendance-guide.png", caption: "참가자·스태프 이용 안내 — 접수부터 명찰 출력까지의 현장 운영 흐름" },
      ],
      note: "화면 예시는 개인정보가 없는 안내·입력 화면이며, 실제 참가자 데이터는 포함하지 않았습니다.",
    },
  },
  {
    slug: "teams-training",
    no: "08",
    icon: "gradcap",
    image: "assets/img/teams-training.png",
    title: "Teams 자기주도 학습 앱",
    summary: "협회 직원의 Microsoft Teams 적응을 돕는 체크리스트형 셀프 학습 웹앱",
    links: [{ label: "라이브 보기", url: "https://teams-khaki.vercel.app/" }],
    period: "2026.05",
    status: "완료",
    tier: "minor",
    category: ["디지털 전환"],
    role: ["기획", "개발"],
    tags: ["온보딩 교육", "셀프 학습"],
    ai: ["Claude Code"],
    featuredStory: null,
    visibility: "public",
    detail: {
      problem:
        "조직에 협업 도구를 도입해도, 구성원마다 익숙해지는 속도가 달라 정착이 더뎠습니다. 일회성 교육이나 문서 배포만으로는 각자의 진도를 챙기기 어려웠습니다.",
      users: "Microsoft Teams를 새로 쓰게 된 협회 직원",
      roles: "학습 내용 구성과 앱 제작을 담당했습니다.",
      features: [
        "프로필 설정부터 자동화 맛보기까지 6개 학습 모듈",
        "모듈별 세부 체크리스트와 진도 표시",
        "브라우저에 학습 진행 상태 저장",
        "완료 시 축하 효과 등 가볍게 끝까지 가도록 돕는 장치",
      ],
      process:
        "강의식 교육 대신, 실무자가 자기 속도로 따라 할 수 있는 체크리스트형 셀프 학습으로 구성했습니다. 알림 설정·멘션·채널 전환처럼 실제 업무 습관을 바꾸는 항목을 중심에 뒀습니다.",
      trial:
        "기능 나열이 아니라 '이모지 반응은 최소한의 예의'처럼 조직 문화 관점의 안내를 함께 담아, 도구 사용법과 소통 방식이 같이 바뀌도록 했습니다.",
      result: "디지털 도구 도입 교육을 문서 배포가 아닌 셀프서비스 경험으로 바꾼 사례입니다.",
      stack: "React, Vite / Claude Code(구현)",
      note: null,
    },
  },
  {
    slug: "matzip",
    no: "09",
    icon: "utensils",
    image: "assets/img/matzip.png",
    title: "맛집 평점 보정 알고리즘 실험",
    summary: "부풀려진 평점과 관광객 함정을 걸러내는 통계 보정 알고리즘을 적용한 맛집 추천 웹앱 실험",
    links: [{ label: "라이브 보기", url: "https://matzip-coral.vercel.app/" }],
    period: "2026.03",
    status: "AI 실험",
    tier: "experiment",
    category: ["AI 실험", "아이디어·R&D"],
    role: ["기획", "개발"],
    tags: ["알고리즘", "데이터 보정", "지도 API"],
    ai: ["Lovable"],
    featuredStory: null,
    visibility: "public",
    detail: {
      problem:
        "지도 앱의 별점은 리뷰 수가 적으면 과대평가되고, 관광지 상권은 실제 만족도보다 높게 보이는 왜곡이 있습니다. 점수를 그대로 믿지 않고 보정해서 보여줄 수 없을까 하는 실험이었습니다.",
      users: "평점만 보고 식당을 고르기 불안한 일반 사용자(개인 실험)",
      roles: "알고리즘 설계와 앱 제작 전체를 진행했습니다.",
      features: [
        "지역·음식 키워드 검색과 실제 지도 데이터 연동",
        "베이즈 평균으로 리뷰 수가 적은 곳의 평점 과대평가 보정",
        "평점 분산과 현지인 지수를 반영한 자체 '진짜 점수' 산출",
        "선정 근거를 문장으로 설명해 주는 결과 카드",
        "정렬 옵션, 검색 히스토리, 로딩 스켈레톤 등 사용성 다듬기",
      ],
      process:
        "AI 앱 빌더(Lovable)로 뼈대를 빠르게 만들고, 핵심인 점수 보정 공식과 데이터 연동, 테스트는 직접 설계·구현했습니다. 이틀간의 집중 실험으로 완성했습니다.",
      trial:
        "같은 검색에서 점수가 매번 달라지는 문제를 결정론적 난수로 고정하고, 목업 데이터를 실제 API 연동으로 교체하면서 신뢰할 수 있는 실험으로 다듬었습니다.",
      result:
        "통계 보정이라는 아이디어를 이틀 만에 동작하는 서비스로 검증했습니다. 업무 밖 개인 실험이지만, 데이터를 그대로 믿지 않고 보정하는 관점은 사업 데이터 분석에도 이어집니다.",
      stack: "React, TypeScript, Tailwind, 지도 검색 API, Vitest·Playwright 테스트 / Lovable(제작 환경)",
      gallery: [
        { src: "assets/img/matzip.png", caption: "검색 첫 화면 — 지역·음식 키워드로 진짜 현지 맛집 검색" },
        { src: "assets/img/matzip-results.webp", caption: "분석 결과 — 베이즈 평균·현지인 지수로 보정한 자체 점수(Sopt)로 정렬" },
      ],
      note: "사회복지 사업과 무관한 개인 기술 실험 프로젝트입니다.",
    },
  },
  {
    slug: "shalom",
    no: "10",
    icon: "ball",
    image: "assets/img/shalom-network.png",
    title: "축구팀 데이터 분석 앱",
    summary: "동호회 축구팀의 경기 기록과 선수별 통계를 관리하고, AI로 경기 기록을 정리하는 취미 프로젝트",
    period: "2026",
    status: "개인 프로젝트",
    tier: "experiment",
    category: ["AI 실험", "아이디어·R&D"],
    role: ["기획", "개발"],
    tags: ["데이터 분석", "통계", "AI 파싱"],
    ai: ["Gemini"],
    featuredStory: null,
    visibility: "public",
    detail: {
      problem:
        "동호회 축구팀의 경기 결과와 선수 기록이 단톡방과 메모에 흩어져, 시즌이 지나면 누가 얼마나 뛰었고 어떤 흐름이었는지 남지 않았습니다.",
      users: "축구 동호회 운영진과 팀원(개인 취미 프로젝트)",
      roles: "직접 기획하고 만든 개인 프로젝트입니다.",
      features: [
        "경기 기록과 라인업 관리",
        "선수별 통계와 기록 페이지",
        "다음 경기 안내",
        "AI로 자유 형식 경기 기록을 구조화해 입력",
        "운영자 로그인과 관리자 화면",
      ],
      process:
        "경기가 끝나면 자유롭게 적은 기록을 AI가 선수·득점·라인업 형태로 정리해 저장하도록 만들어, 기록 입력 부담을 줄였습니다.",
      trial:
        "정형화되지 않은 텍스트를 일관된 데이터로 바꾸는 부분이 관건이라, AI 파싱 결과를 사람이 확인·수정하는 흐름을 함께 뒀습니다.",
      result: "취미로 만든 프로젝트지만, 흩어진 기록을 구조화된 데이터로 바꾸는 접근은 업무 데이터 정리와도 이어집니다.",
      stack: "Next.js, React, Google Sheets 연동, iron-session / Gemini(경기 기록 파싱)",
      gallery: [
        { src: "assets/img/shalom-network.png", caption: "선수 간 콤비 네트워크와 시즌 TOP5" },
        { src: "assets/img/shalom-analysis.png", caption: "시즌 폼 추이·쿼터별 득실·상대전적 팀 분석" },
      ],
      note: "취미로 만든 개인 프로젝트입니다. 선수 이름은 동호회 구성원 표기입니다.",
    },
  },
  {
    slug: "weight-rival",
    no: "11",
    icon: "apple",
    image: "assets/img/weight-rival.png",
    title: "식단·체중 일일 기록 앱",
    summary: "다이어트 식단과 체중을 매일 기록하고, 음식 사진으로 칼로리를 추정하며 경과를 시각화하는 취미 프로젝트",
    links: [{ label: "라이브 보기", url: "https://weight-rival.vercel.app/" }],
    period: "2026",
    status: "개인 프로젝트",
    tier: "experiment",
    category: ["AI 실험", "아이디어·R&D"],
    role: ["기획", "개발"],
    tags: ["일일 기록", "AI 이미지 인식", "데이터 시각화"],
    ai: ["Gemini"],
    featuredStory: null,
    visibility: "public",
    detail: {
      problem:
        "다이어트 기록은 매번 칼로리를 찾아 입력하는 일이 번거로워 며칠 만에 그만두기 쉽습니다. 기록을 최대한 가볍게 만들고 싶었습니다.",
      users: "식단·체중을 꾸준히 기록하려는 사용자(개인 취미 프로젝트)",
      roles: "직접 기획하고 만든 개인 프로젝트입니다.",
      features: [
        "식단·체중·물 섭취 일일 기록",
        "음식 사진을 찍으면 AI가 칼로리를 추정",
        "기간별 경과 리포트와 차트",
        "라이벌과 비교하며 동기를 유지하는 기능",
        "목표 설정과 히스토리",
      ],
      process:
        "입력 부담을 줄이는 것이 핵심이라, 사진 한 장으로 칼로리를 추정하고 차트로 흐름을 바로 보여주는 데 집중했습니다.",
      trial:
        "AI 칼로리 추정은 오차가 있어 정확한 수치보다 '꾸준한 흐름'을 보는 도구로 성격을 잡았습니다.",
      result: "취미 프로젝트지만, AI 이미지 인식과 데이터 시각화를 직접 다뤄 본 경험으로 이어졌습니다.",
      stack: "Next.js, React, Recharts, Google Sheets 연동 / Gemini(이미지 칼로리 추정)",
      note: "취미로 만든 개인 프로젝트입니다.",
    },
  },
  {
    slug: "data-center",
    no: "12",
    icon: "dashboard",
    image: "assets/img/datacenter-institution.png",
    title: "사업 운영 데이터 센터",
    summary: "강사·예약·일정·수료증·정산을 한곳에서 관리하는 사업 운영 통합 웹. 구축을 마치고 2026년 8월 운영 예정",
    links: [{ label: "데모 보기", url: "https://data-center-teal-chi.vercel.app/" }],
    period: "2026",
    status: "도입 예정",
    tier: "major",
    category: ["운영 시스템", "디지털 전환"],
    role: ["기획", "개발", "운영"],
    tags: ["업무 통합", "대시보드", "정산·증빙"],
    ai: ["Groq"],
    featuredStory: "여러 도구에 흩어진 사업 운영 업무를 하나의 웹으로 통합했습니다.",
    visibility: "public",
    detail: {
      problem:
        "사업 운영에 필요한 강사 관리, 예약, 일정, 수료증 발급, 영수증·수강료 정산이 여러 도구와 문서에 흩어져 있어, 같은 데이터를 반복해서 옮겨 적어야 했습니다.",
      users: "사업 운영 담당자와 관리자",
      roles:
        "사업 담당자로서 흩어진 업무 흐름을 하나의 시스템으로 설계하고, 로그인·권한과 개인정보 처리 방침까지 갖춰 직접 구축했습니다.",
      features: [
        "강사 등록·관리",
        "예약과 일정 관리",
        "수료증 발급",
        "영수증·일괄 영수증과 수강료 정산",
        "데이터 대시보드와 리포트, 기간 비교",
        "로그인·회원가입(권한 관리)과 개인정보 처리방침",
      ],
      process:
        "실제 사업에서 반복되던 업무를 모듈로 나눠 하나씩 웹으로 옮기고, 데이터를 한곳에 모아 대시보드로 보이도록 구성했습니다. 개인정보를 다루는 시스템이므로 접근 권한과 처리방침을 처음부터 설계에 포함했습니다.",
      trial:
        "여러 업무를 한 시스템에 담으면서도 화면이 복잡해지지 않도록, 자주 쓰는 흐름을 먼저 정리하고 나머지를 보조 메뉴로 배치했습니다.",
      result:
        "사업 운영 업무를 하나의 웹으로 통합해 구축을 마쳤고, 2026년 8월부터 실제 운영에 사용할 예정입니다.",
      stack:
        "Next.js, TypeScript, NextAuth(인증), Google Sheets 연동, Recharts / Groq(AI 보조)",
      gallery: [
        { src: "assets/img/datacenter-institution.png", caption: "참여 기관 화면 — 씨앗에서 열매까지 교육 이수 진행을 성장 단계로 표현" },
        { src: "assets/img/datacenter-instructor.png", caption: "강사 화면 — 출강 기록 입력과 가능 시간 등록" },
        { src: "assets/img/datacenter-admin.png", caption: "관리자 화면 — 기관 성장 현황과 승인 대기 관리" },
      ],
      note: "화면은 실제 데이터가 아닌 데모(샘플) 계정 기준이며, 2026년 8월부터 실제 운영에 사용할 예정입니다.",
    },
  },
  {
    slug: "road-runner",
    no: "13",
    icon: "route",
    image: "assets/img/road-runner-result.png",
    title: "달려라 하니 — 한강 러닝 코스 추천 앱",
    summary: "출발지와 거리를 정하면 실제 도로 기반 왕복·편도 러닝 코스를 자동 생성해 주는 취미 프로젝트",
    period: "2026.02",
    status: "개인 프로젝트",
    tier: "experiment",
    category: ["아이디어·R&D"],
    role: ["기획", "개발"],
    tags: ["지도", "경로 생성", "위치 기반"],
    ai: [],
    featuredStory: null,
    visibility: "public",
    links: [{ label: "라이브 보기", url: "https://running-theta-three.vercel.app/" }],
    detail: {
      problem:
        "달릴 때마다 '오늘은 어디를, 몇 km 뛰지?'를 정하는 게 번거로웠습니다. 지도를 보며 즉흥적으로 도는 대신, 원하는 거리에 맞는 코스를 바로 받고 싶었습니다.",
      users: "러닝 코스를 정하기 번거로운 사람(개인 취미 프로젝트)",
      roles: "직접 기획하고 만든 개인 프로젝트입니다.",
      features: [
        "출발지와 거리를 정하면 실제 도로 기반 코스 자동 생성",
        "현재 위치(GPS) 또는 지도에서 직접 출발지 선택",
        "왕복·편도 선택, 1~42km를 0.5km 단위로 조절",
        "광화문·여의도·반포 등 12개 프리셋 코스",
        "코스 저장·공유",
      ],
      process:
        "OSRM 경로 엔진으로 실제 도로를 따라가는 경로를 만들고, 목표 거리에 맞춰 반환점을 계산하는 로직을 직접 구성했습니다. 지도는 Leaflet, 코스 저장은 Google Apps Script로 연결했습니다.",
      trial:
        "목표 거리에 정확히 맞는 왕복 코스를 만들려면 반환점을 어디에 둘지가 관건이라, 경로 재요청과 보정 로직을 다듬었습니다.",
      result: "취미 프로젝트지만 지도·경로 API와 위치 기반 로직을 직접 다뤄 실제 동작하는 서비스로 배포했습니다.",
      stack: "React, Vite, Leaflet, OSRM(경로), Google Apps Script(저장)",
      gallery: [
        { src: "assets/img/road-runner-result.png", caption: "생성된 러닝 코스 — 실제 도로를 따라 만든 왕복 경로" },
        { src: "assets/img/road-runner.png", caption: "이용 가이드 — 모드 선택부터 코스 생성·공유까지 5단계 안내" },
      ],
      note: "취미로 만든 개인 프로젝트입니다.",
    },
  },
  {
    slug: "welfare-content",
    no: "14",
    icon: "megaphone",
    image: "assets/img/welfare-elder.jpg",
    title: "사회복지 현장 콘텐츠·홍보 기획",
    summary: "복지관 후원 캠페인 영상과 어르신 영상 자서전 등 사회복지 현장의 이야기를 콘텐츠로 기획·제작",
    period: "2022 – 2023",
    status: "완료",
    tier: "minor",
    category: ["콘텐츠·홍보"],
    role: ["기획", "제작"],
    tags: ["영상 기획", "후원 캠페인", "홍보 콘텐츠"],
    ai: [],
    featuredStory: null,
    visibility: "public",
    detail: {
      problem:
        "복지관의 사업과 후원은 취지가 좋아도 현장 밖으로는 잘 전달되지 않았습니다. 딱딱한 안내문 대신, 사람의 이야기로 전하고 싶었습니다.",
      users: "지역 주민, 후원자, 복지관을 이용하는 어르신",
      roles: "콘텐츠 기획부터 촬영·편집까지 담당했습니다.",
      features: [
        "여름김장 후원 캠페인 영상 시리즈 — 후원 참여로 연결",
        "어르신 영상 자서전 '삶의 지혜를 나눠요' 인터뷰 시리즈",
        "'배달의 서사협' 등 현장 활동 기록 영상",
      ],
      process:
        "통계나 공지가 아니라 어르신 한 분 한 분의 이야기와 현장의 장면을 담는 방식으로 접근했습니다. 후원 캠페인은 '무엇을 도와달라'가 아니라 '왜 함께하면 좋은지'를 이야기로 풀었습니다.",
      trial:
        "조회수 자체보다 후원·참여 같은 실제 행동으로 이어지는지를 기준으로 삼았습니다.",
      result:
        "후원 캠페인 영상은 실제 후원 참여로 이어졌고, 어르신 영상 자서전은 지역과 세대를 잇는 기록으로 남았습니다. '콘텐츠로 사람을 움직인' 이 경험이, 지금은 서비스를 만드는 일로 이어지고 있습니다.",
      stack: "영상 기획·촬영·편집",
      gallery: [
        { src: "assets/img/welfare-elder.jpg", caption: "어르신 영상 자서전 '삶의 지혜를 나눠요' — 어르신 인터뷰 시리즈" },
        { src: "assets/img/welfare-kimchi.jpg", caption: "여름김장 후원 캠페인 영상 시리즈" },
      ],
      note: "성수종합사회복지관 재직 당시의 콘텐츠·홍보 활동입니다.",
    },
  },
  {
    slug: "ilsangdo",
    no: "15",
    icon: "pin",
    image: "assets/img/ilsangdo.jpg",
    title: "일상도 — 동네 로컬 큐레이션",
    summary: "내가 사는 동네 상도동을 직접 취재해 알리는 로컬 큐레이터 인스타그램 운영 (취미)",
    period: "2024 –",
    status: "개인 프로젝트",
    tier: "experiment",
    category: ["콘텐츠·홍보"],
    role: ["기획", "제작", "운영"],
    tags: ["로컬 큐레이션", "SNS 운영", "동네 콘텐츠"],
    ai: [],
    featuredStory: null,
    visibility: "public",
    detail: {
      problem:
        "오래 산 동네인데도 좋은 가게와 이야기가 잘 알려지지 않았습니다. 내가 아는 동네를 애정을 담아 제대로 소개하고 싶었습니다.",
      users: "상도동 주민과 동네에 관심 있는 사람들",
      roles: "취재·촬영·편집·운영을 혼자 합니다.",
      features: [
        "동네 가게·장소를 직접 다녀와 만든 큐레이션 콘텐츠",
        "테마 기행(#상도테마기행) 기획",
        "지역 기획전 '켜켜이 상도동' 참여",
      ],
      process:
        "슬로건 '우리 동네 상도동을 더욱 알차게, 더욱 딥하게'로, 광고가 아니라 애정으로 동네를 기록합니다.",
      trial: "꾸준함이 관건이라, 무리한 편집보다 오래 이어갈 수 있는 제작 방식을 택했습니다.",
      result:
        "꾸준한 운영으로 조회와 팔로워가 쌓였고 지역 기획전에도 참여했습니다. 같은 동네를 향한 관심은 맛집 평점 보정 실험(matzip)으로도 이어졌습니다.",
      stack: "Instagram, 영상·이미지 제작",
      gallery: [
        { src: "assets/img/ilsangdo.jpg", caption: "일상도 피드 — 상도동 가게·장소 큐레이션" },
      ],
      note: "취미로 운영하는 개인 프로젝트입니다.",
    },
  },
];

/* AI 작업 방식 (§10.5) */
const AI_FLOW = [
  { step: "문제 발견", tool: "현장 경험", human: "무엇이 문제인지 정의" },
  { step: "탐색·비교", tool: "Gemini · GPT · Claude", human: "답변을 교차 확인" },
  { step: "구조화", tool: "OpenAI Codex", human: "요구사항과 PRD 확정" },
  { step: "제작", tool: "Claude Code · Codex · Antigravity", human: "결과 검증과 수정 판단" },
  { step: "업무 연결", tool: "AppSheet · Apps Script · Power Automate", human: "실제 업무 흐름에 맞게 조정" },
  { step: "확인·운영", tool: "Looker Studio", human: "최종 검증과 운영 책임" },
];
