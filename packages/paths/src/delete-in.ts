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
	Without8,
} from "@thi.ng/api";
import { toPath } from "./path.js";
import { updateIn } from "./update-in.js";

/**
 * Unchecked version of {@link deleteIn}. Path can be given as string or
 * tuple.
 *
 * @example
 * ```ts
 * // unchecked
 * deleteIn({ a: { b: { c: 23 } } }, "a.b.c");
 * // { a: { b: { } } }
 * ```
 *
 * @param state -
 * @param path -
 */
export const deleteInUnsafe = (state: any, path: Path): any =>
	deleteIn(state, <any>path);

/**
 * Uses {@link updateIn} and returns updated state with key for given
 * path removed. Does not modify original state. Returns `undefined` if
 * `path` is an empty string or array.
 *
 * @remarks
 * Only the first 8 path levels are type checked. The result type will
 * have the path value removed too.
 *
 * See {@link deleteInUnsafe} for unchecked version.
 *
 * @example
 * ```ts
 * // type checked
 * deleteIn({ a: { b: { c: 23 } } }, ["a","b","c"]);
 *
 * // error (invalid path)
 * deleteIn({ a: { b: { c: 23 } } }, ["a","b","d"]);
 * ```
 *
 * @param state -
 * @param path -
 */
export function deleteIn<T, A extends Keys<T>>(
	state: T,
	path: readonly [A]
): Without<T, A>;
export function deleteIn<T, A extends Keys<T>, B extends Keys1<T, A>>(
	state: T,
	path: readonly [A, B]
): Without2<T, A, B>;
export function deleteIn<
	T,
	A extends Keys<T>,
	B extends Keys1<T, A>,
	C extends Keys2<T, A, B>
>(state: T, path: readonly [A, B, C]): Without3<T, A, B, C>;
export function deleteIn<
	T,
	A extends Keys<T>,
	B extends Keys1<T, A>,
	C extends Keys2<T, A, B>,
	D extends Keys3<T, A, B, C>
>(state: T, path: readonly [A, B, C, D]): Without4<T, A, B, C, D>;
export function deleteIn<
	T,
	A extends Keys<T>,
	B extends Keys1<T, A>,
	C extends Keys2<T, A, B>,
	D extends Keys3<T, A, B, C>,
	E extends Keys4<T, A, B, C, D>
>(state: T, path: readonly [A, B, C, D, E]): Without5<T, A, B, C, D, E>;
export function deleteIn<
	T,
	A extends Keys<T>,
	B extends Keys1<T, A>,
	C extends Keys2<T, A, B>,
	D extends Keys3<T, A, B, C>,
	E extends Keys4<T, A, B, C, D>,
	F extends Keys5<T, A, B, C, D, E>
>(state: T, path: readonly [A, B, C, D, E, F]): Without6<T, A, B, C, D, E, F>;
export function deleteIn<
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
	path: readonly [A, B, C, D, E, F, G]
): Without7<T, A, B, C, D, E, F, G>;
export function deleteIn<
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
	path: readonly [A, B, C, D, E, F, G, H]
): Without8<T, A, B, C, D, E, F, G, H>;
export function deleteIn(state: any, path: Path): any {
	const ks = toPath(path).slice();
	if (ks.length) {
		const k = ks.pop()!;
		return updateIn(
			state,
			<any>ks,
			(x) => ((x = { ...x }), delete x[k], x)
		);
	}
}
