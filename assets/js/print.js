/* PDF 전용 문서: data.js 내용을 A4 가로 쪽으로 배치
   - 쪽마다 구성을 정해 빈 곳 없이 채움
   - 사진을 모두 불러온 뒤에 저장 버튼이 켜짐 (지연 로딩 때문에 사진이 빠지는 문제 방지) */
(function () {
  "use strict";

  var doc = document.getElementById("doc");
  var pub = PROJECTS.filter(function (p) { return p.visibility === "public"; });
  var bySlug = {};
  pub.forEach(function (p) { bySlug[p.slug] = p; });

  var base = SITE.siteUrl || (location.protocol.indexOf("http") === 0
    ? location.origin + location.pathname.replace(/print\.html$/, "") : "");
  var URL_ = base ? base.replace(/\/?$/, "/") : "";
  var URL_SHORT = URL_.replace(/^https?:\/\//, "").replace(/\/$/, "");
  var MAIL = SITE.emailUser + "@" + SITE.emailDomain;

  var pageNo = 0;
  function page(no, title, desc, body) {
    pageNo += 1;
    return '<section class="page">' +
      (title ? '<header class="p-head"><span class="no">' + no + "</span><h2>" + title + "</h2>" + (desc ? "<p>" + desc + "</p>" : "") + "</header>" : "") +
      '<div class="p-body">' + body + "</div>" +
      '<footer class="p-foot"><span>이재중 · 포트폴리오</span><span>' + String(pageNo).padStart(2, "0") + "</span></footer>" +
      "</section>";
  }
  function shot(src, cls) {
    return '<div class="shot ' + (cls || "") + '"><img src="' + src + '" alt="" /></div>';
  }
  function iconShot(p) {
    return '<div class="shot icon">' + (ICONS[p.icon] || "") + "<span>" + (p.thumbNote || "화면 없이 동작하는 도구") + "</span></div>";
  }
  function badge(st) {
    return '<span class="badge' + (st === "운영" ? " live" : "") + '">' + st + "</span>";
  }
  function host(u) { return u.replace(/^https?:\/\//, "").replace(/\/.*$/, ""); }

  var html = "";

  /* ---------- 1. 표지 ---------- */
  var statsHtml = STATS.map(function (s) {
    return "<div><b>" + Number(s.value).toLocaleString("ko-KR") + (s.suffix || "") + "</b><span>" + s.label + "</span></div>";
  }).join("");
  html += page("", "", "",
    '<div class="cover">' +
      '<div class="cover-left">' +
        '<p class="eyebrow">사회복지사 이재중 · 조직 운영 · 업무 자동화</p>' +
        '<h1>사람이 할 일에,<br /><span class="hl">사람이 집중</span>할 수 있도록.</h1>' +
        '<p class="sub">협회에서 사업을 운영하며 모집·선발, 계약·정산, 직원 교육처럼 조직을 받치는 일을 맡아 왔습니다. ' +
        "반복되는 일은 Claude Code로 도구를 만들어 줄이고, 동료가 자기 일에 집중할 수 있게 돕습니다.</p>" +
        '<div class="chips">' + SITE.fields.map(function (f) { return '<span class="chip">' + f + "</span>"; }).join("") + "</div>" +
        '<div class="hi">' +
          "<div><b>69곳</b><span>공고부터 서류·면접, 최종 선정까지 직접 운영한 선발 절차</span></div>" +
          "<div><b>60여 명</b><span>직접 만들어 지금도 운영하는 업무 시스템의 실제 사용자</span></div>" +
          "<div><b>3개년</b><span>모집·계약·정산·교육까지 맡아 온 디지털 전환 사업</span></div>" +
        "</div>" +
        '<dl class="who">' +
          "<dt>현재</dt><dd>서울특별시사회복지사협회 회원조직팀 · 사회복지사 (2024.07 –)</dd>" +
          "<dt>연락</dt><dd>" + MAIL + "</dd>" +
          (URL_SHORT ? "<dt>온라인</dt><dd>" + URL_SHORT + "</dd>" : "") +
        "</dl>" +
      "</div>" +
      '<div class="cover-right">' +
        '<div class="book-panel">' +
          '<div class="illo"><svg viewBox="0 0 400 430" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="펼쳐진 매뉴얼 위로 체크리스트·그래프·일정·대화 카드가 떠오르는 일러스트"><defs><linearGradient id="ilCover" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#10b981"/><stop offset="1" stop-color="#047857"/></linearGradient><linearGradient id="ilBar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#34d399"/><stop offset="1" stop-color="#059669"/></linearGradient><linearGradient id="ilGlow" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#a7f3d0" stop-opacity=".9"/><stop offset="1" stop-color="#a7f3d0" stop-opacity="0"/></linearGradient><filter id="ilSh" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="8" stdDeviation="9" flood-color="#0b3d2c" flood-opacity=".16"/></filter></defs><!-- 배경 --><circle cx="200" cy="235" r="168" fill="#d1fae5" opacity=".55"/><circle cx="322" cy="96" r="54" fill="#fef3c7" opacity=".75"/><circle cx="66" cy="300" r="26" fill="#ccfbf1" opacity=".9"/><!-- 책에서 올라오는 빛 --><path d="M120 268 L170 120 L232 120 L282 268 Z" fill="url(#ilGlow)" opacity=".55"/><!-- 연결선 --><g fill="none" stroke="#10b981" stroke-width="2" stroke-dasharray="3 6" stroke-linecap="round" opacity=".6"><path d="M200 262 C185 220 150 205 135 180"/><path d="M200 262 C215 210 255 190 280 158"/><path d="M200 262 C190 245 150 250 128 252"/><path d="M200 262 C230 248 270 252 298 238"/></g><!-- 펼친 책 --><g filter="url(#ilSh)"><path d="M46 284 Q123 256 200 284 Q277 256 354 284 L354 404 Q277 376 200 404 Q123 376 46 404 Z" fill="url(#ilCover)"/><path d="M58 272 Q129 248 200 272 L200 390 Q129 366 58 390 Z" fill="#ffffff"/><path d="M200 272 Q271 248 342 272 L342 390 Q271 366 200 390 Z" fill="#f7fcf9"/></g><path d="M200 272 L200 390" stroke="#cfe9dc" stroke-width="2"/><g stroke="#d6e9df" stroke-width="5" stroke-linecap="round"><path d="M78 290 Q112 279 146 288"/><path d="M78 306 Q118 294 176 304"/><path d="M78 322 Q112 311 160 320"/><path d="M78 338 Q118 326 180 336"/><path d="M78 354 Q105 345 132 352"/></g><g stroke-linecap="round" stroke-linejoin="round"><circle cx="226" cy="294" r="8" fill="#d1fae5"/><path d="M222 294 l3 3 6-6" stroke="#059669" stroke-width="2.4" fill="none"/><path d="M242 292 Q280 283 318 290" stroke="#d6e9df" stroke-width="5"/><circle cx="226" cy="320" r="8" fill="#d1fae5"/><path d="M222 320 l3 3 6-6" stroke="#059669" stroke-width="2.4" fill="none"/><path d="M242 318 Q272 310 304 316" stroke="#d6e9df" stroke-width="5"/><circle cx="226" cy="346" r="8" fill="#fef3c7"/><circle cx="226" cy="346" r="2.6" fill="#e9a93a"/><path d="M242 344 Q278 336 314 342" stroke="#d6e9df" stroke-width="5"/></g><!-- 카드: 체크리스트 --><g filter="url(#ilSh)"><rect x="56" y="96" width="126" height="92" rx="16" fill="#fff"/></g><rect x="56" y="96" width="126" height="22" rx="16" fill="#ecfdf5"/><rect x="56" y="106" width="126" height="12" fill="#ecfdf5"/><circle cx="72" cy="107" r="4" fill="#10b981"/><rect x="82" y="104" width="44" height="6" rx="3" fill="#a7d9c2"/><g stroke-linecap="round" stroke-linejoin="round"><rect x="68" y="128" width="13" height="13" rx="4" fill="#10b981"/><path d="M71.5 134.5 l2.5 2.5 4.5-5" stroke="#fff" stroke-width="2" fill="none"/><rect x="88" y="131" width="70" height="7" rx="3.5" fill="#e3efe8"/><rect x="68" y="150" width="13" height="13" rx="4" fill="#10b981"/><path d="M71.5 156.5 l2.5 2.5 4.5-5" stroke="#fff" stroke-width="2" fill="none"/><rect x="88" y="153" width="56" height="7" rx="3.5" fill="#e3efe8"/><rect x="68" y="172" width="13" height="13" rx="4" fill="none" stroke="#bfe3d1" stroke-width="2"/><rect x="88" y="175" width="64" height="7" rx="3.5" fill="#e3efe8"/></g><!-- 카드: 막대그래프 --><g filter="url(#ilSh)"><rect x="222" y="62" width="122" height="96" rx="16" fill="#fff"/></g><rect x="236" y="76" width="40" height="6" rx="3" fill="#a7d9c2"/><rect x="240" y="122" width="14" height="24" rx="4" fill="#bfeedd"/><rect x="262" y="108" width="14" height="38" rx="4" fill="#6ee7b7"/><rect x="284" y="96" width="14" height="50" rx="4" fill="url(#ilBar)"/><rect x="306" y="88" width="14" height="58" rx="4" fill="url(#ilBar)"/><path d="M236 148 H330" stroke="#e3efe8" stroke-width="2" stroke-linecap="round"/><path d="M244 116 L268 102 L290 92 L314 80" stroke="#e9a93a" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="314" cy="80" r="4" fill="#e9a93a"/><!-- 카드: 일정 --><g filter="url(#ilSh)"><rect x="84" y="206" width="78" height="66" rx="14" fill="#fff"/></g><path d="M84 220 a14 14 0 0 1 14 -14 h50 a14 14 0 0 1 14 14 v6 h-78 z" fill="#10b981"/><rect x="100" y="200" width="5" height="12" rx="2.5" fill="#047857"/><rect x="141" y="200" width="5" height="12" rx="2.5" fill="#047857"/><g fill="#e3efe8"><rect x="96" y="234" width="10" height="9" rx="2"/><rect x="112" y="234" width="10" height="9" rx="2"/><rect x="128" y="234" width="10" height="9" rx="2"/><rect x="144" y="234" width="10" height="9" rx="2"/><rect x="96" y="250" width="10" height="9" rx="2"/><rect x="112" y="250" width="10" height="9" rx="2"/><rect x="144" y="250" width="10" height="9" rx="2"/></g><circle cx="133" cy="254.5" r="8" fill="#e9a93a"/><path d="M129.5 254.5 l2.5 2.5 4.5-5" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><!-- 카드: 대화(사람) --><g filter="url(#ilSh)"><rect x="252" y="178" width="96" height="60" rx="16" fill="#fff"/></g><path d="M270 238 l-4 12 14 -12 z" fill="#fff"/><circle cx="276" cy="200" r="8" fill="#a7f3d0"/><path d="M264 222 a12 10 0 0 1 24 0 z" fill="#a7f3d0"/><circle cx="296" cy="198" r="9" fill="#34d399"/><path d="M283 222 a13 11 0 0 1 26 0 z" fill="#34d399"/><rect x="316" y="196" width="22" height="6" rx="3" fill="#e3efe8"/><rect x="316" y="208" width="16" height="6" rx="3" fill="#e3efe8"/><!-- 반짝임 --><g fill="#e9a93a"><path d="M196 54 l3.5 9.5 9.5 3.5 -9.5 3.5 -3.5 9.5 -3.5 -9.5 -9.5 -3.5 9.5 -3.5 z"/><path d="M364 168 l2.2 6 6 2.2 -6 2.2 -2.2 6 -2.2 -6 -6 -2.2 6 -2.2 z" opacity=".8"/><path d="M40 168 l2.2 6 6 2.2 -6 2.2 -2.2 6 -2.2 -6 -6 -2.2 6 -2.2 z" fill="#10b981" opacity=".7"/></g><circle cx="210" cy="190" r="3" fill="#10b981" opacity=".5"/><circle cx="188" cy="150" r="2.4" fill="#10b981" opacity=".45"/><circle cx="226" cy="230" r="2.2" fill="#e9a93a" opacity=".6"/></svg></div>' +
          '<div class="book-info"><div class="bt">' +
            '<p class="k">직접 펴낸 매뉴얼</p>' +
            "<h3>열매똑똑 스마트워크 디지털 전환 매뉴얼</h3>" +
            '<p class="book-meta">377쪽 · 2026.05 · 서울 24개 기관의 19개 실천 과정</p></div>' +
            '<div class="nums">' + statsHtml + "</div>" +
          "</div>" +
        "</div>" +
      "</div>" +
    "</div>");

  /* ---------- 2. 소개 · 경력 · 강점 ---------- */
  html += page("01", "소개", "",
    '<div class="about">' +
      '<div class="txt">' +
        '<p class="lead">사람을 돕는 일을 해 왔고, 이제는 함께 일하는 사람을 돕고 싶습니다.</p>' +
        "<p>서울특별시사회복지사협회에서 3개년 디지털 전환 사업을 맡아, 참여기관을 공개 모집해 서류·면접으로 선발하고, 강사와 계약하고, 기관과 협약을 맺고, 정산까지 사업의 한 해를 처음부터 끝까지 운영해 왔습니다.</p>" +
        "<p>조직 안의 일도 함께 맡았습니다. 직원행복위원회에서 직원 의견을 모아 노사회의를 진행했고, 스마트워크 위원회 정기회의를 운영했으며, 사내 강사로 동료 교육을 맡았습니다. 회원광장에서는 처우개선과 경력 인정 문의에 답해 왔습니다.</p>" +
        "<p>반복되는 일을 보면 도구로 만들어 줄여 왔습니다. 신청·심사, 계약 전자서명, 정산, 일정 알림처럼 손이 많이 가던 일을 Claude Code 등으로 직접 만들어 실제 업무에 쓰고 있습니다. 사람의 정보를 다루는 일이라, 실제 정보 대신 가짜 정보로 먼저 시험하고 정보가 어디로 전송되는지부터 확인합니다.</p>" +
        '<div class="howbox"><b>제가 일하는 방식은 단순합니다.</b>' +
          "<p>먼저 듣고, 쉬운 말로 정리하고, 필요하면 직접 만듭니다. 쓰는 도구는 계속 바뀌지만, 함께 일하는 사람이 이해하고 계속 쓸 수 있게 만드는 것이 가장 중요하다고 생각합니다.</p>" +
          "<q>기술은 어디서든 배울 수 있지만, 그 기술을 현장에 맞게 풀어내는 건 또 다른 역량이기 때문이다.</q>" +
          "<cite>— 열매똑똑 스마트워크 사업 담당자 인터뷰, 웰페어이슈(2025.06)</cite></div>" +
      "</div>" +
      "<div>" +
        '<p class="k" style="margin-bottom:3mm">경력</p>' +
        '<div class="career">' +
          '<div class="it"><span class="d">2024.07 – 현재</span><div><p class="t">서울특별시사회복지사협회</p><p class="s">회원조직팀 · 사회복지사 · 사업 기획 및 운영</p></div></div>' +
          '<div class="it"><span class="d">2022.06 – 2023.08</span><div><p class="t">성수종합사회복지관</p><p class="s">지역조직팀 · 사회복지사</p></div></div>' +
          '<div class="it"><span class="d">2016.09 – 2022.02</span><div><p class="t">한신대학교</p><p class="s">학사</p></div></div>' +
        "</div>" +
        '<p class="k" style="margin-bottom:3mm">강점 · 태니지먼트 진단(2026.07)과 프로젝트로 확인</p>' +
        '<div class="str-grid">' + STRENGTHS.map(function (s) {
          return '<div class="str theme-' + s.theme + '"><span class="blob">' + (ICONS[s.icon] || "") + "</span>" +
            "<b>" + s.ko + " <small>" + s.kind + "</small></b><p>" + s.desc + "</p></div>";
        }).join("") + "</div>" +
      "</div>" +
    "</div>");

  /* ---------- 3. 해 온 일 ---------- */
  html += page("02", "이런 일을 해 왔습니다", "사업을 운영하며, 그리고 조직 안에서 맡아 온 일",
    '<div class="fit-wrap"><div class="fit">' + FIT.map(function (g) {
      return '<div class="fitbox"><h3>' + g.area + "</h3><ul>" + g.items.map(function (it) {
        return "<li>" + it.text + (it.links.length ? "<em>→ " + it.links.map(function (l) { return l[0]; }).join(" · ") + "</em>" : "") + "</li>";
      }).join("") + "</ul></div>";
    }).join("") + "</div>" +
    '<div class="strip">' + [["956491", "참여기관 협약"], ["957297", "강사양성 워크숍"], ["959573", "관리자 트레이닝"], ["908534", "담당자 중간점검"]].map(function (x) {
      return '<figure>' + shot("assets/img/record/" + x[0] + ".jpg") + "<figcaption>" + x[1] + "</figcaption></figure>";
    }).join("") + "</div></div>");

  /* ---------- 4~6. 대표 프로젝트 ---------- */
  var featured = pub.filter(function (p) { return p.tier === "featured"; })
    .sort(function (a, b) { return (a.featuredRank || 99) - (b.featuredRank || 99); });
  featured.forEach(function (p, i) {
    var d = p.detail;
    var gal = (d.gallery || []).map(function (g) { return g.src; }).filter(function (s) { return s !== p.image; });
    var extra = gal.slice(0, 2);
    var live = (p.links || []).filter(function (l) { return l.type !== "repo"; })[0];
    html += page("03", "대표 프로젝트 " + (i + 1) + " / " + featured.length, "",
      '<div class="feat">' +
        '<div class="feat-shots">' + shot(p.image) +
          '<div class="row' + (extra.length === 1 ? " one" : "") + '">' + extra.map(function (s) { return shot(s); }).join("") + "</div>" +
        "</div>" +
        '<div class="feat-info">' +
          '<div class="meta">' + badge(p.status) + p.category.map(function (c) { return '<span class="badge">' + c + "</span>"; }).join("") +
            '<span class="badge">' + p.period + "</span></div>" +
          "<h3>" + p.title + "</h3>" +
          '<p class="sum">' + p.summary + "</p>" +
          (p.metrics ? '<div class="metrics">' + p.metrics.slice(0, 3).map(function (m) { return "<div><b>" + m.value + "</b><span>" + m.label + "</span></div>"; }).join("") + "</div>" : "") +
          '<div class="blk"><h4>해결하려던 문제</h4><p class="clamp3">' + d.problem + "</p></div>" +
          '<div class="blk"><h4>맡은 역할</h4><p class="clamp2">' + d.roles + "</p></div>" +
          '<div class="blk"><h4>주요 기능</h4><ul>' + d.features.slice(0, 5).map(function (f) { return '<li class="clamp2">' + f + "</li>"; }).join("") + "</ul></div>" +
          '<div class="blk"><h4>결과</h4><p class="clamp3">' + d.result + "</p></div>" +
          '<p class="links">' + (live ? "<b>바로가기</b> " + host(live.url) + " · " : "") + "역할 " + p.role.join("·") + " · " + (p.ai.length ? p.ai.join(", ") : "AI 없이") + "</p>" +
        "</div>" +
      "</div>");
  });

  /* ---------- 7~8. 주요 프로젝트 ---------- */
  function card(p) {
    var img = p.cardImage || p.image;
    return '<article class="card">' + (img ? shot(img) : iconShot(p)) +
      '<div class="bd"><div class="top"><span class="no">' + p.no + "</span>" + badge(p.status) + "</div>" +
      '<h3 class="clamp2">' + p.title + '</h3><p class="clamp3">' + p.summary + "</p>" +
      '<p class="ft">' + p.period + " · " + p.role.join("·") + "</p></div></article>";
  }
  var majors = pub.filter(function (p) { return p.tier === "major" || p.tier === "minor"; })
    .sort(function (a, b) { return (a.tier === "minor") - (b.tier === "minor") || parseInt(a.no, 10) - parseInt(b.no, 10); });
  for (var k = 0; k < majors.length; k += 6) {
    html += page("04", "주요 프로젝트", "사업 운영과 업무 도구 (" + (k / 6 + 1) + "/" + Math.ceil(majors.length / 6) + ")",
      '<div class="cards">' + majors.slice(k, k + 6).map(card).join("") + "</div>");
  }

  /* ---------- 9. 작은 실험 ---------- */
  var exps = pub.filter(function (p) { return p.tier === "experiment" || p.tier === "rnd"; })
    .sort(function (a, b) { return (a.status === "개인 프로젝트") - (b.status === "개인 프로젝트") || parseInt(a.no, 10) - parseInt(b.no, 10); });
  html += page("05", "작은 실험과 개인 프로젝트", "새 도구를 직접 써 보고, 일상의 불편도 만들어 풀어 본 기록",
    '<div class="cards small">' + exps.slice(0, 12).map(card).join("") + "</div>");

  /* ---------- 10. 현장 기록 ---------- */
  var vids = MEDIA.filter(function (m) { return m.thumb; });
  var intv = MEDIA.filter(function (m) { return !m.thumb; })[0];
  html += page("06", "현장 기록", "열매똑똑 Smart work를 운영하며 직접 발표하고, 인터뷰하고, 활동브리핑에 남긴 기록",
    '<div class="rec">' +
      '<div class="vids">' + vids.map(function (m) {
        return '<div class="vid"><div class="shot"><img src="' + m.thumb + '" alt="" />' + (m.length ? '<span class="len">' + m.length + "</span>" : "") + "</div>" +
          "<b>" + m.title + "</b><span>" + m.source + " · " + m.date + "</span>" + (m.startLabel ? "<em>▶ " + m.startLabel + "</em>" : "") + "</div>";
      }).join("") + "</div>" +
      (intv ? '<div class="interview"><span class="qm">“</span><div><b>' + intv.title + "</b><span>" + intv.source + " · " + intv.date + " — " + intv.desc + "</span></div></div>" : "") +
      '<div><p class="sub">활동 기록<small>협회 활동브리핑 ' + ACTIVITY.length + "건 중 8건</small></p>" +
        '<div class="acts">' + ACTIVITY.slice(0, 8).map(function (a) {
          return '<div class="act">' + shot("assets/img/record/" + a.id + ".jpg") + '<p class="d">' + a.date + "</p><b>" + a.title + "</b></div>";
        }).join("") + "</div></div>" +
    "</div>");

  /* ---------- 11. AI 작업 방식 + 마무리 ---------- */
  html += page("07", "AI 작업 방식", "각 단계에서 사람이 직접 판단하는 지점",
    '<div class="last">' +
      "<div>" +
        '<div class="flow">' + AI_FLOW.map(function (s) {
          return '<div class="st"><b>' + s.step + "</b><span>" + s.tool + "</span><i>" + s.human + "</i></div>";
        }).join("") + "</div>" +
        '<ul class="principle">' +
          "<li>검증, 개인정보 보호, 최종 의사결정은 항상 사람이 담당합니다.</li>" +
          "<li>사실을 그대로 전하거나 같은 답에 늘 같은 결과가 나와야 하는 일에는 AI를 쓰지 않습니다.</li>" +
        "</ul>" +
      "</div>" +
      '<div class="end">' +
        '<p class="k">온라인 포트폴리오</p>' +
        "<h3>더 자세한 내용은<br />웹에서 보실 수 있습니다</h3>" +
        "<p>프로젝트 " + pub.length + "개의 상세 설명과 화면, 사업설명회·성과공유회 영상, 실제 서비스 링크를 모두 담았습니다.</p>" +
        '<div class="qrrow"><div class="qr" id="qr"></div><div>' +
          (URL_SHORT ? '<a class="url" href="' + URL_ + '">' + URL_SHORT + "</a>" : '<span class="url">(사이트 주소)</span>') +
          '<p class="mail">' + MAIL + "</p></div></div>" +
      "</div>" +
    "</div>");

  doc.innerHTML = html;

  // QR
  try {
    if (URL_ && typeof qrcode === "function") {
      var qr = qrcode(0, "M"); qr.addData(URL_); qr.make();
      document.getElementById("qr").innerHTML = qr.createSvgTag({ cellSize: 4, margin: 0, scalable: true });
    }
  } catch (e) {}

  // 넘친 쪽 표시(화면에서만 빨간 테두리) — 점검용
  function checkOverflow() {
    var bad = [];
    document.querySelectorAll(".page").forEach(function (pg, i) {
      var body = pg.querySelector(".p-body");
      var over = body.scrollHeight > body.clientHeight + 2;
      pg.classList.toggle("overflow", over);
      if (over) bad.push(i + 1);
    });
    window.__overflowPages = bad;
    return bad;
  }

  // 사진·글꼴을 모두 불러온 뒤 저장 가능
  var imgs = Array.prototype.slice.call(document.images);
  var status = document.getElementById("tbStatus");
  var btn = document.getElementById("printBtn");
  Promise.all(imgs.map(function (im) {
    return im.complete ? Promise.resolve() : new Promise(function (r) { im.onload = im.onerror = r; });
  }).concat(document.fonts ? [document.fonts.ready] : [])).then(function () {
    var bad = checkOverflow();
    window.__printReady = true;
    status.textContent = "준비 완료 · A4 가로 " + pageNo + "쪽" + (bad.length ? " (넘친 쪽: " + bad.join(", ") + ")" : "");
    btn.disabled = false;
    if (/[?&]auto=1/.test(location.search)) setTimeout(function () { window.print(); }, 300);
  });
  btn.addEventListener("click", function () { window.print(); });
})();
