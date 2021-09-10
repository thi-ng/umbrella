import { range2d } from "@thi.ng/transducers/iter/range2d";
import { map } from "@thi.ng/transducers/xform/map";
import { swapxy } from "./utils";

/**
 * Yields sequence of 2D grid coordinates in column-major order.
 *
 * @param cols
 * @param rows
 */
export const columns2d = (cols: number, rows = cols) =>
    map(swapxy, range2d(rows | 0, cols | 0));
