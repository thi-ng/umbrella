import { toPath } from "./path";
import type {
    Fn,
    Keys,
    Keys1,
    Keys2,
    Keys3,
    Keys4,
    Keys5,
    Keys6,
    Keys7,
    Path,
    Val1,
    Val2,
    Val3,
    Val4,
    Val5,
    Val6,
    Val7,
    Val8
} from "@thi.ng/api";

/**
 * Composes a getter function for given nested lookup path. Optimized
 * fast execution paths are provided for path lengths <= 4.
 *
 * @remarks
 * Supports any `[]`-indexable data structure (arrays, objects,
 * strings).
 *
 * If `path` is given as string, it will be split using `.`. Returns
 * function which accepts single object and when called, returns value
 * at given path.
 *
 * If any intermediate key is not present in the given obj, descent
 * stops and the function returns `undefined`.
 *
 * If `path` is an empty string or array, the returned getter will
 * simply return the given state arg (identity function).
 *
 * Also see: `getIn()`
 *
 * @example
 * ```ts
 * interface Foo {
 *   a: { b: { c: number; } }
 * }
 *
 * // fully typed getter
 * g = getter<Foo, "a", "b", "c">(["a","b","c"]);
 *
 * // error (wrong `d` key)
 * g = getter<Foo, "a", "b", "d">(["a","b","d"]);
 *
 * // unchecked (accepts any, returns any)
 * g = getter("a.b.c");
 *
 * g({ a: { b: { c: 23} } }) // 23
 * g({ x: 23 }) // undefined
 * g() // undefined
 * ```
 *
 * @param path -
 */
export const getter = (path: Readonly<Path>): Fn<any, any> => getterT(<any>path);

/**
 * Type checked version of {@link getter}.
 *
 * @param path -
 */
export function getterT<T>(path: readonly []): Fn<T, T>;
export function getterT<T, A extends Keys<T>>(path: readonly [A]): Fn<T, Val1<T, A>>;
export function getterT<T, A extends Keys<T>, B extends Keys1<T, A>>(
    path: readonly [A, B]
): Fn<T, Val2<T, A, B>>;
export function getterT<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>
>(path: readonly [A, B, C]): Fn<T, Val3<T, A, B, C>>;
export function getterT<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>
>(path: readonly [A, B, C, D]): Fn<T, Val4<T, A, B, C, D>>;
export function getterT<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>
>(path: readonly [A, B, C, D, E]): Fn<T, Val5<T, A, B, C, D, E>>;
export function getterT<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>,
    F extends Keys5<T, A, B, C, D, E>
>(path: readonly [A, B, C, D, E, F]): Fn<T, Val6<T, A, B, C, D, E, F>>;
export function getterT<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>,
    F extends Keys5<T, A, B, C, D, E>,
    G extends Keys6<T, A, B, C, D, E, F>
>(path: readonly [A, B, C, D, E, F, G]): Fn<T, Val7<T, A, B, C, D, E, F, G>>;
export function getterT<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>,
    F extends Keys5<T, A, B, C, D, E>,
    G extends Keys6<T, A, B, C, D, E, F>,
    H extends Keys7<T, A, B, C, D, E, F, G>
>(path: readonly [A, B, C, D, E, F, G, H]): Fn<T, Val8<T, A, B, C, D, E, F, G, H>>;
export function getterT<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>,
    F extends Keys5<T, A, B, C, D, E>,
    G extends Keys6<T, A, B, C, D, E, F>,
    H extends Keys7<T, A, B, C, D, E, F, G>
>(path: readonly [A, B, C, D, E, F, G, H, ...any[]]): Fn<T, any>;
export function getterT(path: Readonly<Path>) {
    const ks = toPath(path);
    let [a, b, c, d] = ks;
    switch (ks.length) {
        case 0:
            return (s: any) => s;
        case 1:
            return (s: any) => (s != null ? s[a] : undefined);
        case 2:
            return (s: any) =>
                s != null ? ((s = s[a]) != null ? s[b] : undefined) : undefined;
        case 3:
            return (s: any) =>
                s != null
                    ? (s = s[a]) != null
                        ? (s = s[b]) != null
                            ? s[c]
                            : undefined
                        : undefined
                    : undefined;
        case 4:
            return (s: any) =>
                s != null
                    ? (s = s[a]) != null
                        ? (s = s[b]) != null
                            ? (s = s[c]) != null
                                ? s[d]
                                : undefined
                            : undefined
                        : undefined
                    : undefined;
        default:
            return (s: any) => {
                const n = ks.length - 1;
                let res = s;
                for (let i = 0; res != null && i <= n; i++) {
                    res = res[ks[i]];
                }
                return res;
            };
    }
}
