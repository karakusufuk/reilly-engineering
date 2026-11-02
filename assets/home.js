/* Reilly Engineering — home page: machine strip, checkerboard on touch, Since 1998, implant.
   Carried over from the approved board; thresholds, durations and curves are unchanged. */
(function () {
  var RE = window.RE, reduce = window.RE_reduce;
  var MACH = RE.machines, FAM = RE.families;
  var IMG = "/assets/img/";
  function webp(f) { return f.replace(/\.(jpg|png)$/, ".webp"); }
  function pic(f, cls, alt, size) {
    return '<picture><source type="image/webp" srcset="' + IMG + webp(f) + '"><img class="' + cls + '" src="' + IMG + f + '" alt="' + alt + '" width="' + size + '" height="' + size + '"></picture>';
  }

  /* ---------- strip ---------- */
  var strip = document.getElementById("stripEl"), mn = document.getElementById("mn"), ptl = document.getElementById("ptl"), lbot = document.getElementById("lbot");
  var specEl = document.getElementById("spec"), partsEl = document.getElementById("parts"), whyEl = document.getElementById("why");
  var mode = "machine", data = MACH, slots = Array.prototype.slice.call(strip.querySelectorAll(".slot")), N = 7;
  var pos = 1, target = 1, state = "idle", v = 0, lastIdx = null, first = true, dirty = true;
  var phone = window.matchMedia("(max-width: 760px)");
  /* width of each machine inside its 4:3 cut-out, as a share of the frame (measured from the images) */
  var MW = { "aldner-vx-850": 0.644, "aldner-rx-5": 0.602, "hoshida-tl-42": 0.749, "hoshida-sw-20": 0.788, "aldner-mt-400": 0.784, "hoshida-ew-60": 0.708 };
  function mod(a, n) { return ((a % n) + n) % n; }
  /* Geometry is measured once per layout (load, resize, mode switch), never while swiping, so nothing changes size mid-swipe.
     X[j] is the centre of item j measured from item 0 (j = 0..6, X[6] = one full turn). On a phone the machines share one
     fixed frame and stand an even gap apart, measured from their own widths, so a part of the next machine always shows on
     both sides; elsewhere every step is the same (card + gap), as before. */
  var geo = { w: 1, card: 1, X: [0, 1, 2, 3, 4, 5, 6], fixed: false };
  function measure() {
    var w = strip.clientWidth, h = strip.clientHeight, g = { w: w, fixed: phone.matches && mode === "machine", X: [0] };
    if (phone.matches) {
      /* the machine frame: the widest machine leaves a 3% gap and a 7% view of each neighbour; the frame stands low in the
         strip, so the machine and its reflection come down towards the name and the room's wall rises above it */
      var mc = Math.floor(Math.min((w - 2 * w * (0.07 + 0.03)) / 0.79, h * 0.9 * 4 / 3)), mh = Math.round(mc * 0.75);
      g.mc = mc; g.mh = mh; g.mtop = Math.round((h - mh) * 0.72); g.vgap = Math.round(w * 0.03);
      strip.style.setProperty("--mc", mc + "px"); strip.style.setProperty("--mh", mh + "px"); strip.style.setProperty("--mtop", g.mtop + "px");
    }
    if (g.fixed) {
      g.card = g.mc;
      for (var j = 0; j < 6; j++) g.X.push(g.X[j] + (MW[data[j].slug] + MW[data[(j + 1) % 6].slug]) * g.mc / 2 + g.vgap);
    } else {
      g.card = slots[0].offsetWidth;
      var step = g.card + (parseFloat(getComputedStyle(strip).getPropertyValue("--gap")) || 76);
      for (var k = 1; k <= 6; k++) g.X.push(k * step);
    }
    geo = g;
  }
  /* centre of (fractional) item p, and its inverse */
  function at(p) { var f = Math.floor(p), n = Math.floor(f / 6), j = mod(f, 6), C = geo.X[6]; return n * C + geo.X[j] + (p - f) * (geo.X[j + 1] - geo.X[j]); }
  function posAt(x) { var C = geo.X[6], n = Math.floor(x / C), r = x - n * C, j = 0; while (j < 5 && geo.X[j + 1] <= r) j++; return n * 6 + j + (r - geo.X[j]) / (geo.X[j + 1] - geo.X[j]); }
  /* half the width of what can be clicked as the centre item: the machine itself on a phone, the whole frame elsewhere */
  function half(p) { return geo.fixed ? MW[data[mod(Math.round(p), 6)].slug] * geo.card / 2 : geo.card / 2; }
  function file(item) { return mode === "machine" ? "cut-" + item.slug + ".webp" : item.hero; }
  function setSlot(el, item) {
    var p = el.firstChild, f = file(item), src = p.querySelectorAll("source");
    if (mode === "machine") {
      var b = IMG + "cut-" + item.slug;
      src[0].srcset = b + "-640.webp 640w, " + b + "-1000.webp 1000w, " + b + ".webp 1600w";
      src[0].sizes = "(max-width: 860px) 90vw, 820px";
      src[1].srcset = b + ".webp";
      p.lastChild.src = b + ".webp";
    } else {
      src[0].removeAttribute("sizes"); src[0].srcset = IMG + webp(f);
      src[1].srcset = IMG + webp(f);
      p.lastChild.src = IMG + f;
    }
    p.lastChild.alt = mode === "machine" ? item.brand + " " + item.model : item.name;
  }
  function draw() {
    var base = Math.floor(pos), c = Math.round(pos), x0 = at(pos);
    for (var k = 0; k < N; k++) {
      var i = base - 3 + k, el = slots[k], item = data[mod(i, 6)], key = mode + ":" + mod(i, 6);
      if (el.dataset.key !== key) { el.dataset.key = key; setSlot(el, item); }
      el.style.transform = "translateX(" + (geo.w / 2 + at(i) - x0 - geo.card / 2).toFixed(1) + "px)";
      el.classList.toggle("side", i !== c);
      el.dataset.rel = i - c;
    }
    var idx = mod(c, 6);
    if (idx !== lastIdx) { lastIdx = idx; setLabels(); }
  }
  function fill(idx) {
    var m = data[idx];
    if (mode === "machine") {
      mn.innerHTML = ptl.innerHTML = m.brand + " " + m.model + " <span>· " + m.type + "</span>";
      specEl.innerHTML = m.key.join("<i>·</i>");
      whyEl.textContent = m.why || ""; whyEl.hidden = !m.why;
      partsEl.innerHTML = m.parts.map(function (p) { return '<a class="part" href="/parts/' + p[2] + '/">' + pic(p[1], /png$/.test(p[1]) ? "png" : "", "", 92) + "<span>" + p[0] + "</span></a>"; }).join("");
    } else {
      mn.innerHTML = ptl.innerHTML = m.name;
      specEl.innerHTML = [m.size, m.tol, m.mat].join("<i>·</i>");
      whyEl.textContent = ""; whyEl.hidden = true;
      partsEl.innerHTML = '<div class="made"><b>Made on</b>' + m.made.map(function (s) { var x = RE.bySlug(s); return '<a href="/machines/' + s + '/">' + x.brand + " " + x.model + "</a>"; }).join("") + "</div>";
    }
  }
  /* a clean swap: the old name fades out (200 ms) and is only replaced once it has fully gone, then the new one fades up,
     so two names are never on screen together; another change while it is fading in sends it out again first */
  function setLabels() {
    cancelAnimationFrame(setLabels.f);
    if (first) { first = false; fill(lastIdx); return; }
    mn.classList.add("out"); lbot.classList.add("out");
    var t0 = performance.now();
    (function gone() {
      if (Math.max(+getComputedStyle(mn).opacity, +getComputedStyle(lbot).opacity) > 0 && performance.now() - t0 < 600) { setLabels.f = requestAnimationFrame(gone); return; }
      fill(lastIdx); mn.classList.remove("out"); lbot.classList.remove("out");
    })();
  }
  /* the floor starts where the machines' bases are about half-way down the floor: measured from the machine frame, so every
     screen shape keeps the same room (on a phone the frame is a fixed size inside the strip; elsewhere it is the strip) */
  var heroEl = document.getElementById("hero"), roomEl = heroEl.querySelector(".room");
  function layoutRoom() {
    var hr = heroEl.getBoundingClientRect(), sr = strip.getBoundingClientRect();
    var top = phone.matches ? geo.mtop : 0, h = phone.matches ? geo.mh : sr.height;
    roomEl.style.setProperty("--hy", Math.round(sr.top - hr.top + top + h * 0.50) + "px");
  }
  function relayout() { measure(); layoutRoom(); dirty = true; }
  var lastW = 0, lastH = 0;
  addEventListener("resize", function () {
    /* iOS fires resize when its toolbar folds away; the hero is sized on the small viewport, so only a real change counts */
    if (strip.clientWidth === lastW && strip.clientHeight === lastH) return;
    lastW = strip.clientWidth; lastH = strip.clientHeight; relayout();
  });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(relayout);
  measure(); layoutRoom();
  var last = performance.now();
  function tick(now) {
    var dt = Math.min(0.05, (now - last) / 1000); last = now;
    if (state === "drive") { pos += v * dt; dirty = true; }
    else if (state === "snap") { pos += (target - pos) * Math.min(1, dt * (reduce ? 60 : 7)); if (Math.abs(target - pos) < 0.002) { pos = target; state = "idle"; } dirty = true; }
    if (dirty) { dirty = false; draw(); }
    requestAnimationFrame(tick);
  }
  function snap(t) { target = t; state = "snap"; }
  var lastTouch = -1e9;
  strip.addEventListener("mousemove", function (e) {
    if (performance.now() - lastTouch < 800) return;
    var rc = strip.getBoundingClientRect(), x = e.clientX - rc.left, cx = rc.width / 2, dz0 = cx - geo.card / 2, dz1 = cx + geo.card / 2;
    if (x < dz0 || x > dz1) { var f = Math.min(1, (x < dz0 ? dz0 - x : x - dz1) / dz0); v = (x < dz0 ? -1 : 1) * (0.3 + 1.5 * f * f); state = "drive"; }
    else if (state === "drive") snap(Math.round(pos));
  });
  strip.addEventListener("mouseleave", function () { if (state === "drive") snap(Math.round(pos)); });
  var dragged = false;
  function open(it) { location.href = mode === "machine" ? "/machines/" + it.slug + "/" : "/parts/" + it.slug + "/"; }
  strip.addEventListener("click", function (e) {
    if (dragged) { dragged = false; return; }
    var rc = strip.getBoundingClientRect(), x = e.clientX - rc.left, cx = rc.width / 2, hw = half(pos);
    if (x < cx - hw) snap(Math.round(pos) - 1);
    else if (x > cx + hw) snap(Math.round(pos) + 1);
    else open(data[mod(Math.round(pos), 6)]);
  });
  /* touch and pen: the strip follows the finger, then settles on the nearest card */
  var tch = null;
  strip.addEventListener("pointerdown", function (e) {
    if (e.pointerType === "mouse") return;
    lastTouch = performance.now(); dragged = false;
    tch = { id: e.pointerId, x: e.clientX, x0: at(pos), start: Math.round(pos), moved: false };
    state = "idle";
  });
  strip.addEventListener("pointermove", function (e) {
    if (!tch || e.pointerId !== tch.id) return;
    var dx = e.clientX - tch.x;
    if (Math.abs(dx) > 8) tch.moved = true;
    if (tch.moved) { pos = posAt(tch.x0 - dx); dirty = true; }
  });
  function release(e) {
    if (!tch || e.pointerId !== tch.id) return;
    lastTouch = performance.now();
    if (tch.moved) {
      dragged = true;
      var t = Math.round(pos);
      if (t === tch.start) t += pos > tch.start ? 1 : (pos < tch.start ? -1 : 0);
      if (Math.abs(pos - tch.start) < 0.08) t = tch.start;
      snap(t);
    }
    tch = null;
  }
  strip.addEventListener("pointerup", release);
  strip.addEventListener("pointercancel", release);
  strip.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") { e.preventDefault(); snap(Math.round(target) - 1); }
    else if (e.key === "ArrowRight") { e.preventDefault(); snap(Math.round(target) + 1); }
    else if (e.key === "Enter") { e.preventDefault(); open(data[mod(Math.round(pos), 6)]); }
  });
  RE_switch(document.getElementById("sw"), function (right) {
    var m = right ? "part" : "machine"; if (m === mode) return;
    mode = m; data = right ? FAM : MACH;
    strip.classList.toggle("m", !right); strip.classList.toggle("p", right);
    slots.forEach(function (el) { el.dataset.key = ""; });
    pos = Math.round(pos); target = pos; state = "idle"; lastIdx = null; measure(); draw();
  });
  phone.addEventListener && phone.addEventListener("change", relayout);
  lastW = strip.clientWidth; lastH = strip.clientHeight;
  strip.classList.add("ready");
  draw(); requestAnimationFrame(tick);

  /* ---------- checkerboard ----------
     phones: when scrolling comes to rest, the card at the middle of the screen opens (its hover state, played once);
     passing cards while scrolling opens nothing, and only one card is ever open. A tap follows the card's link.
     other touch screens: the first tap opens a tile, the second follows the link */
  var cols = Array.prototype.slice.call(document.querySelectorAll(".board .col")), board = document.querySelector(".board");
  cols.forEach(function (c) {
    c.querySelector("a.cover").addEventListener("click", function (e) {
      if (phone.matches || !window.matchMedia("(hover: none)").matches) return;
      if (!c.classList.contains("open")) { e.preventDefault(); cols.forEach(function (x) { x.classList.remove("open"); }); c.classList.add("open"); }
    });
  });
  var rest = null;
  function settle() {
    if (!phone.matches) return;
    var mid = window.innerHeight / 2, br = board.getBoundingClientRect(), pick = null, best = 1e9;
    if (br.top <= mid && br.bottom >= mid) cols.forEach(function (c) {
      var r = c.getBoundingClientRect(), d = r.top > mid ? r.top - mid : (r.bottom < mid ? mid - r.bottom : 0);
      if (d < best) { best = d; pick = c; }
    });
    cols.forEach(function (c) { if (c !== pick) c.classList.remove("open"); });
    if (pick) pick.classList.add("open");
  }
  window.addEventListener("scroll", function () { clearTimeout(rest); if (phone.matches) rest = setTimeout(settle, 160); }, { passive: true });
  phone.addEventListener && phone.addEventListener("change", function () { cols.forEach(function (c) { c.classList.remove("open"); }); });

  /* ---------- since 1998: plays once on arrival, no scroll needed ---------- */
  var since = document.getElementById("since");
  if (reduce || !("IntersectionObserver" in window)) since.classList.add("in", "tin");
  else {
    var io = new IntersectionObserver(function (en) { if (en[0].isIntersecting) { since.classList.add("in"); io.disconnect(); } }, { threshold: 0.45 });
    io.observe(since);
    /* phones: the line starts as soon as about half of the photo is on screen, not after the photo has finished */
    var iot = new IntersectionObserver(function (en) { if (en[0].isIntersecting) { since.classList.add("tin"); iot.disconnect(); } }, { threshold: 0.5 });
    iot.observe(since.querySelector(".br-in"));
  }
  var sinceP = document.getElementById("sinceP");
  function sinceScroll() {
    var rc = since.getBoundingClientRect(), d = (rc.top + rc.height / 2) - window.innerHeight / 2;
    sinceP.style.transform = "translateY(" + (reduce ? "0" : (d * 0.55).toFixed(1)) + "px)";
  }
  window.addEventListener("scroll", sinceScroll, { passive: true }); sinceScroll();

  /* ---------- implant: three photo layers; the screw turns while it travels ---------- */
  var implant = document.getElementById("implant");
  /* the three implant layers (about 550 KB) are only fetched when the section is within a couple of screens */
  function loadImplant() { Array.prototype.forEach.call(document.querySelectorAll("#stage image[data-href]"), function (im) { im.setAttribute("href", im.getAttribute("data-href")); im.removeAttribute("data-href"); }); }
  if ("IntersectionObserver" in window) {
    var ioi = new IntersectionObserver(function (en) { if (en[0].isIntersecting) { loadImplant(); ioi.disconnect(); } }, { rootMargin: "2200px 0px" });
    ioi.observe(implant);
  } else loadImplant();
  var BODY = { y: 720 }, PITCH = 42.1, TURNS = 2, BAND_TOP = 116, BAND_END = 458;
  var LBL = ["Implant body · Ti-6Al-4V", "Abutment · torqued to 35 Ncm", "Crown · seated on a ±5 µm fit"];
  var LBL_POS = [[500, 1030], [520, 582], [676, 352]];
  var gBody = document.getElementById("gBody"), iThr = document.getElementById("iThr"), iAbut = document.getElementById("iAbut"), iCrown = document.getElementById("iCrown");
  var gLbl = document.getElementById("gLbl"), lblTxt = document.getElementById("lblTxt");
  var segs = Array.prototype.slice.call(document.querySelectorAll("#segs i"));
  var DROP1 = 320, DROP = 300;
  function clamp(x) { return Math.max(0, Math.min(1, x)); }
  function ease(x) { return 1 - Math.pow(1 - x, 3); }
  function progress(el) {
    /* starts when the section's top reaches the middle of the screen, ends when the sticky stage lets go */
    var rc = el.getBoundingClientRect(), vh = window.innerHeight, start = vh * 0.5, range = start + el.offsetHeight - (vh - 68);
    return clamp((start - rc.top) / Math.max(1, range));
  }
  function onScroll() {
    /* the three steps finish at 82% of the section; the rest holds the assembled implant */
    var p = reduce ? 3 : Math.min(3, progress(implant) * 3 / 0.82);
    var s1 = ease(clamp(p)), s2 = ease(clamp(p - 1)), s3 = ease(clamp(p - 2));
    var o1 = (1 - s1) * -DROP1, o2 = (1 - s2) * -DROP, o3 = (1 - s3) * -DROP;
    gBody.setAttribute("transform", "translate(0 " + o1.toFixed(1) + ")");
    /* screwing in: one thread pitch of travel = one turn, so over the whole descent the helix drifts down by two pitches (TURNS × PITCH).
       u is the travel still to go. The copy is mapped so that row y of the band shows body row  y + u·(BAND_END − y)/(BAND_END − BAND_TOP):
       a full u at the collar, falling linearly to 0 at the foot of the band. It only ever takes threads from inside the band, it lands
       exactly on the plain body when seated (u = 0) and never wraps or dissolves. As one image: scale 1/a, shift ty, a = 1 − u/band. */
    var u = TURNS * PITCH - (DROP1 + o1) / DROP1 * TURNS * PITCH;
    if (u < 0.0005) u = 0;
    var a = 1 - u / (BAND_END - BAND_TOP), sc = 1 / a;
    iThr.setAttribute("transform", "matrix(1 0 0 " + sc.toFixed(5) + " 0 " + (BODY.y * (1 - sc) - (BAND_END * u / (BAND_END - BAND_TOP)) * sc).toFixed(3) + ")");
    window.RE_threadU = u;
    iAbut.setAttribute("transform", "translate(0 " + o2.toFixed(1) + ")");
    iCrown.setAttribute("transform", "translate(0 " + o3.toFixed(1) + ")");
    iAbut.style.opacity = clamp((p - 0.85) / 0.2).toFixed(3);
    iCrown.style.opacity = clamp((p - 1.85) / 0.2).toFixed(3);
    var step = Math.min(2, Math.floor(p + 0.0001));
    lblTxt.textContent = LBL[step];
    var lp = LBL_POS[step], lo = [o1, o2, o3][step];
    gLbl.setAttribute("transform", "translate(" + lp[0] + " " + (lp[1] + lo).toFixed(1) + ")");
    segs.forEach(function (el, i) { el.style.transform = "scaleX(" + clamp(p - i).toFixed(3) + ")"; });
    window.RE_implantP = p;
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", function () { dirty = true; onScroll(); sinceScroll(); });
  onScroll();
})();
