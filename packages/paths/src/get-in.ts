import {
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
import { getterT } from "./getter";

/**
 * Immediate use getter, i.e. same as: `getter(path)(state)`.
 *
 * @remarks
 * Supports type checked paths and values for path lengths <= 8. String
 * paths are always unchecked (i.e. `state` is `any`).
 *
 * @example
 * ```ts
 * // checked path and inferred return type
 * getIn({ a: { b: { c: 23 } } }, ["a","b","c"]);
 * // 23
 *
 * // unchecked path
 * getIn({ a: { b: { c: 23 } } }, "a.b.c");
 * // 23
 * ```
 *
 * @param state -
 * @param path -
 */
export const getIn = (state: any, path: Path): any => getterT(<any>path)(state);

/**
 * Type checked version of {@link getIn}.
 *
 * @param state -
 * @param path -
 */
export function getInT<T>(state: T, path: []): T;
export function getInT<T, A extends Keys<T>>(state: T, path: [A]): Val1<T, A>;
export function getInT<T, A extends Keys<T>, B extends Keys1<T, A>>(
    state: T,
    path: [A, B]
): Val2<T, A, B>;
export function getInT<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>
>(state: T, path: [A, B, C]): Val3<T, A, B, C>;
export function getInT<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>
>(state: T, path: [A, B, C, D]): Val4<T, A, B, C, D>;
export function getInT<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>
>(state: T, path: [A, B, C, D, E]): Val5<T, A, B, C, D, E>;
export function getInT<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>,
    F extends Keys5<T, A, B, C, D, E>
>(state: T, path: [A, B, C, D, E, F]): Val6<T, A, B, C, D, E, F>;
export function getInT<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>,
    F extends Keys5<T, A, B, C, D, E>,
    G extends Keys6<T, A, B, C, D, E, F>
>(state: T, path: [A, B, C, D, E, F, G]): Val7<T, A, B, C, D, E, F, G>;
export function getInT<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>,
    F extends Keys5<T, A, B, C, D, E>,
    G extends Keys6<T, A, B, C, D, E, F>,
    H extends Keys7<T, A, B, C, D, E, F, G>
>(state: T, path: [A, B, C, D, E, F, G, H]): Val8<T, A, B, C, D, E, F, G, H>;
export function getInT<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>,
    F extends Keys5<T, A, B, C, D, E>,
    G extends Keys6<T, A, B, C, D, E, F>,
    H extends Keys7<T, A, B, C, D, E, F, G>
>(state: T, path: [A, B, C, D, E, F, G, H, ...any[]]): any;
export function getInT(state: any, path: Path) {
    return getterT(<any>path)(state);
}
