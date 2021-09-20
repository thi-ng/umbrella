export type Nullable<T> = T | null | undefined;

/**
 * Similar to `NonNullable`, but only excludes `undefined`.
 */
export type Always<T> = T extends undefined ? never : T;
