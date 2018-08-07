import { Fn1, MapLike } from "./api";

/**
 * Optimized memoization for single arg functions. If the function
 * expects args other than strings or numbers, you MUST provide a `Map`
 * implementation which supports value (rather than object) equality,
 * e.g. one of those provided by thi.ng/associative. Using a native
 * `Map` type here will lead to memory leaks! Alternatively, use
 * `memoizeJ`.
 *
 * @param fn
 * @param cache
 */
export function memoize1<A, B>(fn: Fn1<A, B>, cache?: MapLike<A, B>) {
    !cache && (cache = new Map());
    return (x: A) => {
        let res;
        return cache.has(x) ?
            cache.get(x) :
            (cache.set(x, res = fn(x)), res);
    }
}
