import { defMutator } from "./mutator";
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
    PathVal1,
    PathVal2,
    PathVal3,
    PathVal4,
    PathVal5,
    PathVal6,
    PathVal7,
    PathVal8,
} from "@thi.ng/api";

/**
 * Immediate use mutator, i.e. same as: `defMutatorUnsafe(path)(state,
 * val)`.
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
 * @param state -
 * @param path -
 * @param val -
 */
export const mutInUnsafe = (state: any, path: Path, val: any) =>
    defMutator(<any>path)(state, val);

/**
 * Type checked version of {@link mutIn}. Only the first 8 path levels
 * are type checked.
 *
 * @param state -
 * @param path -
 * @param val -
 */
export function mutIn<T>(state: T, path: Path0, val: T): T;
export function mutIn<T, A>(
    state: T,
    path: Path1<T, A>,
    val: PathVal1<T, A>
): T;
export function mutIn<T, A, B>(
    state: T,
    path: Path2<T, A, B>,
    val: PathVal2<T, A, B>
): T;
export function mutIn<T, A, B, C>(
    state: T,
    path: Path3<T, A, B, C>,
    val: PathVal3<T, A, B, C>
): T;
export function mutIn<T, A, B, C, D>(
    state: T,
    path: Path4<T, A, B, C, D>,
    val: PathVal4<T, A, B, C, D>
): T;
export function mutIn<T, A, B, C, D, E>(
    state: T,
    path: Path5<T, A, B, C, D, E>,
    val: PathVal5<T, A, B, C, D, E>
): T;
export function mutIn<T, A, B, C, D, E, F>(
    state: T,
    path: Path6<T, A, B, C, D, E, F>,
    val: PathVal6<T, A, B, C, D, E, F>
): T;
export function mutIn<T, A, B, C, D, E, F, G>(
    state: T,
    path: Path7<T, A, B, C, D, E, F, G>,
    val: PathVal7<T, A, B, C, D, E, F, G>
): T;
export function mutIn<T, A, B, C, D, E, F, G, H>(
    state: T,
    path: Path8<T, A, B, C, D, E, F, G, H>,
    val: PathVal8<T, A, B, C, D, E, F, G, H>
): T;
export function mutIn<T, A, B, C, D, E, F, G, H>(
    state: T,
    path: DeepPath<T, A, B, C, D, E, F, G, H>,
    val: any
): any;
export function mutIn(state: any, path: Path, val: any): any {
    return defMutator(<any>path)(state, val);
}
