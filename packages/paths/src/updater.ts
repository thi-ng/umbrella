import {
    FnO,
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
 * Similar to {@link setter}, returns a function to update values at
 * given `path` using provided update `fn`.
 *
 * @remarks
 * The returned function accepts a single object / array and applies
 * `fn` to current path value (incl. any additional/optional arguments
 * passed) and uses result as new value. Does not modify original state
 * (unless given function does so itself).
 *
 * ```
 * add = updater("a.b", (x, n) => x + n);
 *
 * add({a: {b: 10}}, 13);
 * // { a: { b: 23 } }
 * ```
 *
 * @param path
 * @param fn
 */
export function updaterT<T>(path: [], fn: UpdateFn<T>): FnO<T, T>;
export function updaterT<T, A extends Keys<T>>(
    path: [A],
    fn: UpdateFn<Val1<T, A>>
): FnO<T, T>;
export function updaterT<T, A extends Keys<T>, B extends Keys1<T, A>>(
    path: [A, B],
    fn: UpdateFn<Val2<T, A, B>>
): FnO<T, T>;
export function updaterT<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>
>(path: [A, B, C], fn: UpdateFn<Val3<T, A, B, C>>): FnO<T, T>;
export function updaterT<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>
>(path: [A, B, C, D], fn: UpdateFn<Val4<T, A, B, C, D>>): FnO<T, T>;
export function updaterT<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>
>(path: [A, B, C, D, E], fn: UpdateFn<Val5<T, A, B, C, D, E>>): FnO<T, T>;
export function updaterT<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>,
    F extends Keys5<T, A, B, C, D, E>
>(path: [A, B, C, D, E, F], fn: UpdateFn<Val6<T, A, B, C, D, E, F>>): FnO<T, T>;
export function updaterT<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>,
    F extends Keys5<T, A, B, C, D, E>,
    G extends Keys6<T, A, B, C, D, E, F>
>(
    path: [A, B, C, D, E, F, G],
    fn: UpdateFn<Val7<T, A, B, C, D, E, F, G>>
): FnO<T, T>;
export function updaterT<
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
    path: [A, B, C, D, E, F, G, H],
    fn: UpdateFn<Val8<T, A, B, C, D, E, F, G, H>>
): FnO<T, T>;
export function updaterT<
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
    path: [A, B, C, D, E, F, G, H, ...PropertyKey[]],
    fn: UpdateFn<any>
): FnO<T, T>;
export function updaterT(path: Path, fn: UpdateFn<any>): FnO<any, any> {
    const g = getterT(<any>path);
    const s = setterT(<any>path);
    return (state: any, ...args: any[]) =>
        s(state, fn.apply(null, <any>(args.unshift(g(state)), args)));
}

export const updater = (path: Path, fn: UpdateFn<any>) =>
    updaterT(<any>path, fn);
