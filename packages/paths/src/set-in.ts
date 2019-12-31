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
import { setterT } from "./setter";

/**
 * Immediate use setter, i.e. same as: `setter(path)(state, val)`.
 *
 * @remarks
 * Supports type checked paths and values for path lengths <= 8. String
 * paths are always unchecked (i.e. `state` is `any`).
 *
 * @example
 * ```ts
 *
 * setIn({}, "a.b.c", 23);
 * // { a: { b: { c: 23} } }
 * ```
 *
 * @param state -
 * @param path -
 */
export const setIn = (state: any, path: Path, val: any): any =>
    setterT(<any>path)(state, val);

/**
 * Type checked version of {@link setIn}.
 *
 * @param state -
 * @param path -
 * @param val -
 */
export function setInT<T>(state: T, path: [], val: T): T;
export function setInT<T, A extends Keys<T>>(
    state: T,
    path: [A],
    val: Val1<T, A>
): T;
export function setInT<T, A extends Keys<T>, B extends Keys1<T, A>>(
    state: T,
    path: [A, B],
    val: Val2<T, A, B>
): T;
export function setInT<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>
>(state: T, path: [A, B, C], val: Val3<T, A, B, C>): T;
export function setInT<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>
>(state: T, path: [A, B, C, D], val: Val4<T, A, B, C, D>): T;
export function setInT<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>
>(state: T, path: [A, B, C, D, E], val: Val5<T, A, B, C, D, E>): T;
export function setInT<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>,
    F extends Keys5<T, A, B, C, D, E>
>(state: T, path: [A, B, C, D, E, F], val: Val6<T, A, B, C, D, E, F>): T;
export function setInT<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>,
    F extends Keys5<T, A, B, C, D, E>,
    G extends Keys6<T, A, B, C, D, E, F>
>(state: T, path: [A, B, C, D, E, F, G], val: Val7<T, A, B, C, D, E, F, G>): T;
export function setInT<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>,
    F extends Keys5<T, A, B, C, D, E>,
    G extends Keys6<T, A, B, C, D, E, F>,
    H extends Keys7<T, A, B, C, D, E, F, G>
>(
    state: T,
    path: [A, B, C, D, E, F, G, H],
    val: Val8<T, A, B, C, D, E, F, G, H>
): T;
export function setInT<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>,
    F extends Keys5<T, A, B, C, D, E>,
    G extends Keys6<T, A, B, C, D, E, F>,
    H extends Keys7<T, A, B, C, D, E, F, G>
>(state: T, path: [A, B, C, D, E, F, G, H, ...PropertyKey[]], val: any): any;
export function setInT(state: any, path: Path, val: any): any {
    return setterT(<any>path)(state, val);
}
