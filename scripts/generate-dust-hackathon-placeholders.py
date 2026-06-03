"""Generate placeholder images for the Hackathon Dust × Eugenia project.

Cover + event/affiche photo slots. Each placeholder shows a clear
"À REMPLACER" message + a slot label so the user knows exactly which
file to overwrite manually. Palette Eugenia : bordeaux #7C1C1C + ocre #E8B441.
"""
from PIL import Image, ImageDraw, ImageFont
from pathlib import Path

OUTPUT_DIR = Path(__file__).resolve().parent.parent / "public" / "projects"
WIDTH, HEIGHT = 1600, 1067  # 3:2 ratio, typical event photo size

BORDEAUX = (124, 28, 28)
OCRE = (232, 180, 65)

SLOTS = [
    ("dust-hackathon-cover.png", "COUVERTURE", "Affiche DA « Claude Boy » ou photo phare"),
    ("dust-affiche-1.png", "AFFICHE — SLOT 1", "Série 5 affiches A2 storytelling Claude Boy"),
    ("dust-event-1.png", "PHOTO ÉVÉNEMENT — SLOT 1", "Amphi / salle / ambiance hackathon"),
    ("dust-event-2.png", "PHOTO ÉVÉNEMENT — SLOT 2", "Équipe orga / cravates custom / stand"),
    ("dust-event-3.png", "PHOTO ÉVÉNEMENT — SLOT 3", "Pitch finalistes / remise / clôture"),
]


def load_font(size: int) -> ImageFont.FreeTypeFont:
    candidates = [
        "/System/Library/Fonts/Helvetica.ttc",
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
        "/System/Library/Fonts/SFNS.ttf",
        "C:/Windows/Fonts/segoeuib.ttf",
        "C:/Windows/Fonts/arialbd.ttf",
    ]
    for path in candidates:
        if Path(path).exists():
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def draw_placeholder(filename: str, title: str, subtitle: str) -> None:
    img = Image.new("RGB", (WIDTH, HEIGHT), color=BORDEAUX)
    draw = ImageDraw.Draw(img)

    # Diagonal grid pattern to make "this is a placeholder" obvious
    grid_color = (150, 50, 50)
    spacing = 80
    for offset in range(-HEIGHT, WIDTH, spacing):
        draw.line([(offset, 0), (offset + HEIGHT, HEIGHT)], fill=grid_color, width=1)

    # Ocre frame
    margin = 60
    draw.rectangle(
        [(margin, margin), (WIDTH - margin, HEIGHT - margin)],
        outline=OCRE,
        width=4,
    )

    title_font = load_font(76)
    sub_font = load_font(40)
    label_font = load_font(28)
    brand_font = load_font(32)

    def center_text(text: str, font: ImageFont.FreeTypeFont, y: int, color):
        bbox = draw.textbbox((0, 0), text, font=font)
        w = bbox[2] - bbox[0]
        draw.text(((WIDTH - w) // 2, y), text, font=font, fill=color)

    center_text("Hackathon Dust × Eugenia", brand_font, margin + 30, OCRE)
    center_text("À REMPLACER", title_font, HEIGHT // 2 - 130, (255, 255, 255))
    center_text(title, sub_font, HEIGHT // 2 - 20, OCRE)
    center_text(subtitle, label_font, HEIGHT // 2 + 40, (235, 215, 200))
    center_text(
        f"Fichier cible : public/projects/{filename}",
        label_font,
        HEIGHT - margin - 70,
        (210, 170, 170),
    )

    out = OUTPUT_DIR / filename
    img.save(out, format="PNG", optimize=True)
    print(f"wrote {out}")


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    for filename, title, subtitle in SLOTS:
        draw_placeholder(filename, title, subtitle)


if __name__ == "__main__":
    main()
