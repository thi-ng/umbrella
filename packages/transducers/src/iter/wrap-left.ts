import { wrap } from "./wrap";

/**
 * See `wrap()`.
 *
 * @deprecated superceded by `wrap()`
 * @param src
 * @param n
 */
export function wrapLeft<T>(src: Iterable<T>, n = 1) {
    return wrap(src, n, true, false);
}
