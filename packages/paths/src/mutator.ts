import { toPath } from "./path";
import type {
    Fn2,
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
 * Higher-order function, similar to {@link setter}. Returns function
 * which when called mutates given object/array at given path location.
 *
 * @remarks
 * The returned function bails if any intermediate path values are
 * non-indexable (only the very last path element can be missing in the
 * actual object structure). If successful, returns original (mutated)
 * object, else `undefined`. This function provides optimized versions
 * for path lengths <= 4. Type checking is supported for path lengths <=
 * 8.
 *
 * @param path -
 */
export const mutator = (path: Readonly<Path>): Fn2<any, any, any> => mutatorT(<any>path);

/**
 * Type checked version of {@link mutator}.
 *
 * @param path -
 */
export function mutatorT<T>(path: readonly []): Fn2<T, T, T>;
export function mutatorT<T, A extends Keys<T>>(
    path: readonly [A]
): Fn2<T, Val1<T, A>, T>;
export function mutatorT<T, A extends Keys<T>, B extends Keys1<T, A>>(
    path: readonly [A, B]
): Fn2<T, Val2<T, A, B>, T>;
export function mutatorT<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>
>(path: readonly [A, B, C]): Fn2<T, Val3<T, A, B, C>, T>;
export function mutatorT<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>
>(path: readonly [A, B, C, D]): Fn2<T, Val4<T, A, B, C, D>, T>;
export function mutatorT<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>
>(path: readonly [A, B, C, D, E]): Fn2<T, Val5<T, A, B, C, D, E>, T>;
export function mutatorT<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>,
    F extends Keys5<T, A, B, C, D, E>
>(path: readonly [A, B, C, D, E, F]): Fn2<T, Val6<T, A, B, C, D, E, F>, T>;
export function mutatorT<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>,
    F extends Keys5<T, A, B, C, D, E>,
    G extends Keys6<T, A, B, C, D, E, F>
>(path: readonly [A, B, C, D, E, F, G]): Fn2<T, Val7<T, A, B, C, D, E, F, G>, T>;
export function mutatorT<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>,
    F extends Keys5<T, A, B, C, D, E>,
    G extends Keys6<T, A, B, C, D, E, F>,
    H extends Keys7<T, A, B, C, D, E, F, G>
>(path: readonly [A, B, C, D, E, F, G, H]): Fn2<T, Val8<T, A, B, C, D, E, F, G, H>, T>;
export function mutatorT<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>,
    F extends Keys5<T, A, B, C, D, E>,
    G extends Keys6<T, A, B, C, D, E, F>,
    H extends Keys7<T, A, B, C, D, E, F, G>
>(path: readonly [A, B, C, D, E, F, G, H, ...PropertyKey[]]): Fn2<T, any, any>;
export function mutatorT(path: Readonly<Path>): any {
    const ks = toPath(path);
    let [a, b, c, d] = ks;
    switch (ks.length) {
        case 0:
            return (_: any, x: any) => x;
        case 1:
            return (s: any, x: any) => (s ? ((s[a] = x), s) : undefined);
        case 2:
            return (s: any, x: any) => {
                let t;
                return s
                    ? (t = s[a])
                        ? ((t[b] = x), s)
                        : undefined
                    : undefined;
            };
        case 3:
            return (s: any, x: any) => {
                let t;
                return s
                    ? (t = s[a])
                        ? (t = t[b])
                            ? ((t[c] = x), s)
                            : undefined
                        : undefined
                    : undefined;
            };
        case 4:
            return (s: any, x: any) => {
                let t;
                return s
                    ? (t = s[a])
                        ? (t = t[b])
                            ? (t = t[c])
                                ? ((t[d] = x), s)
                                : undefined
                            : undefined
                        : undefined
                    : undefined;
            };
        default:
            return (s: any, x: any) => {
                let t = s;
                const n = ks.length - 1;
                for (let k = 0; k < n; k++) {
                    if (!(t = t[ks[k]])) return;
                }
                t[ks[n]] = x;
                return s;
            };
    }
}
