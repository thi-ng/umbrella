import type { IGrid2D, TypedArray } from "@thi.ng/api";
import { isPrimitive } from "@thi.ng/checks";
import { hlineClipped, vlineClipped } from "@thi.ng/grid-iterators/hvline";
import { rows2d } from "@thi.ng/grid-iterators/rows";
import { concat } from "@thi.ng/transducers/concat";
import { __draw2D } from "./draw.js";

export const drawRect = <T extends any[] | TypedArray, P>(
    grid: IGrid2D<T, P>,
    x: number,
    y: number,
    w: number,
    h: number,
    val: P,
    fill = false
) => {
    x |= 0;
    y |= 0;
    w |= 0;
    h |= 0;
    const {
        data,
        offset,
        size: [width, height],
        stride: [sx, sy],
    } = grid;
    if (fill) {
        if (x < 0) {
            w += x;
            x = 0;
        }
        if (y < 0) {
            h += y;
            y = 0;
        }
        const pts = rows2d(Math.min(w, width - x), Math.min(h, height - y));
        if (isPrimitive(val)) {
            for (let p of pts) {
                data[offset + (p[0] + x) * sx + (y + p[1]) * sy] = val;
            }
        } else {
            for (let p of pts) {
                grid.setAtUnsafe(x + p[0], y + p[1], val);
            }
        }
        return grid;
    }
    return __draw2D(
        grid,
        val,
        concat(
            hlineClipped(x, y, w, 0, 0, width, height),
            vlineClipped(x, y + 1, h - 2, 0, 0, width, height),
            hlineClipped(x, y + h - 1, w, 0, 0, width, height),
            vlineClipped(x + w - 1, y + 1, h - 2, 0, 0, width, height)
        )
    );
};
