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
  var strip = document.getElementById("stripEl"), mn = document.getElementById("mn"), lbot = document.getElementById("lbot");
  var specEl = document.getElementById("spec"), partsEl = document.getElementById("parts");
  var mode = "machine", data = MACH, slots = Array.prototype.slice.call(strip.querySelectorAll(".slot")), N = 7;
  var pos = 1, target = 1, state = "idle", v = 0, lastIdx = null, first = true, dirty = true;
  function mod(a, n) { return ((a % n) + n) % n; }
  function dims() { var card = slots[0].offsetWidth; return { card: card, gap: parseFloat(getComputedStyle(strip).getPropertyValue("--gap")) || 76, w: strip.clientWidth }; }
  function file(item) { return mode === "machine" ? item.img : item.hero; }
  function setSlot(el, item) {
    var p = el.firstChild, f = file(item), src = p.querySelectorAll("source");
    /* below 860 px machine photos come in a 640 px file as well; part photos are one size */
    src[0].srcset = mode === "machine" ? IMG + f.replace(".jpg", "-640.webp") + " 640w, " + IMG + webp(f) + " 1100w" : IMG + webp(f);
    src[1].srcset = IMG + webp(f);
    p.lastChild.src = IMG + f;
    p.lastChild.alt = mode === "machine" ? item.brand + " " + item.model : item.name;
  }
  function draw() {
    var dm = dims(), step = dm.card + dm.gap, cx = dm.w / 2, base = Math.floor(pos), c = Math.round(pos);
    for (var k = 0; k < N; k++) {
      var i = base - 3 + k, el = slots[k], item = data[mod(i, 6)], key = mode + ":" + mod(i, 6), img = el.lastChild.lastChild;
      if (el.dataset.key !== key) { el.dataset.key = key; setSlot(el, item); }
      var rel = i - pos;
      el.style.transform = "translateX(" + (cx + rel * step - dm.card / 2).toFixed(1) + "px)";
      /* window parallax: the photo lags behind its card, so side cards show a cut, the centre shows it whole */
      var sh = Math.max(-1, Math.min(1, rel)) * -0.06 * dm.card;
      img.style.transform = "translateX(" + sh.toFixed(1) + "px)";
      el.classList.toggle("side", i !== c);
      el.dataset.rel = i - c;
    }
    var idx = mod(c, 6);
    if (idx !== lastIdx) { lastIdx = idx; setLabels(idx); }
  }
  function setLabels(idx) {
    mn.classList.add("out"); lbot.classList.add("out");
    clearTimeout(setLabels.t);
    setLabels.t = setTimeout(function () {
      var m = data[idx];
      if (mode === "machine") {
        mn.innerHTML = m.brand + " " + m.model + " <span>· " + m.type + "</span>";
        specEl.innerHTML = m.key.join("<i>·</i>");
        partsEl.innerHTML = m.parts.map(function (p) { return '<a class="part" href="/parts/' + p[2] + '/">' + pic(p[1], /png$/.test(p[1]) ? "png" : "", "", 92) + "<span>" + p[0] + "</span></a>"; }).join("");
      } else {
        mn.innerHTML = m.name;
        specEl.innerHTML = [m.size, m.tol, m.mat].join("<i>·</i>");
        partsEl.innerHTML = '<div class="made"><b>Made on</b>' + m.made.map(function (s) { var x = RE.bySlug(s); return '<a href="/machines/' + s + '/">' + x.brand + " " + x.model + "</a>"; }).join("") + "</div>";
      }
      mn.classList.remove("out"); lbot.classList.remove("out");
    }, first ? 0 : 200);
    first = false;
  }
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
    var rc = strip.getBoundingClientRect(), dm = dims(), x = e.clientX - rc.left, cx = rc.width / 2, dz0 = cx - dm.card / 2, dz1 = cx + dm.card / 2;
    if (x < dz0 || x > dz1) { var f = Math.min(1, (x < dz0 ? dz0 - x : x - dz1) / dz0); v = (x < dz0 ? -1 : 1) * (0.3 + 1.5 * f * f); state = "drive"; }
    else if (state === "drive") snap(Math.round(pos));
  });
  strip.addEventListener("mouseleave", function () { if (state === "drive") snap(Math.round(pos)); });
  var dragged = false;
  function open(it) { location.href = mode === "machine" ? "/machines/" + it.slug + "/" : "/parts/" + it.slug + "/"; }
  strip.addEventListener("click", function (e) {
    if (dragged) { dragged = false; return; }
    var rc = strip.getBoundingClientRect(), dm = dims(), x = e.clientX - rc.left, cx = rc.width / 2;
    if (x < cx - dm.card / 2) snap(Math.round(pos) - 1);
    else if (x > cx + dm.card / 2) snap(Math.round(pos) + 1);
    else open(data[mod(Math.round(pos), 6)]);
  });
  /* touch and pen: the strip follows the finger, then settles on the nearest card */
  var tch = null;
  strip.addEventListener("pointerdown", function (e) {
    if (e.pointerType === "mouse") return;
    lastTouch = performance.now(); dragged = false;
    tch = { id: e.pointerId, x: e.clientX, p: pos, start: Math.round(pos), moved: false };
    state = "idle";
  });
  strip.addEventListener("pointermove", function (e) {
    if (!tch || e.pointerId !== tch.id) return;
    var dx = e.clientX - tch.x;
    if (Math.abs(dx) > 8) tch.moved = true;
    if (tch.moved) { var dm = dims(); pos = tch.p - dx / (dm.card + dm.gap); dirty = true; }
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
    pos = Math.round(pos); target = pos; state = "idle"; lastIdx = null; draw();
  });
  strip.classList.add("ready");
  draw(); requestAnimationFrame(tick);

  /* ---------- checkerboard: on touch screens the first tap opens a tile, the second follows the link ---------- */
  if (window.matchMedia("(hover: none)").matches) {
    var cols = Array.prototype.slice.call(document.querySelectorAll(".board .col"));
    cols.forEach(function (c) {
      c.querySelector("a.cover").addEventListener("click", function (e) {
        if (!c.classList.contains("open")) { e.preventDefault(); cols.forEach(function (x) { x.classList.remove("open"); }); c.classList.add("open"); }
      });
    });
  }

  /* ---------- since 1998: plays once on arrival, no scroll needed ---------- */
  var since = document.getElementById("since");
  if (reduce || !("IntersectionObserver" in window)) since.classList.add("in");
  else {
    var io = new IntersectionObserver(function (en) { if (en[0].isIntersecting) { since.classList.add("in"); io.disconnect(); } }, { threshold: 0.45 });
    io.observe(since);
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
