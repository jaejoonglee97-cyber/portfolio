/* 프로젝트 상세: ?slug= 파라미터로 data.js에서 찾아 렌더 */

(function () {
  "use strict";

  /* ---------- 테마 토글 (홈과 동일) ---------- */
  var toggle = document.getElementById("themeToggle");
  function currentTheme() {
    return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }
  function applyThemeLabel() {
    if (toggle) toggle.textContent = currentTheme() === "dark" ? "라이트" : "다크";
  }
  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      if (next === "dark") document.documentElement.setAttribute("data-theme", "dark");
      else document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", next);
      applyThemeLabel();
    });
    applyThemeLabel();
  }

  /* ---------- 프로젝트 찾기 ---------- */
  var publicProjects = PROJECTS.filter(function (p) { return p.visibility === "public"; });
  var slug = new URLSearchParams(location.search).get("slug");
  var idx = -1;
  publicProjects.forEach(function (p, i) { if (p.slug === slug) idx = i; });

  var titleEl = document.getElementById("pTitle");
  var summaryEl = document.getElementById("pSummary");
  var metaEl = document.getElementById("pMeta");
  var bodyEl = document.getElementById("pBody");
  var navEl = document.getElementById("pNav");

  if (idx < 0) {
    titleEl.textContent = "프로젝트를 찾을 수 없습니다";
    summaryEl.innerHTML = '주소를 확인하거나 <a href="index.html#archive">아카이브</a>에서 다시 선택해 주세요.';
    document.getElementById("pThumb").style.display = "none";
    return;
  }

  var p = publicProjects[idx];
  var d = p.detail;

  document.title = p.title + " | 이재중 포트폴리오";
  titleEl.textContent = p.title;
  summaryEl.textContent = p.summary;

  /* 성과 지표 (있으면 메타 표 아래에 강조 표시) */
  if (p.metrics && p.metrics.length) {
    var metricsBox = document.createElement("div");
    metricsBox.className = "metrics";
    metricsBox.setAttribute("aria-label", "주요 성과");
    metricsBox.innerHTML = p.metrics
      .map(function (m) {
        return (
          '<div class="metric"><span class="metric-value">' + m.value +
          '</span><span class="metric-label">' + m.label + "</span></div>"
        );
      })
      .join("");
    metaEl.parentNode.insertBefore(metricsBox, metaEl.nextSibling);
  }

  /* 썸네일: 스크린샷(image)이 있으면 이미지, 없으면 아이콘 */
  var thumbEl = document.getElementById("pThumb");
  if (p.image && thumbEl) {
    thumbEl.classList.add("has-img");
    thumbEl.innerHTML = '<img src="' + p.image + '" alt="' + p.title + ' 대표 화면" />';
  } else {
    var iconEl = document.getElementById("pIcon");
    if (iconEl && typeof ICONS !== "undefined" && ICONS[p.icon]) iconEl.innerHTML = ICONS[p.icon];
  }

  /* ---------- 메타 표 ---------- */
  var metaItems = [
    ["기간", p.period],
    ["상태", p.status],
    ["역할", p.role.join(" · ")],
    ["분야", p.category.join(" · ")],
    ["기술 · AI", p.ai.join(", ") || "—"],
  ];
  metaItems.forEach(function (m) {
    var cell = document.createElement("div");
    cell.className = "meta-cell";
    cell.innerHTML = "<dt>" + m[0] + "</dt><dd>" + m[1] + "</dd>";
    metaEl.appendChild(cell);
  });

  /* ---------- 본문 섹션 (§8.3 구조) ---------- */
  function section(idxLabel, heading, html) {
    if (!html) return "";
    return (
      '<section class="detail-section">' +
      '<h2><span class="idx">' + idxLabel + "</span>" + heading + "</h2>" +
      html +
      "</section>"
    );
  }
  function para(text) { return text ? "<p>" + text + "</p>" : ""; }
  function list(items) {
    if (!items || !items.length) return "";
    return "<ul>" + items.map(function (i) { return "<li>" + i + "</li>"; }).join("") + "</ul>";
  }

  // 갤러리 (여러 장 스크린샷)
  function gallery(items) {
    if (!items || !items.length) return "";
    return (
      '<div class="gallery">' +
      items
        .map(function (g) {
          return (
            "<figure><img src=\"" + g.src + '" alt="' + (g.caption || p.title + " 화면") +
            '" loading="lazy" />' +
            (g.caption ? "<figcaption>" + g.caption + "</figcaption>" : "") +
            "</figure>"
          );
        })
        .join("") +
      "</div>"
    );
  }

  bodyEl.innerHTML =
    section("01", "해결하려던 현장 문제", para(d.problem)) +
    section("02", "대상 사용자", para(d.users)) +
    section("03", "맡은 역할", para(d.roles)) +
    section("04", "주요 기능", list(d.features)) +
    section("05", "제작과 운영 과정", para(d.process)) +
    section("06", "시행착오와 개선", para(d.trial)) +
    section("07", "결과와 배운 점", para(d.result)) +
    section("08", "사용 기술과 AI", para(d.stack)) +
    (d.gallery && d.gallery.length ? section("09", "관련 화면", gallery(d.gallery)) : "") +
    (d.note ? '<p class="detail-note">' + d.note + "</p>" : "");

  /* ---------- 이전/다음 ---------- */
  var prev = publicProjects[idx - 1];
  var next = publicProjects[idx + 1];
  navEl.innerHTML =
    (prev
      ? '<a href="project.html?slug=' + prev.slug + '">← ' + prev.title + "</a>"
      : "<span></span>") +
    (next
      ? '<a href="project.html?slug=' + next.slug + '" style="text-align:right">' + next.title + " →</a>"
      : "<span></span>");
})();
