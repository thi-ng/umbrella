import type {
	DeepPath,
	OptPathVal,
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
import type { UpdateFn } from "./api.js";
import { defGetter } from "./getter.js";
import { defSetter } from "./setter.js";

/**
 * Similar to {@link setInUnsafe}, but applies given function to current
 * path value (incl. any additional/optional arguments passed to
 * `updateIn`) and uses result as new value. Does not modify original
 * state.
 *
 * @remarks
 * Unchecked version of {@link updateIn}. The type parameter `T` can be
 * used to indicate the type of the nested value to be updated (default:
 * `any`).
 *
 * @example
 * ```ts
 * add = (x: number, y: number) => x + y;
 * updateInUnsafe({ a: { b: { c: 23 } } }, "a.b.c", add, 10);
 * // { a: { b: { c: 33 } } }
 *
 * // type checked
 * updateIn({ a: { b: { c: 23 } } }, ["a","b","c"], add, 10);
 * // { a: { b: { c: 33 } } }
 *
 * // type error (value at "a.b" is not a number)
 * updateIn({ a: { b: { c: 23 } } }, ["a","b"], add, 10);
 * ```
 *
 * @param state - state to update
 * @param path - update path
 * @param fn - update function
 * @param args - optional args for `fn`
 */
export const updateInUnsafe = <T = any>(
	state: any,
	path: Path,
	fn: UpdateFn<T, T>,
	...args: any[]
) =>
	// @ts-ignore
	updateIn(state, path, fn, ...args);

/**
 * Type checked version of {@link updateIn}. Only the first 8 path
 * levels are type checked.
 *
 * @param state -
 * @param path -
 * @param fn -
 */
export function updateIn<T>(state: T, path: Path0, fn: UpdateFn<T, T>): T;
export function updateIn<T, A>(
	state: T,
	path: Path1<T, A>,
	fn: UpdateFn<OptPathVal<T, [A]>, PathVal<T, [A]>>,
	...args: any[]
): T;
export function updateIn<T, A, B>(
	state: T,
	path: Path2<T, A, B>,
	fn: UpdateFn<OptPathVal<T, [A, B]>, PathVal<T, [A, B]>>,
	...args: any[]
): T;
export function updateIn<T, A, B, C>(
	state: T,
	path: Path3<T, A, B, C>,
	fn: UpdateFn<OptPathVal<T, [A, B, C]>, PathVal<T, [A, B, C]>>,
	...args: any[]
): T;
export function updateIn<T, A, B, C, D>(
	state: T,
	path: Path4<T, A, B, C, D>,
	fn: UpdateFn<OptPathVal<T, [A, B, C, D]>, PathVal<T, [A, B, C, D]>>,
	...args: any[]
): T;
export function updateIn<T, A, B, C, D, E>(
	state: T,
	path: Path5<T, A, B, C, D, E>,
	fn: UpdateFn<OptPathVal<T, [A, B, C, D, E]>, PathVal<T, [A, B, C, D, E]>>,
	...args: any[]
): T;
export function updateIn<T, A, B, C, D, E, F>(
	state: T,
	path: Path6<T, A, B, C, D, E, F>,
	fn: UpdateFn<
		OptPathVal<T, [A, B, C, D, E, F]>,
		PathVal<T, [A, B, C, D, E, F]>
	>,
	...args: any[]
): T;
export function updateIn<T, A, B, C, D, E, F, G>(
	state: T,
	path: Path7<T, A, B, C, D, E, F, G>,
	fn: UpdateFn<
		OptPathVal<T, [A, B, C, D, E, F, G]>,
		PathVal<T, [A, B, C, D, E, F, G]>
	>,
	...args: any[]
): T;
export function updateIn<T, A, B, C, D, E, F, G, H>(
	state: T,
	path: Path8<T, A, B, C, D, E, F, G, H>,
	fn: UpdateFn<
		OptPathVal<T, [A, B, C, D, E, F, G, H]>,
		PathVal<T, [A, B, C, D, E, F, G, H]>
	>,
	...args: any[]
): T;
export function updateIn<T, A, B, C, D, E, F, G, H>(
	state: T,
	path: DeepPath<T, A, B, C, D, E, F, G, H>,
	fn: UpdateFn<any, any>,
	...args: any[]
): T;
export function updateIn(
	state: any,
	path: Path,
	fn: UpdateFn<any, any>,
	...args: any[]
) {
	return defSetter(<any>path)(
		state,
		// @ts-ignore
		fn.apply(null, (args.unshift(defGetter(path)(state)), args))
	);
}
