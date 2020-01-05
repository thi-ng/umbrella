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
