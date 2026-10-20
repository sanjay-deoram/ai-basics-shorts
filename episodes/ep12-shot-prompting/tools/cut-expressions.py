# Cuts the expression panels out of assets/avatar/source-expressions.jpg (the Gemini expression sheet, 1024x1024,
# 4 panels per row) into assets/avatar/x-<name>.png. Its base pose matches the flipbook's f1 exactly, so these
# patches sit straight on f1.png (tools/cut-flipbook.py). Per panel: labels blanked, white background removed from the top and
# sides (the shirt touches the bottom edge), every panel registered to the base pose (scale + offset, found by
# matching the hair and shoulders), torso faded out at the bottom, upscaled 4x.
#
# Usage (from the project folder; needs pillow, numpy, scipy):  python3 tools/cut-expressions.py
import os, numpy as np
from PIL import Image
from scipy import ndimage as ndi
P = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
SHEET = Image.open(f"{P}/assets/avatar/source-expressions.jpg").convert("RGB")
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
    rgba.save(f"{P}/assets/avatar/x-{n}.png")
print("wrote", len(REG), "frames to assets/avatar")

# Patches for the flipbook face: the smile's mouth, and the doubtful look's brows + eyes and flat mouth. Each is
# cut with a feathered ellipse so only that part of the face changes.
yy, xx = np.mgrid[0:H, 0:W]
def patch(src, out, cx, cy, rx, ry, feather):
    ell = (((xx - cx) / rx) ** 2 + ((yy - cy) / ry) ** 2) <= 1
    m = np.clip(ndi.gaussian_filter(ell.astype(float), feather) * 1.6, 0, 1)
    m = np.asarray(Image.fromarray((m * 255).astype(np.uint8)).resize((W * UP, H * UP), Image.LANCZOS)).astype(float) / 255
    full = Image.open(f"{P}/assets/avatar/x-{src}.png")
    full.putalpha(Image.fromarray((np.asarray(full.getchannel("A")).astype(float) * m).astype(np.uint8)))
    full.save(f"{P}/assets/avatar/{out}.png")
MOUTH = dict(cx=113, cy=174, rx=36, ry=25, feather=5.0)   # same ellipse as the flipbook mouths
BROWS = dict(cx=108, cy=117, rx=56, ry=25, feather=5.0)   # both brows and the eyes, inside the glasses
patch("smile", "mouth-smile", **MOUTH)
patch("doubt", "mouth-doubt", **MOUTH)
patch("doubt", "brows-doubt", **BROWS)
print("wrote mouth-smile, mouth-doubt, brows-doubt")
for n in REG: os.remove(f"{P}/assets/avatar/x-{n}.png")   # full panels were only needed to cut the patches
