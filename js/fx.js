/* Light fireworks for the hero. Pauses off-screen, hidden tabs, reduced motion and very low-end phones. */
(function () {
  "use strict";
  var c = document.getElementById("fx"); if (!c || !c.getContext) return;
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2)) { c.style.display = "none"; return; }
  var x = c.getContext("2d"), W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 2), P = [], run = false, vis = true, next = 0;
  var COL = ["#ffd54f", "#ff7043", "#66bb6a", "#42a5f5", "#ec407a", "#ce93d8", "#26c6da"];
  function size() { var r = c.getBoundingClientRect(); W = r.width; H = r.height; c.width = Math.round(W * dpr); c.height = Math.round(H * dpr); x.setTransform(dpr, 0, 0, dpr, 0, 0); }
  function burst() {
    var cx = W * (0.12 + Math.random() * 0.76), cy = H * (0.1 + Math.random() * 0.5), col = COL[(Math.random() * COL.length) | 0], n = W < 600 ? 26 : 38, off = Math.random();
    for (var i = 0; i < n; i++) { var a = (i / n) * Math.PI * 2 + off, s = 1 + Math.random() * 1.9; P.push({ x: cx, y: cy, vx: Math.cos(a) * s, vy: Math.sin(a) * s, l: 1, c: col }); }
  }
  function tick(t) {
    if (!run) return;
    x.globalCompositeOperation = "destination-out"; x.fillStyle = "rgba(0,0,0,.2)"; x.fillRect(0, 0, W, H);
    x.globalCompositeOperation = "lighter";
    if (t > next) { burst(); next = t + 800 + Math.random() * 900; }
    for (var i = P.length - 1; i >= 0; i--) {
      var p = P[i]; p.x += p.vx; p.y += p.vy; p.vx *= 0.985; p.vy = p.vy * 0.985 + 0.028; p.l -= 0.014;
      if (p.l <= 0) { P.splice(i, 1); continue; }
      x.globalAlpha = p.l; x.fillStyle = p.c; x.beginPath(); x.arc(p.x, p.y, 1.8, 0, 6.283); x.fill();
    }
    x.globalAlpha = 1;
    requestAnimationFrame(tick);
  }
  function go() { var should = vis && !document.hidden; if (should && !run) { run = true; requestAnimationFrame(tick); } else if (!should) run = false; }
  size(); window.addEventListener("resize", size);
  if ("IntersectionObserver" in window) new IntersectionObserver(function (e) { vis = e[0].isIntersecting; go(); }).observe(c);
  document.addEventListener("visibilitychange", go); go();
})();
