import { peek } from "@thi.ng/arrays";
import { SHADES } from "./api";
import { Canvas } from "./canvas";
import { charCode, intersectRect } from "./utils";

// @ts-ignore
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
    const { buf, width } = canvas;
    const clipRect = peek(canvas.clipRects);
    const srcRect = { x1: x, y1: y, x2: x + w, y2: y + h, w, h };
    const { x1, y1, x2, y2, w: iw, h: ih } = intersectRect(srcRect, clipRect);
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
