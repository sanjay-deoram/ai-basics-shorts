# Cuts the avatar frames out of assets/avatar/source-flipbook.jpg (the Gemini talking flipbook, 1024x1024,
# panels 1-8 in two rows of 4) into assets/avatar/<name>.png: white background removed from the top and
# sides (the shirt touches the bottom edge), every panel registered to the base pose (scale + offset, found by
# matching the hair and shoulders), torso faded out at the bottom, upscaled 4x.
#
# Usage (from the project folder; needs pillow, numpy, scipy):  python3 tools/cut-flipbook.py
import os, numpy as np
from PIL import Image
from scipy import ndimage as ndi
P = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
SHEET = Image.open(f"{P}/assets/avatar/source-flipbook.jpg").convert("RGB")
COLS = [(33, 252), (275, 501), (527, 753), (777, 996)]
ROWS = [(88, 343), (388, 664)]
GRID = {f"f{i + 1}": (i // 4, i % 4) for i in range(8)}   # flipbook panel numbers
def panel(n):
    r, c = GRID[n]
    return SHEET.crop((COLS[c][0], ROWS[r][0], COLS[c][1], ROWS[r][1]))
# scale and offset of each panel relative to the base pose (from align.py)
REG = {"f1": (1.0, 0, 0), "f2": (0.98, -1, 2), "f3": (0.98, 0, 3), "f4": (1.0, 0, 0),
       "f5": (0.95, 5, 22), "f6": (0.95, 1, 22), "f7": (0.95, 2, 22), "f8": (0.95, 6, 22)}
H, W, UP = 255, 219, 4
FADE0, FADE1 = 190, 250          # torso dissolves between these rows (base-panel pixels)
def place(n):
    a = np.asarray(panel(n).convert("L")).astype(float)
    s, dx, dy = REG[n]
    if s != 1.0: a = ndi.zoom(a, s, order=3)
    out = np.full((H, W), 255.0)
    ys, xs = slice(max(0, dy), min(H, a.shape[0] + dy)), slice(max(0, dx), min(W, a.shape[1] + dx))
    out[ys, xs] = a[ys.start - dy: ys.stop - dy, xs.start - dx: xs.stop - dx]
    return np.clip(out, 0, 255)
def alpha_for(g):
    b = ndi.gaussian_filter(g, 2.0)
    white = b > 236
    lab, _ = ndi.label(white)
    seeds = set(lab[0, :]) | set(lab[:, 0]) | set(lab[:, -1]); seeds.discard(0)
    bg = np.isin(lab, list(seeds))
    fg = ~bg
    lab2, n2 = ndi.label(fg)
    sizes = ndi.sum(fg, lab2, range(1, n2 + 1))
    fg = lab2 == (1 + int(np.argmax(sizes)))          # the character only: drops label text and stray hair
    fg = ndi.binary_fill_holes(fg)
    fg = ndi.binary_opening(fg, iterations=1)
    fg = ndi.binary_erosion(fg, iterations=1)
    a = ndi.gaussian_filter(fg.astype(float), 1.0)
    ramp = np.clip((FADE1 - np.arange(H)) / (FADE1 - FADE0), 0, 1)[:, None]
    return np.clip(a, 0, 1) * ramp
for n in REG:
    g = place(n)
    a = alpha_for(g)
    big = Image.fromarray(g.astype(np.uint8)).resize((W * UP, H * UP), Image.LANCZOS)
    al = Image.fromarray((a * 255).astype(np.uint8)).resize((W * UP, H * UP), Image.LANCZOS)
    rgba = Image.merge("RGBA", (big, big, big, al))
    rgba.save(f"{P}/assets/avatar/{n}.png")
print("wrote", len(REG), "frames to assets/avatar")

# Mouth patches: the mouth area of each mouth shape, cut with one feathered ellipse so it can sit on top of the
# base face. Swapping only this patch keeps the hair, glasses and stipple perfectly still while he talks.
MOUTH = dict(cx=113, cy=174, rx=36, ry=25, feather=5.0)   # base-panel pixels
yy, xx = np.mgrid[0:H, 0:W]
ell = (((xx - MOUTH["cx"]) / MOUTH["rx"]) ** 2 + ((yy - MOUTH["cy"]) / MOUTH["ry"]) ** 2) <= 1
mask = ndi.gaussian_filter(ell.astype(float), MOUTH["feather"])
mask = np.clip(mask * 1.6, 0, 1)                           # solid core, soft edge
mask_big = Image.fromarray((mask * 255).astype(np.uint8)).resize((W * UP, H * UP), Image.LANCZOS)
for n in ("f2", "f3", "f4", "f5", "f6", "f7", "f8"):
    full = Image.open(f"{P}/assets/avatar/{n}.png")
    a = np.asarray(full.getchannel("A")).astype(float) * np.asarray(mask_big).astype(float) / 255
    full.putalpha(Image.fromarray(a.astype(np.uint8)))
    box = full.getbbox()
    full.save(f"{P}/assets/avatar/mouth-{n[1:]}.png")
print("wrote mouth patches; patch box (4x px):", box)
