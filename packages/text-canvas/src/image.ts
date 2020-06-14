import { peek } from "@thi.ng/arrays";
import { ImageOpts, SHADES_BLOCK } from "./api";
import { Canvas } from "./canvas";
import { charCode, intersectRect } from "./utils";

export const blit = (canvas: Canvas, x: number, y: number, src: Canvas) => {
    x |= 0;
    y |= 0;
    const { buf: sbuf, width: sw, height: sh } = src;
    const { buf: dbuf, width: dw } = canvas;
    const { x1, y1, y2, w: iw, h: ih } = intersectRect(
        { x1: x, y1: y, x2: x + sw, y2: y + sh, w: sw, h: sh },
        peek(canvas.clipRects)
    );
    if (!iw || !ih) return;
    const sx = Math.max(0, x1 - x);
    const sy = Math.max(0, y1 - y);
    for (let yy = sy, dy = y1; dy < y2; yy++, dy++) {
        let sidx = sx + yy * sw;
        let didx = x1 + dy * dw;
        dbuf.set(sbuf.subarray(sidx, sidx + iw), didx);
    }
};

export const resize = (canvas: Canvas, newWidth: number, newHeight: number) => {
    if (canvas.width === newWidth && canvas.height === newHeight) return;
    const dest = new Canvas(newWidth, newHeight);
    dest.buf.fill(charCode(0x20, canvas.format));
    blit(dest, 0, 0, canvas);
    canvas.buf = dest.buf;
    canvas.width = newWidth;
    canvas.height = newHeight;
    canvas.clipRects = [
        {
            x1: 0,
            y1: 0,
            x2: newWidth,
            y2: newHeight,
            w: newWidth,
            h: newHeight,
        },
    ];
};

export const extract = (
    canvas: Canvas,
    x: number,
    y: number,
    w: number,
    h: number
) => {
    const dest = new Canvas(w, h, canvas.format, peek(canvas.styles));
    blit(dest, -x, -y, canvas);
    return dest;
};

/**
 * Scrolls canvas vertically by `dy` lines. If `dy > 0` content moves
 * upward, if `dy < 0` downward. The new empty space will be filled with
 * `clear` char (default: ` `).
 *
 * @param canvas
 * @param dy
 * @param clear
 */
export const scrollV = (canvas: Canvas, dy: number, clear = 0x20) => {
    const { buf, width } = canvas;
    const ch = charCode(clear, canvas.format);
    dy *= width;
    if (dy < 0) {
        buf.copyWithin(-dy, 0, dy);
        buf.fill(ch, 0, -dy);
    } else if (dy > 0) {
        buf.copyWithin(0, dy);
        buf.fill(ch, -dy);
    }
};

/**
 *
 * @param canvas
 * @param x
 * @param y
 * @param w
 * @param h
 * @param pixels
 * @param opts
 */
export const image = (
    canvas: Canvas,
    x: number,
    y: number,
    w: number,
    h: number,
    pixels: ArrayLike<number>,
    opts?: Partial<ImageOpts>
) => {
    x |= 0;
    y |= 0;
    w |= 0;
    h |= 0;
    const { buf, width } = canvas;
    const { x1, y1, x2, y2, w: iw, h: ih } = intersectRect(
        { x1: x, y1: y, x2: x + w, y2: y + h, w, h },
        peek(canvas.clipRects)
    );
    if (!iw || !ih) return;
    const sx = Math.max(0, x1 - x);
    const sy = Math.max(0, y1 - y);
    const { chars, format, gamma, invert, bits } = {
        chars: SHADES_BLOCK,
        format: canvas.format,
        gamma: 1,
        invert: false,
        bits: 8,
        ...opts,
    };
    const max = (1 << bits) - 1;
    const mask = invert ? max : 0;
    const norm = 1 / max;
    const num = chars.length - 1;
    for (let yy = sy, dy = y1; dy < y2; yy++, dy++) {
        let sidx = sx + yy * w;
        let didx = x1 + dy * width;
        for (let xx = sx, dx = x1; dx < x2; xx++, dx++) {
            buf[didx++] = charCode(
                chars[
                    (Math.pow((pixels[sidx++] ^ mask) * norm, gamma) * num +
                        0.5) |
                        0
                ],
                format
            );
        }
    }
};
