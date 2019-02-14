import { wrap } from "./wrap";

/**
 * See `wrap()`.
 *
 * @deprecated superceded by `wrap()`
 * @param src
 * @param n
 */
export const wrapBoth =
    <T>(src: Iterable<T>, n = 1) => wrap(src, n);
