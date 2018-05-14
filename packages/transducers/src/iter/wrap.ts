import { illegalArgs } from "@thi.ng/errors/illegal-arguments";

/**
 * Yields iterator of `src` with the last `n` values of `src` prepended
 * at the beginning (if `left` is truthy) and/or the first `n` values
 * appended at the end (if `right` is truthy). Wraps both sides by
 * default and throws error if `n` < 0 or larger than `src.length`.
 *
 * @param src
 * @param n
 * @param left
 * @param right
 */
export function* wrap<T>(src: T[], n = 1, left = true, right = true) {
    (n < 0 || n > src.length) && illegalArgs(`wrong number of wrap items: got ${n} max: ${src.length}`);
    if (left) {
        for (let m = src.length, i = m - n; i < m; i++) {
            yield src[i];
        }
    }
    yield* src;
    if (right) {
        for (let i = 0; i < n; i++) {
            yield src[i];
        }
    }
}
