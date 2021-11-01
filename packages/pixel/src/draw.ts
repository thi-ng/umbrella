import type { Fn, UIntArray } from "@thi.ng/api";
import { circleClipped } from "@thi.ng/grid-iterators/circle";
import { hlineClipped, vlineClipped } from "@thi.ng/grid-iterators/hvline";
import { lineClipped } from "@thi.ng/grid-iterators/line";
import { rows2d } from "@thi.ng/grid-iterators/rows";
import { concat } from "@thi.ng/transducers/concat";
import type { IPixelBuffer } from "./api.js";

/** @internal */
const draw = (
    img: IPixelBuffer<UIntArray, number>,
    col: number,
    pts: Iterable<number[]>
) => {
    for (let [xx, yy] of pts) img.setAtUnsafe(xx, yy, col);
    return img;
};

export const drawLine = (
    img: IPixelBuffer<UIntArray, number>,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    col: number
) => draw(img, col, lineClipped(x1, y1, x2, y2, 0, 0, img.width, img.height));

export const drawLineWith = (
    fn: Fn<number[], void>,
    img: IPixelBuffer<UIntArray, number>,
    x1: number,
    y1: number,
    x2: number,
    y2: number
) => {
    for (let p of lineClipped(x1, y1, x2, y2, 0, 0, img.width, img.height))
        fn(p);
    return img;
};

export const drawCircle = (
    img: IPixelBuffer<UIntArray, number>,
    x: number,
    y: number,
    r: number,
    col: number,
    fill = false
) => draw(img, col, circleClipped(x, y, r, 0, 0, img.width, img.height, fill));

export const drawRect = (
    img: IPixelBuffer<UIntArray, number>,
    x: number,
    y: number,
    w: number,
    h: number,
    col: number,
    fill = false
) => {
    const { width: iw, height: ih } = img;
    if (fill) {
        if (x < 0) {
            w += x;
            x = 0;
        }
        if (y < 0) {
            h += y;
            y = 0;
        }
        for (let [xx, yy] of rows2d(Math.min(w, iw - x), Math.min(h, ih - y))) {
            img.setAt(x + xx, y + yy, col);
        }
        return;
    }
    return draw(
        img,
        col,
        concat(
            hlineClipped(x, y, w, 0, 0, iw, ih),
            vlineClipped(x, y + 1, h - 2, 0, 0, iw, ih),
            hlineClipped(x, y + h - 1, w, 0, 0, iw, ih),
            vlineClipped(x + w - 1, y + 1, h - 2, 0, 0, iw, ih)
        )
    );
};
