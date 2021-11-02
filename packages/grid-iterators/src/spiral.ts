import { asInt } from "@thi.ng/api/typedarray";

/**
 * Yields sequence of 2D grid coordinates in outward spiral order
 * starting from the center, given `cols` and `rows`.
 *
 * Ported & modified from original Java code by Christopher Kulla.
 * {@link https://sourceforge.net/p/sunflow/code/HEAD/tree/trunk/src/org/sunflow/core/bucket/SpiralBucketOrder.java}
 *
 * @param cols -
 * @param rows -
 */
export function* spiral2d(cols: number, rows = cols) {
    [cols, rows] = asInt(cols, rows);
    const num = cols * rows;
    const center = (Math.min(cols, rows) - 1) >> 1;
    for (let i = 0; i < num; i++) {
        let nx = cols;
        let ny = rows;
        while (i < nx * ny) {
            nx--;
            ny--;
        }
        const nxny = nx * ny;
        const minnxny = Math.min(nx, ny);
        const m2 = minnxny >> 1;
        let bx, by;
        if (minnxny & 1) {
            if (i <= nxny + ny) {
                bx = nx - m2;
                by = -m2 + i - nxny;
            } else {
                bx = nx - m2 - (i - (nxny + ny));
                by = ny - m2;
            }
        } else {
            if (i <= nxny + ny) {
                bx = -m2;
                by = ny - m2 - (i - nxny);
            } else {
                bx = -m2 + (i - (nxny + ny));
                by = -m2;
            }
        }
        yield [bx + center, by + center];
    }
}
