/**
 * Filtered version of {@link rows2d}, only including end points of
 * each row.
 *
 * @param cols -
 * @param rows -
 */
export function* rowEnds2d(cols: number, rows = cols) {
    cols--;
    for (let y = 0; y < rows; y++) {
        yield [0, y];
        yield [cols, y];
    }
}
