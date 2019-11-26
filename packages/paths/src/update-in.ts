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
import { Path, UpdateFn } from "./api";
import { getterT } from "./getter";
import { setterT } from "./setter";

/**
 * Similar to {@link setIn}, but applies given function to current path
 * value (incl. any additional/optional arguments passed to `updateIn`)
 * and uses result as new value. Does not modify original state (unless
 * given function does so itself).
 *
 * ```
 * add = (x, y) => x + y;
 * updateIn({ a: { b: { c: 23 } } }, "a.b.c", add, 10);
 * // { a: { b: { c: 33 } } }
 * ```
 *
 * @param state - state to update
 * @param path - update path
 * @param fn - update function
 * @param args - optional args for `fn`
 */
export function updateInT<T>(state: T, path: [], fn: UpdateFn<T>): T;
export function updateInT<T, A extends Keys<T>>(
    state: T,
    path: [A],
    fn: UpdateFn<Val1<T, A>>,
    ...args: any[]
): T;
export function updateInT<T, A extends Keys<T>, B extends Keys1<T, A>>(
    state: T,
    path: [A, B],
    fn: UpdateFn<Val2<T, A, B>>,
    ...args: any[]
): T;
export function updateInT<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>
>(state: T, path: [A, B, C], fn: UpdateFn<Val3<T, A, B, C>>, ...args: any[]): T;
export function updateInT<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>
>(
    state: T,
    path: [A, B, C, D],
    fn: UpdateFn<Val4<T, A, B, C, D>>,
    ...args: any[]
): T;
export function updateInT<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>
>(
    state: T,
    path: [A, B, C, D, E],
    fn: UpdateFn<Val5<T, A, B, C, D, E>>,
    ...args: any[]
): T;
export function updateInT<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>,
    F extends Keys5<T, A, B, C, D, E>
>(
    state: T,
    path: [A, B, C, D, E, F],
    fn: UpdateFn<Val6<T, A, B, C, D, E, F>>,
    ...args: any[]
): T;
export function updateInT<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>,
    F extends Keys5<T, A, B, C, D, E>,
    G extends Keys6<T, A, B, C, D, E, F>
>(
    state: T,
    path: [A, B, C, D, E, F, G],
    fn: UpdateFn<Val7<T, A, B, C, D, E, F, G>>,
    ...args: any[]
): T;
export function updateInT<
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
    fn: UpdateFn<Val8<T, A, B, C, D, E, F, G, H>>,
    ...args: any[]
): T;
export function updateInT<
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
    path: [A, B, C, D, E, F, G, H, ...PropertyKey[]],
    fn: UpdateFn<any>,
    ...args: any[]
): T;
export function updateInT(
    state: any,
    path: Path,
    fn: UpdateFn<any>,
    ...args: any[]
) {
    return setterT(<any>path)(
        state,
        fn.apply(null, <any>(args.unshift(getterT(<any>path)(state)), args))
    );
}

export const updateIn = (
    state: any,
    path: Path,
    fn: UpdateFn<any>,
    ...args: any[]
) => updateInT(state, <any>path, fn, ...args);
