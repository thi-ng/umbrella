import { illegalArgs } from "@thi.ng/errors/illegal-arguments";

/**
 * Yields iterator of `src` with the last `n` values of `src` prepended
 * at the beginning. Throws error if `n` < 0 or larger than
 * `src.length`.
 *
 * @param src
 * @param n
 */
export function* wrapLeft<T>(src: T[], n = 1) {
    (n < 0 || n > src.length) && illegalArgs(`wrong number of wrap items: got ${n} max: ${src.length}`);
    for (let m = src.length, i = m - n; i < m; i++) {
        yield src[i];
    }
    yield* src;
}
