import { NumOrString } from "./prim";
import type {
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
    Val8,
} from "./keyval";

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
 * Value type for lookup path (depth 1)
 */
export type PathVal1<T, A> = A extends Keys<T> ? Val1<T, A> : never;

/**
 * Value type for lookup path (depth 2)
 */
export type PathVal2<T, A, B> = A extends Keys<T>
    ? B extends Keys1<T, A>
        ? Val2<T, A, B>
        : never
    : never;

/**
 * Value type for lookup path (depth 3)
 */
export type PathVal3<T, A, B, C> = A extends Keys<T>
    ? B extends Keys1<T, A>
        ? C extends Keys2<T, A, B>
            ? Val3<T, A, B, C>
            : never
        : never
    : never;

/**
 * Value type for lookup path (depth 4)
 */
export type PathVal4<T, A, B, C, D> = A extends Keys<T>
    ? B extends Keys1<T, A>
        ? C extends Keys2<T, A, B>
            ? D extends Keys3<T, A, B, C>
                ? Val4<T, A, B, C, D>
                : never
            : never
        : never
    : never;

/**
 * Value type for lookup path (depth 5)
 */
export type PathVal5<T, A, B, C, D, E> = A extends Keys<T>
    ? B extends Keys1<T, A>
        ? C extends Keys2<T, A, B>
            ? D extends Keys3<T, A, B, C>
                ? E extends Keys4<T, A, B, C, D>
                    ? Val5<T, A, B, C, D, E>
                    : never
                : never
            : never
        : never
    : never;

/**
 * Value type for lookup path (depth 6)
 */
export type PathVal6<T, A, B, C, D, E, F> = A extends Keys<T>
    ? B extends Keys1<T, A>
        ? C extends Keys2<T, A, B>
            ? D extends Keys3<T, A, B, C>
                ? E extends Keys4<T, A, B, C, D>
                    ? F extends Keys5<T, A, B, C, D, E>
                        ? Val6<T, A, B, C, D, E, F>
                        : never
                    : never
                : never
            : never
        : never
    : never;

/**
 * Value type for lookup path (depth 7)
 */
export type PathVal7<T, A, B, C, D, E, F, G> = A extends Keys<T>
    ? B extends Keys1<T, A>
        ? C extends Keys2<T, A, B>
            ? D extends Keys3<T, A, B, C>
                ? E extends Keys4<T, A, B, C, D>
                    ? F extends Keys5<T, A, B, C, D, E>
                        ? G extends Keys6<T, A, B, C, D, E, F>
                            ? Val7<T, A, B, C, D, E, F, G>
                            : never
                        : never
                    : never
                : never
            : never
        : never
    : never;

/**
 * Value type for lookup path (depth 8)
 */
export type PathVal8<T, A, B, C, D, E, F, G, H> = A extends Keys<T>
    ? B extends Keys1<T, A>
        ? C extends Keys2<T, A, B>
            ? D extends Keys3<T, A, B, C>
                ? E extends Keys4<T, A, B, C, D>
                    ? F extends Keys5<T, A, B, C, D, E>
                        ? G extends Keys6<T, A, B, C, D, E, F>
                            ? H extends Keys7<T, A, B, C, D, E, F, G>
                                ? Val8<T, A, B, C, D, E, F, G, H>
                                : never
                            : never
                        : never
                    : never
                : never
            : never
        : never
    : never;
