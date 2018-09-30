import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { ensureArray } from "../func/ensure-array";

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
export function* wrap<T>(src: Iterable<T>, n = 1, left = true, right = true) {
    const _src: T[] = ensureArray(src);
    (n < 0 || n > _src.length) && illegalArgs(`wrong number of wrap items: got ${n}, but max: ${_src.length}`);
    if (left) {
        for (let m = _src.length, i = m - n; i < m; i++) {
            yield _src[i];
        }
    }
    yield* _src;
    if (right) {
        for (let i = 0; i < n; i++) {
            yield _src[i];
        }
    }
}
