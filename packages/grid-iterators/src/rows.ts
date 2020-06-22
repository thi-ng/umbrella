import { range2d } from "@thi.ng/transducers";

/**
 * Yields sequence of 2D grid coordinates in row-major order. Same as
 * {@link @thi.ng/transducers#range2d}.
 *
 * @param cols
 * @param rows
 */
export const rows2d = (cols: number, rows = cols) => range2d(cols, rows);
