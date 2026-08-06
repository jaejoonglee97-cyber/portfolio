/* 홈: 테마 토글, 카드 렌더, 필터, 이메일 조립 */

(function () {
  "use strict";

  var publicProjects = PROJECTS.filter(function (p) { return p.visibility === "public"; });

  /* ---------- 테마 ---------- */
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

  /* ---------- 상태 배지 클래스 ---------- */
  function statusClass(status) {
    if (status === "운영") return "status-live";
    if (status.indexOf("실험") >= 0 || status.indexOf("R&D") >= 0) return "status-exp";
    return "status-done";
  }

  /* ---------- 활동 분야 칩 ---------- */
  var chips = document.getElementById("fieldChips");
  if (chips) {
    SITE.fields.forEach(function (f) {
      var s = document.createElement("span");
      s.className = "chip";
      s.textContent = f;
      chips.appendChild(s);
    });
  }

  /* ---------- 대표 프로젝트 ---------- */
  var featuredList = document.getElementById("featuredList");
  if (featuredList) {
    publicProjects
      .filter(function (p) { return p.tier === "featured"; })
      .forEach(function (p) {
        var card = document.createElement("article");
        card.className = "featured-card reveal";
        var iconSvg = (typeof ICONS !== "undefined" && ICONS[p.icon]) || "";
        // 스크린샷(image)이 있으면 이미지, 없으면 아이콘 플레이스홀더
        var thumbHtml = p.image
          ? '<div class="thumb has-img"><img src="' + p.image + '" alt="' + p.title + ' 화면" loading="lazy" /></div>'
          : '<div class="thumb" role="img" aria-label="' + p.title + ' 대표 화면 자리">' +
            '<span class="thumb-icon">' + iconSvg + "</span>" +
            "<span>대표 화면 준비 중<br/>(개인정보 검수 후 게시)</span></div>";
        card.innerHTML =
          thumbHtml +
          '<div class="body">' +
          '<div class="card-meta">' +
          '<span class="proj-no">' + p.no + "</span>" +
          '<span class="badge ' + statusClass(p.status) + '">' + p.status + "</span>" +
          p.category.map(function (c) { return '<span class="badge">' + c + "</span>"; }).join("") +
          "</div>" +
          "<h3><a href=\"project.html?slug=" + p.slug + '">' + p.title + "</a></h3>" +
          '<p class="summary">' + p.summary + "</p>" +
          (p.featuredStory ? '<p class="story">' + p.featuredStory + "</p>" : "") +
          '<div class="card-foot">' +
          '<span class="tag">' + p.period + "</span>" +
          '<span class="tag">' + p.role.join(" · ") + "</span>" +
          p.ai.slice(0, 2).map(function (a) { return '<span class="tag">' + a + "</span>"; }).join("") +
          "</div></div>";
        featuredList.appendChild(card);
      });
  }

  /* ---------- 아카이브 + 필터 ---------- */
  var archiveList = document.getElementById("archiveList");
  var filterBar = document.getElementById("filterBar");

  if (archiveList && filterBar) {
    // 카테고리 수집
    var cats = ["전체"];
    publicProjects.forEach(function (p) {
      p.category.forEach(function (c) { if (cats.indexOf(c) < 0) cats.push(c); });
    });

    cats.forEach(function (c, i) {
      var b = document.createElement("button");
      b.className = "filter-btn";
      b.textContent = c;
      b.setAttribute("aria-pressed", i === 0 ? "true" : "false");
      b.addEventListener("click", function () {
        filterBar.querySelectorAll(".filter-btn").forEach(function (x) { x.setAttribute("aria-pressed", "false"); });
        b.setAttribute("aria-pressed", "true");
        archiveList.querySelectorAll(".archive-row").forEach(function (row) {
          var rowCats = row.getAttribute("data-cats").split("|");
          row.classList.toggle("hidden", c !== "전체" && rowCats.indexOf(c) < 0);
        });
      });
      filterBar.appendChild(b);
    });

    publicProjects.forEach(function (p) {
      var a = document.createElement("a");
      a.className = "archive-row";
      a.href = "project.html?slug=" + p.slug;
      a.setAttribute("data-cats", p.category.join("|"));
      a.innerHTML =
        '<span class="no">' + p.no + "</span>" +
        '<span class="info"><h3>' + p.title + "</h3><p>" + p.summary + "</p></span>" +
        '<span class="side"><span class="badge ' + statusClass(p.status) + '">' + p.status + '</span>' +
        '<span class="period">' + p.period + "</span></span>";
      archiveList.appendChild(a);
    });
  }

  /* ---------- AI 작업 방식 ---------- */
  var aiFlow = document.getElementById("aiFlow");
  if (aiFlow && typeof AI_FLOW !== "undefined") {
    AI_FLOW.forEach(function (s) {
      var d = document.createElement("div");
      d.className = "ai-step reveal";
      d.innerHTML =
        '<span class="step-name">' + s.step + "</span>" +
        '<span class="step-tool">' + s.tool + "</span>" +
        '<span class="step-human">' + s.human + "</span>";
      aiFlow.appendChild(d);
    });
  }

  /* ---------- 이메일 (스팸 수집 방지: JS 조립) ---------- */
  var emailLine = document.getElementById("emailLine");
  if (emailLine) {
    var addr = SITE.emailUser + "@" + SITE.emailDomain;
    var link = document.createElement("a");
    link.href = "mailto:" + addr;
    link.textContent = addr;
    emailLine.appendChild(link);
  }

  /* ---------- 최종 업데이트 ---------- */
  var updated = document.getElementById("lastUpdated");
  if (updated) updated.textContent = SITE.updated;

  /* ---------- 방문자 유형별 소개 토글 ---------- */
  var INTROS = {
    field:
      "현장의 반복 업무와 어려움을 먼저 듣고, 오늘 바로 써볼 수 있는 작은 변화부터 함께 만듭니다. 제가 만든 것들도 실제 현장에서 겪은 문제에서 시작했습니다.",
    manager:
      "도구를 도입하는 데서 끝내지 않고, 구성원이 실제로 사용하고 조직에 남는 과정까지 설계합니다. 담당자가 바뀌어도 계속 굴러가도록 매뉴얼과 운영 방식을 함께 남깁니다.",
    hiring:
      "현장 경험과 협회의 사업 운영 경험을 함께 가지고 있습니다. 복잡한 현장의 요구를 실행 가능한 사업과 서비스로 구조화하고, 기획부터 제작·운영까지 끝까지 맡아 왔습니다.",
  };
  var introTabs = document.querySelectorAll(".is-tab");
  var introMsg = document.getElementById("introMsg");
  if (introTabs.length && introMsg) {
    var setIntro = function (key) {
      introMsg.textContent = INTROS[key] || "";
      introTabs.forEach(function (t) {
        t.setAttribute("aria-pressed", t.getAttribute("data-intro") === key ? "true" : "false");
      });
    };
    introTabs.forEach(function (t) {
      t.addEventListener("click", function () { setIntro(t.getAttribute("data-intro")); });
    });
    setIntro("field");
  }

  /* ---------- 강점 네트워크 iframe 높이 자동 조정 ---------- */
  window.addEventListener("message", function (e) {
    if (e.data && typeof e.data.ontoH === "number") {
      var f = document.getElementById("ontoFrame");
      if (f) f.style.height = e.data.ontoH + "px";
    }
  });

  /* ---------- 스크롤 프로그레스 바 (③) ---------- */
  var progressBar = document.getElementById("progressBar");
  if (progressBar) {
    var updateProgress = function () {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      progressBar.style.width = pct + "%";
    };
    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
  }

  /* ---------- 스탯 카운터 (①) ---------- */
  var statsGrid = document.getElementById("statsGrid");
  if (statsGrid && typeof STATS !== "undefined") {
    var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function resolveStat(v) {
      if (v === "auto:projects") return publicProjects.length;
      if (v === "auto:live")
        return publicProjects.filter(function (p) { return p.status.indexOf("운영") >= 0; }).length;
      return v;
    }

    STATS.forEach(function (s) {
      var target = resolveStat(s.value);
      var el = document.createElement("div");
      el.className = "stat";
      el.innerHTML =
        '<span class="stat-num" data-target="' + target +
        '" data-prefix="' + (s.prefix || "") + '" data-suffix="' + (s.suffix || "") + '">0</span>' +
        '<span class="stat-label">' + s.label + "</span>";
      statsGrid.appendChild(el);
    });

    function countUp(numEl) {
      var target = parseInt(numEl.getAttribute("data-target"), 10);
      var prefix = numEl.getAttribute("data-prefix") || "";
      var suffix = numEl.getAttribute("data-suffix") || "";
      function fmt(n) { return prefix + Math.round(n).toLocaleString("ko-KR") + suffix; }
      // 모션 축소 설정이거나 탭이 백그라운드면 즉시 최종값
      if (reducedMotion || document.hidden) { numEl.textContent = fmt(target); return; }
      var duration = 900;
      var start = null;
      function tick(ts) {
        if (!start) start = ts;
        var t = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - t, 3); // ease-out
        numEl.textContent = fmt(target * eased);
        if (t < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      // 안전망: 애니메이션이 중단돼도 최종값 보장
      setTimeout(function () { numEl.textContent = fmt(target); }, duration + 200);
    }

    if ("IntersectionObserver" in window && !reducedMotion && !document.hidden) {
      var statIo = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) { countUp(e.target); statIo.unobserve(e.target); }
          });
        },
        { threshold: 0.4 }
      );
      statsGrid.querySelectorAll(".stat-num").forEach(function (el) { statIo.observe(el); });
    } else {
      statsGrid.querySelectorAll(".stat-num").forEach(countUp);
    }
  }

  /* ---------- 스크롤 리빌 (§10.7) ---------- */
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var reveals = document.querySelectorAll(".reveal");
  if (reduced || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("visible"); });
  } else {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
        });
      },
      { threshold: 0.08 }
    );
    reveals.forEach(function (el) { io.observe(el); });
  }
})();
