"""Generates the category SVG pictures, logo, hero and icons into ../images.
Run:  python3 tools/gen-art.py
The pictures are plain static files, so the page never builds SVG in the browser.
"""
import json, math, os, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMG = os.path.join(ROOT, "images")
PAL = ["#ffd54f", "#ff7043", "#66bb6a", "#42a5f5", "#ec407a", "#ab47bc", "#26c6da"]
BG = '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0b0f3a"/><stop offset=".7" stop-color="#3a1d6e"/><stop offset="1" stop-color="#5b2a86"/></linearGradient></defs><rect width="200" height="150" fill="url(#g)"/>'


def burst(cx, cy, r, c, n):
    o = f'<circle cx="{cx}" cy="{cy}" r="{r*1.15:.1f}" fill="{c}" opacity=".22"/>'
    for k in range(n):
        a = k * 2 * math.pi / n
        x2, y2 = cx + math.cos(a) * r, cy + math.sin(a) * r
        x1, y1 = cx + math.cos(a) * r * .3, cy + math.sin(a) * r * .3
        o += f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" stroke="{c}" stroke-width="2.5" stroke-linecap="round"/><circle cx="{x2:.1f}" cy="{y2:.1f}" r="2.4" fill="{c}"/>'
    return o + f'<circle cx="{cx}" cy="{cy}" r="4.5" fill="#fff"/>'


def stars(seed):
    return "".join(
        f'<circle cx="{(seed*37+t*53)%200}" cy="{(seed*19+t*29)%85}" r="{0.6+(t%3)*0.45:.2f}" fill="#fff" opacity=".7"/>'
        for t in range(16))


def art(kind, seed):
    col, col2 = PAL[seed % 7], PAL[(seed + 3) % 7]
    o = stars(seed)
    if kind == "spark":
        for a in range(3):
            x0 = 58 + a * 40
            o += f'<line x1="{x0}" y1="140" x2="{x0+14}" y2="76" stroke="#cfd3e6" stroke-width="4" stroke-linecap="round"/>' + burst(x0 + 14, 70, 26, PAL[(a * 2 + 1) % 7], 10)
    elif kind == "pot":
        o += '<polygon points="68,138 132,138 122,98 78,98" fill="#c62828" stroke="#ffd54f" stroke-width="2"/><rect x="74" y="112" width="52" height="8" fill="#ffd54f"/>'
        for a in range(-4, 5):
            ang = math.radians(-90 + a * 17)
            x2, y2 = 100 + math.cos(ang) * 62, 98 + math.sin(ang) * 62
            cc = PAL[(a + 4 + seed) % 7]
            o += f'<line x1="100" y1="98" x2="{x2:.1f}" y2="{y2:.1f}" stroke="{cc}" stroke-width="3" stroke-linecap="round"/><circle cx="{x2:.1f}" cy="{y2:.1f}" r="3.2" fill="{cc}"/>'
    elif kind == "sound":
        for a in range(3):
            x = 42 + a * 44
            o += f'<rect x="{x}" y="72" width="32" height="62" rx="5" fill="#d32f2f"/><rect x="{x}" y="86" width="32" height="10" fill="#ffd54f"/><path d="M{x+16} 72 Q{x+26} 58 {x+24} 50" stroke="#ddd" stroke-width="2" fill="none"/>' + burst(x + 24, 46, 11, "#ffd54f", 8)
    elif kind == "bijili":
        o += '<path d="M14 36 Q60 52 100 36 T186 36" stroke="#ddd" stroke-width="2.5" fill="none"/>'
        for a in range(9):
            x = 24 + a * 18
            y = 36 + (8 if a % 2 else 2) + math.sin(a) * 3
            o += f'<rect x="{x}" y="{y:.1f}" width="11" height="34" rx="2" fill="#e53935"/><rect x="{x}" y="{y+12:.1f}" width="11" height="5" fill="#ffd54f"/>'
        o += burst(100, 112, 16, "#ffd54f", 10)
    elif kind == "bomb":
        o += '<ellipse cx="100" cy="134" rx="46" ry="7" fill="#000" opacity=".35"/><circle cx="100" cy="90" r="42" fill="#1c1c24"/><circle cx="86" cy="76" r="11" fill="#4a4a58"/><rect x="92" y="44" width="16" height="12" rx="2" fill="#666"/><path d="M100 44 Q112 28 128 34" stroke="#ddd" stroke-width="3" fill="none"/>' + burst(130, 32, 14, "#ffd54f", 10)
    elif kind == "paper":
        o += '<ellipse cx="100" cy="134" rx="46" ry="7" fill="#000" opacity=".35"/><circle cx="100" cy="90" r="42" fill="#f5efe0"/><ellipse cx="100" cy="90" rx="42" ry="11" fill="none" stroke="#c62828" stroke-width="9"/><path d="M100 48 Q112 32 126 36" stroke="#ddd" stroke-width="3" fill="none"/>' + burst(128, 34, 13, "#ff7043", 10)
    elif kind == "chakkar":
        o += '<circle cx="100" cy="80" r="34" fill="none" stroke="#ffd54f" stroke-width="4"/>'
        for a in range(8):
            an = a * math.pi / 4
            o += f'<line x1="100" y1="80" x2="{100+math.cos(an)*34:.1f}" y2="{80+math.sin(an)*34:.1f}" stroke="#ffd54f" stroke-width="2"/>'
        for a in range(4):
            o += f'<path d="M100 28 A52 52 0 0 1 152 80" stroke="{PAL[(a*2+seed)%7]}" stroke-width="6" fill="none" stroke-linecap="round" opacity=".85" transform="rotate({a*90} 100 80)"/>'
        o += '<circle cx="100" cy="80" r="6" fill="#fff"/>'
    elif kind == "star":
        pts = []
        for a in range(10):
            r = 20 if a % 2 else 46
            an = -math.pi / 2 + a * math.pi / 5
            pts.append(f"{100+math.cos(an)*r:.1f},{80+math.sin(an)*r:.1f}")
        o += '<circle cx="100" cy="80" r="56" fill="#ffd54f" opacity=".18"/><polygon points="' + " ".join(pts) + '" fill="#ffd54f" stroke="#fff" stroke-width="2"/>' + burst(40, 40, 12, "#ec407a", 8) + burst(165, 112, 12, "#42a5f5", 8)
    elif kind == "rocket":
        o += burst(150, 34, 18, col, 10) + '<g transform="rotate(-30 100 85)"><polygon points="92,118 108,118 100,152" fill="#ffa726"/><polygon points="96,118 104,118 100,138" fill="#ffee58"/><polygon points="88,96 72,122 88,116" fill="#e53935"/><polygon points="112,96 128,122 112,116" fill="#e53935"/><rect x="88" y="46" width="24" height="74" rx="9" fill="#eceff1"/><polygon points="88,52 112,52 100,22" fill="#e53935"/><circle cx="100" cy="78" r="6" fill="#42a5f5" stroke="#90a4ae" stroke-width="2"/></g>'
    elif kind == "match":
        o += '<rect x="52" y="96" width="96" height="40" rx="5" fill="#8d1b1b" stroke="#ffd54f" stroke-width="2"/><rect x="64" y="106" width="72" height="20" rx="3" fill="#ffd54f" opacity=".85"/>'
        for a in range(5):
            x0, x1 = 76 + a * 12, 62 + a * 19
            o += f'<line x1="{x0}" y1="98" x2="{x1}" y2="50" stroke="#d7b377" stroke-width="4" stroke-linecap="round"/><circle cx="{x1}" cy="48" r="5.5" fill="{"#ff7043" if a==2 else "#e53935"}"/>'
        o += burst(81, 38, 12, "#ffd54f", 8)
    else:  # fancy shot / pipe
        o += f'<rect x="74" y="94" width="52" height="40" rx="6" fill="{col}"/><rect x="74" y="106" width="52" height="8" fill="#fff" opacity=".85"/><ellipse cx="100" cy="94" rx="26" ry="6" fill="#222"/>' + burst(100, 56, 42, col, 14) + burst(52, 44, 17, col2, 9) + burst(150, 50, 15, PAL[(seed + 5) % 7], 9)
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" role="img">{BG}{o}</svg>'


