import {
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
import { isArray } from "@thi.ng/checks";
import { toPath } from "./path";

/**
 * Composes a setter function for given nested update path. Optimized
 * fast execution paths are provided for path lengths less up to 4.
 *
 * @remarks
 * Supports both arrays and objects and creates intermediate shallow
 * copies at each level of the path. Thus provides structural sharing
 * with the original data for any branches not being updated by the
 * setter.
 *
 * If `path` is given as string, it will be split using `.`. Returns
 * function which accepts single object and when called, **immutably**
 * updates value at given path, i.e. produces a partial deep copy of obj
 * up until given path.
 *
 * If any intermediate key is not present in the given obj, creates a
 * plain empty object for that key and descends further.
 *
 * If `path` is an empty string or array, the returned setter will
 * simply return the new value.
 *
 * Only keys in the path will be modified, all other keys present in the
 * given object retain their original values to provide efficient
 * structural sharing / re-use.
 *
 * Also see: {@link setIn}, {@link updateIn}, {@link deleteIn}
 *
 * @example
 * ```
 * s = setter("a.b.c");
 * // or
 * s = setter(["a","b","c"]);
 *
 * s({ a: { b: { c: 23} } }, 24)
 * // { a: { b: { c: 24} } }
 *
 * s({ x: 23 }, 24)
 * // { x: 23, a: { b: { c: 24 } } }
 *
 * s(null, 24)
 * // { a: { b: { c: 24 } } }
 * ```
 *
 * @example
 * ```ts
 * s = setter("a.b.c");
 *
 * a = {x: {y: {z: 1}}};
 * b = s(a, 2);
 * // { x: { y: { z: 1 } }, a: { b: { c: 2 } } }
 *
 * a.x === b.x // true
 * a.x.y === b.x.y // true
 * ```
 *
 * @param path
 */
export const setter = (path: Path): Fn2<any, any, any> => setterT(<any>path);

/**
 * Type checked version of {@link setter}.
 *
 * @param path
 */
export function setterT<T>(path: []): Fn2<T, T, T>;
export function setterT<T, A extends Keys<T>>(path: [A]): Fn2<T, Val1<T, A>, T>;
export function setterT<T, A extends Keys<T>, B extends Keys1<T, A>>(
    path: [A, B]
): Fn2<T, Val2<T, A, B>, T>;
export function setterT<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>
>(path: [A, B, C]): Fn2<T, Val3<T, A, B, C>, T>;
export function setterT<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>
>(path: [A, B, C, D]): Fn2<T, Val4<T, A, B, C, D>, T>;
export function setterT<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>
>(path: [A, B, C, D, E]): Fn2<T, Val5<T, A, B, C, D, E>, T>;
export function setterT<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>,
    F extends Keys5<T, A, B, C, D, E>
>(path: [A, B, C, D, E, F]): Fn2<T, Val6<T, A, B, C, D, E, F>, T>;
export function setterT<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>,
    F extends Keys5<T, A, B, C, D, E>,
    G extends Keys6<T, A, B, C, D, E, F>
>(path: [A, B, C, D, E, F, G]): Fn2<T, Val7<T, A, B, C, D, E, F, G>, T>;
export function setterT<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>,
    F extends Keys5<T, A, B, C, D, E>,
    G extends Keys6<T, A, B, C, D, E, F>,
    H extends Keys7<T, A, B, C, D, E, F, G>
>(path: [A, B, C, D, E, F, G, H]): Fn2<T, Val8<T, A, B, C, D, E, F, G, H>, T>;
export function setterT<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>,
    F extends Keys5<T, A, B, C, D, E>,
    G extends Keys6<T, A, B, C, D, E, F>,
    H extends Keys7<T, A, B, C, D, E, F, G>
>(path: [A, B, C, D, E, F, G, H, ...PropertyKey[]]): Fn2<T, any, any>;
export function setterT(path: Path): Fn2<any, any, any> {
    const ks = toPath(path);
    let [a, b, c, d] = ks;
    switch (ks.length) {
        case 0:
            return (_, v) => v;
        case 1:
            return (s, v) => ((s = _copy(s)), (s[a] = v), s);
        case 2:
            return (s, v) => {
                let x;
                s = _copy(s);
                s[a] = x = _copy(s[a]);
                x[b] = v;
                return s;
            };
        case 3:
            return (s, v) => {
                let x, y;
                s = _copy(s);
                s[a] = x = _copy(s[a]);
                x[b] = y = _copy(x[b]);
                y[c] = v;
                return s;
            };
        case 4:
            return (s, v) => {
                let x, y, z;
                s = _copy(s);
                s[a] = x = _copy(s[a]);
                x[b] = y = _copy(x[b]);
                y[c] = z = _copy(y[c]);
                z[d] = v;
                return s;
            };
        default:
            let f: any;
            for (let i = ks.length; --i >= 0; ) {
                f = compS(ks[i], f);
            }
            return f;
    }
}

const _copy = (s: any) => (isArray(s) ? s.slice() : { ...s });

const compS = (k: PropertyKey, f: (o: any, v: any) => any) => (
    s: any,
    v: any
) => ((s = _copy(s)), (s[k] = f ? f(s[k], v) : v), s);
