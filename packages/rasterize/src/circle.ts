import type { IGrid2D, TypedArray } from "@thi.ng/api";
import { circleClipped } from "@thi.ng/grid-iterators/circle";
import type { Shader2D } from "./api.js";
import { __draw2D } from "./draw.js";

export const drawCircle = <T extends any[] | TypedArray, P>(
    grid: IGrid2D<T, P>,
    x: number,
    y: number,
    r: number,
    val: P | Shader2D<P>,
    fill = false
) =>
    __draw2D(
        circleClipped(x, y, r, 0, 0, grid.size[0], grid.size[1], fill),
        grid,
        val
    );
