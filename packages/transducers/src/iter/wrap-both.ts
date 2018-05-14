import { wrap } from "./wrap";

/**
 * See `wrap()`.
 *
 * @deprecated superceded by `wrap()`
 * @param src
 * @param n
 */
export function wrapBoth<T>(src: T[], n = 1) {
    return wrap(src, n);
}
