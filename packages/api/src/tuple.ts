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
