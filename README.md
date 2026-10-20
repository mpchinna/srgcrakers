# Sri Raja Guberan Crackers - Website v2 (Tamil-first premium design)

Static site (HTML + CSS + JS). No build step, no server, no monthly cost.

## Folder map
```
index.html                 page
css/style.css              styles
js/app.js                  catalogue, cart, WhatsApp order
js/fx.js                   hero fireworks (auto-pauses off screen / low-end phones)
sw.js                      offline/fast repeat visits (bump VERSION after edits)
manifest.webmanifest       "Add to home screen"
_headers                   cache rules for Cloudflare Pages / Netlify
data/config.json           shop name, phones, WhatsApp number, offer, combos, sheet link
data/products.json         all 176 products (id, category, English, Tamil, unit, MRP, price)
data/category-images.json  which picture each category uses
data/images.json           real product photos found in images/products (auto-built)
images/categories/         21 category pictures (SVG)
images/products/           PUT REAL PRODUCT PHOTOS HERE (12.webp, 12-2.webp ...)
images/hero.svg, logo.svg, placeholder.svg
tools/                     gen-art.py (regenerate pictures), build-image-manifest.js
```

## Everyday changes
- **Phone / WhatsApp number, offer text, combos, minimum order:** edit `data/config.json`.
- **Prices or product names:** edit `data/products.json` (`price` = what the customer pays, `mrp` = struck-through price).
- **Districts shown in the order form:** edit `"districts"` in `config.json`.
- **Tamil texts (hours, offer badge):** `hoursTa`, `badgeTa`, `discountLabelTa`, `discountNoteTa` in `config.json`.
- **Hide the strike-through and "80% OFF":** set `"showDiscount": false` in `config.json`.
- **Minimum order:** set `"minOrder": 2000` (0 = off).
- **Product photos:** save as `images/products/<product number>.webp` (extra photos: `12-2.webp`, `12-3.webp`), about 400 px wide, 30-60 KB. Then run `node tools/build-image-manifest.js` and upload again. Products without a photo show their category picture.
- **YouTube videos:** add under `"media"` in `config.json`, e.g. `"12": { "img": [], "yt": ["https://youtu.be/XXXXXXXXXXX"] }`.
- **Google Sheet (optional, no code edits afterwards):** publish the Media sheet as CSV and paste the link in `"sheetCsvUrl"`. Columns recognised: `S.No`, `Image 1-4`, `Video 1-3`, and optionally `Offer` (price), `MRP`, `In stock` (type `No` to mark out of stock).
- After any change, edit `VERSION` in `sw.js` (e.g. `srg-v2`) so customers' phones refresh.

## Hosting free on Cloudflare Pages
1. Cloudflare dashboard > Workers & Pages > Create > Pages > Upload assets.
2. Name the project (e.g. `srg-crackers`), upload this folder's contents (or the zip contents), Deploy.
3. Your site is live at `https://srg-crackers.pages.dev`. Add a custom domain later under Custom domains.
4. To update: Create deployment > upload the changed folder again.

## WhatsApp
Orders use a `wa.me` click-to-chat link: free, no API, the customer taps Send. Use the free WhatsApp Business app on the shop number for catalogue, quick replies and away messages.

## Please check before going live
- Online sale of crackers is restricted in some Indian states. The site is a catalogue and enquiry tool; the order is confirmed on WhatsApp or phone.
- Add the licence number in `config.json` (`licenceNo`); it appears in the footer.
- "80% OFF" is calculated from the MRP values in the original price list (MRP = 5 x price). Use real MRPs or switch the discount display off if they are not.
- Combo packs are sample bundles built from existing items. Change the item numbers in `config.json` to what you want to sell.
