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
export type Keys6<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>,
    F extends Keys5<T, A, B, C, D, E>
> = Keys5<T[A], B, C, D, E, F>;
export type Keys7<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>,
    F extends Keys5<T, A, B, C, D, E>,
    G extends Keys6<T, A, B, C, D, E, F>
> = Keys6<T[A], B, C, D, E, F, G>;
export type Keys8<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>,
    F extends Keys5<T, A, B, C, D, E>,
    G extends Keys6<T, A, B, C, D, E, F>,
    H extends Keys7<T, A, B, C, D, E, F, G>
> = Keys7<T[A], B, C, D, E, F, G, H>;

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
export type Val6<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>,
    F extends Keys5<T, A, B, C, D, E>
> = Val5<T, A, B, C, D, E>[F];
export type Val7<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>,
    F extends Keys5<T, A, B, C, D, E>,
    G extends Keys6<T, A, B, C, D, E, F>
> = Val6<T, A, B, C, D, E, F>[G];
export type Val8<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>,
    F extends Keys5<T, A, B, C, D, E>,
    G extends Keys6<T, A, B, C, D, E, F>,
    H extends Keys7<T, A, B, C, D, E, F, G>
> = Val7<T, A, B, C, D, E, F, G>[H];

/**
 * Utilities for constructing types with nested keys removed.
 */
export type Without<T, A extends Keys<T>> = Omit<T, A>;
export type Without2<T, A extends Keys<T>, B extends Keys1<T, A>> = Without<
    T,
    A
> &
    { [id in A]: Without<Val1<T, A>, B> };
export type Without3<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>
> = Without<T, A> & { [id in A]: Without2<Val1<T, A>, B, C> };
export type Without4<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>
> = Without<T, A> & { [id in A]: Without3<Val1<T, A>, B, C, D> };
export type Without5<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>
> = Without<T, A> & { [id in A]: Without4<Val1<T, A>, B, C, D, E> };
export type Without6<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>,
    F extends Keys5<T, A, B, C, D, E>
> = Without<T, A> & { [id in A]: Without5<Val1<T, A>, B, C, D, E, F> };
export type Without7<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>,
    F extends Keys5<T, A, B, C, D, E>,
    G extends Keys6<T, A, B, C, D, E, F>
> = Without<T, A> & { [id in A]: Without6<Val1<T, A>, B, C, D, E, F, G> };
export type Without8<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>,
    F extends Keys5<T, A, B, C, D, E>,
    G extends Keys6<T, A, B, C, D, E, F>,
    H extends Keys7<T, A, B, C, D, E, F, G>
> = Without<T, A> & { [id in A]: Without7<Val1<T, A>, B, C, D, E, F, G, H> };

/**
 * Utilities for replacing types of nested keys.
 */
export type Replace<T, A extends Keys<T>, V> = Without<T, A> & { [id in A]: V };
export type Replace2<T, A extends Keys<T>, B extends Keys1<T, A>, V> = Without<
    T,
    A
> &
    { [id in A]: Replace<Val1<T, A>, B, V> };
export type Replace3<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    V
> = Without<T, A> & { [id in A]: Replace2<Val1<T, A>, B, C, V> };
export type Replace4<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    V
> = Without<T, A> & { [id in A]: Replace3<Val1<T, A>, B, C, D, V> };
export type Replace5<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>,
    V
> = Without<T, A> & { [id in A]: Replace4<Val1<T, A>, B, C, D, E, V> };
export type Replace6<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>,
    F extends Keys5<T, A, B, C, D, E>,
    V
> = Without<T, A> & { [id in A]: Replace5<Val1<T, A>, B, C, D, E, F, V> };
export type Replace7<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>,
    F extends Keys5<T, A, B, C, D, E>,
    G extends Keys6<T, A, B, C, D, E, F>,
    V
> = Without<T, A> & { [id in A]: Replace6<Val1<T, A>, B, C, D, E, F, G, V> };
export type Replace8<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>,
    F extends Keys5<T, A, B, C, D, E>,
    G extends Keys6<T, A, B, C, D, E, F>,
    H extends Keys7<T, A, B, C, D, E, F, G>,
    V
> = Without<T, A> & { [id in A]: Replace7<Val1<T, A>, B, C, D, E, F, G, H, V> };
