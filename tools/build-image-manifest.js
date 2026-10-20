// Scans images/products and writes data/images.json.
// Name each photo by product number: 12.webp, 12-2.webp, 12-3.jpg ...
// Run:  node tools/build-image-manifest.js
const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");
const dir = path.join(root, "images", "products");
const out = {};
for (const f of fs.existsSync(dir) ? fs.readdirSync(dir).sort() : []) {
  const m = f.match(/^(\d+)(?:-\d+)?\.(webp|jpg|jpeg|png|avif)$/i);
  if (!m) continue;
  (out[m[1]] = out[m[1]] || []).push("images/products/" + f);
}
fs.writeFileSync(path.join(root, "data", "images.json"), JSON.stringify(out, null, 1));
console.log("Products with photos:", Object.keys(out).length);
