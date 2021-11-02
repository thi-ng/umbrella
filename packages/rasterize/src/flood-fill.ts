import type { IGrid2D, TypedArray } from "@thi.ng/api";
import { floodFill } from "@thi.ng/grid-iterators/flood-fill";
import { isInBounds2D } from "./checks.js";
import { draw2D } from "./draw.js";

/**
 * Fills pixel in the connected region around `x,y` with given color. Returns
 * pixel buffer.
 *
 * @param img
 * @param x
 * @param y
 * @param val
 */
export const floodFillSolid = <T extends any[] | TypedArray, P>(
    img: IGrid2D<T, P>,
    x: number,
    y: number,
    val: P
) => {
    if (!isInBounds2D(img, x, y)) return img;
    const { data, width, height, stride, rowStride } = img;
    const srcVal = img.getAtUnsafe(x, y);
    return draw2D(
        img,
        val,
        floodFill(
            (x, y) => data[x * stride + y * rowStride] === srcVal,
            x,
            y,
            width,
            height
        )
    );
};

/**
 * Fills pixel in the connected region around `x,y` with the pattern defined by
 * given `pattern` image (must be in same format as `img`). Returns updated
 * pixel buffer.
 *
 * @param grid
 * @param x
 * @param y
 * @param pattern
 */
export const floodFillPattern = <T extends any[] | TypedArray, P>(
    grid: IGrid2D<T, P>,
    x: number,
    y: number,
    pattern: IGrid2D<T, P>
) => {
    if (!isInBounds2D(grid, x, y)) return grid;
    const { data: dest, stride: ds, rowStride: drs } = grid;
    const {
        data: src,
        width: sw,
        height: sh,
        stride: ss,
        rowStride: srs,
    } = pattern;
    const srcVal = grid.getAtUnsafe(x, y);
    for (let [xx, yy] of floodFill(
        (x, y) => dest[x * ds + y * drs] === srcVal,
        x,
        y,
        grid.width,
        grid.height
    )) {
        dest[xx * ds + yy * drs] = src[(xx % sw) * ss + (yy % sh) * srs];
    }
    return grid;
};
