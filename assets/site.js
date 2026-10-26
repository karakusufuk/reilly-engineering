/* Reilly Engineering — shared behaviour: mobile menu, modal, entrance motion, switch, phone digits.
   Header, footer, modal and page content are static HTML; this file only runs the interactions. */
(function () {
  var root = document.documentElement;
  root.classList.add("js");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.RE_reduce = reduce;

  /* ---------- small-screen menu ---------- */
  var hdr = document.getElementById("hdr"), mb = hdr && hdr.querySelector(".menu-btn");
  function closeMenu() { if (hdr && hdr.classList.contains("open")) { hdr.classList.remove("open"); mb.setAttribute("aria-expanded", "false"); } }
  if (mb) {
    mb.addEventListener("click", function () { mb.setAttribute("aria-expanded", hdr.classList.toggle("open") ? "true" : "false"); });
    hdr.querySelectorAll(".nav.main a").forEach(function (a) { a.addEventListener("click", closeMenu); });
    window.addEventListener("resize", function () { if (window.innerWidth > 860) closeMenu(); });
  }

  /* ---------- modal ---------- */
  var LINES = {
    call: "In a live build, this would call Reilly's sales line in Swords.",
    service: "In a live build, this would call the service desk, open seven days a week.",
    mail: "In a live build, this would open an email to the sales team.",
    map: "In a live build, this would open the showroom in Google Maps.",
    order: "In a live build, this order would go straight into the parts desk's stock system.",
    view: "In a live build, this would book a viewing of the machine in Swords.",
    check: "In a live build, this would book an accuracy check with the service team."
  };
  var modal = document.getElementById("modal"), opener = null;
  function openModal(k, from) {
    opener = from || null;
    document.getElementById("mp").textContent = LINES[k] || LINES.call;
    modal.hidden = false;
    document.getElementById("mc").focus();
  }
  function closeModal() {
    if (modal.hidden) return;
    modal.hidden = true;
    if (opener && opener.focus) opener.focus();
    opener = null;
  }
  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-modal]");
    if (t) { e.preventDefault(); openModal(t.getAttribute("data-modal"), t); return; }
    if (e.target === modal || e.target.id === "mc") closeModal();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { closeModal(); closeMenu(); return; }
    if (e.key === "Tab" && !modal.hidden) {
      /* keep focus inside the dialog: its link and its Close button */
      var f = modal.querySelectorAll("a[href], button");
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* ---------- entrance: one motion everywhere (short rise + fade) ---------- */
  window.RE_reveal = function (scope) {
    var els = (scope || document).querySelectorAll("[data-reveal]:not(.in), .digits:not(.in)");
    if (!("IntersectionObserver" in window)) { els.forEach(function (el) { el.classList.add("in"); }); return; }
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.2, rootMargin: "0px 0px -6% 0px" });
    els.forEach(function (el) { io.observe(el); });
  };
  /* phone number: every character arrives 45 ms after the one before, overlapping */
  window.RE_digits = function (el) {
    var txt = el.textContent; el.textContent = "";
    el.setAttribute("aria-label", txt);
    for (var i = 0; i < txt.length; i++) {
      var s = document.createElement("span"); s.className = "d"; s.setAttribute("aria-hidden", "true");
      s.textContent = txt[i] === " " ? "  " : txt[i];
      s.style.transitionDelay = (i * 45) + "ms";
      el.appendChild(s);
    }
    el.classList.add("digits");
  };

  /* ---------- switch ---------- */
  window.RE_switch = function (el, onChange) {
    var l = el.querySelector(".lab.l"), r = el.querySelector(".lab.r"), tr = el.querySelector(".track");
    function set(right, instant) {
      el.classList.toggle("right", right);
      l.classList.toggle("on", !right); r.classList.toggle("on", right);
      l.setAttribute("aria-pressed", !right); r.setAttribute("aria-pressed", right);
      onChange(right, !!instant);
    }
    l.addEventListener("click", function () { if (el.classList.contains("right")) set(false); });
    r.addEventListener("click", function () { if (!el.classList.contains("right")) set(true); });
    tr.addEventListener("click", function () { set(!el.classList.contains("right")); });
    set.isRight = function () { return el.classList.contains("right"); };
    return set;
  };
  /* content fades out in 180 ms, swaps, fades back in; the area itself never changes height */
  window.RE_fadeSwap = function (el, fn) {
    clearTimeout(el._swap);
    el.style.transition = "opacity 180ms ease"; el.style.opacity = 0;
    el._swap = setTimeout(function () { fn(); el.style.opacity = 1; }, reduce ? 0 : 180);
  };

  /* ---------- machine page: Considering one / Already run one ---------- */
  var sw = document.getElementById("sw"), panel = document.getElementById("panel");
  if (sw && panel) {
    var note = document.getElementById("swnote");
    var setView = RE_switch(sw, function (right, instant) {
      function apply() { root.setAttribute("data-view", right ? "own" : "considering"); }
      if (instant) apply();
      else { RE_fadeSwap(panel, apply); RE_fadeSwap(note, function () {}); }
      var h = right ? "#own" : location.pathname + location.search;
      if ((right && location.hash !== "#own") || (!right && location.hash)) history.replaceState(null, "", h);
    });
    if (location.hash === "#own") setView(true, true);
    window.addEventListener("hashchange", function () {
      var r = location.hash === "#own";
      if (r !== setView.isRight()) setView(r);
    });
  }

  /* ---------- service page: spare-parts finder ---------- */
  var tabs = document.getElementById("mtabs"), spares = document.getElementById("sparewrap");
  if (tabs && spares) {
    tabs.addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b) return;
      var i = +b.getAttribute("data-i");
      tabs.querySelectorAll("button").forEach(function (x) { x.classList.toggle("on", x === b); x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
      RE_fadeSwap(spares, function () {
        spares.querySelectorAll(".rows").forEach(function (l, k) { l.classList.toggle("on", k === i); });
      });
    });
  }

  /* ---------- phone numbers that arrive digit by digit ---------- */
  document.querySelectorAll("[data-digits]").forEach(RE_digits);
  RE_reveal();
})();
