"""Generate 3 placeholder images for the Mirakl event photos.

Each placeholder shows a clear "PHOTO À REMPLACER" message + a slot label,
so the user knows exactly which file to overwrite manually.
"""
from PIL import Image, ImageDraw, ImageFont
from pathlib import Path

OUTPUT_DIR = Path(__file__).resolve().parent.parent / "public" / "projects"
WIDTH, HEIGHT = 1600, 1067  # 3:2 ratio, typical event photo size

SLOTS = [
    ("mirakl-event-1.png", "PHOTO ÉVÉNEMENT — SLOT 1", "Salle / équipe / ambiance hackathon"),
    ("mirakl-event-2.png", "PHOTO ÉVÉNEMENT — SLOT 2", "Pitch en direct chez Mirakl"),
    ("mirakl-event-3.png", "PHOTO ÉVÉNEMENT — SLOT 3", "Équipe / remise / Mirakl HQ"),
]


def load_font(size: int) -> ImageFont.FreeTypeFont:
    candidates = [
        "C:/Windows/Fonts/segoeuib.ttf",
        "C:/Windows/Fonts/arialbd.ttf",
        "C:/Windows/Fonts/arial.ttf",
    ]
    for path in candidates:
        if Path(path).exists():
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def draw_placeholder(filename: str, title: str, subtitle: str) -> None:
    img = Image.new("RGB", (WIDTH, HEIGHT), color=(40, 40, 44))
    draw = ImageDraw.Draw(img)

    # Diagonal grid pattern to make "this is a placeholder" obvious
    grid_color = (60, 60, 66)
    spacing = 80
    for offset in range(-HEIGHT, WIDTH, spacing):
        draw.line([(offset, 0), (offset + HEIGHT, HEIGHT)], fill=grid_color, width=1)

    # Outer dashed-ish frame
    frame_color = (255, 255, 255, 40)
    margin = 60
    draw.rectangle(
        [(margin, margin), (WIDTH - margin, HEIGHT - margin)],
        outline=(255, 255, 255),
        width=3,
    )

    # Title
    title_font = load_font(72)
    sub_font = load_font(38)
    label_font = load_font(28)

    def center_text(text: str, font: ImageFont.FreeTypeFont, y: int, color):
        bbox = draw.textbbox((0, 0), text, font=font)
        w = bbox[2] - bbox[0]
        draw.text(((WIDTH - w) // 2, y), text, font=font, fill=color)

    center_text("À REMPLACER", title_font, HEIGHT // 2 - 130, (255, 255, 255))
    center_text(title, sub_font, HEIGHT // 2 - 30, (255, 255, 255, 200))
    center_text(subtitle, label_font, HEIGHT // 2 + 30, (180, 180, 190))
    center_text(
        f"Fichier cible : public/projects/{filename}",
        label_font,
        HEIGHT - margin - 70,
        (140, 140, 150),
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
