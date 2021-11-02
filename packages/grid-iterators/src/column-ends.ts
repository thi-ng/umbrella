import { asInt } from "@thi.ng/api/typedarray";

/**
 * Filtered version of {@link columns2d}, only including end points of
 * each column.
 *
 * @param cols -
 * @param rows -
 */
export function* columnEnds2d(cols: number, rows = cols) {
    [cols, rows] = asInt(cols, rows);
    rows--;
    for (let x = 0; x < cols; x++) {
        yield [x, 0];
        yield [x, rows];
    }
}
