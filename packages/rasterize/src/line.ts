import type { Fn, IGrid2D, TypedArray } from "@thi.ng/api";
import { lineClipped } from "@thi.ng/grid-iterators/line";
import { draw2D } from "./draw.js";

export const drawLine = <T extends any[] | TypedArray, P>(
    grid: IGrid2D<T, P>,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    val: P
) =>
    draw2D(
        grid,
        val,
        lineClipped(x1, y1, x2, y2, 0, 0, grid.width, grid.height)
    );

export const drawLineWith = (
    fn: Fn<number[], void>,
    grid: IGrid2D<any, any>,
    x1: number,
    y1: number,
    x2: number,
    y2: number
) => {
    const pts = lineClipped(x1, y1, x2, y2, 0, 0, grid.width, grid.height);
    if (pts) {
        for (let p of pts) fn(p);
    }
    return grid;
};
