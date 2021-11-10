import type { Fn, IGrid2D, TypedArray } from "@thi.ng/api";
import { lineClipped } from "@thi.ng/grid-iterators/line";
import type { Shader2D } from "./api.js";
import { __draw2D } from "./draw.js";

export const drawLine = <T extends any[] | TypedArray, P>(
    grid: IGrid2D<T, P>,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    val: P | Shader2D<P>
) =>
    __draw2D(
        lineClipped(x1, y1, x2, y2, 0, 0, grid.size[0], grid.size[1]),
        grid,
        val
    );

export const traceLine = (
    grid: IGrid2D<any, any>,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    fn: Fn<number[], void>
) => {
    const pts = lineClipped(x1, y1, x2, y2, 0, 0, grid.size[0], grid.size[1]);
    if (pts) {
        for (let p of pts) fn(p);
    }
    return grid;
};
