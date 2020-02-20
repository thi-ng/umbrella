import { peek } from "@thi.ng/arrays";
import { SHADES } from "./api";
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

export const image = (
    canvas: Canvas,
    x: number,
    y: number,
    w: number,
    h: number,
    pixels: ArrayLike<number>,
    format = canvas.format,
    gamma = 2.2
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
    for (let yy = sy, dy = y1; dy < y2; yy++, dy++) {
        let sidx = sx + yy * w;
        let didx = x1 + dy * width;
        for (let xx = sx, dx = x1; dx < x2; xx++, dx++) {
            buf[didx++] = charCode(
                SHADES[(Math.pow(pixels[sidx++] / 255, gamma) * 4) | 0],
                format
            );
        }
    }
};
