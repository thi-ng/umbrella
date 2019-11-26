import {
    Keys,
    Keys1,
    Keys2,
    Keys3,
    Keys4,
    Keys5,
    Keys6,
    Keys7,
    Val1,
    Val2,
    Val3,
    Val4,
    Val5,
    Val6,
    Val7,
    Val8
} from "@thi.ng/api";
import { Path } from "./api";
import { mutatorT } from "./mutator";

/**
 * Immediate use mutator, i.e. same as: `mutator(path)(state, val)`.
 *
 * @remarks
 * Also see {@link setIn}, {@link updateIn}, {@link deleteIn}.
 *
 * @example
 * ```ts
 * interface Foo {
 *   a: { b: number[]; }
 * }
 *
 * // fully type checked
 * mutIn({ a: { b: [10, 20] } }, ["a", "b", 1], 23)
 * // { a: { b: [ 10, 23 ] } }
 *
 * // unchecked
 * mutIn({ a: { b: [10, 20] } }, "a.b.1", 23);
 * // { a: { b: [ 10, 23 ] } }
 *
 * // fails (see `mutator` docs)
 * mutIn({}, "a.b.c", 23);
 * // undefined
 * ```
 *
 * @param state
 * @param path
 * @param val
 */
export function mutInT<T>(state: T, path: [], val: T): T;
export function mutInT<T, A extends Keys<T>>(
    state: T,
    path: [A],
    val: Val1<T, A>
): T;
export function mutInT<T, A extends Keys<T>, B extends Keys1<T, A>>(
    state: T,
    path: [A, B],
    val: Val2<T, A, B>
): T;
export function mutInT<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>
>(state: T, path: [A, B, C], val: Val3<T, A, B, C>): T;
export function mutInT<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>
>(state: T, path: [A, B, C, D], val: Val4<T, A, B, C, D>): T;
export function mutInT<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>
>(state: T, path: [A, B, C, D, E], val: Val5<T, A, B, C, D, E>): T;
export function mutInT<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>,
    F extends Keys5<T, A, B, C, D, E>
>(state: T, path: [A, B, C, D, E, F], val: Val6<T, A, B, C, D, E, F>): T;
export function mutInT<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>,
    F extends Keys5<T, A, B, C, D, E>,
    G extends Keys6<T, A, B, C, D, E, F>,
    V
>(state: T, path: [A, B, C, D, E, F, G], val: Val7<T, A, B, C, D, E, F, G>): T;
export function mutInT<
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
export function mutInT<
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
export function mutInT(state: any, path: Path, val: any): any {
    return mutatorT(<any>path)(state, val);
}

export const mutIn = (state: any, path: Path, val: any) =>
    mutInT(state, <any>path, val);
