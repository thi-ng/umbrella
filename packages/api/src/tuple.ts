import type { TypedArray } from "./typedarray.js";

/**
 * Returns an array's value type. Assumes array is homogeneous (only type of
 * first element will be considered).
 */
export type ArrayValue<T extends unknown[]> = T[0];

/**
 * Somewhat similar, but recursive version of {@link ArrayValue}. If `T` is an
 * array/typedarray recursively descends into it or (if not an array) returns
 * `T`. Assumes arrays at each level are homogeneous (only type of first
 * elements will be considered).
 */
export type DeepArrayValue<T> = T extends unknown[]
    ? DeepArrayValue<T[0]>
    : T extends TypedArray
    ? number
    : T;

/**
 * Defines a fixed sized, iterable tuple with elements of type `T` and
 * length `N`.
 */
export type Tuple<T, N extends number> = [T, ...T[]] & {
    length: N;
} & Iterable<T>;

/**
 * Extracts a tuple's length / size.
 */
export type TupleLength<T extends unknown[]> = T["length"];

/**
 * Returns 1 if T is empty tuple, else 0
 */
export type IsEmpty<T extends unknown[]> = T extends [] ? 1 : 0;

/**
 * Extracts the first element of a tuple.
 */
export type Head<T extends unknown[]> = T extends [infer A, ...unknown[]]
    ? A
    : never;

/**
 * Extracts everything except the first element from a tuple.
 */
export type Tail<T extends unknown[]> = T extends [unknown, ...infer A]
    ? A
    : never;

/**
 * Adds an element at the start of an tuple.
 */
export type Prepend<T, U extends unknown[]> = [T, ...U];

/**
 * Internal version of {@link Reverse} accepting 1 extra argument for
 * the accumulated value.
 */
type ReverseReducer<T extends unknown[], C extends unknown[]> = {
    // case when we got 0 elements
    0: C;
    // case when we got 1 element
    1: Prepend<Head<T>, C>;
    // case when we got more than 1 element
    2: ReverseReducer<Tail<T>, Prepend<Head<T>, C>>;
    // switch between cases
}[Tail<T> extends [] ? (Head<T> extends never ? 0 : 1) : 2];

/**
 * Reverses the order of elements from a tuple.
 */
export type Reverse<T extends unknown[]> = ReverseReducer<T, []>;

/**
 * Extracts the last element from a tuple.
 */
export type Last<T extends unknown[]> = {
    0: Last<Tail<T>>;
    1: Head<T>;
}[IsEmpty<Tail<T>>];

/**
 * Extracts everything except the last element from a tuple.
 */
export type ButLast<T extends unknown[], C extends unknown[] = []> = {
    0: ButLast<Tail<T>, Prepend<Head<T>, C>>;
    1: Reverse<C>;
}[IsEmpty<Tail<T>>];
