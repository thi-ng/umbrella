import type { IGrid2D, TypedArray } from "@thi.ng/api";
import { hlineClipped, vlineClipped } from "@thi.ng/grid-iterators/hvline";
import { rows2d } from "@thi.ng/grid-iterators/rows";
import { concat } from "@thi.ng/transducers/concat";
import { draw2D } from "./draw.js";

export const drawRect = <T extends any[] | TypedArray, P>(
    grid: IGrid2D<T, P>,
    x: number,
    y: number,
    w: number,
    h: number,
    val: P,
    fill = false
) => {
    const { data, width: iw, height: ih, stride, rowStride } = grid;
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
            data[(x + xx) * stride + (y + yy) * rowStride] = val;
        }
        return;
    }
    return draw2D(
        grid,
        val,
        concat(
            hlineClipped(x, y, w, 0, 0, iw, ih),
            vlineClipped(x, y + 1, h - 2, 0, 0, iw, ih),
            hlineClipped(x, y + h - 1, w, 0, 0, iw, ih),
            vlineClipped(x + w - 1, y + 1, h - 2, 0, 0, iw, ih)
        )
    );
};
