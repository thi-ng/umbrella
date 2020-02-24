import { toPath } from "./path";
import { updateInT } from "./update-in";
import type {
    Keys,
    Keys1,
    Keys2,
    Keys3,
    Keys4,
    Keys5,
    Keys6,
    Keys7,
    Path,
    Without,
    Without2,
    Without3,
    Without4,
    Without5,
    Without6,
    Without7,
    Without8
} from "@thi.ng/api";

/**
 * Uses {@link updateIn} and returns updated state with key for given
 * path removed. Does not modify original state.Returns `undefined` if
 * `path` is an empty string or array.
 *
 * ```
 * deleteIn({ a: { b: { c: 23 } } }, "a.b.c");
 * // { a: { b: { } } }
 * ```
 *
 * @param state -
 * @param path -
 */
export const deleteIn = (state: any, path: Path) => deleteInT(state, <any>path);

/**
 * Type checked version of {@link deleteIn}.
 *
 * @param state -
 * @param path -
 */
export function deleteInT<T, A extends Keys<T>>(
    state: T,
    path: [A]
): Without<T, A>;
export function deleteInT<T, A extends Keys<T>, B extends Keys1<T, A>>(
    state: T,
    path: [A, B]
): Without2<T, A, B>;
export function deleteInT<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>
>(state: T, path: [A, B, C]): Without3<T, A, B, C>;
export function deleteInT<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>
>(state: T, path: [A, B, C, D]): Without4<T, A, B, C, D>;
export function deleteInT<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>
>(state: T, path: [A, B, C, D, E]): Without5<T, A, B, C, D, E>;
export function deleteInT<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>,
    F extends Keys5<T, A, B, C, D, E>
>(state: T, path: [A, B, C, D, E, F]): Without6<T, A, B, C, D, E, F>;
export function deleteInT<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>,
    F extends Keys5<T, A, B, C, D, E>,
    G extends Keys6<T, A, B, C, D, E, F>
>(state: T, path: [A, B, C, D, E, F, G]): Without7<T, A, B, C, D, E, F, G>;
export function deleteInT<
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
    path: [A, B, C, D, E, F, G, H]
): Without8<T, A, B, C, D, E, F, G, H>;
export function deleteInT(state: any, path: Path): any {
    const ks = [...toPath(path)];
    if (ks.length > 0) {
        const k = ks.pop()!;
        return updateInT(
            state,
            <any>ks,
            (x) => ((x = { ...x }), delete x[k], x)
        );
    }
}
