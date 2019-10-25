/*
 * Utilities for extracting key types of nested objects.
 */
export type Keys<T> = keyof T;
export type Keys1<T, A extends Keys<T>> = Keys<T[A]>;
export type Keys2<T, A extends Keys<T>, B extends Keys1<T, A>> = Keys1<T[A], B>;
export type Keys3<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>
> = Keys2<T[A], B, C>;
export type Keys4<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>
> = Keys3<T[A], B, C, D>;
export type Keys5<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>
> = Keys4<T[A], B, C, D, E>;

/*
 * Utilities for extracting value types from nested objects.
 */
export type Val1<T, A extends Keys<T>> = T[A];
export type Val2<T, A extends Keys<T>, B extends Keys1<T, A>> = Val1<T, A>[B];
export type Val3<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>
> = Val2<T, A, B>[C];
export type Val4<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>
> = Val3<T, A, B, C>[D];
export type Val5<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>
> = Val4<T, A, B, C, D>[E];
