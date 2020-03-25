import { defGetter } from "./getter";
import { defSetter } from "./setter";
import type {
    DeepPath,
    FnO,
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
import type { UpdateFn } from "./api";

/**
 * Similar to {@link defSetterUnsafe}, returns a function to update
 * values at given `path` using provided update `fn`. Paths and the
 * arguments given to the returned function are NOT type checked.
 *
 * @remarks
 * The returned function accepts a single object / array and applies
 * `fn` to given path value (incl. any additional / optional arguments
 * passed) and uses result as new value. Does not modify original state.
 *
 * The type parameter `T` can be used to indicate the type of the nested
 * value to be updated (default: `any`).
 *
 * @example
 * ```ts
 * const incB = defUpdaterUnsafe("a.b", (x, n) => x + n);
 * // or
 * const incB = defUpdaterUnsafe(["a", "b"], (x, n) => x + n);
 *
 * incB({ a: { b: 10 } }, 13);
 * // { a: { b: 23 } }
 * ```
 *
 * @param path -
 * @param fn -
 */
export const defUpdaterUnsafe = <T = any>(
    path: Path,
    fn: UpdateFn<T>
): FnO<T, any> => defUpdater(<any>path, fn);

/**
 * Type checked version of {@link defUpdaterUnsafe}. Only the first 8
 * path levels are type checked.
 *
 * @param path -
 * @param fn -
 */
export function defUpdater<T>(path: Path0, fn: UpdateFn<T>): FnO<T, T>;
export function defUpdater<T, A>(
    path: Path1<T, A>,
    fn: UpdateFn<PathVal1<T, A>>
): FnO<T, T>;
export function defUpdater<T, A, B>(
    path: Path2<T, A, B>,
    fn: UpdateFn<PathVal2<T, A, B>>
): FnO<T, T>;
export function defUpdater<T, A, B, C>(
    path: Path3<T, A, B, C>,
    fn: UpdateFn<PathVal3<T, A, B, C>>
): FnO<T, T>;
export function defUpdater<T, A, B, C, D>(
    path: Path4<T, A, B, C, D>,
    fn: UpdateFn<PathVal4<T, A, B, C, D>>
): FnO<T, T>;
export function defUpdater<T, A, B, C, D, E>(
    path: Path5<T, A, B, C, D, E>,
    fn: UpdateFn<PathVal5<T, A, B, C, D, E>>
): FnO<T, T>;
export function defUpdater<T, A, B, C, D, E, F>(
    path: Path6<T, A, B, C, D, E, F>,
    fn: UpdateFn<PathVal6<T, A, B, C, D, E, F>>
): FnO<T, T>;
export function defUpdater<T, A, B, C, D, E, F, G>(
    path: Path7<T, A, B, C, D, E, F, G>,
    fn: UpdateFn<PathVal7<T, A, B, C, D, E, F, G>>
): FnO<T, T>;
export function defUpdater<T, A, B, C, D, E, F, G, H>(
    path: Path8<T, A, B, C, D, E, F, G, H>,
    fn: UpdateFn<PathVal8<T, A, B, C, D, E, F, G, H>>
): FnO<T, T>;
export function defUpdater<T, A, B, C, D, E, F, G, H>(
    path: DeepPath<T, A, B, C, D, E, F, G, H>,
    fn: UpdateFn<any>
): FnO<T, T>;
export function defUpdater(path: Path, fn: UpdateFn<any>): FnO<any, any> {
    const g = defGetter(<any>path);
    const s = defSetter(<any>path);
    return (state: any, ...args: any[]) =>
        s(state, fn.apply(null, <any>(args.unshift(g(state)), args)));
}
