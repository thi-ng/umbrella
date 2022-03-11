import type { NumOrString } from "@thi.ng/api";
import { peek } from "@thi.ng/arrays/peek";
import type { Canvas } from "./canvas.js";
import { hline, vline } from "./hvline.js";
import { charCode } from "./utils.js";

/**
 * Clears/fills the canvas' current clip rect with given char (default:
 * 0x20 / space). If `reset` is true, first resets all internal state
 * (clipping, format, style), so that entire canvas will be cleared.
 *
 * @param canvas - 
 * @param reset - 
 * @param code - 
 */
export const clear = (
    canvas: Canvas,
    reset = false,
    code: NumOrString = 0x20
) => {
    const rects = canvas.clipRects;
    if (reset) {
        rects.length = canvas.styles.length = 1;
        canvas.format = canvas.defaultFormat;
    }
    code = charCode(code, canvas.format);
    if (rects.length > 1) {
        const { x1, y1, w, h } = peek(rects);
        fillRect(canvas, x1, y1, w, h, code);
    } else {
        canvas.data.fill(code);
    }
};

/**
 * Fills given rect with char, taking currect clip rect and format into
 * account.
 *
 * @param canvas - 
 * @param x - 
 * @param y - 
 * @param w - 
 * @param h - 
 * @param char - 
 */
export const fillRect = (
    canvas: Canvas,
    x: number,
    y: number,
    w: number,
    h: number,
    char: NumOrString,
    format = canvas.format
) => {
    x |= 0;
    y |= 0;
    w |= 0;
    h |= 0;
    const { x1, y1, x2, y2 } = peek(canvas.clipRects);
    if (x < x1) {
        w += x - x1;
        x = x1;
    }
    if (y < y1) {
        h += y - y1;
        y = y1;
    }
    const { data, width } = canvas;
    if (w < 1 || h < 1 || x >= x2 || y >= y2) return;
    w = Math.min(w, x2 - x);
    h = Math.min(h, y2 - y);
    char = charCode(char, format);
    for (; h-- > 0; y++) {
        const idx = x + y * width;
        data.fill(char, idx, idx + w);
    }
};

/**
 * Draws an outline of given rect, taking the current clip rect, format
 * and style into account.
 *
 * @param canvas - 
 * @param x - 
 * @param y - 
 * @param w - 
 * @param h - 
 */
export const strokeRect = (
    canvas: Canvas,
    x: number,
    y: number,
    w: number,
    h: number,
    format = canvas.format
) => {
    w |= 0;
    h |= 0;
    if (w < 2 || h < 2) return;
    const style = peek(canvas.styles);
    hline(canvas, x, y, w, style.tl, style.tr, style.hl, format);
    hline(canvas, x, y + h - 1, w, style.bl, style.br, style.hl, format);
    vline(canvas, x, y + 1, h - 2, undefined, undefined, undefined, format);
    vline(
        canvas,
        x + w - 1,
        y + 1,
        h - 2,
        undefined,
        undefined,
        undefined,
        format
    );
};