KIND = {"SOUND CRACKERS": "sound", "BIJILI CRACKERS": "bijili", "BOMB": "bomb", "PAPER BOMB": "paper",
        "FLOWER POTS": "pot", "CHAKKAR ITEMS": "chakkar", "TWINKLING STAR": "star", "ROCKETS": "rocket",
        "SPARKLERS": "spark", "COLOUR MATCHES": "match"}


def slug(s):
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")


def main():
    os.makedirs(os.path.join(IMG, "categories"), exist_ok=True)
    data = json.load(open(os.path.join(ROOT, "data", "products.json"), encoding="utf-8"))
    mapping = {}
    for n, cat in enumerate(data["categories"]):
        s = slug(cat) or f"cat-{n}"
        open(os.path.join(IMG, "categories", s + ".svg"), "w", encoding="utf-8").write(art(KIND.get(cat, "shot"), n + 2))
        mapping[cat] = f"images/categories/{s}.svg"
    # placeholder for anything without a category picture
    open(os.path.join(IMG, "placeholder.svg"), "w", encoding="utf-8").write(art("shot", 5))
    json.dump(mapping, open(os.path.join(ROOT, "data", "category-images.json"), "w", encoding="utf-8"), indent=1)

    # hero banner (wide)
    hero = ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 300" preserveAspectRatio="xMidYMid slice">'
            '<defs><linearGradient id="h" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1b1464"/><stop offset=".6" stop-color="#4a1d7a"/><stop offset="1" stop-color="#8e2a6e"/></linearGradient></defs>'
            '<rect width="800" height="300" fill="url(#h)"/>')
    for t in range(60):
        hero += f'<circle cx="{(t*131)%800}" cy="{(t*71)%300}" r="{0.8+(t%3)*0.6:.1f}" fill="#fff" opacity=".6"/>'
    for i, (x, y, r, c) in enumerate([(120, 90, 60, "#ffd54f"), (400, 70, 70, "#ec407a"), (680, 100, 62, "#42a5f5"), (260, 210, 40, "#66bb6a"), (560, 220, 44, "#ff7043")]):
        hero += burst(x, y, r, c, 14)
    hero += '</svg>'
    open(os.path.join(IMG, "hero.svg"), "w", encoding="utf-8").write(hero)

    # logo + app icons
    logo = ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" rx="96" fill="#1f2a6b"/>'
            + burst(256, 210, 130, "#ffd54f", 16) +
            '<text x="256" y="430" font-family="Arial,sans-serif" font-size="120" font-weight="700" fill="#fff" text-anchor="middle">SRG</text></svg>')
    open(os.path.join(IMG, "logo.svg"), "w", encoding="utf-8").write(logo)
    print("categories:", len(mapping))


if __name__ == "__main__":
    main()
