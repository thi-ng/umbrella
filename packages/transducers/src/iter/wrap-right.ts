import { illegalArgs } from "@thi.ng/errors/illegal-arguments";

/**
 * Yields iterator of `src` with the first `n` values of `src` appended
 * at the end. Throws error if `n` < 0 or larger than `src.length`.
 *
 * @param src
 * @param n
 */
export function* wrapRight<T>(src: T[], n = 1) {
    (n < 0 || n > src.length) && illegalArgs(`wrong number of wrap items: got ${n} max: ${src.length}`);
    yield* src;
    for (let i = 0; i < n; i++) {
        yield src[i];
    }
}
