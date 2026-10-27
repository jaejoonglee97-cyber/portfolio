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
  { value: 5000, label: "매뉴얼 조회", suffix: "+" },
  { value: 2000, label: "매뉴얼 다운로드", suffix: "+" },
  { value: 1000, label: "매뉴얼로 자가진단한 기관", suffix: "곳+" },
]

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
  sprout:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21v-8"/><path d="M12 13c0-3.3-2.7-6-6-6H4v1.5A5.5 5.5 0 0 0 9.5 14H12"/><path d="M12 13c0-3.3 2.7-6 6-6h2v1.2A5.8 5.8 0 0 1 14.2 14H12"/></svg>',
  chat:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v9a1.5 1.5 0 0 1-1.5 1.5H10l-4 4v-4h-.5A1.5 1.5 0 0 1 4 14.5v-9Z"/><path d="M8 8.5h8M8 11.5h5"/></svg>',
  bell:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15L6 16Z"/><path d="M10 20.5a2.2 2.2 0 0 0 4 0"/></svg>',
  flow:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.5" y="4" width="6" height="5" rx="1.2"/><rect x="14.5" y="4" width="6" height="5" rx="1.2"/><rect x="9" y="15" width="6" height="5" rx="1.2"/><path d="M6.5 9v2.5h11V9"/><path d="M12 11.5V15"/></svg>',
  calc:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="3" width="14" height="18" rx="2"/><rect x="8" y="6" width="8" height="3.5" rx="0.8"/><path d="M8.5 13h1M12 13h1M15 13h.5M8.5 16.5h1M12 16.5h1M15 16.5h.5"/></svg>',
  spark:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3.5l1.9 5.1 5.1 1.9-5.1 1.9L12 17.5l-1.9-5.1L5 10.5l5.1-1.9L12 3.5Z"/><path d="M18.5 16.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8Z"/></svg>',
  mail:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.5" y="5.5" width="17" height="13" rx="2"/><path d="m4 7 8 6 8-6"/></svg>',
  chart:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4v16h16"/><path d="M8 16v-4M12 16V8M16 16v-6"/></svg>',
};

