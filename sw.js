/* Service worker: repeat visits open instantly, even on a weak network.
   Static files: cache first. data/*.json: network first (so price edits show up), cache as fallback.
   Bump VERSION whenever you change files, so phones pick up the new copy. */
var VERSION = "srg-v2";
var CORE = ["./", "index.html", "css/style.css", "js/app.js", "js/fx.js", "data/config.json", "data/products.json", "data/category-images.json", "data/images.json",
  "images/hero.svg", "images/logo.svg", "images/placeholder.svg", "manifest.webmanifest"];

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(VERSION).then(function (c) { return c.addAll(CORE); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (ks) { return Promise.all(ks.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); })); }).then(function () { return self.clients.claim(); }));
});
self.addEventListener("fetch", function (e) {
  var req = e.request, url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== location.origin) return;
  if (/\/data\/.*\.json$/.test(url.pathname)) {
    e.respondWith(fetch(req).then(function (r) { var cp = r.clone(); caches.open(VERSION).then(function (c) { c.put(req, cp); }); return r; }).catch(function () { return caches.match(req); }));
    return;
  }
  e.respondWith(caches.match(req).then(function (hit) {
    return hit || fetch(req).then(function (r) { if (r.ok) { var cp = r.clone(); caches.open(VERSION).then(function (c) { c.put(req, cp); }); } return r; });
  }));
});
