import type { Fn, IGrid2D, Predicate2, TypedArray } from "@thi.ng/api";
import { isIterable } from "@thi.ng/checks/is-iterable";
import { isPrimitive } from "@thi.ng/checks/is-primitive";
import { equiv } from "@thi.ng/equiv";
import { floodFill } from "@thi.ng/grid-iterators/flood-fill";
import { isInBounds2D } from "./checks.js";
import { __draw2D } from "./draw.js";

/**
 * Fills pixel in the connected region around `x,y` with given color. Returns
 * pixel buffer.
 *
 * @param grid
 * @param x
 * @param y
 * @param val
 */
export const floodFillSolid = <T extends any[] | TypedArray, P>(
    grid: IGrid2D<T, P>,
    x: number,
    y: number,
    val: P
) =>
    isInBounds2D(grid, x, y)
        ? __draw2D(
              grid,
              val,
              floodFill(__pred(grid, x, y), x, y, grid.size[0], grid.size[1])
          )
        : grid;

/**
 * Fills pixels in the connected region around `x,y` with values returned by
 * pattern function `fn`. That function is called for each grid coordinate.
 *
 * @param fn
 * @param grid
 * @param x
 * @param y
 */
export const floodFillWith = <T extends any[] | TypedArray, P>(
    fn: Fn<number[], P>,
    grid: IGrid2D<T, P>,
    x: number,
    y: number
) => {
    if (!isInBounds2D(grid, x, y)) return grid;
    const {
        data: dest,
        offset: offD,
        stride: [ds, drs],
    } = grid;
    const coords = floodFill(
        __pred(grid, x, y),
        x,
        y,
        grid.size[0],
        grid.size[1]
    );
    if (isPrimitive(grid.getAtUnsafe(x, y))) {
        for (let p of coords) {
            dest[offD + p[0] * ds + p[1] * drs] = fn(p);
        }
    } else {
        for (let p of coords) {
            grid.setAtUnsafe(p[0], p[1], fn(p));
        }
    }
    return grid;
};

/**
 * Fills pixels in the connected region around `x,y` with the pattern defined by
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
    const [w, h] = pattern.size;
    return floodFillWith(
        (p) => pattern.getAtUnsafe(p[0] % w, p[1] % h),
        grid,
        x,
        y
    );
};

const __pred = (
    img: IGrid2D<any, any>,
    x: number,
    y: number
): Predicate2<number> => {
    const {
        data,
        offset,
        stride: [stride, rowStride],
    } = img;
    let srcVal = img.getAtUnsafe(x, y);
    if (isPrimitive(srcVal)) {
        return (x, y) => data[offset + x * stride + y * rowStride] === srcVal;
    }
    if (isIterable(srcVal)) {
        srcVal = [...srcVal];
    }
    return (x, y) => equiv(img.getAtUnsafe(x, y), srcVal);
};
