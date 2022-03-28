import type { FnU2 } from "@thi.ng/api";
import { defBitField } from "@thi.ng/bitfield/bitfield";

/**
 * Yields iterator of 2D grid coordinates based on the recursive Diamond Square
 * algorithm. The given `exp` is a power of 2 exponent and the resulting
 * coordinates (in both directions) will be in the closed [0..2^exp] interval
 * (i.e. each axis is always a power-of-2 plus 1).
 *
 * @remarks
 * Reference: https://en.wikipedia.org/wiki/Diamond-square_algorithm
 *
 * @example
 * ```ts
 * // generate coords for a 17x17 grid
 * [...diamondSquare(4)]
 * // [
 * //   [0, 0],  [16, 0], [16, 16], [0, 16], [8, 0],  [8, 16],
 * //   [16, 8], [0, 8],  [8, 8],   [4, 0],  [12, 0], [12, 16],
 * //   [4, 16], [8, 4],  [8, 12],  [4, 8],  [12, 8], [0, 4],
 * //   ...
 * // ]
 * ```
 *
 * @param exp
 */
export function* diamondSquare(exp: number) {
    const size = 1 << exp;
    const size1 = size + 1;
    const s2 = size >> 1;
    let res = size;
    const idx = defBitField(size1 * size1);
    const acc: number[][] = [];
    const $: FnU2<number, void> = (x, y) => {
        !idx.setAt(x + y * size1) && acc.push([x, y]);
    };
    $(0, 0);
    $(res, 0);
    $(res, res);
    $(0, res);
    yield* acc;
    while (res > 1) {
        const r2 = res >> 1;
        for (let y = 0; y <= s2; y += res) {
            const y1 = y + r2;
            const y2 = y + res;
            for (let x = r2; x <= s2; x += res) {
                acc.length = 0;
                const x1 = x - r2;
                const x2 = x + r2;
                $(x, y);
                $(size - x, y);
                $(size - x, size - y);
                $(x, size - y);

                $(x2, y1);
                $(size - x2, y1);
                $(size - x2, size - y1);
                $(x2, size - y1);

                $(x, y2);
                $(size - x, y2);
                $(size - x, size - y2);
                $(x, size - y2);

                $(x1, y1);
                $(size - x1, y1);
                $(size - x1, size - y1);
                $(x1, size - y1);

                $(x, y1);
                $(size - x, y1);
                $(size - x, size - y1);
                $(x, size - y1);
                yield* acc;
            }
        }
        res = r2;
    }
}
