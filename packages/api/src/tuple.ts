/**
 * Extracts the first element of a tuple.
 */
export type Head<T extends unknown[]> = T extends Parameters<
    (v: infer R, ...args: any[]) => any
>
    ? R
    : never;
