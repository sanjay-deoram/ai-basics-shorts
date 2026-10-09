# Cuts the avatar frames out of assets/avatar/source-sheet.jpg (the Gemini expression sheet, 1024x1024,
# 4 panels per row) into assets/avatar/<name>.png: labels blanked, white background removed from the top and
# sides (the shirt touches the bottom edge), every panel registered to the base pose (scale + offset, found by
# matching the hair and shoulders), torso faded out at the bottom, upscaled 4x.
#
# Usage (from the project folder; needs pillow, numpy, scipy):  python3 tools/cut-avatar.py
import os, numpy as np
from PIL import Image
from scipy import ndimage as ndi
P = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
SHEET = Image.open(f"{P}/assets/avatar/source-sheet.jpg").convert("RGB")
COLS = [(33, 252), (275, 501), (527, 753), (777, 996)]
ROWS = [(88, 343), (366, 664)]
GRID = {"base": (0, 0), "smile": (0, 1), "talk": (0, 2), "ah": (0, 3), "side": (1, 0), "doubt": (1, 1), "focus": (1, 2), "oh": (1, 3)}
def panel(n):
    r, c = GRID[n]
    return SHEET.crop((COLS[c][0], ROWS[r][0], COLS[c][1], ROWS[r][1]))
# scale and offset of each panel relative to the base pose (from align.py)
REG = {"base": (1.0, 0, 0), "smile": (0.98, -1, 2), "talk": (0.98, 0, 3), "ah": (1.0, 0, 0),
       "side": (0.95, 5, 1), "doubt": (0.95, 1, 1), "focus": (0.95, 2, 1), "oh": (0.95, 6, 1)}
H, W, UP = 255, 219, 4
FADE0, FADE1 = 190, 250          # torso dissolves between these rows (base-panel pixels)
def place(n):
    a = np.asarray(panel(n).convert("L")).astype(float)
    # blank the label: everything above the first all-white row under the text
    y = 2
    while a[y].min() >= 200: y += 1     # down to the text
    while a[y].min() < 200: y += 1      # through it
    a[:y + 1] = 255
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
for n in ("smile", "talk", "ah", "oh"):
    full = Image.open(f"{P}/assets/avatar/{n}.png")
    a = np.asarray(full.getchannel("A")).astype(float) * np.asarray(mask_big).astype(float) / 255
    full.putalpha(Image.fromarray(a.astype(np.uint8)))
    box = full.getbbox()
    full.save(f"{P}/assets/avatar/mouth-{n}.png")
print("wrote mouth patches; patch box (4x px):", box)
