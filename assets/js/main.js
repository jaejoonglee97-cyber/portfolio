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

  /* ---------- 모바일 메뉴 ---------- */
  var menuToggle = document.getElementById("menuToggle");
  var siteNav = document.getElementById("siteNav");
  if (menuToggle && siteNav) {
    var setMenu = function (open) {
      siteNav.classList.toggle("open", open);
      menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
      menuToggle.textContent = open ? "닫기" : "메뉴";
    };
    menuToggle.addEventListener("click", function () {
      setMenu(!siteNav.classList.contains("open"));
    });
    siteNav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { setMenu(false); });
    });
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
      .sort(function (a, b) { return (a.featuredRank || 99) - (b.featuredRank || 99); })
      .forEach(function (p) {
        var card = document.createElement("article");
        card.className = "featured-card reveal";
        var iconSvg = (typeof ICONS !== "undefined" && ICONS[p.icon]) || "";
        // 스크린샷(image)이 있으면 이미지, 없으면 아이콘 플레이스홀더
        // 카드용 사진(cardImage)이 따로 있으면 그것을 씀
        var cardImg = p.cardImage || p.image;
        var thumbHtml = cardImg
          ? '<div class="thumb has-img"><img src="' + cardImg + '" alt="' + p.title + ' 대표 사진" loading="lazy" /></div>'
          : '<div class="thumb" role="img" aria-label="' + p.title + ' 대표 화면 자리">' +
            '<span class="thumb-icon">' + iconSvg + "</span>" +
            (p.thumbNote ? "<span>" + p.thumbNote + "</span>" : "") + "</div>";
        card.innerHTML =
          thumbHtml +
          '<div class="body">' +
          '<div class="card-meta">' +
          '<span class="badge ' + statusClass(p.status) + '">' + p.status + "</span>" +
          p.category.map(function (c) { return '<span class="badge">' + c + "</span>"; }).join("") +
          "</div>" +
          "<h3><a href=\"project.html?slug=" + p.slug + '">' + p.title + "</a></h3>" +
          '<p class="summary">' + p.summary + "</p>" +
          (p.metrics && p.metrics.length
            ? '<div class="card-metrics">' +
              p.metrics.slice(0, 3).map(function (m) {
                return '<div><b>' + m.value + "</b><span>" + m.label + "</span></div>";
              }).join("") + "</div>"
            : "") +
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
        // 분야를 고르면 해당 항목을 모두 보여 줌
        if (c !== "전체") unfold();
      });
      filterBar.appendChild(b);
    });

    // 업무 비중 순으로 정렬 (대표 → 주요 → 기타 → 실험 → 개인), 같은 묶음 안에서는 번호순
    var TIER_RANK = { featured: 0, major: 1, minor: 2, rnd: 3, experiment: 4 };
    function rank(p) {
      return (p.status === "개인 프로젝트" ? 10 : 0) + (TIER_RANK[p.tier] != null ? TIER_RANK[p.tier] : 5);
    }
    var archiveOrder = publicProjects.slice().sort(function (a, b) {
      return rank(a) - rank(b) || (a.featuredRank || 99) - (b.featuredRank || 99) || parseInt(a.no, 10) - parseInt(b.no, 10);
    });

    archiveOrder.forEach(function (p) {
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

    // 처음에는 일부만 보이고 '모두 보기'로 펼침
    var FOLD_AT = window.matchMedia("(max-width: 800px)").matches ? 6 : 10;
    var rows = archiveList.querySelectorAll(".archive-row");
    var moreBox = document.createElement("div");
    moreBox.className = "archive-more";
    var moreBtn = document.createElement("button");
    moreBtn.type = "button";
    moreBtn.className = "btn btn-ghost";
    moreBtn.textContent = "전체 " + rows.length + "개 모두 보기";
    moreBox.appendChild(moreBtn);
    archiveList.parentNode.insertBefore(moreBox, archiveList.nextSibling);
    function unfold() {
      rows.forEach(function (r) { r.classList.remove("folded"); });
      moreBox.hidden = true;
    }
    if (rows.length > FOLD_AT) {
      rows.forEach(function (r, i) { if (i >= FOLD_AT) r.classList.add("folded"); });
      moreBtn.addEventListener("click", unfold);
    } else {
      moreBox.hidden = true;
    }
  }

  /* ---------- 현장 기록: 영상·인터뷰 ---------- */
  var mediaList = document.getElementById("mediaList");
  if (mediaList && typeof MEDIA !== "undefined") {
    var videoGrid = document.createElement("div");
    videoGrid.className = "video-grid";
    mediaList.appendChild(videoGrid);
    MEDIA.forEach(function (m) {
      var a = document.createElement("a");
      var isVideo = !!m.thumb;
      a.className = isVideo ? "media-card" : "media-card no-thumb";
      // 직접 발표한 구간이 있으면 그 시점부터 재생
      a.href = m.start ? m.url + "&t=" + m.start + "s" : m.url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.innerHTML =
        (isVideo
          ? '<span class="media-thumb"><img src="' + m.thumb + '" alt="" loading="lazy" />' +
            '<span class="play" aria-hidden="true"></span>' +
            (m.length ? '<span class="media-len">' + m.length + "</span>" : "") + "</span>"
          : '<span class="media-quote" aria-hidden="true">\u201C</span>') +
        '<span class="media-body">' +
        '<span class="media-meta"><span class="badge status-live">' + m.type + "</span>" +
        "<span>" + (isVideo ? m.date : m.source + " · " + m.date) + "</span></span>" +
        '<span class="media-title">' + m.title + (isVideo ? "" : " \u2197") + "</span>" +
        '<span class="media-desc">' + m.desc + "</span>" +
        (m.startLabel ? '<span class="media-start">\u25B6 ' + m.startLabel + "</span>" : "") +
        "</span>";
      (isVideo ? videoGrid : mediaList).appendChild(a);
    });
  }

  /* ---------- 현장 기록: 활동브리핑 ---------- */
  var activityGrid = document.getElementById("activityGrid");
  if (activityGrid && typeof ACTIVITY !== "undefined") {
    var countEl = document.getElementById("activityCount");
    if (countEl) countEl.textContent = ACTIVITY.length + "건 · " + ACTIVITY[ACTIVITY.length - 1].date.slice(0, 7) + " –";
    ACTIVITY.forEach(function (r, i) {
      var a = document.createElement("a");
      a.className = "activity-card" + (i >= 6 ? " folded" : "");
      a.href = "https://sasw.or.kr/briefing/" + r.id;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.innerHTML =
        '<span class="activity-photo"><img src="assets/img/record/' + r.id + '.jpg" alt="' + r.title + ' 현장 사진" loading="lazy" /></span>' +
        '<span class="activity-body">' +
        '<span class="activity-date">' + r.date + "</span>" +
        '<span class="activity-title">' + r.title + "</span>" +
        '<span class="activity-desc">' + r.desc + "</span>" +
        "</span>";
      activityGrid.appendChild(a);
    });
    var actMore = document.getElementById("activityMore");
    var actBtn = document.getElementById("activityMoreBtn");
    if (actMore && actBtn && ACTIVITY.length > 6) {
      actMore.hidden = false;
      actBtn.textContent = "활동 기록 " + ACTIVITY.length + "건 모두 보기";
      actBtn.addEventListener("click", function () {
        activityGrid.querySelectorAll(".activity-card.folded").forEach(function (c) { c.classList.remove("folded"); });
        actMore.hidden = true;
      });
    }
  }

  /* ---------- 해 온 일 ---------- */
  var fitGrid = document.getElementById("fitGrid");
  if (fitGrid && typeof FIT !== "undefined") {
    FIT.forEach(function (g) {
      var card = document.createElement("div");
      card.className = "fit-card reveal";
      card.innerHTML =
        "<h3>" + g.area + "</h3><ul>" +
        g.items.map(function (it) {
          return "<li><span>" + it.text + "</span>" +
            (it.links.length
              ? '<span class="fit-links">' + it.links.map(function (l) {
                  return '<a href="project.html?slug=' + l[1] + '">' + l[0] + " \u2192</a>";
                }).join("") + "</span>"
              : "") +
            "</li>";
        }).join("") + "</ul>";
      fitGrid.appendChild(card);
    });
  }

  /* ---------- 강점 카드 덱 ---------- */
  var deck = document.getElementById("deck");
  if (deck && typeof STRENGTHS !== "undefined") {
    var N = STRENGTHS.length, cur = 0;
    var tabsBox = document.getElementById("strengthTabs");
    var countEl2 = document.getElementById("deckCount");
    var cards = STRENGTHS.map(function (st, i) {
      var c = document.createElement("article");
      c.className = "s-card theme-" + st.theme;
      c.setAttribute("aria-label", st.ko + " 카드");
      c.innerHTML =
        '<div class="s-panel">' +
        '<span class="s-kind"><i></i>' + st.kind + "</span>" +
        '<span class="s-num">' + String(i + 1).padStart(2, "0") + " / " + String(N).padStart(2, "0") + "</span>" +
        '<span class="s-chip c1">' + st.chips[0] + "</span>" +
        '<span class="s-chip c2">' + st.chips[1] + "</span>" +
        '<span class="s-spark" aria-hidden="true"></span>' +
        '<span class="s-blob" aria-hidden="true"><span class="s-blob-icon">' + (ICONS[st.icon] || "") + "</span></span>" +
        '<span class="s-shadow" aria-hidden="true"></span>' +
        '<span class="s-note">' + st.note + "</span>" +
        "</div>" +
        '<div class="s-body">' +
        '<h3>' + st.ko + ' <small>' + st.en + "</small></h3>" +
        '<p>' + st.desc + "</p>" +
        '<div class="s-links">' + st.projects.map(function (pr) {
          return '<a href="project.html?slug=' + pr[1] + '">' + pr[0] + " \u2192</a>";
        }).join("") + "</div>" +
        "</div>";
      c.addEventListener("click", function (e) {
        if (i !== cur && !e.target.closest("a")) { e.preventDefault(); go(i); }
      });
      deck.appendChild(c);
      if (tabsBox) {
        var t = document.createElement("button");
        t.type = "button";
        t.className = "s-tab theme-" + st.theme;
        t.setAttribute("role", "tab");
        t.textContent = st.ko;
        t.addEventListener("click", function () { go(i); });
        tabsBox.appendChild(t);
      }
      return c;
    });
    var tabs = tabsBox ? tabsBox.querySelectorAll(".s-tab") : [];

    // 카드 위치: 앞 카드(0), 뒤로 쌓인 카드(1~3), 그 뒤는 맨 뒤에 숨김
    function stackPose(k) {
      k = Math.min(k, 3);
      return "translate3d(" + (k * 30) + "px," + (k * 8) + "px,0) scale(" + (1 - k * 0.06) + ")";
    }
    var EXIT_L = "translate3d(-118%,24px,0) rotate(-9deg) scale(.94)";
    var EXIT_R = "translate3d(118%,24px,0) rotate(9deg) scale(.94)";
    var leaving = -1, leavingPose = EXIT_L, leaveTimer = null;

    function layoutDeck(dragX) {
      dragX = dragX || 0;
      var pull = Math.min(Math.abs(dragX) / 160, 1);
      cards.forEach(function (c, i) {
        var off = (i - cur + N) % N;
        var tr, op, z;
        if (i === leaving) {
          // 넘긴 카드는 맨 위에 둔 채로 밖으로 빠져나감
          tr = leavingPose; op = 0; z = N + 2;
        } else if (off === 0) {
          tr = "translate3d(" + dragX + "px,0,0) rotate(" + (dragX / 30) + "deg)";
          op = 1; z = N + 1;
        } else {
          // 끄는 동안 바로 뒤 카드가 조금씩 앞으로 나옴
          var k = off - (off === 1 ? pull : 0);
          tr = stackPose(k);
          op = off > 3 ? 0 : 1 - Math.min(k, 3) * 0.14;
          z = N - off;
        }
        c.style.transform = tr;
        c.style.opacity = op;
        c.style.zIndex = z;
        c.classList.toggle("is-front", off === 0 && i !== leaving);
        c.setAttribute("aria-hidden", off === 0 ? "false" : "true");
        c.querySelectorAll("a").forEach(function (a) { a.tabIndex = off === 0 ? 0 : -1; });
      });
      tabs.forEach(function (t, i) { t.setAttribute("aria-selected", i === cur ? "true" : "false"); });
      if (countEl2) countEl2.textContent = (cur + 1) + " / " + N;
    }

    function go(i, dir) {
      var next = (i + N) % N;
      if (next === cur) { layoutDeck(0); return; }
      if (!dir) dir = ((next - cur + N) % N) <= N / 2 ? 1 : -1;
      var prevCur = cur;
      clearTimeout(leaveTimer);
      if (dir > 0) {
        // 앞으로: 지금 카드가 왼쪽으로 빠져나가고 뒤 카드가 앞으로
        leaving = prevCur; leavingPose = EXIT_L;
      } else {
        // 뒤로: 새 카드가 왼쪽에서 들어옴 (시작 위치를 먼저 잡고 전환)
        leaving = -1;
        var inc = cards[next];
        inc.style.transition = "none";
        inc.style.transform = EXIT_L; inc.style.opacity = "0"; inc.style.zIndex = N + 2;
        void inc.offsetWidth;
        inc.style.transition = "";
      }
      cur = next;
      layoutDeck(0);
      leaveTimer = setTimeout(function () {
        if (leaving < 0) return;
        // 빠져나간 카드는 보이지 않는 채로 맨 뒤로 옮김
        var c = cards[leaving];
        c.style.transition = "none";
        leaving = -1;
        layoutDeck(0);
        void c.offsetWidth;
        c.style.transition = "";
      }, 560);
    }
    document.getElementById("deckPrev").addEventListener("click", function () { go(cur - 1, -1); });
    document.getElementById("deckNext").addEventListener("click", function () { go(cur + 1, 1); });
    deck.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { go(cur + 1, 1); e.preventDefault(); }
      if (e.key === "ArrowLeft") { go(cur - 1, -1); e.preventDefault(); }
    });

    // 손가락·마우스로 끌어서 넘기기 (세로 스크롤은 그대로 둠)
    var startX = 0, startY = 0, dx = 0, dragging = false, decided = false, horiz = false;
    deck.addEventListener("pointerdown", function (e) {
      if (!e.target.closest(".s-card.is-front") || e.target.closest("a")) return;
      startX = e.clientX; startY = e.clientY; dx = 0; dragging = true; decided = false; horiz = false;
    });
    window.addEventListener("pointermove", function (e) {
      if (!dragging) return;
      var mx = e.clientX - startX, my = e.clientY - startY;
      if (!decided && (Math.abs(mx) > 6 || Math.abs(my) > 6)) {
        decided = true; horiz = Math.abs(mx) > Math.abs(my);
        if (horiz) deck.classList.add("dragging"); else dragging = false;
      }
      if (horiz) { dx = mx; layoutDeck(dx); }
    });
    function endDrag() {
      if (!dragging) return;
      dragging = false; deck.classList.remove("dragging");
      if (!horiz) return;
      if (dx < -60) go(cur + 1, 1); else if (dx > 60) go(cur - 1, -1); else layoutDeck(0);
    }
    window.addEventListener("pointerup", endDrag);
    window.addEventListener("pointercancel", endDrag);
    layoutDeck(0);
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

  /* ---------- PDF로 저장 (브라우저 인쇄 → PDF) ---------- */
  function preparePrint() {
    // 숫자 띠는 화면에 들어올 때 올라가므로, 인쇄 전에 최종값으로 채움
    document.querySelectorAll(".stat-num").forEach(function (el) {
      var t = parseInt(el.getAttribute("data-target"), 10);
      el.textContent = (el.getAttribute("data-prefix") || "") + t.toLocaleString("ko-KR") + (el.getAttribute("data-suffix") || "");
    });
    // 아카이브 필터는 '전체'로
    var allBtn = document.querySelector("#filterBar .filter-btn");
    if (allBtn && allBtn.getAttribute("aria-pressed") !== "true") allBtn.click();
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("visible"); });
    // 마지막 장 링크·QR
    var url = (SITE.siteUrl || (location.origin + location.pathname.replace(/index\.html$/, ""))).replace(/\/?$/, "/");
    var urlEl = document.getElementById("printUrl");
    if (urlEl) { urlEl.textContent = url.replace(/^https?:\/\//, "").replace(/\/$/, ""); urlEl.href = url; }
    var mailEl = document.getElementById("printMail");
    if (mailEl) mailEl.textContent = SITE.emailUser + "@" + SITE.emailDomain;
    var qrBox = document.getElementById("printQr");
    if (qrBox && !qrBox.dataset.url && typeof qrcode === "function") {
      try {
        var qr = qrcode(0, "M"); qr.addData(url); qr.make();
        qrBox.innerHTML = qr.createSvgTag({ cellSize: 4, margin: 0, scalable: true });
        qrBox.dataset.url = url;
      } catch (e) { qrBox.style.display = "none"; }
    }
  }
  window.addEventListener("beforeprint", preparePrint);
  var pdfBtn = document.getElementById("pdfBtn");
  if (pdfBtn) {
    pdfBtn.addEventListener("click", function () {
      preparePrint();
      setTimeout(function () { window.print(); }, 60);
    });
  }

  /* ---------- 최종 업데이트 ---------- */
  var updated = document.getElementById("lastUpdated");
  if (updated) updated.textContent = SITE.updated;

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
