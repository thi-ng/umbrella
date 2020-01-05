export type Tuple<T, N extends number> = [T, ...T[]] & { length: N };

export type IterableTuple<T, N extends number> = Tuple<T, N> & Iterable<T>;

/**
 * Extracts the first element of a tuple.
 */
export type Head<T extends unknown[]> = T extends Parameters<
    (v: infer R, ...args: any[]) => any
>
    ? R
    : never;

/**
 * Extracts everything except the first element from a tuple.
 */
export type Tail<T extends unknown[]> = ((...a: T) => void) extends (
    v: any,
    ...args: infer R
) => void
    ? R
    : never;

/**
 * Add an element at the start of an tuple.
 */
export type Prepend<T, U extends unknown[]> = Parameters<
    (v: T, ...args: U) => void
>;

/**
 * Internal version of Reverse accepting 1 extra argument for the accumulated value.
 */
type ReverseReducer<T extends unknown[], C extends unknown[] = []> = {
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
export type Reverse<T extends unknown[]> = ReverseReducer<T>;

/**
 * Extracts the last element from a tuple.
 */
export type Last<T extends unknown[]> = {
    // We need to use this trick to get around typescripts recursive type limit.
    0: Head<T>;
    1: Last<Tail<T>>;
}[Tail<T> extends [] ? 0 : 1];
