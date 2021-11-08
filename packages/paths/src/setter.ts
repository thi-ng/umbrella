import type {
    DeepPath,
    Fn2,
    NumOrString,
    Path,
    Path0,
    Path1,
    Path2,
    Path3,
    Path4,
    Path5,
    Path6,
    Path7,
    Path8,
    PathVal,
} from "@thi.ng/api";
import { isArray } from "@thi.ng/checks/is-array";
import { isTypedArray } from "@thi.ng/checks/is-typedarray";
import { toPath } from "./path.js";

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
 * The type parameter `T` can be used to indicate the type of the nested
 * value to be updated (default: `any`).
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
 * @example
 * ```ts
 * s = defSetterUnsafe("a.b.c");
 * // or
 * s = defSetterUnsafe(["a", "b", "c"]);
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
 * s = defSetterUnsafe("a.b.c");
 *
 * a = { x: { y: { z: 1 } } };
 * b = s(a, 2);
 * // { x: { y: { z: 1 } }, a: { b: { c: 2 } } }
 *
 * a.x === b.x // true
 * a.x.y === b.x.y // true
 * ```
 *
 * @param path -
 */
export const defSetterUnsafe = <T = any>(path: Path): Fn2<any, T, any> =>
    defSetter(<any>path);

/**
 * Type checked version of {@link defSetterUnsafe}. Only the first 8
 * path levels are type checked.
 *
 * @remarks
 * Due to the higher-order nature of this function, generics for path
 * validation must be given and so this function is more verbose than
 * {@link setIn} (where the generics can usually be fully inferred).
 *
 * @example
 * ```ts
 * type State = { a: { b: number } };
 *
 * const setB = defSetter<State, "a", "b">(["a", "b"]);
 *
 * setB({ a: { b: 1 } }, 2); // ok!
 * setB({ a: { b: 1 } }, "2"); // error!
 * ```
 *
 * @example
 * ```ts
 * type State = { a: { b: number } };
 *
 * const path = <const>["a","b"];
 *
 * const setB = defSetter<State, typeof path[0], typeof path[1]>(path);
 * ```
 *
 * @param path -
 */
export function defSetter<T>(path: Path0): Fn2<T, T, T>;
export function defSetter<T, A>(path: Path1<T, A>): Fn2<T, PathVal<T, [A]>, T>;
export function defSetter<T, A, B>(
    path: Path2<T, A, B>
): Fn2<T, PathVal<T, [A, B]>, T>;
export function defSetter<T, A, B, C>(
    path: Path3<T, A, B, C>
): Fn2<T, PathVal<T, [A, B, C]>, T>;
export function defSetter<T, A, B, C, D>(
    path: Path4<T, A, B, C, D>
): Fn2<T, PathVal<T, [A, B, C, D]>, T>;
export function defSetter<T, A, B, C, D, E>(
    path: Path5<T, A, B, C, D, E>
): Fn2<T, PathVal<T, [A, B, C, D, E]>, T>;
export function defSetter<T, A, B, C, D, E, F>(
    path: Path6<T, A, B, C, D, E, F>
): Fn2<T, PathVal<T, [A, B, C, D, E, F]>, T>;
export function defSetter<T, A, B, C, D, E, F, G>(
    path: Path7<T, A, B, C, D, E, F, G>
): Fn2<T, PathVal<T, [A, B, C, D, E, F, G]>, T>;
export function defSetter<T, A, B, C, D, E, F, G, H>(
    path: Path8<T, A, B, C, D, E, F, G, H>
): Fn2<T, PathVal<T, [A, B, C, D, E, F, G, H]>, T>;
export function defSetter<T, A, B, C, D, E, F, G, H>(
    path: DeepPath<T, A, B, C, D, E, F, G, H>
): Fn2<T, any, any>;
export function defSetter(path: Path): Fn2<any, any, any> {
    const ks = toPath(path);
    const [a, b, c, d] = ks;
    switch (ks.length) {
        case 0:
            return (_, v) => v;
        case 1:
            return (s, v) => ((s = copy(s)), (s[a] = v), s);
        case 2:
            return (s, v) => {
                let x;
                s = copy(s);
                s[a] = x = copy(s[a]);
                x[b] = v;
                return s;
            };
        case 3:
            return (s, v) => {
                let x, y;
                s = copy(s);
                s[a] = x = copy(s[a]);
                x[b] = y = copy(x[b]);
                y[c] = v;
                return s;
            };
        case 4:
            return (s, v) => {
                let x, y, z;
                s = copy(s);
                s[a] = x = copy(s[a]);
                x[b] = y = copy(x[b]);
                y[c] = z = copy(y[c]);
                z[d] = v;
                return s;
            };
        default:
            let f: any;
            for (let i = ks.length; i-- > 0; ) {
                f = compS(ks[i], f);
            }
            return f;
    }
}

/**
 * Creates a shallow copy of given array, typed array or plain object.
 *
 * @param x
 */
export const copy = (x: any) =>
    isArray(x) || isTypedArray(x) ? x.slice() : { ...x };

/**
 * Helper for {@link defSetter}. Returns setter for a single step.
 *
 * @param k -
 * @param f -
 *
 * @internal
 */
const compS =
    (k: NumOrString, f: (o: any, v: any) => any) => (s: any, v: any) => {
        s = copy(s);
        s[k] = f ? f(s[k], v) : v;
        return s;
    };
