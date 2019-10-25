/**
 * Yields sequence of 2D grid coordinates in diagonal order starting at
 * [0,0] and using given `cols` and `rows`.
 *
 * Ported & modified from original Java code by Christopher Kulla.
 * https://sourceforge.net/p/sunflow/code/HEAD/tree/trunk/src/org/sunflow/core/bucket/DiagonalBucketOrder.java
 *
 * @param cols
 * @param rows
 */
export function* diagonal2d(cols: number, rows: number) {
    const num = cols * rows - 1;
    for (let x = 0, y = 0, nx = 1, ny = 0, i = 0; i <= num; i++) {
        yield [x, y];
        if (i != num) {
            do {
                if (y === ny) {
                    y = 0;
                    x = nx;
                    ny++;
                    nx++;
                } else {
                    x--;
                    y++;
                }
            } while (y >= rows || x >= cols);
        }
    }
}
