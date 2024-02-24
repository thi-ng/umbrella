import type {
	DeepPath,
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
import { defMutator } from "./mutator.js";

/**
 * Unchecked version of {@link mutIn}.
 *
 * @remarks
 * The type parameter `T` can be used to indicate the type of the nested
 * value to be mutated (default: `any`).
 *
 * Also see {@link defMutatorUnsafe}.
 *
 * @example
 * ```ts
 * import { mutInUnsafe } from "@thi.ng/paths";
 *
 * mutInUnsafe({ a: { b: [10, 20] } }, "a.b.1", 23);
 * // { a: { b: [ 10, 23 ] } }
 *
 * // fails (see `defMutator()` docs)
 * mutInUnsafe({}, "a.b.c", 23);
 * // undefined
 * ```
 *
 * @param state -
 * @param path -
 * @param val -
 */
export const mutInUnsafe = <T = any>(state: any, path: Path, val: T): any =>
	defMutator(<any>path)(state, val);

/**
 * Type checked, immediate use mutator, i.e. same as:
 * `defMutator(path)(state, val)`.
 *
 * @remarks
 * Only the first 8 path levels are type checked.
 *
 * Also see {@link defMutator}, {@link mutInUnsafe}
 *
 * @example
 * ```ts
 * import { muIn } from "@thi.ng/paths";
 *
 * mutIn({ a: { b: [10, 20] } }, ["a", "b", 1], 23)
 * // { a: { b: [ 10, 23 ] } }
 * ```
 *
 * @param state -
 * @param path -
 * @param val -
 */
export function mutIn<T>(state: T, path: Path0, val: T): T;
export function mutIn<T, A>(
	state: T,
	path: Path1<T, A>,
	val: PathVal<T, [A]>
): T;
export function mutIn<T, A, B>(
	state: T,
	path: Path2<T, A, B>,
	val: PathVal<T, [A, B]>
): T;
export function mutIn<T, A, B, C>(
	state: T,
	path: Path3<T, A, B, C>,
	val: PathVal<T, [A, B, C]>
): T;
export function mutIn<T, A, B, C, D>(
	state: T,
	path: Path4<T, A, B, C, D>,
	val: PathVal<T, [A, B, C, D]>
): T;
export function mutIn<T, A, B, C, D, E>(
	state: T,
	path: Path5<T, A, B, C, D, E>,
	val: PathVal<T, [A, B, C, D, E]>
): T;
export function mutIn<T, A, B, C, D, E, F>(
	state: T,
	path: Path6<T, A, B, C, D, E, F>,
	val: PathVal<T, [A, B, C, D, E, F]>
): T;
export function mutIn<T, A, B, C, D, E, F, G>(
	state: T,
	path: Path7<T, A, B, C, D, E, F, G>,
	val: PathVal<T, [A, B, C, D, E, F, G]>
): T;
export function mutIn<T, A, B, C, D, E, F, G, H>(
	state: T,
	path: Path8<T, A, B, C, D, E, F, G, H>,
	val: PathVal<T, [A, B, C, D, E, F, G, H]>
): T;
export function mutIn<T, A, B, C, D, E, F, G, H>(
	state: T,
	path: DeepPath<T, A, B, C, D, E, F, G, H>,
	val: any
): any;
export function mutIn(state: any, path: Path, val: any): any {
	return defMutator(<any>path)(state, val);
}