const SITE = {
  name: "이재중",
  tagline: "사람이 할 일에, 사람이 집중할 수 있도록.",
  subTagline: "모집·선발, 계약·정산, 직원 교육처럼 조직을 받치는 일을 맡아 왔고, 반복되는 일은 Claude Code로 도구를 만들어 줄여 왔습니다.",
  fields: ["사업 운영", "모집·선발·계약", "조직문화·교육", "업무 자동화"],
  // 이메일은 스팸 수집 방지를 위해 분리 보관 후 JS로 조립
  emailUser: "client_first",
  emailDomain: "naver.com",
  updated: "2026-10-27",
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
    status: "운영 완료",
    tier: "featured",
    featuredRank: 1,
    category: ["운영 시스템", "디지털 전환"],
    role: ["기획", "개발", "운영"],
    tags: ["신청 시스템", "심사 평가", "PDF", "관리자 화면"],
    ai: ["OpenAI Codex", "Claude Code"],
    featuredStory: "공고부터 서류심사, 면접, 점수 보정, 최종 선정과 서명 평가표까지 — 선발의 전 과정을 한 흐름으로 만들어 직접 운영했습니다.",
    visibility: "public",
    metrics: [
      { value: "69곳", label: "신청 기관" },
      { value: "6명·4명", label: "서류·면접 심사위원" },
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
        "면접 조가 달라도 공정하게 비교하도록 심사위원별 점수를 표준화(Z점수)해 순위 산출",
        "심사위원 서명이 들어간 평가표 자동 작성(인쇄·PDF)",
        "최종선정 명단 반영과 단계별 현황 관리",
      ],
      process:
        "2026년 6월 초기 버전을 만들어 내부 검토를 거친 뒤, 7월 실제 모집·심사에 맞춰 운영 수준으로 다듬었습니다. 요구사항 정리와 구조 설계는 Codex로, 구현은 Claude Code로 진행하고, 매 단계 사람이 검증했습니다.",
      trial:
        "실제 운영 중 신청기관의 문의와 심사위원의 사용 흐름을 보며 안내 문구·입력 검증·평가 화면을 계속 조정했습니다.",
      result:
        "오프라인 서류 중심 절차를 신청부터 최종선정까지 온라인 흐름 하나로 연결했습니다. 69개 기관이 신청해 23개 기관이 최종 선정되었고, 서류심사 6명·면접심사 4명의 평가를 별도 심사 시스템으로 함께 운영했습니다.",
      alternatives:
        "신청 접수만 보면 설문 도구와 스프레드시트 조합으로도 가능했습니다. 다만 6단계 신청과 증빙 업로드, 심사위원 평가와 점수 보정까지 한 흐름으로 잇기는 어려워, 접수와 심사를 같은 시스템 안에 두는 쪽을 택했습니다. 심사를 기존 방식대로 대면 취합으로 남겨두는 선택도 있었지만, 그러면 점수 합산과 보정을 다시 수기로 해야 했습니다.",
      nextTime:
        "다음에는 신청 기관이 어느 문항에서 가장 많이 멈추는지를 초기에 확인하고 안내 문구를 먼저 준비하려 합니다. 이번에는 운영 중 문의를 받으면서 문구를 고쳤는데, 모집 전에 소수 기관과 미리 한 번 검토했다면 문의 자체를 줄일 수 있었을 것 같습니다.",
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
    tier: "major",
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
    tier: "major",
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
      alternatives:
        "매뉴얼을 그대로 두고 검색 기능만 붙이거나, 짧은 요약본을 따로 만드는 방법도 있었습니다. 다만 검색은 무엇을 찾아야 할지 이미 아는 사람에게만 유용하고, 요약본은 결국 또 하나의 읽어야 할 문서가 됩니다. 그래서 기관이 자기 상황을 진단하면 필요한 부분을 지목해 주는 방식을 택했습니다.",
      nextTime:
        "문항을 늘리기보다, 진단을 받은 기관이 실제로 어떤 과제를 먼저 실행했는지 확인해 문항과 추천 순서를 다시 다듬고 싶습니다. 지금은 진단까지는 이어졌지만 그 다음 실행을 따라가 보지는 못했습니다.",
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
    summary: "행사 접수 데스크의 수기 확인·명찰 수작업을 QR 스캔과 자동 인쇄, 태블릿 셀프 서명까지 연결한 현장 운영 시스템",
    links: [{ label: "라이브 보기", url: "https://attendance-brown-eight.vercel.app/" }],
    period: "2026.04 – 2026.07",
    status: "운영",
    tier: "major",
    category: ["운영 시스템", "디지털 전환"],
    role: ["기획", "개발", "운영"],
    tags: ["QR 출석", "명찰 인쇄", "전자서명", "출석부 PDF", "태블릿 키오스크"],
    ai: ["Claude Code"],
    featuredStory: null,
    visibility: "public",
    metrics: [
      { value: "4회", label: "적용 행사" },
      { value: "156명", label: "최대 행사 규모" },
      { value: "0.65초", label: "서명 체크인 처리 (3초→0.65초)" },
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
        "라벨프린터 없이도 동작하는 태블릿 셀프 서명 모드 — 명단에서 본인을 찾아 서명하면 바로 출석 처리",
        "태블릿 키오스크: 초성 검색, 현장 등록, 유휴 자동 복귀, 종료 시 PIN 재확인",
        "행사장 인터넷 장애를 대비한 오프라인 캐시 설계",
        "서명이 들어간 공식 출석부 인쇄·PDF 저장",
        "스프레드시트 기반 행사별 명단·참석률 관리 자동화",
      ],
      process:
        "클라우드 웹 서비스와 현장 라벨 프린터를 연결하는 구조를 만들고, 여러 행사를 하나의 시트로 병행 관리하도록 운영 도구를 함께 설계했습니다. 2026년 4월 초안부터 7월까지 실제 행사 운영에 맞춰 계속 다듬었고, 프린터가 없는 소규모 행사도 지원하도록 태블릿 셀프 서명 모드를 추가했습니다.",
      trial:
        "행사장마다 다른 조건(인터넷 품질, 스캐너 유무, 프린터 유무, 참석 규모)에 부딪히며 스캔 방식 다변화, 오프라인 사전 동기화, 명찰 재인쇄 같은 현장 대응 기능을 하나씩 추가했습니다. 서명 저장을 드라이브 업로드 대신 시트에 직접 기록하고 구글 인증 클라이언트를 재사용하도록 바꿔, 체크인 처리 시간을 3초에서 0.65초로 줄였습니다. 참석자가 만지는 태블릿에는 접수용 인증 토큰을 내려보내지 않도록 식별 방식을 분리해 보안도 함께 다졌습니다.",
      result:
        "이름 확인부터 명찰 수령까지의 접수 절차를 스캔 한 번으로 줄였고, 출석 기록·서명·출석부 작성이 자동으로 연결되게 했습니다. 프린터가 없는 현장은 태블릿 서명만으로 접수를 대체할 수 있게 되어 적용 가능한 행사 범위가 넓어졌습니다. 일회성 도구가 아니라 매 행사마다 계속 사용하는 상시 운영 시스템으로 자리 잡았습니다.",
      alternatives:
        "프린터가 없는 현장은 행사마다 프린터를 대여하거나 명찰을 미리 인쇄해 두는 방법으로도 대응할 수 있었습니다. 다만 두 방법 모두 준비 시간과 비용이 늘고, 당일 참석자 변경에 대응하기 어려워 태블릿 서명 쪽을 택했습니다. 서명 처리 속도도 처음에는 업로드를 비동기로 돌리는 방법을 생각했지만, 저장 위치를 드라이브에서 시트로 바꾸는 편이 구조가 단순하고 실패할 지점도 적었습니다.",
      nextTime:
        "다음에 현장에서 쓰는 도구를 만들 때는 인터넷 품질, 프린터·스캐너 유무처럼 장소마다 달라지는 조건을 먼저 목록으로 적어두고 시작하려 합니다. 이번에는 현장에서 문제를 만날 때마다 하나씩 대응했는데, 조건을 미리 정리하면 초기 구조를 더 단순하게 잡을 수 있을 것 같습니다.",
      stack:
        "Next.js, TypeScript, Google Sheets·Drive 연동, 로컬 인쇄 브리지(Express), Apps Script 자동화 / Claude Code(구현)",
      gallery: [
        { src: "assets/img/attendance.png", caption: "참가자 본인 확인 화면 — 이름 입력 시 입장 QR 발급" },
        { src: "assets/img/attendance-guide.png", caption: "참가자·스태프 이용 안내 — 접수부터 명찰 출력까지의 현장 운영 흐름" },
        { src: "assets/img/attendance-kiosk.png", caption: "태블릿 키오스크 진입 화면 — 라벨프린터 없이 셀프 서명으로 출석 처리" },
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
      alternatives:
        "같은 검색에서 점수가 흔들리는 문제는 결과를 서버에 저장해 두는 방식으로도 막을 수 있었습니다. 개인 실험이라 서버를 따로 두지 않기로 하고, 검색어를 시드로 삼아 매번 같은 값이 나오게 계산하는 방식으로 해결했습니다.",
      nextTime:
        "보정 공식의 가중치를 실제 방문 경험과 비교해 검증해 보고 싶습니다. 지금은 공식이 그럴듯하게 동작하는 수준까지만 확인했고, 그 결과가 실제로 더 나은 선택이었는지는 확인하지 못했습니다.",
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
    summary: "강사 배정·교육 예약부터 교육 평가·현장 모니터링·전자서명·정산까지, 사업의 전 주기를 한곳에서 운영하는 웹. 60여 명이 실제 사업 업무에 사용 중",
    links: [{ label: "바로가기", url: "https://data-center-teal-chi.vercel.app/" }],
    period: "2026.03 –",
    status: "운영",
    tier: "featured",
    featuredRank: 2,
    category: ["운영 시스템", "디지털 전환"],
    role: ["기획", "개발", "운영"],
    tags: ["업무 통합", "교육 평가", "현장 모니터링", "전자서명", "정산·증빙"],
    ai: ["Gemini 3.8"],
    featuredStory: "강사 배정과 계약 전자서명, 정산·증빙, 가입 승인과 권한 관리까지 — 60여 명이 실제 업무에 쓰는 운영 시스템을 직접 만들고, 지금도 운영하며 고치고 있습니다.",
    visibility: "public",
    metrics: [
      { value: "60여 명", label: "실제 사용자" },
      { value: "4주체", label: "관리자·기관·강사·배분기관이 함께 사용" },
      { value: "2026.08 –", label: "실사용 운영" },
    ],
    detail: {
      problem:
        "사업 운영에 필요한 강사 관리, 예약, 일정, 수료증 발급, 영수증·수강료 정산이 여러 도구와 문서에 흩어져 있어, 같은 데이터를 반복해서 옮겨 적어야 했습니다. 또한 기관을 지원하기 전에 현재 상태를 파악하고 담당자와 소통할 채널도 마땅치 않았습니다.",
      users: "사업 운영 담당자와 관리자, 참여 기관, 강사, 배분기관",
      roles:
        "사업 담당자로서 흩어진 업무 흐름을 하나의 시스템으로 설계하고, 로그인·권한과 개인정보 처리 방침까지 갖춰 직접 구축했습니다. 2026년 8월부터는 실제 사용자와 함께 운영하며 쓰는 과정에서 드러난 불편을 계속 고쳐 나가고 있습니다.",
      features: [
        "강사 등록·프로필, 기관별 강사 배정",
        "교육 예약·일정 — 중복 예약 방지, 가능 시간 일괄 등록, 일정 변경 요청과 메일 알림",
        "기관별 유형·목표 회기 수·급수(요금 등급) 관리, 아직 잡히지 않은 회기 확인",
        "기관 자가진단(사전 컨설팅)과 맞춤 결과 리포트",
        "회기 준비 — 기관의 요청과 강사의 답변을 한 화면에",
        "교육 평가와 평가 리포트",
        "현장 모니터링 일지 — 현장에서 작성해 바로 문서(.docx)로",
        "전자서명 — 협회 계약서 양식에 값과 서명을 넣고, 메일 링크로 로그인 없이 서명",
        "지원 패키지·추천 상품 안내와 지원 신청",
        "수료증·영수증·수강료 정산, 배분기관과 같은 증명서 공유",
        "회원 메시지(1:1·단체방·안 읽음 알림), 대시보드와 AI 리포트",
        "회원가입 승인, 권한 관리, 개인정보 처리방침",
      ],
      process:
        "실제 사업에서 반복되던 업무를 모듈로 나눠 하나씩 웹으로 옮기고, 데이터를 한곳에 모아 대시보드로 보이도록 구성했습니다. 실제 가입을 받기 시작한 8월에는 저장소를 Google Sheets에서 Supabase(Postgres)로 옮겼고, 이후 교육 평가·현장 모니터링·전자서명처럼 사업 후반부에 필요한 업무까지 차례로 붙여 사업의 전 주기를 한곳에서 다루게 됐습니다.",
      trial:
        "여러 업무를 한 시스템에 담으면서도 화면이 복잡해지지 않도록, 자주 쓰는 흐름을 먼저 정리하고 나머지를 보조 메뉴로 배치했습니다. 자가진단은 처음 15문항으로 설계했다가, 응답 부담과 데이터 활용성을 고려해 9개 문항으로 다시 단순화했습니다. 운영을 시작한 뒤에는 실제 사용자가 막히는 지점을 보며 고쳤습니다. 승인을 기다리지 않고 본인이 기록을 바로 고칠 수 있게 했고, 휴대폰에서도 설문 선택지를 누르기 쉽게 키웠으며, 모니터링 일지는 책상에서 다시 옮겨 쓰지 않고 현장에서 마무리하도록 바꿨습니다. 개인정보를 다루는 만큼, 새 테이블이 기본으로 열려 있지 않도록 접근 제한을 따로 챙기고 손글씨 서명 이미지가 링크만으로 노출되지 않도록 막았습니다.",
      result:
        "사업 운영 업무를 하나의 웹으로 통합했고, 2026년 8월부터 60여 명의 사용자가 실제 사업 업무에 쓰고 있습니다. 배분기관도 관리자와 같은 화면에서 증명서를 확인합니다.",
      alternatives:
        "자가진단은 문항 수를 유지하면서 여러 단계로 나눠 보여주는 방법도 검토했습니다. 다만 화면을 나누는 것보다 응답할 항목 자체를 줄이는 편이 참여에 더 직접적이라 판단해 9문항으로 정리했습니다. 업무별로 설문 도구·예약 도구·정산 시트를 따로 쓰는 방법도 가능했지만, 결국 데이터가 다시 흩어지는 문제가 반복될 것 같아 한 시스템으로 모았습니다. 지원 신청서는 모두 웹 입력 화면으로 바꾸는 대신, 기관이 쓰던 워드 양식은 그대로 두고 화면은 진행 상황을 확인하는 용도로 나눴습니다. 전자서명은 처음에 외부 전자서명 서비스(eformsign)를 붙였지만, 이용 비용이 부담이 되어 협회 계약서 양식에 맞춘 자체 서명 기능으로 바꿨습니다.",
      nextTime:
        "기능을 더 붙이기 전에, 실제 사용자가 어느 화면에서 멈추는지 먼저 확인하려 합니다. 이번에는 필요해 보이는 기능을 먼저 만들고 나중에 단순화했는데, 순서를 바꾸면 만들지 않아도 될 기능을 미리 걸러낼 수 있을 것 같습니다.",
      stack:
        "Next.js, TypeScript, NextAuth(인증), Prisma + Supabase(Postgres), 메일 발송, Recharts / Gemini 3.8(AI 보조·리포트)",
      gallery: [
        { src: "assets/img/datacenter-institution.png", caption: "참여 기관 화면 — 씨앗에서 열매까지 교육 이수 진행을 성장 단계로 표현" },
        { src: "assets/img/datacenter-instructor.png", caption: "강사 화면 — 출강 기록 입력과 가능 시간 등록" },
        { src: "assets/img/datacenter-admin.png", caption: "관리자 화면 — 기관 성장 현황과 승인 대기 관리" },
        { src: "assets/img/datacenter-login.png", caption: "실제 가입 시작 후의 로그인 화면 — 상단 메뉴에 기관진단·메시지 기능 추가" },
      ],
      note: "화면은 실제 데이터가 아닌 데모(샘플) 계정 또는 빈 상태 기준입니다.",
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
  {
    slug: "smartwork-program",
    no: "16",
    icon: "sprout",
    image: "assets/img/manual-briefing.jpg",
    cardImage: "assets/img/record/956491.jpg",
    title: "열매똑똑 스마트워크 사업 운영",
    summary: "사회복지 현장의 디지털 전환 3개년 사업을 담당자로서 운영 — 참여기관 모집·심사부터 맞춤형 컨설팅, 성과 확산까지",
    links: [
      { label: "3차년도 사업설명회 영상", url: "https://www.youtube.com/watch?v=zg2N22GUVvw" },
      { label: "언론 인터뷰 (웰페어이슈)", url: "http://www.welfareissue.com/news/articleView.html?idxno=15285", type: "repo" },
      { label: "1차년도 성과자료집", url: "https://sasw.or.kr/notice/870882", type: "repo" },
      { label: "사업 안내 사이트", url: "https://sites.google.com/sasw.or.kr/smart-work002", type: "repo" },
    ],
    period: "2024.07 –",
    status: "운영",
    tier: "major",
    category: ["사업 운영", "디지털 전환"],
    role: ["기획", "운영"],
    tags: ["사업 기획·운영", "참여기관 심사", "컨설팅 운영", "성과 확산"],
    ai: [],
    featuredStory:
      'Smart work 3개년 사업 담당자로 일하며, 사업에 필요한 <a href="project.html?slug=yeolmae-apply">신청·심사 시스템</a>, <a href="project.html?slug=smartwork-manual">매뉴얼 웹서비스</a>, <a href="project.html?slug=yeolmae-hackathon">해커톤 허브</a>를 직접 만들었습니다.',
    visibility: "public",
    metrics: [
      { value: "3개년", label: "사업 담당 · 2024.07 –" },
      { value: "112·96·69곳", label: "1·2·3차년도 신청 기관" },
      { value: "19·20·23곳", label: "참여 기관 (3차년도는 선정)" },
    ],
    detail: {
      problem:
        "사회복지 현장에서 스마트워크의 필요성은 오래 이야기돼 왔지만, 번거롭다·담당할 인력이 없다·어렵다는 이유로 실제 도입은 더뎠습니다. 일회성 교육만으로는 기관이 일하는 방식이 바뀌지 않았습니다.",
      users: "서울 지역 사회복지기관과 실무자, 컨설팅을 맡은 강사",
      roles:
        "협회 사업 담당자로 참여기관 모집·심사, 강사 섭외와 강사 계약 체결, 참여기관 협약, 컨설팅 운영, 스마트워크 위원회 정기회의 운영, 성과공유와 확산을 맡았습니다. 실제 변화를 만든 것은 각 기관의 담당자들이고, 저는 그 과정이 굴러가도록 운영을 담당했습니다.",
      features: [
        "참여기관 공개 모집과 서류·면접 심사",
        "기관별 맞춤형 방문 컨설팅 (회기당 2시간, 기관당 평균 50시간)",
        "디지털 스터디 운영",
        "성과공유회 개최와 성과자료집 발간",
        "사업 안내 사이트 — 공지가 아니라 사업 방식을 미리 체험해 보는 형태로 제작",
        "우수 사례 발표자를 협회 보수교육 강사로 연결해 확산",
      ],
      process:
        "교육 한 번으로 끝나는 방식이 아니라, 강사가 기관을 직접 찾아가 그 기관의 구조와 흐름에 맞게 일하는 방식을 함께 다시 짜는 구조로 운영했습니다. 1차년도에는 112개 기관이 신청해 서류·면접 심사를 거쳐 20개 기관을 선정하고, 19개 기관이 약 1년간 실천을 이어갔습니다.",
      trial:
        "운영에서 가장 중요한 조건은 강사 확보였습니다. 스마트워크나 AI를 잘 아는 것보다, 사회복지 현장을 이해하고 사회복지사의 눈높이로 설명할 수 있는지가 만족도를 갈랐습니다. 언론 인터뷰에서도 이 점을 이렇게 말했습니다 — “기술은 어디서든 배울 수 있지만, 그 기술을 현장에 맞게 풀어내는 건 또 다른 역량이기 때문이다.”",
      result:
        "1차년도에 19개 기관이 클라우드 협업 도입, 종이 없는 사무실, 조직문화 변화 같은 변화를 만들었습니다. 사례를 발표한 실무자가 협회 보수교육 강사로 이어져, 변화가 한 기관에 머물지 않고 다른 기관으로 전달됐습니다. 사업은 2차년도(96곳 신청, 20곳 참여)와 3차년도(69곳 신청, 23곳 선정)로 이어졌고, 이 과정은 웰페어이슈 인터뷰로 외부에 기록됐습니다.",
      alternatives:
        "여러 기관을 한자리에 모아 집합 교육으로 진행하면 품이 훨씬 적게 듭니다. 다만 기관마다 구조와 준비도가 달라 같은 교육이 같은 결과로 이어지지 않았습니다. 그래서 강사가 기관을 찾아가는 맞춤 컨설팅을 택했고, 대신 강사 확보와 일정 조율에 운영 부담이 집중됐습니다.",
      nextTime:
        "담당자 한 사람에게 변화가 걸려 있으면 그분이 자리를 옮길 때 되돌아가기 쉽습니다. 다음에는 처음부터 기관 안에서 두 명 이상이 함께 참여하도록 조건을 두거나, 내부에 인계 기록을 남기는 것을 사업 설계에 포함하고 싶습니다.",
      stack:
        "사업 기획·운영, 참여기관 심사 설계, 컨설팅 운영, 강사 네트워크 / 안내 사이트는 AI·디지털 도구로 제작",
      note:
        "사업 성과는 참여기관과 강사, 협회가 함께 만든 것입니다. 이 페이지는 그중 제가 맡은 운영 역할을 정리한 기록입니다.",
    },
  },
  {
    slug: "chobani",
    no: "17",
    icon: "chat",
    thumbNote: "별도 웹 화면 없이 Microsoft Teams 채팅 안에서 동작합니다",
    title: "초안이 — 업무 초안 작성 에이전트",
    summary: "Teams 채팅으로 말을 걸면 이메일·카카오톡·공지문 초안을 바로 써 주는 업무용 AI 에이전트",
    period: "2026.09 –",
    status: "운영",
    tier: "major",
    category: ["운영 시스템", "디지털 전환"],
    role: ["기획", "개발"],
    tags: ["AI 에이전트", "Microsoft Teams", "글쓰기 보조"],
    ai: ["Claude API"],
    featuredStory: null,
    visibility: "public",
    detail: {
      problem:
        "협회 업무에는 회원이나 기관 담당자에게 보내는 이메일, 카카오톡, 공지문처럼 형식은 비슷하지만 매번 새로 써야 하는 글이 많습니다. 짧은 안내 하나에도 말투를 고르고 빠진 내용이 없는지 확인하는 데 시간이 들었습니다.",
      users: "협회 업무 담당자 (현재는 개인 업무용으로 사용)",
      roles: "기획부터 개발, Microsoft Teams 연동까지 직접 만들었습니다.",
      features: [
        "Teams 1:1 채팅에서 자연어로 요청 — 사용할 곳, 대상, 목적, 꼭 들어갈 내용, 말투",
        "추천 초안과 더 짧은 버전을 함께 제시",
        "핵심 정보가 빠졌을 때만 짧은 확인 질문을 최대 2개까지",
        "'더 짧게', '더 정중하게' 같은 후속 요청과 대화 초기화",
        "확인이 필요한 값은 [행사일]처럼 자리표시자로 남겨 사실을 지어내지 않음",
      ],
      process:
        "Microsoft Teams SDK의 봇 구조는 그대로 두고, 응답을 만드는 부분만 Claude API로 연결했습니다. Teams에 올리기 전에 초안 품질부터 확인할 수 있도록 터미널에서 바로 시험해 보는 실행 방식을 따로 만들었습니다.",
      trial:
        "입력한 내용이 외부 AI API로 전송되는 구조라 개인정보부터 설계했습니다. 메시지 본문과 사용자 이름은 로그에 남기지 않고, 대화 기록은 서버 메모리에만 두었다가 2시간이 지나면 지웁니다. 이용자 실명이나 연락처는 [이름] 같은 자리표시자로 쓰고, 완성된 초안에 직접 채워 넣도록 안내합니다.",
      result: "Microsoft Teams에 연동해 실제 업무 초안 작성에 쓰고 있습니다.",
      alternatives:
        "부족한 정보를 모델이 스스로 채워 넣게 하면 한 번에 완성된 글처럼 보이지만, 날짜나 담당자를 지어낼 위험이 있습니다. 그래서 확인이 필요한 값은 비워 두고, 정보가 너무 부족할 때만 짧게 되묻는 쪽을 택했습니다. 정보가 충분하면 되묻지 않고 바로 씁니다.",
      nextTime:
        "지금은 개인 업무용이라, 여러 사람이 함께 쓰게 된다면 개인정보 처리위탁과 국외이전 검토부터 거쳐야 합니다. 서버를 다시 켜면 대화 맥락이 사라지는 구조라, 함께 쓰는 단계에서는 이 부분도 다시 설계하려 합니다.",
      stack: "TypeScript, Microsoft Teams SDK, Claude Messages API",
      note: "개인 업무용으로 만든 에이전트입니다. 입력 내용이 외부 AI API로 전송되므로 개인정보는 넣지 않고 사용합니다.",
    },
  },
  {
    slug: "yeolttoki",
    no: "18",
    icon: "bell",
    thumbNote: "별도 웹 화면 없이 Microsoft Teams 채팅 안에서 동작합니다",
    title: "열똑이 — 강의 일정 자동 보고 에이전트",
    summary: "열매똑똑 사업의 오늘 강의 일정을 매일 아침 Teams로 알려 주는 에이전트. AI 없이 데이터에 있는 사실만 전달",
    period: "2026.09 –",
    status: "운영",
    tier: "major",
    category: ["운영 시스템", "디지털 전환"],
    role: ["기획", "개발"],
    tags: ["업무 자동화", "Microsoft Teams", "일정 알림"],
    ai: [],
    featuredStory: null,
    visibility: "public",
    detail: {
      problem:
        "찾아가는 교육이라 오늘 어느 기관에서 어떤 강의가 열리는지 확인하려면, 매번 데이터센터에 들어가 일정을 찾아봐야 했습니다.",
      users: "열매똑똑 사업 담당자",
      roles: "기획부터 개발, Microsoft Teams 연동까지 직접 만들었습니다.",
      features: [
        "'/오늘' 한마디로 오늘 강의를 시작 시간 순으로 보고",
        "'/구독'하면 매일 오전 9시 자동 보고",
        "확정된 교육만 안내하고, 강의가 없는 날은 없다고 분명히 알림",
        "사업 일정 데이터베이스를 읽기만 하는 구조",
      ],
      process:
        "초안이와 같은 저장소에서 코드를 공유하지만, Teams 앱과 인증 정보, 대화 맥락은 완전히 분리했습니다. 일정은 데이터센터의 교육 일정 데이터에서 보고에 필요한 열만 읽어 옵니다.",
      trial:
        "상태를 거를 때 '취소·반려를 빼는' 방식이 아니라 '확정만 포함하는' 방식으로 만들었습니다. 나중에 새로운 상태가 생겨도 확인되지 않은 일정이 조용히 섞여 나가지 않게 하기 위해서입니다. 날짜도 한국 시간 기준으로 비교해 자정 무렵에 하루가 밀리는 실수를 막았고, 구독 정보는 서버 외에는 읽을 수 없도록 접근을 닫아 두었습니다.",
      result: "매일 아침 따로 찾아보지 않아도 그날의 강의 일정을 Teams에서 받아 볼 수 있게 됐습니다.",
      alternatives:
        "초안이처럼 AI 모델을 거쳐 보고문을 만드는 방법도 있었습니다. 하지만 이 일은 데이터에 있는 사실을 그대로 전하는 일이라, 모델을 거치면 느려지고 없는 내용을 지어낼 위험만 생깁니다. 그래서 열똑이에는 AI를 쓰지 않았고, API 비용도 들지 않습니다.",
      nextTime:
        "지금은 제 컴퓨터에서 서버를 띄우는 구조라, 서버가 꺼져 있으면 그날 아침 보고가 빠집니다. 여러 사람이 의지하는 알림이 되려면 외부 서버로 옮기는 것부터 해야 합니다.",
      stack: "TypeScript, Microsoft Teams SDK, Supabase(읽기 전용) / AI 모델 사용하지 않음",
      note: "개인 업무용으로 만든 에이전트입니다.",
    },
  },
  {
    slug: "diagnosis-workflow",
    no: "19",
    icon: "flow",
    image: "assets/img/diagnosis.png",
    title: "사회복지현장 디지털전환 진단 시스템",
    summary: "10문항에 답하면 기관 수준 진단과 맞춤 커리큘럼이 바로 나오는 오픈소스 워크플로우. 다른 현장에 맞게 바꿔 쓰도록 AI 에이전트 스킬과 함께 공개",
    links: [
      { label: "라이브 보기", url: "https://diagnosis-workflow.vercel.app/" },
      { label: "GitHub 저장소", url: "https://github.com/jaejoonglee97-cyber/diagnosis-workflow", type: "repo" },
    ],
    period: "2026.08 –",
    status: "운영",
    tier: "major",
    category: ["디지털 전환", "운영 시스템"],
    role: ["기획", "개발"],
    tags: ["자가진단", "맞춤 커리큘럼", "오픈소스", "에이전트 스킬", "SOVAC 전시"],
    ai: ["Claude Code", "Claude 에이전트 스킬"],
    featuredStory: "SOVAC AX 기획전 「Impact Skill Hub」에 임팩트 생태계 실무자들의 AI 스킬 중 하나로 전시되었습니다.",
    visibility: "public",
    metrics: [
      { value: "10문항", label: "약 2분 자가진단" },
      { value: "10개 분야", label: "에이전트 스킬 적용 검증" },
      { value: "MIT", label: "오픈소스 공개" },
    ],
    detail: {
      problem:
        "디지털 전환이 필요하다는 건 알아도, 무엇부터 해야 할지 순서를 정하지 못해 미뤄 두는 기관이 많았습니다. 매뉴얼에는 서울 24개 기관이 직접 겪은 19개 챕터의 과정이 담겨 있었지만, 그중 우리 기관에 필요한 것을 골라 교육 순서로 엮는 일은 여전히 각 기관의 몫이었습니다.",
      users: "사회복지기관 실무자와 관리자, 그리고 이 진단을 자기 분야에 맞게 가져다 쓰려는 기관·중간지원조직·재단",
      roles: "진단 설계와 개발, 다른 현장용으로 바꿔 쓰는 에이전트 스킬 작성, SOVAC 전시 카드 원고 작성까지 맡았습니다.",
      features: [
        "10문항 3점 척도 자가진단 (약 2분, QR로 바로 접속)",
        "구간별 점수와 기관 수준 판정 — 앞 구간을 채워야 다음 구간으로 인정",
        "비어 있는 구간만 골라 회기 편성, 회기마다 학습목표·완료기준·매뉴얼 쪽수",
        "문항 조합으로 추론한 '지금 이런 일이 있을 겁니다' 안내 (규칙 기반)",
        "응답부터 판정, 회기 편성까지 계산 과정 전체 공개",
        "결과 전체 복사, 인쇄·PDF 저장",
        "디지털 전환·시설 안전점검·신입 온보딩, 세 가지 현장을 직접 눌러 보는 '가져다 쓰기' 화면",
        "다른 현장용 설정 파일을 AI가 대신 써 주는 Claude 에이전트 스킬, 자료 준비부터 QR 배포까지 6단계 안내",
      ],
      process:
        "매뉴얼 웹서비스의 19문항 진단이 '어느 쪽을 보면 되는지'까지였다면, 이번에는 '무엇을 몇 회기로 할지'까지 이어 보려 했습니다. 매뉴얼 PDF 전문을 파싱해 챕터를 회기 데이터로 만들고, 원본 19문항은 10문항으로 묶되 커리큘럼은 19개 챕터 전부에서 나오게 했습니다. 계산 로직과 현장 내용(문항·구간·회기·결과 문구)을 분리해, 내용 파일만 바꾸면 다른 분야에서도 그대로 돌아가도록 만들었습니다.",
      trial:
        "문항 조합 규칙을 10문항의 모든 응답 조합(59,049가지)에 돌려 보니, 보안 관련 안내가 3분의 2에서 떠 '우리 기관 얘기'라는 느낌이 사라졌습니다. 조건을 조여 가장 자주 뜨는 안내도 44% 이하로 낮추고, 걱정거리만 나란히 뜨지 않도록 잘하고 있는 점을 함께 보여 주게 했습니다. 매뉴얼 사례 기관의 이름은 화면에서 감추는 것만으로는 소스에 남아서, 데이터를 만드는 단계에서 아예 뺐습니다. 설정 검사도 처음에는 글자만 훑었다가 멀쩡한 결과를 실패로 세는 일이 생겨, 실제로 컴파일해서 확인하는 방식으로 바꿨습니다.",
      result:
        "SOVAC(소셜밸류커넥트) AX 기획전 「Impact Skill Hub」에 임팩트 생태계 실무자들의 AI 스킬 중 하나로 전시되었습니다. 시설 안전점검·인권점검·사례관리 등 10개 분야에 에이전트 스킬을 적용해 본 결과 10건 모두 공통 확인 항목 12개를 통과했고, 스킬 없이 만든 5건 중 2건은 아예 작동하지 않았습니다. 갈린 지점은 글솜씨가 아니라 '실제로 돌아가느냐'였습니다.",
      alternatives:
        "진단 결과를 AI가 문장으로 써 주게 하는 방법도 있었습니다. 하지만 진단은 같은 답에 늘 같은 결과가 나와야 믿을 수 있고, 응답이 외부로 나가지 않아야 개인정보 걱정 없이 쓸 수 있습니다. 그래서 진단 계산은 규칙 기반으로 브라우저 안에서 끝내고, AI는 이 워크플로우를 다른 현장용으로 바꾸는 일에만 쓰도록 나눴습니다. 결과를 보관하려고 계정이나 이메일을 받는 대신, 복사와 인쇄로 가져가게 한 것도 같은 이유입니다.",
      nextTime:
        "'교육 후 행정 시간이 줄었다' 같은 변화는 아직 사후 응답이 없어 말할 수 없습니다. 다음에는 진단을 설계할 때 교육 이후를 어떻게 확인할지도 처음부터 함께 설계하려 합니다.",
      stack: "Next.js, TypeScript, Tailwind, Zustand(응답은 메모리에만), 매뉴얼 PDF 파싱 스크립트, 설정 검증 스크립트 / Claude Code(구현), Claude 에이전트 스킬(다른 현장용 설정 생성)",
      gallery: [
        { src: "assets/img/diagnosis.png", caption: "첫 화면 — 자가진단, 기관 수준 진단, 맞춤 커리큘럼 설계로 이어지는 흐름" },
        { src: "assets/img/diagnosis-adopt.png", caption: "가져다 쓰기 — 현장을 고르면 문항과 커리큘럼이 통째로 바뀌는 것을 직접 체험" },
        { src: "assets/img/sovac-skillhub.webp", caption: "SOVAC AX 기획전 「Impact Skill Hub」 — 임팩트 생태계 실무자들의 AI 스킬 카드 전시" },
        { src: "assets/img/sovac-booth.webp", caption: "SOVAC 전시 전경" },
      ],
      note: "진단 응답은 저장되지 않으며, 매뉴얼 사례 기관의 이름은 싣지 않았습니다. 서울사회복지공동모금회의 지원으로 서울특별시사회복지사협회가 수행하는 「열매똑똑 Smart Work」 사업의 결과물입니다.",
    },
  },
  {
    slug: "career-calculator",
    no: "20",
    icon: "calc",
    image: "assets/img/career-calculator.png",
    title: "사회복지사 경력기간 계산기",
    summary: "전일제·유사경력(80%)·시간제 근무경력을 질문에 답하며 계산하는 호봉 산정 참고용 계산기",
    links: [{ label: "라이브 보기", url: "https://sasw-career-calculator.workspace-841411.chatgpt.site/" }],
    period: "2026.09",
    status: "AI 실험",
    tier: "experiment",
    category: ["AI 실험", "디지털 전환"],
    role: ["기획", "제작"],
    tags: ["경력 계산", "호봉 산정", "지침 검색"],
    ai: ["ChatGPT Sites"],
    featuredStory: null,
    visibility: "public",
    detail: {
      problem:
        "호봉 산정을 위한 경력 인정 기준은 서울시 처우개선 계획과 FAQ, 보건복지부 사회복지시설 관리안내에 나뉘어 있고, 전일제·유사경력(80%)·시간제마다 환산 방식이 달라 직접 계산하기 까다롭습니다.",
      users: "경력기간을 미리 확인해 보고 싶은 사회복지사, 호봉 산정을 검토하는 기관 담당자. 협회 회원광장에서 처우개선·경력 인정 문의에 답해 온 업무와 맞닿은 도구입니다.",
      roles: "계산 기준 정리와 화면 기획, 제작을 맡았습니다.",
      features: [
        "경력을 한 건씩 질문에 답하며 입력 — 적용 기준, 기관, 시작일, 마지막 인정일, 주당 근무시간",
        "경력별 원 근무기간·환산율·예상 인정기간과 합계",
        "기간이 겹치는 경력 확인",
        "인정기준 안내 검색 — 원문 자료 3종의 해당 쪽으로 바로 연결",
        "인쇄·PDF 저장",
      ],
      process:
        "새로 나온 ChatGPT Sites 기능으로 만들어 본 사이트입니다. 관리안내에 실린 날짜 계산과 80% 환산 예시를 계산 방식에 그대로 반영하고, 계산 결과마다 근거가 되는 지침 원문 쪽수를 붙였습니다.",
      trial:
        "실제 경과일 전체에 비율을 곱하면 지침의 계산 결과와 달라져서, 연·월·일에 각각 환산율을 적용하고 1일 미만은 버리는 지침의 방식을 따랐습니다. 계산기가 경력 인정 여부를 확정하는 것처럼 보이지 않도록, 참고용이며 기관의 검증이 필요하다는 점을 확인해야 시작할 수 있게 했습니다.",
      result: "입력한 경력은 서버에 저장하지 않고, 지침 원문과 함께 참고용 경력기간을 확인할 수 있게 했습니다.",
      nextTime:
        "80%와 시간제가 함께 적용되는 경우, 휴직 제외 기간, 군 경력 특별 규칙은 아직 지원하지 않습니다. 어떤 경우가 실제로 자주 필요한지 먼저 확인한 뒤 넓혀 가려 합니다.",
      stack: "ChatGPT Sites(제작·배포)",
      gallery: [
        { src: "assets/img/career-calculator.png", caption: "시작 화면 — 참고용 결과임을 확인한 뒤 계산 시작" },
      ],
      note: "참고용 계산 결과입니다. 경력 인정 여부와 호봉은 근무기관과 소관부서의 검증이 필요합니다.",
    },
  },
  {
    slug: "license-statistics",
    no: "21",
    icon: "chart",
    image: "assets/img/license-statistics.png",
    title: "사회복지사 자격증 발급현황 대시보드",
    summary: "서울 사회복지사 자격증·회원증 발급현황을 전년 같은 기간과 비교해 보여 주고, 회의에 바로 쓰는 A4 한 장 보고서로 뽑아 주는 대시보드",
    links: [
      { label: "라이브 보기", url: "https://sasw-statistics-restored.sasw-4929.chatgpt.site/" },
      { label: "지역 비교 예시 (서울·경기·부산)", url: "https://sasw-statistics-restored.sasw-4929.chatgpt.site/?view=focus&period=2026-09&metric=issuance&regions=%EA%B2%BD%EA%B8%B0%2C%EB%B6%80%EC%82%B0", type: "repo" },
    ],
    period: "2026.09 –",
    status: "AI 실험",
    tier: "experiment",
    category: ["AI 실험", "디지털 전환"],
    role: ["기획", "제작"],
    tags: ["통계", "대시보드", "보고서 자동화"],
    ai: ["ChatGPT Sites"],
    featuredStory: null,
    visibility: "public",
    detail: {
      problem:
        "사회복지사 자격증 발급현황은 표 형태의 자료로 나와서, 서울이 전국에서 어느 정도인지, 지난해 같은 때보다 늘었는지를 보려면 숫자를 직접 옮겨 비교해야 했습니다. 회의 자료로 쓰려면 그 결과를 다시 문서로 정리하는 일도 따로 필요했습니다.",
      users: "서울 사회복지사 현황이 궁금한 회원, 발급 통계를 보고하는 협회 담당자",
      roles: "보여 줄 지표 선정과 화면 기획, 제작을 맡았습니다.",
      features: [
        "핵심 지표 — 자격증 발급, 회원증 발급, 전국 대비 비중과 순위, 총 누적 발급",
        "전년 같은 기간·전년 말과 비교한 증감",
        "숫자를 자동으로 풀어 쓴 '세 문장으로 읽는 변화'",
        "회원증 발급·자격증 재발급의 월별 추이 — 올해와 지난해 같은 달을 한 그래프에",
        "지역별 맞춤 비교 — 서울을 기준으로 최대 3개 지역과 비교 항목을 골라 차이·전국 순위·비중을 표로",
        "고른 지역과 항목이 주소에 그대로 담겨, 링크만 보내면 같은 비교 화면이 열림",
        "제목·월별 항목·담당자 메모를 넣어 A4 한 장 보고서로 PDF 저장",
        "기존 상세 통계(연도별·전국 비교·원본 자료실)는 '전체 자료 살펴보기'로 연결",
      ],
      process:
        "ChatGPT Sites 기능으로 만든 대시보드입니다. 처음에는 서울 중심의 통계 화면이었고, 이후 '현황과 변화 · 지역별 비교 · 한 장 보고서' 세 화면으로 다시 구성했습니다. 기존 상세 통계 화면은 지우지 않고 아래쪽에 이어 두었습니다.",
      trial:
        "아직 한 해가 끝나지 않은 연도의 누계를 지난해 연간 자료와 나란히 두면 발급이 줄어든 것처럼 보입니다. 그래서 같은 기간끼리만 비교하고, 비교할 같은 기간 자료가 없으면 '같은 기간 비교 자료 없음'으로 표시했습니다. 발급 건수가 지금 일하는 사회복지사 수로 오해되지 않도록, 두 숫자가 다르다는 안내도 함께 두었습니다.",
      result: "발급 통계를 서울 중심으로 한 화면에서 살펴보고, 같은 내용을 회의용 한 장 보고서로 바로 뽑을 수 있게 했습니다.",
      stack: "ChatGPT Sites(제작·배포)",
      gallery: [
        { src: "assets/img/license-statistics-compare.jpg", caption: "지역별 맞춤 비교 — 서울 기준으로 경기·부산을 골라 발급 건수·차이·전국 순위·비중 비교" },
        { src: "assets/img/license-statistics.png", caption: "현황과 변화 — 자격증·회원증 발급, 전국 비중, 누적 발급과 세 문장 요약 (2026.09.30 기준)" },
        { src: "assets/img/license-statistics-report.png", caption: "한 장 보고서 — 제목·월별 항목·메모를 넣고 A4로 미리 본 뒤 PDF 저장" },
        { src: "assets/img/license-statistics-regions.png", caption: "상세 통계 · 전국 비교 — 17개 시도 발급 순위와 두 지역 등급별 비교" },
      ],
      note: "출처: 한국사회복지사협회 자격증 발급현황 (2026.09.30 기준). 자격증 발급 건수는 현재 근무 중인 사회복지사 수와 다릅니다.",
    },
  },
  {
    slug: "claude-manual",
    no: "22",
    icon: "gradcap",
    image: "assets/img/claude-manual.png",
    title: "서사협 클로드 사용 매뉴얼",
    summary: "코딩을 몰라도 10개 미션을 하나씩 깨며 클로드로 홍보 문자·안내 웹페이지·포스터·엑셀 집계를 직접 만들어 보는 실습형 매뉴얼",
    links: [
      { label: "라이브 보기", url: "https://claude-manual.vercel.app/" },
      { label: "GitHub 저장소", url: "https://github.com/jaejoonglee97-cyber/claude-manual", type: "repo" },
    ],
    period: "2026.10",
    status: "공개",
    tier: "featured",
    featuredRank: 3,
    category: ["디지털 전환", "참여형 경험"],
    role: ["기획", "제작"],
    tags: ["AI 교육", "실습 매뉴얼", "미션형 학습"],
    ai: ["Claude Code"],
    featuredStory: "협회 안의 클로드 유료 사용자들에게 공유한 실습 매뉴얼입니다. 마지막 단계는 Claude Code로 내 폴더의 엑셀 집계와 보고서를 자동화해 보는 미션입니다.",
    metrics: [
      { value: "10개", label: "단계별 실습 미션" },
      { value: "3단계", label: "채팅 → 아티팩트 → Claude Code" },
      { value: "협회 내부", label: "클로드 사용자에게 공유" },
    ],
    visibility: "public",
    detail: {
      problem:
        "클로드 기능을 설명하는 자료는 많지만, 코딩을 모르는 사회복지사가 실제 업무 결과물을 직접 만들어 보는 데까지 이어 주는 자료는 부족했습니다.",
      users: "협회 안에서 클로드 유료 요금제를 쓰지만 어떻게 활용할지 막막했던 사용자, 코딩 경험이 없는 사회복지사",
      roles: "미션 구성과 요청문 설계, 웹페이지 제작을 맡았습니다.",
      features: [
        "1층 채팅(미션 0~2) → 2층 아티팩트·디자인(3~5) → 3층 Claude Code(6~9)로 한 층씩 올라가는 10개 미션",
        "미션마다 복사해서 바로 쓰는 요청문, 확인 체크리스트, OX 퀴즈, 막혔을 때 보는 도움말",
        "홍보 문자, 감사 편지, 안내 웹페이지, 미니 게임, 포스터, 엑셀 집계 보고서 등 미션마다 작품 하나씩",
        "레벨·경험치·배지와 용어 도감으로 진행 상황 표시",
        "진행 상황은 보는 사람의 브라우저에만 저장 — 가입도 서버도 없음",
      ],
      process:
        "화면과 요금제 내용은 2026년 10월 기준 공식 문서(claude.com, support.claude.com, code.claude.com)를 확인해 맞췄습니다. 파일 하나(index.html)로 동작하게 만들어 링크로 열거나 내려받아 바로 쓸 수 있습니다.",
      trial:
        "첫 미션을 '안전 약속'으로 두어, 실제 이용자의 이름·연락처·상담 내용은 넣지 않고 가짜 정보로 연습하기로 약속하고 시작하게 했습니다. 요청문 예시도 모두 ○○복지관, 참가자01 같은 가짜 정보로 만들었습니다. 미리보기 창에서 미션 버튼이 동작하지 않던 문제는 공개 당일 고쳤습니다.",
      result: "협회 안의 클로드 유료 사용자들에게 공유했고, 요금제는 쓰고 있지만 무엇부터 해야 할지 막막했던 분들이 실제로 따라 하며 시작하는 데 많은 도움이 됐습니다.",
      alternatives:
        "기능을 하나씩 설명하는 문서나 영상 강의로 만들 수도 있었습니다. 다만 읽거나 보는 것만으로는 직접 써 보는 데까지 이어지기 어려워, 요청문을 복사해 결과물을 만들고 \"더 크게\", \"더 쉽게\"처럼 말로 고쳐 보는 미션 방식을 택했습니다.",
      nextTime:
        "클로드의 화면과 요금제는 계속 바뀝니다. 언제 기준으로 썼는지 밝혀 두었지만, 정기적으로 다시 확인하는 일정을 처음부터 정해 두려 합니다.",
      stack: "HTML·CSS·JavaScript 단일 파일, 브라우저 저장소(localStorage) / Claude Code(구현)",
      gallery: [
        { src: "assets/img/claude-manual.png", caption: "첫 화면 — 요청문 복사, 붙여넣기, 말로 고치기의 3단계" },
        { src: "assets/img/claude-manual-missions.png", caption: "미션마다 만드는 작품 10가지 — 채팅, 아티팩트·디자인, Claude Code 순서" },
      ],
      note: "요청문 예시는 모두 가짜 정보로 만들었습니다.",
    },
  },
  {
    slug: "webzine-editor",
    no: "23",
    icon: "mail",
    image: "assets/img/webzine-editor.jpg",
    title: "서사협 웹진 편집기",
    summary: "웹진 이미지를 올리면 Gemini가 링크 영역을 찾고, 협회 홈페이지에서 수집한 게시물 주소를 자동으로 연결해 웹·이메일용 HTML을 만드는 도구",
    links: [{ label: "GitHub 저장소", url: "https://github.com/jaejoonglee97-cyber/webzine", type: "repo" }],
    period: "2026.10 –",
    status: "운영",
    tier: "major",
    category: ["운영 시스템", "디지털 전환"],
    role: ["기획", "개발"],
    tags: ["업무 자동화", "이미지 분석", "링크 자동 연결", "이메일 HTML"],
    ai: ["Gemini", "Claude Code"],
    featuredStory: null,
    visibility: "public",
    detail: {
      problem:
        "정기 웹진을 보낼 때마다 Expression Web 4에서 이미지 위 클릭 영역을 하나씩 지정하고, 게시물 주소를 찾아 넣고, HTML을 직접 작성해야 했습니다.",
      users: "웹진을 만드는 협회 담당자, 웹진을 받아 보는 회원",
      roles: "기획과 개발을 맡았습니다.",
      features: [
        "3단계 — 이미지 올리기 → 주황색(확인 필요) 링크만 확인 → HTML 저장",
        "Gemini가 제목·버튼·SNS 영역을 찾고, 매달 같은 자리의 메뉴·SNS 영역은 지난 호에서 가져오기",
        "협회 홈페이지 게시판과 탐서클 강좌를 수집해 제목으로 게시물 자동 연결",
        "신청 버튼은 공지 글 본문에서 신청 주소를 찾아 추천",
        "저장할 때 연결한 링크가 실제로 열리는지 자동 확인",
        "웹 열람용·타스온 이메일용 HTML, 웹진 주소와 지난 웹진 모아보기 페이지",
      ],
      process:
        "망고보드·미리캔버스로 디자인한 이미지를 그대로 받아, 분석과 게시물 조회, 링크 연결이 보통 1분 안에 끝나도록 만들었습니다. 이메일용 HTML은 타스온 제작 가이드(표 배치, EUC-KR 발송, 이미지 용량 기준)에 맞췄습니다.",
      trial:
        "협회 홈페이지가 클라우드 서버의 접속을 막아(403) 게시물을 수집하지 못하는 문제가 있었습니다. 그래서 담당자 브라우저로 게시판 목록을 읽어 오는 즐겨찾기 버튼(수집 도우미)을 만들었습니다. Gemini 사용량 제한(429)이 자주 걸려, 잠시 쉬었다 이어 보내고 예비 모델로 넘어가는 처리도 넣었습니다. 로그인 기능은 담당자 요청으로 뺐습니다.",
      result: "실제 웹진 발송에 쓰기 시작했습니다. Expression Web 4에서 하던 클릭 영역 지정과 주소 입력, HTML 작성을 이미지 업로드와 링크 확인 두 단계로 줄였습니다.",
      alternatives:
        "AI가 이미지 속 문구를 보고 주소까지 직접 쓰게 하면 손은 덜 가지만, 없는 주소를 만들어 낼 위험이 있습니다. 그래서 연결 주소는 등록된 고정 링크, 실제로 수집한 게시물, 담당자가 입력한 주소에서만 나오게 했습니다. 제목이 거의 같고 후보가 하나뿐일 때만 자동으로 연결하고, AI의 판단은 'AI 추천' 표시로만 보여 줍니다.",
      nextTime:
        "실제 웹진 5호 이상의 정답 링크로 영역 인식과 자동 연결 정확도를 재고 기준을 조정하는 일이 남아 있습니다. 담당자 1~2명이 쓰는 기준이라 두 사람이 동시에 고치면 나중 저장만 남는 한계도 있어, 쓰는 사람이 늘면 저장 방식부터 바꿔야 합니다.",
      stack: "Node.js(Express 5), SQLite, sharp(이미지 조각), cheerio(게시판 수집), Vercel Blob / Gemini(영역 분석), Claude Code(구현)",
      gallery: [
        { src: "assets/img/webzine-editor.jpg", caption: "편집 화면(시연 모드) — 주황색 확인 필요 링크만 오른쪽 카드로 모아, 후보 글 중 하나를 고르게 함" },
        { src: "assets/img/webzine-dashboard.png", caption: "대시보드 — 이미지 올리기, 확인할 링크 수, 게시판별 수집 현황" },
      ],
      note: "화면은 시연 모드(공개된 정기웹진 415호 샘플)로 캡처했습니다. 협회 내부 업무 도구라 사용 주소는 공개하지 않습니다.",
    },
  },
  {
    slug: "grace-cookie",
    no: "24",
    icon: "sprout",
    image: "assets/img/grace-cookie.png",
    title: "오늘의 묵상쿠키 — Gemini Argon 테스트",
    summary: "새로 나온 Gemini Argon의 앱 제작 능력을 시험해 보려고 만든 웹앱. 포춘쿠키를 깨뜨려 그날의 말씀과 묵상을 열어 보고, 카드 이미지나 선물 링크로 나눌 수 있게 했습니다",
    links: [
      { label: "라이브 보기", url: "https://grace-cookie.vercel.app/" },
      { label: "GitHub 저장소", url: "https://github.com/jaejoonglee97-cyber/grace-cookie", type: "repo" },
    ],
    period: "2026.10",
    status: "AI 실험",
    tier: "experiment",
    category: ["AI 실험", "아이디어·R&D"],
    role: ["기획"],
    tags: ["AI 모델 테스트", "인터랙션", "모바일 웹앱"],
    ai: ["Gemini Argon"],
    featuredStory: null,
    visibility: "public",
    detail: {
      problem:
        "새로 나온 Gemini Argon이 기획서 한 장으로 어디까지 완성도 있는 앱을 만들어 내는지 직접 확인해 보고 싶었습니다. 글만 오가는 시험보다, 움직임·소리·이미지 저장·공유 링크가 함께 들어간 앱 하나를 맡겨 보는 쪽이 모델의 실력을 보기에 좋다고 생각했습니다.",
      users: "개인 실험 — 매일 짧은 묵상 글을 읽고 지인과 나누고 싶은 사용자를 가정",
      roles: "앱의 구성과 흐름을 기획서로 정리하고, Gemini Argon이 만든 결과를 확인하며 다듬었습니다.",
      features: [
        "포춘쿠키를 누르면 흔들리다 깨지는 움직임과 소리·진동, 말씀 쪽지가 펼쳐지는 화면",
        "30개 묵상 카드 — 앞면은 본문·해설·기도문, 뒷면은 원어 풀이와 오늘의 실천",
        "네 가지 맛(평안·새힘·지혜·사랑)별 분류, 모은 쿠키 도감과 검색",
        "카드 이미지 만들기(PNG 저장)와, 받는 사람이 직접 쿠키를 깨 보는 선물 링크",
        "가입 없이 기록은 브라우저에만 저장",
      ],
      process:
        "정보 구조와 기능 정의를 담은 기획서를 먼저 정리하고, 앱 전체를 Gemini Argon에 맡긴 뒤 결과를 보며 고쳤습니다. 파일 하나(index.html)로 동작합니다.",
      result:
        "모델 하나로 움직임·소리·이미지 생성·공유 링크까지 한 번에 동작하는 앱을 만들 수 있는지 확인했습니다. 업무 밖에서 새 AI 모델을 직접 써 보며 어디까지 맡길 수 있는지 가늠해 본 실험입니다.",
      stack: "HTML, Tailwind CSS, JavaScript, Canvas API(카드 이미지), Web Audio API(효과음), localStorage / Gemini Argon(제작)",
      gallery: [
        { src: "assets/img/grace-cookie.png", caption: "홈 화면 — 맛별 쿠키 고르기, 모은 쿠키 비율, 오늘의 쿠키" },
      ],
      note: "사회복지 업무와 무관한 개인 실험입니다. 새 AI 모델(Gemini Argon)의 앱 제작 능력을 시험하려고 만들었습니다.",
    },
  },
  {
    slug: "ai-between-us",
    no: "25",
    icon: "chat",
    image: "assets/img/ai-between-us.jpg",
    title: "AI와 우리 사이",
    summary: "AI를 두고 현장이 품는 질문 15개를 골라, 여러 필자의 관점과 조사 결과를 출처와 함께 이어 읽게 한 생각 아카이브",
    links: [{ label: "라이브 보기", url: "https://ai-between-us.sasw-4929.chatgpt.site/" }],
    period: "2026.10 –",
    status: "운영",
    tier: "major",
    category: ["콘텐츠·홍보", "디지털 전환"],
    role: ["기획", "편집", "제작"],
    tags: ["AI 리터러시", "콘텐츠 큐레이션", "출처 표기"],
    ai: ["ChatGPT Sites"],
    featuredStory: null,
    visibility: "public",
    metrics: [
      { value: "15개", label: "생각의 시작이 되는 질문" },
      { value: "62편", label: "함께 읽은 칼럼·연재·조사자료" },
      { value: "매월", label: "남긴 질문 검토 후 공개" },
    ],
    detail: {
      problem:
        "AI를 업무에 쓰기 시작하면서 '이 내용을 붙여넣어도 될까', 'AI가 틀리면 누가 책임질까' 같은 고민이 늘었지만, 그에 대한 좋은 글들은 여러 칼럼과 연재, 조사 보고서에 흩어져 있었습니다. 현장 실무자가 자기 고민에서 출발해 여러 관점을 차분히 읽어 볼 곳이 마땅치 않았습니다.",
      users: "AI를 쓰기 시작했거나 망설이고 있는 비영리·사회복지 현장 실무자",
      roles: "질문 선정과 자료 수집, 편집 원칙 설계, 사이트 제작을 맡은 개인 기획 프로젝트입니다.",
      features: [
        "일과 삶, 정보와 신뢰, 검증과 책임 등 15개 질문 — 질문을 골라 들어가는 방식",
        "질문마다 같은 흐름: 현장의 가상 장면 → 서로 다른 필자의 관점(편집 요약과 원문 링크) → 두 관점을 잇는 편집 해설 → 조사 결과 → 내게 남는 질문 → 이어지는 질문",
        "조사 결과에는 조사 대상·기간·방식·원문 쪽수와 해석의 한계를 함께 표시",
        "칼럼 46편, 협회 디지털 연재 9편, 교육 칼럼 6편, 조사 발표자료 1편의 출처 목록",
        "질문 남기기 — 익명으로 받아 매월 검토하고, 근거가 있을 때만 출처를 붙여 새 질문으로 공개",
        "질문 주소 복사로 공유, 계정 없이 읽기",
      ],
      process:
        "ChatGPT Sites로 만들었습니다. 먼저 칼럼과 연재, 조사 자료를 모아 읽고, 현장에서 실제로 자주 듣는 고민을 질문 15개로 추렸습니다. 그다음 질문마다 서로 다른 자리에서 본 관점 두 개를 골라 짧게 요약하고, 원문으로 바로 갈 수 있게 연결했습니다.",
      trial:
        "남의 글을 요약해 싣는 사이트라, 무엇이 원문이고 무엇이 편집인지부터 구분했습니다. 필자 관점은 직접 인용이 아니라 '편집 요약'으로 표시하고, 연구 결과는 조사 대상과 한계를 함께 적어 일반화되지 않게 했습니다. 현장 장면은 가상이라는 점을 밝히고, 검증되지 않은 숫자는 싣지 않았습니다. 방문 분석 도구도 쓰지 않습니다.",
      result: "AI를 둘러싼 막연한 고민을 질문 하나에서 시작해, 여러 관점과 근거를 따라 스스로 생각해 볼 수 있는 공간으로 공개했습니다.",
      alternatives:
        "질문을 입력하면 AI가 바로 답해 주는 챗봇으로 만드는 방법도 있었습니다. 하지만 그러면 근거 없는 답을 그럴듯하게 지어낼 위험이 있고, 이 사이트가 다루는 고민과도 맞지 않았습니다. 그래서 실제 원문에서 관점을 골라 잇는 방식으로 만들고, 원문에서 근거를 찾지 못한 질문은 답을 지어내지 않고 보류하기로 했습니다.",
      nextTime:
        "자료가 늘어나면 질문과 출처를 사람이 직접 관리하는 데 품이 많이 듭니다. 질문 남기기로 들어오는 고민이 쌓이면, 어떤 질문이 많이 들어오는지 보고 다음 질문을 고르는 기준부터 정리하려 합니다.",
      stack: "ChatGPT Sites(제작·배포) / 원문 출처 정리와 편집은 직접",
      gallery: [
        { src: "assets/img/ai-between-us.jpg", caption: "첫 화면 — 흐르는 질문 카드 중 마음에 걸리는 하나를 골라 들어감" },
        { src: "assets/img/ai-between-us-question.jpg", caption: "질문 페이지 — 현장의 가상 장면에서 시작해 서로 다른 관점으로 이어짐" },
        { src: "assets/img/ai-between-us-guestbook.jpg", caption: "질문 남기기 — 개인정보는 적지 않도록 안내하고, 검토 후 익명으로 공개" },
      ],
      note: "개인 기획 프로젝트로, 자료 제공기관의 공식 서비스가 아닙니다. 원문과 이미지의 권리는 각 권리자에게 있습니다.",
    },
  },
  {
    slug: "nihao-step",
    no: "26",
    icon: "book",
    image: "assets/img/nihao-step.jpg",
    title: "니하오 한 걸음 — 중국어 문장 놀이터",
    summary: "중국어 한 문장을 듣고, 맞추고, 단어를 바꿔 조립하며 익히는 개인 학습 앱",
    links: [{ label: "라이브 보기", url: "https://nihao-step.sasw-4929.chatgpt.site/" }],
    period: "2026.10",
    status: "개인 프로젝트",
    tier: "experiment",
    category: ["AI 실험"],
    role: ["기획", "제작"],
    tags: ["학습 앱", "반복 학습", "중국어"],
    ai: ["ChatGPT Sites"],
    featuredStory: null,
    visibility: "public",
    detail: {
      problem:
        "혼자 중국어를 공부하며 문장을 통째로 외우다 보니 금방 잊었습니다. 문장의 틀은 그대로 두고 단어만 바꿔 보며 반복하면 내 말처럼 남지 않을까 싶어, 공부하던 문장으로 직접 학습 앱을 만들어 보았습니다.",
      users: "중국어를 처음 배우는 나 자신(개인 학습용)",
      roles: "학습 흐름 설계와 문장 정리, 제작을 맡았습니다.",
      features: [
        "55과 137문장 — 첫 네 문장부터 길 찾기·식사·부탁까지 순서대로",
        "먼저 익혀요(듣기·천천히 듣기, 단어별 병음과 뜻) → 문장 조립하기 → 뜻 떠올리기",
        "문장 놀이터 — 같은 문장 틀에 단어를 바꿔 끼워 새 문장 만들기",
        "복습하기와 별표 문장 보관함",
        "연속 학습일·경험치·오늘의 작은 목표(10문제)와 오늘의 한 문장",
        "가입 없이 학습 기록은 브라우저에만 저장, 발음은 브라우저 음성으로 재생",
      ],
      process:
        "ChatGPT Sites로 만들었습니다. 공부하던 문장을 한자·병음·뜻·단어 단위로 정리해 넣고, 한 문장을 듣기 → 조립 → 뜻 떠올리기 순서로 여러 번 만나게 설계했습니다.",
      result: "매일 몇 분씩 한 문장이라도 다시 만나는 개인 학습 도구로 쓰고 있습니다. 업무 밖에서도 불편을 느끼면 작은 도구로 만들어 보는 습관을 보여 주는 실험입니다.",
      stack: "ChatGPT Sites(제작·배포), 브라우저 음성 합성, localStorage",
      gallery: [
        { src: "assets/img/nihao-step.jpg", caption: "학습 홈 — 오늘의 목표, 챕터 여정, 오늘의 한 문장" },
        { src: "assets/img/nihao-step-learn.jpg", caption: "먼저 익혀요 — 듣기·천천히 듣기와 단어별 병음·뜻" },
        { src: "assets/img/nihao-step-play.jpg", caption: "문장 놀이터 — 문장 틀은 두고 단어만 바꿔 새 문장 만들기" },
      ],
      note: "사회복지 업무와 무관한 개인 학습용 프로젝트입니다.",
    },
  },
];

/* AI 작업 방식 (§10.5) */
/* 강점 카드 — 태니지먼트 진단(2026.07) 대표 강점 + 프로젝트로 확인한 실무 강점 */
const STRENGTHS = [
  {
    kind: "대표 강점", ko: "창조·탐구", en: "Create · Explore", icon: "spark", theme: "gold",
    desc: "새롭게 제안하고(창조), 깊이 파고들어 해결하는(탐구) 사람이라는 진단 결과입니다.",
    chips: ["창의 · 정보수집", "양성 · 행동 · 비교 · 효율"], note: "새로운 길을 찾고",
    projects: [["진단 시스템", "diagnosis-workflow"], ["해커톤 허브", "yeolmae-hackathon"]],
  },
  {
    kind: "실무 강점", ko: "기획", en: "Plan", icon: "clipboard", theme: "blue",
    desc: "신청·심사, 매뉴얼, 데이터 센터까지 대부분의 프로젝트를 흐름부터 직접 설계했습니다.",
    chips: ["선발 절차 설계", "기준 정리"], note: "흐름부터 그리고",
    projects: [["신청·심사 시스템", "yeolmae-apply"], ["매뉴얼 웹서비스", "smartwork-manual"]],
  },
  {
    kind: "실무 강점", ko: "제작", en: "Build", icon: "pen", theme: "green",
    desc: "기획에 그치지 않고 20개의 업무 도구를 Claude Code 등으로 직접 만들었습니다.",
    chips: ["Claude Code", "업무 도구 20개"], note: "직접 만들고",
    projects: [["데이터 센터", "data-center"], ["웹진 편집기", "webzine-editor"]],
  },
  {
    kind: "실무 강점", ko: "운영", en: "Operate", icon: "dashboard", theme: "teal",
    desc: "만든 것을 실제 업무에서 계속 운영하고 고칩니다. 데이터 센터는 60여 명이 쓰고 있습니다.",
    chips: ["60여 명 실사용", "3개년 사업 운영"], note: "끝까지 돌보고",
    projects: [["데이터 센터", "data-center"], ["사업 운영", "smartwork-program"]],
  },
  {
    kind: "실무 강점", ko: "AI·자동화", en: "AI · Automation", icon: "flow", theme: "purple",
    desc: "AI에 맡길 일과 사람이 판단할 일을 나누고, 반복되는 일을 자동화합니다.",
    chips: ["Teams 에이전트", "AI 쓸 곳 가르기"], note: "반복은 맡기고",
    projects: [["초안이", "chobani"], ["열똑이", "yeolttoki"]],
  },
  {
    kind: "실무 강점", ko: "콘텐츠·사람", en: "Content · People", icon: "hand", theme: "pink",
    desc: "어려운 내용을 동료와 이용자가 이해하는 말로 옮깁니다. 실습 매뉴얼, 사내 강의, 영상 자서전.",
    chips: ["사내 강사", "실습 매뉴얼"], note: "사람의 말로",
    projects: [["클로드 사용 매뉴얼", "claude-manual"], ["콘텐츠·홍보 기획", "welfare-content"]],
  },
];

/* 해 온 일 — 평소 맡아 온 일을 네 가지로 묶고 근거 프로젝트를 연결 */
const FIT = [
  {
    area: "모집하고, 선발하고, 계약하는 일",
    items: [
      { text: "공고부터 서류심사(6명)·면접심사(4명), 점수 보정, 최종 선정까지 69곳의 선발 전 과정 운영", links: [["신청·심사 시스템", "yeolmae-apply"]] },
      { text: "강사 계약 체결과 참여기관 협약 진행, 협회 계약서 양식에 맞춘 전자서명 기능 제작", links: [["데이터 센터", "data-center"], ["사업 운영", "smartwork-program"]] },
    ],
  },
  {
    area: "기준을 세우고, 공정하게 적용하는 일",
    items: [
      { text: "협회 회원광장에서 처우개선·경력 인정 문의 응답", links: [] },
      { text: "전일제·유사경력(80%)·시간제 경력을 지침대로 환산하는 경력기간 계산기 제작", links: [["경력기간 계산기", "career-calculator"]] },
      { text: "면접 조가 달라도 공정하게 비교하도록 심사위원별 점수를 표준화해 순위 산출", links: [["신청·심사 시스템", "yeolmae-apply"]] },
    ],
  },
  {
    area: "조직 안에서, 함께 일하는 사람을 위한 일",
    items: [
      { text: "직원행복위원회에서 직원 의견을 모아 노사회의 진행", links: [] },
      { text: "스마트워크 위원회 정기회의 운영 — 조직의 '일하는 방식'을 바꾸는 사업을 3년째 담당", links: [["사업 운영", "smartwork-program"]] },
      { text: "사내 강사로 직원 교육 — 동료가 Teams에 스스로 적응하도록 만든 셀프 학습 앱, 협회 안의 클로드 사용자를 위한 실습 매뉴얼", links: [["Teams 학습 앱", "teams-training"], ["클로드 사용 매뉴얼", "claude-manual"]] },
      { text: "협약식·성과공유회·네트워킹 캠퍼스 등 행사 운영과 QR 출석 자동화", links: [["행사 QR 출석", "attendance"]] },
    ],
  },
  {
    area: "반복되는 일은 도구로",
    items: [
      { text: "Claude Code 등 AI 도구로 업무 도구를 직접 만들어 실제 업무에 사용 — 운영 시스템 사용자 60여 명", links: [["데이터 센터", "data-center"], ["웹진 편집기", "webzine-editor"]] },
      { text: "협회 메신저인 Microsoft Teams 안에서 동작하는 업무 에이전트를 직접 만들어 연결", links: [["초안이", "chobani"], ["열똑이", "yeolttoki"]] },
      { text: "사람의 정보는 가짜 정보로 먼저 시험하고, 접근 제한과 외부 전송 여부부터 확인", links: [["클로드 사용 매뉴얼", "claude-manual"]] },
    ],
  },
];

const AI_FLOW = [
  { step: "문제 발견", tool: "현장 경험", human: "무엇이 문제인지 정의" },
  { step: "탐색·비교", tool: "Gemini · GPT · Claude", human: "답변을 교차 확인" },
  { step: "구조화", tool: "OpenAI Codex", human: "요구사항과 PRD 확정" },
  { step: "AI 쓸 곳 가르기", tool: "규칙 기반 계산 · AI 모델", human: "사실 전달·판정은 AI 없이, 글쓰기·변환에만 AI" },
  { step: "제작", tool: "Claude Code · Codex · Antigravity · ChatGPT Sites", human: "결과 검증과 수정 판단" },
  { step: "데이터 저장", tool: "Google Sheets · Supabase · Firebase", human: "누가 어떤 정보를 볼 수 있는지, 접근 권한부터 설정" },
  { step: "업무 연결", tool: "AppSheet · Apps Script · Power Automate · Teams 에이전트", human: "실제 업무 흐름에 맞추고, 입력 정보가 어디로 가는지 확인" },
  { step: "확인·운영", tool: "GitHub · Vercel · 운영 대시보드", human: "배포 전 검증, 사용 현황 확인과 운영 책임" },
];

/* =========================================================
   현장 기록 — 영상·인터뷰, 활동 기록
   - MEDIA: 직접 발표하거나 인터뷰한 영상·기사 (새 영상은 여기에 한 줄 추가)
   - ACTIVITY: 협회 활동브리핑에 직접 작성한 열매똑똑 Smart work 기록
     (사진은 협회 게시글 원본, 사람 이름은 싣지 않음)
   ========================================================= */
const MEDIA = [
  {
    type: "영상",
    title: "열매똑똑 Smart work 3차년도 사업설명회",
    desc: "3차년도 사업 안내와 신청 방법, 매뉴얼 활용법을 발표했습니다.",
    source: "서울사회복지사 유튜브",
    date: "2026.06.16",
    length: "52분",
    url: "https://www.youtube.com/watch?v=zg2N22GUVvw",
    thumb: "assets/img/record/yt-zg2N22GUVvw.jpg",
  },
  {
    type: "영상",
    title: "열매똑똑 Smart Work 2차년도 성과공유회",
    desc: "2차년도 성과보고를 발표했습니다. 참여기관 사례 발표와 해커톤 결과물 발표·시상이 함께 진행됐습니다.",
    source: "서울사회복지사 유튜브",
    date: "2026.04.29",
    length: "4시간 35분",
    url: "https://www.youtube.com/watch?v=QN7K1fK5erQ",
    start: 1293,
    startLabel: "성과보고 00:21:33부터",
    thumb: "assets/img/record/yt-QN7K1fK5erQ.jpg",
  },
  {
    type: "영상",
    title: "열매똑똑 Smart Work 2차년도 사업설명회",
    desc: "2차년도 참여기관 모집을 앞두고 사업 내용과 참여 방법을 안내했습니다.",
    source: "서울사회복지사 유튜브",
    date: "2025.06.09",
    length: "2시간 28분",
    url: "https://www.youtube.com/watch?v=Rh2QPqPxWAU",
    thumb: "assets/img/record/yt-Rh2QPqPxWAU.jpg",
  },
  {
    type: "영상",
    title: "디지털전환, 우리도 할 수 있어 : 똑똑 Smart work 1차년도 성과공유회",
    desc: "1차년도 사업 성과보고와 행사 마무리를 맡았습니다.",
    source: "서울사회복지사 유튜브",
    date: "2025.05.13",
    length: "3시간 28분",
    url: "https://www.youtube.com/watch?v=8y5mCyu3ZOA",
    start: 2652,
    startLabel: "성과보고 00:44:12부터",
    thumb: "assets/img/record/yt-8y5mCyu3ZOA.jpg",
  },
  {
    type: "인터뷰",
    title: "사회복지 현장의 디지털 전환 향한 두드림, ‘사회복지사 의미 되찾는 사업’",
    desc: "행정을 줄여 ‘사람을 만나는 사회복지사로 돌아가기’를 이야기한 사업 담당자 인터뷰입니다.",
    source: "웰페어이슈",
    date: "2025.06.19",
    url: "http://www.welfareissue.com/news/articleView.html?idxno=15285",
  },
];

const ACTIVITY = [
  { date: "2026.08.19", id: "959573", title: "관리자 트레이닝 3·4회기", desc: "참여기관 사례발표와 함께, AI 시대에 사회복지현장이 바꿀 것과 지킬 것을 다뤘습니다." },
  { date: "2026.08.11", id: "958211", title: "관리자 트레이닝 1·2회기", desc: "디지털 전환 기조강연과 AI 워크숍으로 최고관리자의 역할을 함께 고민했습니다." },
  { date: "2026.08.06", id: "957297", title: "강사양성 워크숍", desc: "기초과정을 맡을 현장 강사를 12시간 과정으로 양성했습니다." },
  { date: "2026.08.01", id: "956491", title: "3차년도 참여기관 협약식", desc: "참여기관과 3차년도 추진 방향을 공유하고 협약을 맺었습니다." },
  { date: "2025.12.19", id: "908534", title: "지원기관 담당자 중간점검", desc: "2차년도 참여기관 20곳이 추진 현황을 직접 발표하고 서로 피드백했습니다." },
  { date: "2025.12.11", id: "905934", title: "오픈 캠퍼스 — Lovable 앱 개발 워크숍", desc: "현장의 문제를 사회복지사가 직접 도구로 만들어 보는 4시간 실습입니다." },
  { date: "2025.11.26", id: "901473", title: "오픈 캠퍼스 — 앱 개발 워크숍", desc: "사회복지사 약 70명과 AppSheet·바이브코딩을 이틀간 실습했습니다." },
  { date: "2025.10.30", id: "895635", title: "네트워킹 캠퍼스", desc: "참여기관 실무자들이 1박 2일 동안 직접 앱을 만들고 피드백을 나눴습니다." },
  { date: "2025.07.17", id: "879179", title: "2차년도 참여기관 협약식", desc: "20개 참여기관 최고관리자와 협약을 맺고 관리자 트레이닝을 시작했습니다." },
  { date: "2025.04.30", id: "865418", title: "분야별 사례발표 — 디지털 전환, 한 걸음 더 (2·3일차)", desc: "거주·직업훈련시설과 소규모 노인복지관의 디지털 전환 사례를 나눴습니다." },
  { date: "2025.04.24", id: "864467", title: "분야별 사례발표 — 디지털 전환, 한 걸음 더 (1일차)", desc: "실무자 50여 명과 종합·노인·장애인복지관의 사례를 나눴습니다." },
  { date: "2025.02.07", id: "791393", title: "구글워크스페이스 지원기관 담당자 교육", desc: "구글워크스페이스를 도입한 13개 기관 담당자와 전환 목표를 구체화했습니다." },
  { date: "2025.02.03", id: "789842", title: "M365 지원기관 담당자 교육", desc: "M365를 도입한 7개 기관이 현재와 목표(As-is·To-be)를 발표했습니다." },
  { date: "2024.08.16", id: "760018", title: "똑똑 Smart work 컨소시엄 협약식", desc: "협력기관들과 사회복지현장 디지털 전환을 함께 지원하기로 협약했습니다." },
];
