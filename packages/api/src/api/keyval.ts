import type { Head, Tail } from "./tuple";

/**
 * Extracts from A all keys which have values assignable to type B.
 */
export type TypedKeys<A, B> = {
    [P in Keys<A>]: B extends A[P] ? P : never;
}[keyof A];

export type NumericKeys<T> = TypedKeys<T, number>;

export type StringKeys<T> = TypedKeys<T, string>;

export type DeepPartial<T> = Partial<
    {
        [k in keyof T]: DeepPartial<T[k]>;
    }
>;

/*
 * Utilities for extracting key types of nested objects.
 */
export type Keys<T> = keyof Required<T>;
export type Keys1<T, A extends Keys<T>> = Keys<Required<T>[A]>;
export type Keys2<T, A extends Keys<T>, B extends Keys1<T, A>> = Keys1<
    Required<T>[A],
    B
>;
export type Keys3<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>
> = Keys2<Required<T>[A], B, C>;
export type Keys4<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>
> = Keys3<Required<T>[A], B, C, D>;
export type Keys5<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>
> = Keys4<Required<T>[A], B, C, D, E>;
export type Keys6<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>,
    F extends Keys5<T, A, B, C, D, E>
> = Keys5<Required<T>[A], B, C, D, E, F>;
export type Keys7<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>,
    F extends Keys5<T, A, B, C, D, E>,
    G extends Keys6<T, A, B, C, D, E, F>
> = Keys6<Required<T>[A], B, C, D, E, F, G>;
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
> = Keys7<Required<T>[A], B, C, D, E, F, G, H>;

/**
 * Internal type used as a reducer for the KeyN type.
 *
 * @internal
 *
 * @param T - structure to validate the key against.
 * @param L - Current value.
 * @param R - Remaining values.
 */
type KeysNReducer<T, L, R extends unknown[]> = L extends keyof T
    ? {
          0: keyof Required<T>[L];
          1: KeysNReducer<Required<T>[L], Head<R>, Tail<R>>;
      }[R extends [] ? 0 : 1]
    : never;

/**
 * Generalised version of Keys0 - Keys7.
 */
export type KeysN<T, L extends unknown[]> = L extends []
    ? Keys<T>
    : KeysNReducer<T, Head<L>, Tail<L>>;

/*
 * Utilities for extracting value types from nested objects.
 */
export type Val1<T, A extends Keys<T>> = T[A];
export type Val2<T, A extends Keys<T>, B extends Keys1<T, A>> = ValN<T, [A, B]>;
export type Val3<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>
> = ValN<T, [A, B, C]>;
export type Val4<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>
> = ValN<T, [A, B, C, D]>;
export type Val5<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>
> = ValN<T, [A, B, C, D, E]>;
export type Val6<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>,
    F extends Keys5<T, A, B, C, D, E>
> = ValN<T, [A, B, C, D, E, F]>;
export type Val7<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>,
    F extends Keys5<T, A, B, C, D, E>,
    G extends Keys6<T, A, B, C, D, E, F>
> = ValN<T, [A, B, C, D, E, F, G]>;
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
> = ValN<T, [A, B, C, D, E, F, G, H]>;

/**
 * Internal reducer for ValN.
 *
 * @internal
 *
 * @param T The structure to get the values from.
 * @param C The current key.
 * @param R The remaining keys
 */
type ValNReducer<T, C, R extends unknown[]> = C extends keyof T
    ? {
          0: T[C];
          1: ValNReducer<Required<T>[C], Head<R>, Tail<R>>;
      }[R extends [] ? 0 : 1]
    : never;

/**
 * Generalised version of Val1-Val7
 */
export type ValN<T, L extends unknown[]> = L extends []
    ? T
    : ValNReducer<T, Head<L>, Tail<L>>;

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
 * Internal reducer used as a building block for WithoutN.
 *
 * @internal
 *
 * @param T The structure to remove keys from.
 * @param C The current key.
 * @param R The remaining keys.
 */
type WithoutNReducer<T, C, R extends unknown[]> = C extends keyof T
    ? {
          0: Without<T, C>;
          1: Without<T, C> & Record<C, WithoutNReducer<T[C], Head<R>, Tail<R>>>;
      }[R extends [] ? 0 : 1]
    : never;

/**
 * Generalised version of Without0-Without8.
 */
export type WithoutN<T, P extends unknown[]> = WithoutNReducer<
    T,
    Head<P>,
    Tail<P>
>;

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

/**
 * Internal reducer used as a building block for ReduceN.
 *
 * @internal
 *
 * @param T The structure to remove keys from.
 * @param C The current key.
 * @param R The remaining keys.
 * @param V The type to use for the replacement.
 */
type ReplaceNReducer<T, C, R extends unknown[], V> = C extends keyof T
    ? {
          0: Replace<T, C, V>;
          1: Without<T, C> &
              Record<C, ReplaceNReducer<T[C], Head<R>, Tail<R>, V>>;
      }[R extends [] ? 0 : 1]
    : never;

/**
 * Generalised version of Replace0-Replace8.
 */
export type ReplaceN<T, P extends unknown[], V> = ReplaceNReducer<
    T,
    Head<P>,
    Tail<P>,
    V
>;
