import { lowDiscrepancy } from "./lowdisc";

/** @internal */
const fract = (x: number) => x - Math.floor(x);

/**
 * Iterator yielding 1D Kronecker Recurrence sequence for given `alpha` and
 * `start` values, where `y(i) = fract(start + i * alpha)` and `i` is the
 * iteration counter. The `alpha` param should be an irrational number in the
 * `(0..1)` interval.
 *
 * @remarks
 * Reference:
 * - https://math.stackexchange.com/a/2848339
 * - http://extremelearning.com.au/unreasonable-effectiveness-of-quasirandom-sequences/
 *
 * @param alpha
 * @param start
 */
export function* kronecker(alpha: number, start = 0) {
    while (true) yield (start = fract(start + alpha));
}

/**
 * n-dimensional version of {@link kronecker}. Takes a vector of `alphas` (one
 * per dimension) and yields iterator of nD points. If `offset` > 0, the stated
 * number of initial iterations will be skipped.
 *
 * @param bases
 * @param offset
 */
export const kroneckerND = (alphas: number[], offset = 0) =>
    lowDiscrepancy(alphas.map(kronecker), offset);
