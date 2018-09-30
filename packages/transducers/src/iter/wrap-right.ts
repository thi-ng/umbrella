import { wrap } from "./wrap";

/**
 * See `wrap()`.
 *
 * @deprecated superceded by `wrap()`
 * @param src
 * @param n
 */
export function wrapRight<T>(src: Iterable<T>, n = 1) {
    return wrap(src, n, false, true);
}
