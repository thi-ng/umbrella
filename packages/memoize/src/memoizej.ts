import type { Fn, Fn2, Fn3, Fn4, FnAny, IObjectOf } from "@thi.ng/api";

/**
 * Function memoization for arbitrary argument counts. Returns augmented
 * function, which uses `JSON.stringify()` to obtain (and store)
 * memoized result for given args. Supports generics for up to 4 args
 * (otherwise untyped).
 *
 * **Important:** If the given args cannot be stringified, the user
 * function will ALWAYS be called (without caching result).
 *
 * @param fn -
 * @param cache -
 */
export function memoizeJ<A, B>(fn: Fn<A, B>, cache?: IObjectOf<B>): Fn<A, B>;
export function memoizeJ<A, B, C>(
    fn: Fn2<A, B, C>,
    cache?: IObjectOf<C>
): Fn2<A, B, C>;
export function memoizeJ<A, B, C, D>(
    fn: Fn3<A, B, C, D>,
    cache?: IObjectOf<D>
): Fn3<A, B, C, D>;
export function memoizeJ<A, B, C, D, E>(
    fn: Fn4<A, B, C, D, E>,
    cache?: IObjectOf<E>
): Fn4<A, B, C, D, E>;
export function memoizeJ(fn: FnAny<any>, cache?: IObjectOf<any>): FnAny<any> {
    !cache && (cache = {});
    return (...args: any[]) => {
        const key = JSON.stringify(args);
        if (key !== undefined) {
            return key in cache!
                ? cache![key]
                : (cache![key] = fn.apply(null, args));
        }
        return fn.apply(null, args);
    };
}
