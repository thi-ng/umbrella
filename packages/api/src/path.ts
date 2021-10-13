import type { NumOrString } from "./prim.js";
import type {
    Keys,
    Keys1,
    Keys2,
    Keys3,
    Keys4,
    Keys5,
    Keys6,
    Keys7,
    ValN,
} from "./keyval.js";
import type { Head, Tail, IsEmpty } from "./tuple.js";

/**
 * Unchecked lookup path for nested data structures.
 */
export type Path = readonly NumOrString[] | NumOrString;

/**
 * Empty lookup path.
 */
export type Path0 = readonly [];

/**
 * Type checked lookup path (depth 1)
 */
export type Path1<T, A> = A extends Keys<T> ? readonly [A] : never;

/**
 * Type checked lookup path (depth 2)
 */
export type Path2<T, A, B> = A extends Keys<T>
    ? B extends Keys1<T, A>
        ? readonly [A, B]
        : never
    : never;

/**
 * Type checked lookup path (depth 3)
 */
export type Path3<T, A, B, C> = A extends Keys<T>
    ? B extends Keys1<T, A>
        ? C extends Keys2<T, A, B>
            ? readonly [A, B, C]
            : never
        : never
    : never;

/**
 * Type checked lookup path (depth 4)
 */
export type Path4<T, A, B, C, D> = A extends Keys<T>
    ? B extends Keys1<T, A>
        ? C extends Keys2<T, A, B>
            ? D extends Keys3<T, A, B, C>
                ? readonly [A, B, C, D]
                : never
            : never
        : never
    : never;

/**
 * Type checked lookup path (depth 5)
 */
export type Path5<T, A, B, C, D, E> = A extends Keys<T>
    ? B extends Keys1<T, A>
        ? C extends Keys2<T, A, B>
            ? D extends Keys3<T, A, B, C>
                ? E extends Keys4<T, A, B, C, D>
                    ? readonly [A, B, C, D, E]
                    : never
                : never
            : never
        : never
    : never;

/**
 * Type checked lookup path (depth 6)
 */
export type Path6<T, A, B, C, D, E, F> = A extends Keys<T>
    ? B extends Keys1<T, A>
        ? C extends Keys2<T, A, B>
            ? D extends Keys3<T, A, B, C>
                ? E extends Keys4<T, A, B, C, D>
                    ? F extends Keys5<T, A, B, C, D, E>
                        ? readonly [A, B, C, D, E, F]
                        : never
                    : never
                : never
            : never
        : never
    : never;

/**
 * Type checked lookup path (depth 7)
 */
export type Path7<T, A, B, C, D, E, F, G> = A extends Keys<T>
    ? B extends Keys1<T, A>
        ? C extends Keys2<T, A, B>
            ? D extends Keys3<T, A, B, C>
                ? E extends Keys4<T, A, B, C, D>
                    ? F extends Keys5<T, A, B, C, D, E>
                        ? G extends Keys6<T, A, B, C, D, E, F>
                            ? readonly [A, B, C, D, E, F, G]
                            : never
                        : never
                    : never
                : never
            : never
        : never
    : never;

/**
 * Type checked lookup path (depth 8)
 */
export type Path8<T, A, B, C, D, E, F, G, H> = A extends Keys<T>
    ? B extends Keys1<T, A>
        ? C extends Keys2<T, A, B>
            ? D extends Keys3<T, A, B, C>
                ? E extends Keys4<T, A, B, C, D>
                    ? F extends Keys5<T, A, B, C, D, E>
                        ? G extends Keys6<T, A, B, C, D, E, F>
                            ? H extends Keys7<T, A, B, C, D, E, F, G>
                                ? readonly [A, B, C, D, E, F, G, H]
                                : never
                            : never
                        : never
                    : never
                : never
            : never
        : never
    : never;

/**
 * Semi-typechecked lookup path (depth > 8). Only the first 8 levels are
 * checked.
 */
// prettier-ignore
export type DeepPath<T, A, B, C, D, E, F, G, H> = A extends Keys<T>
    ? B extends Keys1<T, A>
        ? C extends Keys2<T, A, B>
            ? D extends Keys3<T, A, B, C>
                ? E extends Keys4<T, A, B, C, D>
                    ? F extends Keys5<T, A, B, C, D, E>
                        ? G extends Keys6<T, A, B, C, D, E, F>
                            ? H extends Keys7<T, A, B, C, D, E, F, G>
                                ? readonly [A, B, C, D, E, F, G, H, ...NumOrString[]]
                                : never
                            : never
                        : never
                    : never
                : never
            : never
        : never
    : never;

/**
 * Returns `RES` if `PRED` is `never`, else `RES | undefined`
 */
export type OptVal<PRED, RES> = [PRED] extends [never] ? RES : RES | undefined;

/**
 * Returns true if `T` includes undefined.
 */
export type IsOpt<T> = T extends undefined ? true : never;

/**
 * Internal recursive helper type for {@link IsOptPath}.
 */
type IsOptR<T, K, P extends unknown[]> = K extends Keys<T>
    ? [true] extends [IsOpt<T[K]>]
        ? true
        : {
              0: IsOptR<Required<T>[K], Head<P>, Tail<P>>;
              1: never;
          }[IsEmpty<P>]
    : never;

/**
 * Returns true if given path contains any intermediate properties
 * declared as optional in type `T`.
 *
 * Reference:
 * https://stackoverflow.com/q/60869412/294515
 */
export type IsOptPath<T, P extends unknown[]> = P extends []
    ? never
    : IsOptR<T, Head<P>, Tail<P>>;

/**
 * Similar to {@link PathVal}, but also takes into account if given path
 * contains any intermediate properties declared as optional in type
 * `T`. If that's the case, returns union of `undefined` and inferred
 * value for path, else just the latter.
 *
 * Context & reference: https://stackoverflow.com/q/60869412/294515
 */
export type OptPathVal<T, P extends unknown[]> = OptVal<
    IsOptPath<T, P>,
    ValN<T, P>
>;

/**
 * Returns nested value type for given path into `T` or `never` if path
 * is incompatible with `T`.
 */
export type PathVal<T, P extends unknown[]> = ValN<T, P>;
