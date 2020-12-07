import type { NumOrString } from "@thi.ng/api";
import { peek } from "@thi.ng/arrays";
import type { Canvas } from "./canvas";
import { charCode } from "./utils";

/**
 * Draws horizontal line from `x`,`y`, taking the current clip rect,
 * format and style into account. The optional `s`, `e` (line endings)
 * and `m` (line middle) chars can be used to override the currently
 * active style.
 *
 * @param canvas
 * @param x
 * @param y
 * @param len
 * @param s
 * @param e
 * @param m
 */
export const hline = (
    canvas: Canvas,
    x: number,
    y: number,
    len: number,
    s?: NumOrString,
    e?: NumOrString,
    m?: NumOrString,
    format = canvas.format
) => {
    const { x1, y1, x2, y2 } = peek(canvas.clipRects);
    if (len < 1 || y < y1 || y >= y2 || x >= x2) return;
    _hvline(
        canvas.buf,
        x,
        y,
        1,
        canvas.width,
        x1,
        x2,
        len,
        format,
        peek(canvas.styles).hl,
        s,
        e,
        m
    );
};

/**
 * Draws a vertical line from `x`,`y`, taking the current clip rect,
 * format and style into account. The optional `s`, `e` (line endings)
 * and `m` (line middle) chars can be used to override the currently
 * active style.
 *
 * @param canvas
 * @param x
 * @param y
 * @param len
 * @param s
 * @param e
 * @param m
 */
export const vline = (
    canvas: Canvas,
    x: number,
    y: number,
    len: number,
    s?: NumOrString,
    e?: NumOrString,
    m?: NumOrString,
    format = canvas.format
) => {
    const { x1, x2, y1, y2 } = peek(canvas.clipRects);
    if (len < 1 || x < x1 || x >= x2 || y >= y2) return;
    _hvline(
        canvas.buf,
        y,
        x,
        canvas.width,
        1,
        y1,
        y2,
        len,
        format,
        peek(canvas.styles).vl,
        s,
        e,
        m
    );
};

const _hvline = (
    buf: Uint32Array,
    a: number,
    b: number,
    astride: number,
    bstride: number,
    amin: number,
    amax: number,
    len: number,
    format: number,
    style: NumOrString,
    s?: NumOrString,
    e?: NumOrString,
    m?: NumOrString
) => {
    a |= 0;
    b |= 0;
    len |= 0;
    let idx: number;
    if (a < amin) {
        len += a - amin;
        a = amin;
        idx = a * astride + b * bstride;
    } else {
        idx = a * astride + b * bstride;
        buf[idx] = charCode(s !== undefined && len > 1 ? s : style, format);
        idx += astride;
        a++;
        len--;
    }
    len--;
    m = charCode(m != undefined ? m : style, format);
    for (let i = 0; i < len && a < amax; i++, a++, idx += astride) {
        buf[idx] = m;
    }
    if (len >= 0 && a < amax) {
        buf[idx] = charCode(e !== undefined ? e : style, format);
    }
};
