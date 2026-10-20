/* Sri Raja Guberan Crackers v2 - Tamil-first catalogue + WhatsApp cart. Plain JS, no libraries. */
(function () {
  "use strict";
  var BATCH = 24;
  var $ = function (id) { return document.getElementById(id); };
  var rs = function (n) { return "₹" + Number(n).toLocaleString("en-IN", { maximumFractionDigits: 2 }); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };

  var T = {
    ta: {
      nCombo: "காம்போ", nList: "விலைப் பட்டியல்", nVisit: "கடை முகவரி",
      heroEyebrow: "சிவகாசி  •  தீபாவளி 2026", heroH1a: "சிவகாசியிலிருந்து நேரடியாக,", heroH1b: "உங்கள் தீபாவளிக்கு",
      heroSub: "176 வகை பட்டாசுகள். தள்ளுபடி விலை. விரும்பியதை தேர்வு செய்து WhatsApp-ல் ஆர்டர் அனுப்புங்கள்.",
      ctaList: "விலைப் பட்டியல் பார்", ctaWa: "WhatsApp-ல் பேசு",
      t1: "176 வகை பட்டாசுகள்", t2: "சிவகாசி தள்ளுபடி விலை", t3: "எல்லா நாளும் திறந்திருக்கும்", t4: "WhatsApp-ல் எளிய ஆர்டர்",
      howT: "ஆர்டர் செய்வது எப்படி?",
      s1t: "தேர்வு செய்யுங்கள்", s1d: "வகை, விலை அல்லது பெயர் மூலம் தேடுங்கள்.",
      s2t: "கார்ட்டில் சேருங்கள்", s2d: "எண்ணிக்கையை மாற்றலாம். மொத்த தொகை உடனே தெரியும்.",
      s3t: "WhatsApp-ல் அனுப்புங்கள்", s3d: "தயாரான செய்தி திறக்கும். Send அழுத்தினால் போதும். இருப்பு, டெலிவரியை நாங்கள் உறுதி செய்வோம்.",
      comboT: "தயார் காம்போ பேக்குகள்", comboS: "குடும்பத்துடன் கொண்டாட, ஒரே தொடுதலில் முழு பெட்டி.",
      listT: "முழு விலைப் பட்டியல்", listS: "விலை ஒவ்வொன்றுக்கும் குறிப்பிட்ட அளவுக்கானது (பெட்டி / பாக்கெட் / பை).",
      search: "பட்டாசு பெயர் தேடுங்கள்...", all: "அனைத்தும்",
      bAll: "எல்லா விலையும்", b1: "₹100-க்குள்", b2: "₹500-க்குள்", b3: "₹1,000-க்குள்", b4: "₹1,000-க்கு மேல்",
      sDef: "பட்டியல் வரிசை", sAsc: "விலை: குறைவு முதல்", sDesc: "விலை: அதிகம் முதல்",
      add: "கார்ட்டில் சேர்", save: "சேமிப்பு", per: "ஒன்றுக்கு", itemWord: "எண்", video: "▶ வீடியோ", out: "இருப்பு இல்லை",
      items: ["பொருள்", "பொருட்கள்"], order: "ஆர்டர் பார்", yourOrder: "உங்கள் ஆர்டர்", clear: "அழி", send: "WhatsApp-ல் அனுப்பு",
      empty: "இன்னும் எதுவும் சேர்க்கவில்லை. மூடிவிட்டு பட்டாசுகளை தேர்வு செய்யுங்கள்.", none: "எதுவும் கிடைக்கவில்லை",
      actual: "அசல் விலை மொத்தம்", less: "கழிவு", total: "ஆர்டர் மொத்தம்", youSave: "நீங்கள் சேமிப்பது",
      name: "உங்கள் பெயர்", mob: "மொபைல் எண்", dist: "உங்கள் மாவட்டம்", adr: "ஊர் / டெலிவரி முகவரி (விருப்பம்)",
      inc: "WhatsApp செய்தியில் படம் மற்றும் வீடியோ இணைப்புகளை சேர்",
      long1: "ஆர்டர் நீளமானது: படங்களின் இணைப்புகள் நீக்கப்பட்டன.", long2: "ஆர்டர் மிக நீளமானது: படம், வீடியோ இணைப்புகள் நீக்கப்பட்டன.",
      minNeed: "குறைந்தபட்ச ஆர்டர் {min}. இன்னும் {more} சேர்க்கவும்.", minOk: "குறைந்தபட்ச ஆர்டர் தொகையை எட்டிவிட்டீர்கள்.",
      confirmClear: "எல்லாவற்றையும் அழிக்கவா?", yesClear: "ஆம், அழி", combosAdd: "பேக் சேர்", comboAdded: "சேர்க்கப்பட்டது ✓", pcs: "பீஸ்", more: "மேலும்", hot: "அதிகம் விரும்பப்படுவது",
      visitT: "கடைக்கு வாருங்கள்", mapBtn: "வரைபடத்தில் பார்", youtube: "YouTube-ல் திற ↗", lic: "உரிம எண்:",
      safeT: "பாதுகாப்பு குறிப்புகள்",
      sf1: "பட்டாசுகளை வீடு, உலர்ந்த இலைகளிலிருந்து தள்ளி திறந்த வெளியில் வெடியுங்கள்.",
      sf2: "குழந்தைகள் எப்போதும் பெரியவர்களின் மேற்பார்வையில் மட்டுமே வெடிக்க வேண்டும்.",
      sf3: "அருகில் ஒரு வாளி தண்ணீர் அல்லது மணல் வைத்திருங்கள்.",
      sf4: "பருத்தி ஆடை, காலணி அணியுங்கள். பட்டாசுகளை பாக்கெட்டில் வைக்காதீர்கள்.",
      sf5: "வெடிக்காத பட்டாசை மீண்டும் பற்ற வைக்காதீர்கள். சிறிது நேரம் கழித்து தண்ணீரில் நனையுங்கள்.",
      faqT: "அடிக்கடி கேட்கப்படும் கேள்விகள்",
      q1: "ஆர்டர் எப்படி செய்வது?", a1: "பட்டாசுகளை கார்ட்டில் சேர்த்து, பெயர், மொபைல் எண், மாவட்டத்தை நிரப்புங்கள். WhatsApp-ல் தயாரான செய்தி திறக்கும். Send அழுத்தினால் போதும்.",
      q2: "பட்டியலில் உள்ள விலை இறுதியானதா?", a2: "பட்டியலில் உள்ள விலை அந்தந்த அளவுக்கானது. இருப்பு, டெலிவரி மற்றும் இறுதி தொகையை WhatsApp அல்லது போனில் உறுதி செய்வோம்.",
      q3: "கடைக்கு நேரில் வரலாமா?", a3: "வரலாம். கடை எல்லா நாட்களும் திறந்திருக்கும். முகவரி மற்றும் வரைபட இணைப்பு மேலே உள்ளது.",
      fnote: "இந்த தளம் பட்டியல் மற்றும் விசாரணைக்கானது. ஆர்டர் WhatsApp அல்லது போனில் உறுதி செய்யப்படும்.",
      doneT: "ஆர்டர் அனுப்பப்பட்டதா?", doneP: "WhatsApp திறந்து Send அழுத்தியிருந்தால், விலை, இருப்பு, டெலிவரியை நாங்கள் உறுதி செய்வோம். திறக்கவில்லை என்றால் அழையுங்கள்:",
      keep: "கார்ட் இருக்கட்டும்", fresh: "புதிய ஆர்டர்", lang: "EN", callLbl: "அழை", shown: "{a} / {b} பொருட்கள் காட்டப்படுகின்றன"
    },
    en: {
      nCombo: "Combo packs", nList: "Price list", nVisit: "Visit us",
      heroEyebrow: "SIVAKASI  •  DIWALI 2026", heroH1a: "Straight from Sivakasi,", heroH1b: "for your Diwali",
      heroSub: "176 crackers at discount prices. Pick what you like and send your order on WhatsApp.",
      ctaList: "View price list", ctaWa: "Chat on WhatsApp",
      t1: "176 crackers", t2: "Sivakasi discount prices", t3: "Open every day", t4: "Easy WhatsApp ordering",
      howT: "How to order",
      s1t: "Pick your crackers", s1d: "Search by name, or filter by type and budget.",
      s2t: "Add to cart", s2d: "Change quantities. The total updates instantly.",
      s3t: "Send on WhatsApp", s3d: "A ready message opens. Just press Send. We confirm stock and delivery with you.",
      comboT: "Ready-made combo packs", comboS: "One tap for a full box to celebrate with the family.",
      listT: "Full price list", listS: "Each price is for the unit shown (box / packet / bag).",
      search: "Search crackers...", all: "All",
      bAll: "Any price", b1: "Under ₹100", b2: "Under ₹500", b3: "Under ₹1,000", b4: "Above ₹1,000",
      sDef: "List order", sAsc: "Price: low to high", sDesc: "Price: high to low",
      add: "Add to Cart", save: "Save", per: "per", itemWord: "No.", video: "▶ Video", out: "Out of stock",
      items: ["item", "items"], order: "View order", yourOrder: "Your Order", clear: "Clear", send: "Send on WhatsApp",
      empty: "Nothing added yet. Close this and pick some crackers.", none: "No items found",
      actual: "Total at actual price", less: "Less", total: "Order Total", youSave: "You save",
      name: "Your name", mob: "Mobile number", dist: "Your district", adr: "Town / delivery address (optional)",
      inc: "Include photo and video links in the WhatsApp message",
      long1: "Order is long: photo links were left out.", long2: "Order is very long: photo and video links were left out.",
      minNeed: "Minimum order is {min}. Add {more} more.", minOk: "Minimum order reached.",
      confirmClear: "Clear everything?", yesClear: "Yes, clear", combosAdd: "Add pack", comboAdded: "Added ✓", pcs: "pcs", more: "more", hot: "Most popular",
      visitT: "Visit the shop", mapBtn: "Open in Maps", youtube: "Open on YouTube ↗", lic: "Licence No:",
      safeT: "Safety tips",
      sf1: "Light crackers outdoors in an open area, away from houses and dry leaves.",
      sf2: "Children must only light crackers under adult supervision.",
      sf3: "Keep a bucket of water or sand nearby.",
      sf4: "Wear cotton clothes and footwear. Never carry crackers in your pockets.",
      sf5: "Never relight a cracker that did not go off. Wait, then soak it in water.",
      faqT: "Common questions",
      q1: "How do I order?", a1: "Add crackers to the cart, fill in your name, mobile number and district. A ready message opens in WhatsApp. Just press Send.",
      q2: "Is the listed price final?", a2: "Each price is for the unit shown. We confirm stock, delivery and the final amount with you on WhatsApp or by phone.",
      q3: "Can I visit the shop?", a3: "Yes. The shop is open every day. The address and map link are above.",
      fnote: "This site is a catalogue and enquiry tool. Orders are confirmed on WhatsApp or by phone.",
      doneT: "Order sent?", doneP: "If WhatsApp opened and you pressed Send, we will confirm price, stock and delivery with you. If it did not open, call us:",
      keep: "Keep cart", fresh: "New order", lang: "தமிழ்", callLbl: "Call", shown: "Showing {a} of {b} items"
    }
  };
  var GT = { "Sound & Bombs": "சத்தம் & வெடி", "Pots & Chakkar": "பூச்சட்டி & சக்கரம்", "Sparklers": "கம்பி மத்தாப்பு", "Rockets & Shots": "ராக்கெட் & ஷாட்", "Fancy Pipes": "பேன்சி பைப்", "Fancy & Novelty": "பேன்சி & புதுமை" };

  var CATTA = { "SOUND CRACKERS": "சத்த பட்டாசுகள்", "BIJILI CRACKERS": "பிஜிலி வெடிகள்", "BOMB": "பாம்", "FLOWER POTS": "பூச்சட்டி", "CHAKKAR ITEMS": "சக்கரம்", "TWINKLING STAR": "சாட்டை (ட்விங்கிளிங் ஸ்டார்)", "ROCKETS": "ராக்கெட்", "SPARKLERS": "கம்பி மத்தாப்பு", "PAPER BOMB": "பேப்பர் பாம்", "FANCY ITEMS": "பேன்சி ரகங்கள்", "2\" FANCY SINGLE PIPE": "2\" பேன்சி சிங்கிள் பைப்", "2\"FANCY PIPE (3 Pcs)": "2\" பேன்சி பைப் (3 பீஸ்)", "3½\" PIPE FANCY MULTICOLOUR": "3½\" பைப் பேன்சி மல்டிகலர்", "4\" SINGLE FANCY": "4\" சிங்கிள் பேன்சி", "4\" FANCY MULTI COLOUR": "4\" பேன்சி மல்டி கலர்", "4½\" FANCY PIPE (2 Pcs)": "4½\" பேன்சி பைப் (2 பீஸ்)", "5\" FANCY SINGLE PIPE (1 Pce)": "5\" பேன்சி சிங்கிள் பைப் (1 பீஸ்)", "5\" FANCY (2 Pcs)": "5\" பேன்சி (2 பீஸ்)", "COLOUR MATCHES": "கலர் மேட்ச்", "MULTI COLOUR SHOT": "மல்டி கலர் ஷாட்", "FANCY ITEMS VERITES": "பேன்சி வகைகள்" };
  var UNITTA = { Pkt: "பாக்கெட்", Bag: "பை", Box: "பெட்டி", Pce: "பீஸ்" };
  function unitL(u) { return state.lang === "ta" ? String(u).replace(/(Pkt|Bag|Box|Pce)/, function (m) { return UNITTA[m]; }) : u; }
  function of(k) { var o = CFG.offer; return state.lang === "ta" && o[k + "Ta"] ? o[k + "Ta"] : o[k]; }
  var CFG = {}, DATA = { products: [], groups: [] }, CATIMG = {}, MEDIA = {}, BYID = {}, qty = {};
  var state = { lang: "ta", group: "All", term: "", budget: "all", sort: "def", shown: 0, last: null, view: [] };
  var tr = function (k) { return T[state.lang][k]; };

  /* ---- media helpers ---- */
  function driveImg(u) { u = (u || "").trim(); if (!u) return ""; var m = u.match(/drive\.google\.com\/file\/d\/([\w-]+)/) || u.match(/drive\.google\.com\/.*[?&]id=([\w-]+)/); return m ? "https://drive.google.com/thumbnail?id=" + m[1] + "&sz=w800" : u; }
  function ytId(u) { u = (u || "").trim(); if (!u) return ""; var m = u.match(/(?:youtu\.be\/|[?&]v=|shorts\/|embed\/)([\w-]{11})/); if (m) return m[1]; return /^[\w-]{11}$/.test(u) ? u : ""; }
  function toList(v) { var o = []; if (!v) return o; if (typeof v === "string") v = [v]; v.forEach(function (x) { String(x).split(/[\s,;|]+/).forEach(function (y) { y = y.trim(); if (y && o.indexOf(y) < 0) o.push(y); }); }); return o; }
  function imgs(id) { var m = MEDIA[id]; return m ? toList(m.img) : []; }
  function vids(id) { var m = MEDIA[id], o = []; if (!m) return o; toList(m.yt).forEach(function (u) { var y = ytId(u); if (y && o.indexOf(y) < 0) o.push(y); }); return o; }
  function addMedia(id, img, yt) { var m = MEDIA[id] || (MEDIA[id] = { img: [], yt: [] }); toList(img).forEach(function (u) { if (m.img.indexOf(u) < 0) m.img.push(u); }); toList(yt).forEach(function (u) { if (m.yt.indexOf(u) < 0) m.yt.push(u); }); }

  /* ---- Google Sheet CSV ---- */
  function parseCSV(t) {
    var rows = [], r = [], f = "", q = false;
    for (var k = 0; k < t.length; k++) { var c = t[k];
      if (q) { if (c === '"') { if (t[k + 1] === '"') { f += '"'; k++; } else q = false; } else f += c; }
      else if (c === '"') q = true; else if (c === ",") { r.push(f); f = ""; }
      else if (c === "\n" || c === "\r") { if (c === "\r" && t[k + 1] === "\n") k++; r.push(f); rows.push(r); r = []; f = ""; } else f += c; }
    if (f !== "" || r.length) { r.push(f); rows.push(r); } return rows;
  }
  function applyCSV(t) {
    var rows = parseCSV(t); if (rows.length < 2) return false;
    var h = rows[0].map(function (x) { return String(x).toLowerCase(); }), si = -1, ii = [], vi = [], pi = -1, oi = -1, ai = -1;
    h.forEach(function (x, k) { if (si < 0 && /s\.?\s?no|serial/.test(x)) si = k; else if (/image|photo/.test(x)) ii.push(k); else if (/youtube|video/.test(x)) vi.push(k); else if (/^(offer|price|rate)/.test(x)) pi = k; else if (/^(mrp|actual)/.test(x)) oi = k; else if (/stock|available/.test(x)) ai = k; });
    if (si < 0) return false;
    rows.slice(1).forEach(function (r) { var id = parseInt(r[si], 10); if (!id || !BYID[id]) return;
      addMedia(id, ii.map(function (k) { return driveImg(r[k] || ""); }).join(" "), vi.map(function (k) { return r[k] || ""; }).join(" "));
      var p = BYID[id]; if (pi >= 0 && Number(r[pi]) > 0) p.price = Number(r[pi]); if (oi >= 0 && Number(r[oi]) > 0) p.mrp = Number(r[oi]);
      if (ai >= 0) { var s = (r[ai] || "").trim(); if (/^(no|out|0|false)/i.test(s)) p.out = true; else if (s) p.out = false; } });
    return true;
  }

  /* ---- cards ---- */
  function label(p) { return state.lang === "ta" ? [p.ta, p.name] : [p.name, p.ta]; }
  function pics(p) { var u = imgs(p.id); return u.length ? u : [CATIMG[p.cat] || "images/placeholder.svg"]; }
  function showDisc() { return CFG.offer && CFG.offer.showDiscount; }
  function ctl(p) {
    var q = qty[p.id];
    if (p.out) return '<button class="add" disabled>' + tr("out") + "</button>";
    return q ? '<div class="q"><button data-d="-1" aria-label="-">−</button><input type="number" min="0" inputmode="numeric" value="' + q + '" aria-label="Qty"><button data-d="1" aria-label="+">+</button></div>'
             : '<button class="add" data-d="1">' + tr("add") + "</button>";
  }
  function card(p) {
    var id = p.id, u = pics(p), v = vids(id), n = label(p), disc = showDisc() && p.mrp > p.price;
    var o = '<article class="card' + (qty[id] ? " sel" : "") + '" data-id="' + id + '"><div class="img"><div class="sls">';
    u.forEach(function (x) { o += '<div class="sl"><img src="' + esc(driveImg(x)) + '" alt="' + esc(p.name) + '" width="320" height="240" loading="lazy" decoding="async" referrerpolicy="no-referrer" onerror="this.onerror=null;this.src=\'images/placeholder.svg\'"></div>'; });
    o += "</div>";
    if (u.length > 1) o += '<span class="cnt">1/' + u.length + '</span><button class="nv l" data-nv="-1" aria-label="Previous">‹</button><button class="nv r" data-nv="1" aria-label="Next">›</button>';
    if (disc) o += '<span class="off">' + esc(of("discountLabel")) + "</span>";
    o += '<span class="no">' + tr("itemWord") + " " + id + "</span>";
    if (v.length) o += '<button class="vb" data-v="' + v[0] + '">' + tr("video") + "</button>";
    o += '</div><div class="cb"><div class="cnm">' + esc(n[0]) + '</div><div class="ctn">' + esc(n[1]) + "</div>";
    o += '<div class="pp"><b>' + rs(p.price) + "</b>" + (disc ? "<s>" + rs(p.mrp) + "</s>" : "") + "</div>";
    o += '<div class="sv">' + (disc ? tr("save") + " " + rs(p.mrp - p.price) + " " : "") + "<span>· " + tr("per") + " " + esc(unitL(p.unit)) + "</span></div>";
    o += '<div class="ctl">' + ctl(p) + "</div></div></article>";
    return o;
  }

  /* ---- filtering ---- */
  function inBudget(p) { var b = state.budget; if (b === "all") return true; if (b === "100") return p.price <= 100; if (b === "500") return p.price <= 500; if (b === "1000") return p.price <= 1000; return p.price > 1000; }
  function filter() {
    var t = state.term.toLowerCase().trim();
    var v = DATA.products.filter(function (p) { if (state.group !== "All" && p.group !== state.group) return false; if (!inBudget(p)) return false; return !t || p._h.indexOf(t) >= 0; });
    if (state.sort === "asc") v.sort(function (a, b) { return a.price - b.price || a.id - b.id; });
    else if (state.sort === "desc") v.sort(function (a, b) { return b.price - a.price || a.id - b.id; });
    state.view = v; state.shown = 0; state.last = null; $("list").innerHTML = "";
    if (!v.length) { $("list").innerHTML = '<div class="none">' + tr("none") + "</div>"; $("countNote").textContent = ""; return; }
    renderBatch();
  }
  function renderBatch() {
    if (state.shown >= state.view.length) return;
    var end = Math.min(state.shown + BATCH, state.view.length), out = "", flat = state.sort !== "def";
    for (var k = state.shown; k < end; k++) { var p = state.view[k]; if (!flat && p.cat !== state.last) { out += '<h3 class="cat">' + esc(state.lang === "ta" ? CATTA[p.cat] || p.cat : p.cat) + "</h3>"; state.last = p.cat; } out += card(p); }
    state.shown = end; $("list").insertAdjacentHTML("beforeend", out);
    $("countNote").textContent = tr("shown").replace("{a}", state.shown).replace("{b}", state.view.length);
    if (state.shown < state.view.length) { var r = $("more").getBoundingClientRect(); if (r.top < window.innerHeight + 600) requestAnimationFrame(renderBatch); }
  }
  function drawChips() {
    var cnt = {}; DATA.products.forEach(function (p) { cnt[p.group] = (cnt[p.group] || 0) + 1; });
    var g = ["All"].concat(DATA.groups);
    $("chips").innerHTML = g.map(function (c) {
      var lab = c === "All" ? tr("all") : (state.lang === "ta" ? GT[c] || c : c), n = c === "All" ? DATA.products.length : cnt[c];
      return '<button type="button" class="chip' + (c === state.group ? " on" : "") + '" data-c="' + esc(c) + '">' + esc(lab) + " <small>" + n + "</small></button>";
    }).join("");
  }
  function drawSelects() {
    var L = T[state.lang];
    $("budget").innerHTML = [["all", L.bAll], ["100", L.b1], ["500", L.b2], ["1000", L.b3], ["above", L.b4]].map(function (o) { return '<option value="' + o[0] + '"' + (o[0] === state.budget ? " selected" : "") + ">" + o[1] + "</option>"; }).join("");
    $("sort").innerHTML = [["def", L.sDef], ["asc", L.sAsc], ["desc", L.sDesc]].map(function (o) { return '<option value="' + o[0] + '"' + (o[0] === state.sort ? " selected" : "") + ">" + o[1] + "</option>"; }).join("");
    var cur = $("cdist").value;
    $("cdist").innerHTML = '<option value="">' + L.dist + "</option>" + (CFG.districts || []).map(function (d) { return '<option value="' + esc(d[0]) + '">' + esc(state.lang === "ta" ? d[1] : d[0]) + "</option>"; }).join("");
    $("cdist").value = cur;
  }

  /* ---- combos ---- */
  function comboTotals(c) { var t = 0, m = 0, n = 0; Object.keys(c.items).forEach(function (id) { var p = BYID[id]; if (!p) return; t += p.price * c.items[id]; m += p.mrp * c.items[id]; n += c.items[id]; }); return { t: t, m: m, n: n }; }
  function drawCombos() {
    var list = (CFG.combos || []).filter(function (c) { return Object.keys(c.items).every(function (id) { return BYID[id]; }); });
    $("combos").hidden = !list.length; if (!list.length) return;
    $("comboRow").innerHTML = list.map(function (c, i) {
      var x = comboTotals(c), ids = Object.keys(c.items), disc = showDisc() && x.m > x.t;
      var top = ids.slice(0, 4).map(function (id) { return "<li>" + esc(label(BYID[id])[0]) + " × " + c.items[id] + "</li>"; }).join("");
      var rest = ids.length > 4 ? "<li>+ " + (ids.length - 4) + " " + tr("more") + "</li>" : "";
      return '<div class="combo' + (i === 1 ? " hot" : "") + '" data-combo="' + esc(c.id) + '">' + (i === 1 ? '<span class="tag">' + tr("hot") + "</span>" : "") +
        "<h3>" + esc(state.lang === "ta" ? c.ta : c.name) + '</h3><p class="note">' + esc(c.note) + " (" + x.n + " " + tr("pcs") + ")</p><ul>" + top + rest + "</ul>" +
        '<div class="cp"><b>' + rs(x.t) + "</b>" + (disc ? "<s>" + rs(x.m) + "</s>" : "") + '</div><button class="btn gold" type="button">' + tr("combosAdd") + "</button></div>";
    }).join("");
  }

  /* ---- cart ---- */
  function save() { try { localStorage.setItem("srgq2", JSON.stringify(qty)); } catch (e) {} }
  function setQ(id, v, quiet) { v = Math.max(0, Math.floor(Number(v) || 0)); if (v) qty[id] = v; else delete qty[id]; save();
    if (!quiet) { var row = document.querySelector('.card[data-id="' + id + '"]'); if (row) { row.classList.toggle("sel", !!v); row.querySelector(".ctl").innerHTML = ctl(BYID[id]); } totals(); } }
  function chosen() { return DATA.products.filter(function (p) { return qty[p.id]; }); }
  function totals() {
    var a = 0, o = 0, c = 0; chosen().forEach(function (p) { a += p.mrp * qty[p.id]; o += p.price * qty[p.id]; c++; });
    $("cn").textContent = c + " " + T[state.lang].items[c === 1 ? 0 : 1]; $("ct").textContent = rs(o);
    var b = $("cartBadge"); b.hidden = !c; b.textContent = c;
    $("cartBar").classList.toggle("on", c > 0 && !$("ov").classList.contains("show")); document.body.classList.toggle("has-cart", c > 0);
    return { a: a, o: o, c: c };
  }
  function minNeeded() { return Number(CFG.order && CFG.order.minOrder) || 0; }
  function minInfo(t) { var min = minNeeded(); if (!min || t.o >= min || !t.c) return ""; return tr("minNeed").replace("{min}", rs(min)).replace("{more}", rs(min - t.o)); }
  function drawPanel() {
    var t = totals(), h = "", min = minNeeded();
    chosen().forEach(function (p) {
      h += '<div class="line" data-id="' + p.id + '"><div><b>' + tr("itemWord") + " " + p.id + "</b> " + esc(label(p)[0]) + "<br><small>" + rs(p.price) + " / " + esc(unitL(p.unit)) + "</small></div>" +
        '<div class="q"><button data-d="-1">−</button><input type="number" min="0" inputmode="numeric" value="' + qty[p.id] + '"><button data-d="1">+</button></div><div class="a">' + rs(p.price * qty[p.id]) + "</div></div>";
    });
    $("lines").innerHTML = h || '<div class="none">' + tr("empty") + "</div>";
    $("tot").innerHTML = (showDisc() && t.c ? "<div><span>" + tr("actual") + "</span><span>" + rs(t.a) + "</span></div><div><span>" + tr("less") + " " + esc(of("discountNote")) + '</span><span>− ' + rs(t.a - t.o) + '</span></div><div class="sv2"><span>' + tr("youSave") + "</span><span>" + rs(t.a - t.o) + "</span></div>" : "") +
      '<div class="g"><span>' + tr("total") + "</span><span>" + rs(t.o) + "</span></div>";
    $("prog").hidden = !(min && t.c); if (min && t.c) { $("progBar").style.width = Math.min(100, t.o / min * 100) + "%"; $("progTxt").textContent = t.o >= min ? tr("minOk") : minInfo(t); }
    $("minHint").textContent = "";
    link();
  }
  function msgFor(level) {
    var disc = showDisc(), nm = $("cname").value.trim(), mb = $("cmob").value.trim(), ad = $("cadr").value.trim(), ds = $("cdist").value, t = totals(), both = t.c <= 10;
    var m = "*New Order - " + CFG.shop.nameEn + "*\n";
    if (nm) m += "Name: " + nm + "\n"; if (mb) m += "Mobile: " + mb + "\n"; if (ds) m += "District: " + ds + "\n"; if (ad) m += "Address: " + ad + "\n"; m += "\n";
    chosen().forEach(function (p) {
      m += "No." + p.id + " - " + p.name + (both ? " / " + p.ta : "") + " (" + p.unit + ") x " + qty[p.id] + " = " + rs(p.price * qty[p.id]) + "\n";
      if (level >= 2) imgs(p.id).forEach(function (u) { m += "📷 " + driveImg(u) + "\n"; });
      if (level >= 1) vids(p.id).forEach(function (y) { m += "▶ https://youtu.be/" + y + "\n"; });
    });
    m += "\n" + (disc ? "Actual price total: " + rs(t.a) + "\nAfter " + CFG.offer.discountNote + ": *" + rs(t.o) + "*" : "Order total: *" + rs(t.o) + "*") + "\n\nPlease confirm my order. Thank you!";
    return m;
  }
  function link() {
    var t = totals(), a = $("wa"), n = $("wn");
    if (!t.c || minInfo(t)) { a.className = "btn wa-s off"; a.removeAttribute("href"); n.textContent = ""; return; }
    var want = $("inc").checked, lvl = want ? 2 : 0, url;
    for (;;) { url = "https://wa.me/" + CFG.whatsapp + "?text=" + encodeURIComponent(msgFor(lvl)); if (url.length <= 6000 || lvl === 0) break; lvl--; }
    n.textContent = (want && lvl < 2) ? (lvl === 1 ? tr("long1") : tr("long2")) : "";
    a.className = "btn wa-s"; a.href = url;
  }
  function openCart() { drawPanel(); $("ov").classList.add("show"); $("cartBar").classList.remove("on"); }
  function closeCart() { $("ov").classList.remove("show"); totals(); filter(); }

  /* ---- video ---- */
  function openVideo(y, title) { $("vt").textContent = title || ""; $("vl").href = "https://www.youtube.com/watch?v=" + y; $("vf").innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + y + '?autoplay=1&rel=0" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>'; $("vm").classList.add("show"); }
  function closeVideo() { $("vf").innerHTML = ""; $("vm").classList.remove("show"); }

  /* ---- static text ---- */
  function waLink(msg) { return "https://wa.me/" + CFG.whatsapp + "?text=" + encodeURIComponent(msg); }
  function drawStatic() {
    var s = CFG.shop, L = T[state.lang];
    document.documentElement.lang = state.lang;
    document.querySelectorAll("[data-t]").forEach(function (e) { e.textContent = L[e.getAttribute("data-t")]; });
    $("lang").textContent = L.lang; $("q").placeholder = L.search; $("open").textContent = L.order; $("panT").textContent = L.yourOrder;
    $("clr").textContent = L.clear; $("waT").textContent = L.send; $("incT").textContent = L.inc;
    $("cname").placeholder = L.name; $("cmob").placeholder = L.mob; $("cadr").placeholder = L.adr;
    $("vl").textContent = L.youtube; $("doneT").textContent = L.doneT; $("doneP").textContent = L.doneP; $("keep").textContent = L.keep; $("fresh").textContent = L.fresh;
    $("brandTa").textContent = s.nameTa.split(" ")[0] || s.nameTa; $("fname").textContent = s.nameEn;
    $("addr").textContent = state.lang === "ta" ? s.addressTa : s.addressEn; $("hours").textContent = state.lang === "ta" && s.hoursTa ? s.hoursTa : s.hours;
    $("lic").textContent = s.licenceNo ? L.lic + " " + s.licenceNo : "";
    $("mapLink").href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(s.mapQuery);
    var first = CFG.phones[0], hello = waLink("Hello, I want to know about crackers prices.");
    $("callTop").href = "tel:+91" + first[1].replace(/\s/g, ""); $("waTop").href = hello; $("waVisit").href = hello;
    var ph = CFG.phones.map(function (p) { return '<a href="tel:+91' + p[1].replace(/\s/g, "") + '"><svg width="18" height="18"><use href="#i-call"/></svg>' + esc(p[0]) + " " + esc(p[1]) + "</a>"; }).join("");
    $("phones").innerHTML = ph; $("donePh").innerHTML = ph;
    $("offerPill").textContent = CFG.offer.showDiscount ? of("badge") + "  |  " + of("discountLabel") : of("badge");
  }

  /* ---- events ---- */
  function stepper(e, after) { var b = e.target.closest("button[data-d]"); if (!b || b.disabled) return false; var row = b.closest("[data-id]"), id = row.getAttribute("data-id"); setQ(id, (qty[id] || 0) + Number(b.getAttribute("data-d"))); if (after) after(); return true; }
  function bind() {
    $("list").addEventListener("click", function (e) {
      var nv = e.target.closest("button[data-nv]"); if (nv) { var sc = nv.closest(".img").querySelector(".sls"); sc.scrollBy({ left: Number(nv.getAttribute("data-nv")) * sc.clientWidth, behavior: "smooth" }); return; }
      var v = e.target.closest("button[data-v]"); if (v) { openVideo(v.getAttribute("data-v"), v.closest("[data-id]").querySelector(".cnm").textContent); return; }
      stepper(e);
    });
    $("list").addEventListener("scroll", function (e) { var t = e.target; if (t.classList && t.classList.contains("sls")) { var c = t.parentNode.querySelector(".cnt"); if (c) c.textContent = (Math.round(t.scrollLeft / t.clientWidth) + 1) + "/" + t.children.length; } }, true);
    $("list").addEventListener("change", function (e) { var r = e.target.closest("[data-id]"); if (r && e.target.tagName === "INPUT") setQ(r.getAttribute("data-id"), e.target.value); });
    $("comboRow").addEventListener("click", function (e) {
      var b = e.target.closest(".combo button"); if (!b) return;
      var c = (CFG.combos || []).filter(function (x) { return x.id === b.closest(".combo").getAttribute("data-combo"); })[0]; if (!c) return;
      Object.keys(c.items).forEach(function (id) { setQ(id, (qty[id] || 0) + c.items[id], true); }); totals();
      document.querySelectorAll(".card").forEach(function (el) { var id = el.getAttribute("data-id"); el.classList.toggle("sel", !!qty[id]); el.querySelector(".ctl").innerHTML = ctl(BYID[id]); });
      b.textContent = tr("comboAdded"); setTimeout(function () { b.textContent = tr("combosAdd"); }, 1200);
    });
    $("chips").addEventListener("click", function (e) { var c = e.target.closest(".chip"); if (!c) return; state.group = c.getAttribute("data-c"); drawChips(); filter(); });
    $("budget").onchange = function () { state.budget = this.value; filter(); };
    $("sort").onchange = function () { state.sort = this.value; filter(); };
    var tm; $("q").addEventListener("input", function () { var v = this.value; clearTimeout(tm); tm = setTimeout(function () { state.term = v; filter(); }, 200); });
    $("lang").onclick = function () { state.lang = state.lang === "ta" ? "en" : "ta"; try { localStorage.setItem("srglang2", state.lang); } catch (e) {} drawStatic(); drawSelects(); drawChips(); drawCombos(); filter(); totals(); if ($("ov").classList.contains("show")) drawPanel(); };
    $("open").onclick = $("cartBtn").onclick = openCart; $("x").onclick = closeCart;
    $("lines").addEventListener("click", function (e) { stepper(e, drawPanel); });
    $("lines").addEventListener("change", function (e) { var r = e.target.closest("[data-id]"); if (r) { setQ(r.getAttribute("data-id"), e.target.value); drawPanel(); } });
    var armed = false, armTm;
    $("clr").onclick = function () { if (!armed) { armed = true; $("clr").textContent = tr("yesClear"); armTm = setTimeout(function () { armed = false; $("clr").textContent = tr("clear"); }, 3000); return; } clearTimeout(armTm); armed = false; $("clr").textContent = tr("clear"); qty = {}; save(); drawPanel(); filter(); };
    ["cname", "cmob", "cadr"].forEach(function (id) { $(id).addEventListener("input", link); }); $("cdist").addEventListener("change", link); $("inc").addEventListener("change", link);
    $("wa").addEventListener("click", function () { setTimeout(function () { $("done").classList.add("show"); }, 1200); });
    $("doneX").onclick = $("keep").onclick = function () { $("done").classList.remove("show"); };
    $("fresh").onclick = function () { qty = {}; save(); $("done").classList.remove("show"); $("ov").classList.remove("show"); totals(); filter(); };
    $("vx").onclick = closeVideo; $("vm").addEventListener("click", function (e) { if (e.target === this) closeVideo(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") { closeVideo(); if ($("ov").classList.contains("show")) closeCart(); $("done").classList.remove("show"); } });
    [$("ov"), $("done")].forEach(function (o) { o.addEventListener("click", function (e) { if (e.target === o) { if (o === $("ov")) closeCart(); else o.classList.remove("show"); } }); });
    if ("IntersectionObserver" in window) new IntersectionObserver(function (en) { if (en[0].isIntersecting) renderBatch(); }, { rootMargin: "600px" }).observe($("more"));
    else window.addEventListener("scroll", function () { if ($("more").getBoundingClientRect().top < window.innerHeight + 600) renderBatch(); }, { passive: true });
  }

  /* ---- start ---- */
  function getJSON(u, fb) { return fetch(u).then(function (r) { if (!r.ok) throw 0; return r.json(); }).catch(function () { return fb; }); }
  Promise.all([getJSON("data/config.json", null), getJSON("data/products.json", null), getJSON("data/category-images.json", {}), getJSON("data/images.json", {})]).then(function (r) {
    if (!r[0] || !r[1]) { $("list").innerHTML = '<div class="none">Could not load the price list. Please refresh or call us.</div>'; return; }
    CFG = r[0]; DATA = r[1]; CATIMG = r[2];
    DATA.products.forEach(function (p) { BYID[p.id] = p; p._h = (p.name + " " + p.ta + " " + p.id + " " + p.cat).toLowerCase(); });
    Object.keys(CFG.media || {}).forEach(function (id) { if (BYID[id]) addMedia(id, CFG.media[id].img, CFG.media[id].yt); });
    Object.keys(r[3] || {}).forEach(function (id) { if (BYID[id]) addMedia(id, r[3][id], ""); });
    try { qty = JSON.parse(localStorage.getItem("srgq2") || "{}") || {}; } catch (e) { qty = {}; }
    Object.keys(qty).forEach(function (id) { if (!BYID[id]) delete qty[id]; });
    try { state.lang = localStorage.getItem("srglang2") === "en" ? "en" : "ta"; } catch (e) {}
    drawStatic(); drawSelects(); drawChips(); drawCombos(); bind(); filter(); totals();
    if (CFG.sheetCsvUrl) fetch(CFG.sheetCsvUrl).then(function (x) { return x.text(); }).then(function (t) { if (applyCSV(t)) { drawCombos(); filter(); totals(); } }).catch(function () {});
  });
  if ("serviceWorker" in navigator && location.protocol.indexOf("http") === 0) window.addEventListener("load", function () { navigator.serviceWorker.register("sw.js").catch(function () {}); });
})();
