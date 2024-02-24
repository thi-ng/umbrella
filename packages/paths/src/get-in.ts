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
} from "@thi.ng/api";
import { defGetter } from "./getter.js";

/**
 * Unchecked version of {@link getIn}. Returns `undefined` if path is
 * invalid.
 *
 * @remarks
 * The type parameter `T` can be used to indicate the type of the nested
 * value to be retrieved (default: `any`).
 *
 * @example
 * ```ts
 * import { getInUnsafe } from "@thi.ng/paths";
 *
 * getInUnsafe({ a: { b: { c: 23 } } }, "a.b.c");
 * // 23
 * ```
 *
 * @param state -
 * @param path -
 */
export const getInUnsafe = <T = any>(state: any, path: Path): T | undefined =>
	defGetter<T>(<any>path)(state);

/**
 * Type checked, immediate use getter, i.e. same as:
 * `defGetter(path)(state)`.
 *
 * @remarks
 * Only the first 8 path levels are type checked.
 *
 * @example
 * ```ts
 * import { getIn } from "@thi.ng/paths";
 *
 * // type checked path and inferred return type
 * getIn({ a: { b: { c: 23 } } }, ["a","b","c"]);
 * // 23
 * ```
 *
 * @param state -
 * @param path -
 */
export function getIn<T>(state: T, path: Path0): T;
export function getIn<T, A>(state: T, path: Path1<T, A>): OptPathVal<T, [A]>;
export function getIn<T, A, B>(
	state: T,
	path: Path2<T, A, B>
): OptPathVal<T, [A, B]>;
export function getIn<T, A, B, C>(
	state: T,
	path: Path3<T, A, B, C>
): OptPathVal<T, [A, B, C]>;
export function getIn<T, A, B, C, D>(
	state: T,
	path: Path4<T, A, B, C, D>
): OptPathVal<T, [A, B, C, D]>;
export function getIn<T, A, B, C, D, E>(
	state: T,
	path: Path5<T, A, B, C, D, E>
): OptPathVal<T, [A, B, C, D, E]>;
export function getIn<T, A, B, C, D, E, F>(
	state: T,
	path: Path6<T, A, B, C, D, E, F>
): OptPathVal<T, [A, B, C, D, E, F]>;
export function getIn<T, A, B, C, D, E, F, G>(
	state: T,
	path: Path7<T, A, B, C, D, E, F, G>
): OptPathVal<T, [A, B, C, D, E, F, G]>;
export function getIn<T, A, B, C, D, E, F, G, H>(
	state: T,
	path: Path8<T, A, B, C, D, E, F, G, H>
): OptPathVal<T, [A, B, C, D, E, F, G, H]>;
export function getIn<T, A, B, C, D, E, F, G, H>(
	state: T,
	path: DeepPath<T, A, B, C, D, E, F, G, H>
): any;
export function getIn(state: any, path: Path) {
	return defGetter(<any>path)(state);
}
