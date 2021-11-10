import type { IGrid2D, TypedArray } from "@thi.ng/api";
import type { Shader2D } from "./api.js";
import { ensureShader2D } from "./checks.js";
import { drawLine } from "./line.js";

export const drawPolyLine = <T extends any[] | TypedArray, P>(
    grid: IGrid2D<T, P>,
    pts: number[][],
    val: P | Shader2D<P>,
    closed = false
) => {
    val = ensureShader2D(val);
    const n = pts.length;
    let [i, j] = closed ? [0, n - 1] : [1, 0];
    for (; i < n; j = i, i++) {
        const a = pts[j];
        const b = pts[i];
        drawLine(grid, a[0], a[1], b[0], b[1], val);
    }
};
