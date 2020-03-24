import { toPath } from "./path";
import type {
    DeepPath,
    Fn,
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
    PathVal1,
    PathVal2,
    PathVal3,
    PathVal4,
    PathVal5,
    PathVal6,
    PathVal7,
    PathVal8,
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
 * Also see: {@link defGetter}, {@link getIn}, {@link getInUnsafe}
 *
 * @example
 * ```ts
 * interface Foo {
 *   a: { b: { c: number; } }
 * }
 *
 * // fully type checked getter
 * g = defGetter<Foo, "a", "b", "c">(["a","b","c"]);
 *
 * // error (wrong `d` key)
 * g = defGetter<Foo, "a", "b", "d">(["a","b","d"]);
 *
 * // unchecked (accepts any, returns any)
 * g = defGetterUnsafe("a.b.c");
 *
 * g({ a: { b: { c: 23} } }) // 23
 * g({ x: 23 }) // undefined
 * g() // undefined
 * ```
 *
 * @param path -
 */
export const defGetterUnsafe = (path: Path): Fn<any, any> =>
    defGetter(<any>path);

/**
 * Type checked version of {@link defGetter}. Only the first 8 path
 * levels are type checked.
 *
 * @param path -
 */
export function defGetter<T>(path: Path0): Fn<T, T>;
export function defGetter<T, A>(path: Path1<T, A>): Fn<T, PathVal1<T, A>>;
export function defGetter<T, A, B>(
    path: Path2<T, A, B>
): Fn<T, PathVal2<T, A, B>>;
export function defGetter<T, A, B, C>(
    path: Path3<T, A, B, C>
): Fn<T, PathVal3<T, A, B, C>>;
export function defGetter<T, A, B, C, D>(
    path: Path4<T, A, B, C, D>
): Fn<T, PathVal4<T, A, B, C, D>>;
export function defGetter<T, A, B, C, D, E>(
    path: Path5<T, A, B, C, D, E>
): Fn<T, PathVal5<T, A, B, C, D, E>>;
export function defGetter<T, A, B, C, D, E, F>(
    path: Path6<T, A, B, C, D, E, F>
): Fn<T, PathVal6<T, A, B, C, D, E, F>>;
export function defGetter<T, A, B, C, D, E, F, G>(
    path: Path7<T, A, B, C, D, E, F, G>
): Fn<T, PathVal7<T, A, B, C, D, E, F, G>>;
export function defGetter<T, A, B, C, D, E, F, G, H>(
    path: Path8<T, A, B, C, D, E, F, G, H>
): Fn<T, PathVal8<T, A, B, C, D, E, F, G, H>>;
export function defGetter<T, A, B, C, D, E, F, G, H>(
    path: DeepPath<T, A, B, C, D, E, F, G, H>
): Fn<T, any>;
export function defGetter(path: Path) {
    const ks = toPath(path);
    const [a, b, c, d] = ks;
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
