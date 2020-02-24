import type {
    Keys,
    Keys1,
    Keys2,
    Keys3,
    Keys4,
    Keys5,
    Keys6,
    Keys7
} from "@thi.ng/api";

export type Path1<T, A extends Keys<T>> = [A];
export type Path2<T, A extends Keys<T>, B extends Keys1<T, A>> = [A, B];
export type Path3<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>
> = [A, B, C];
export type Path4<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>
> = [A, B, C, D];
export type Path5<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>
> = [A, B, C, D, E];
export type Path6<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>,
    F extends Keys5<T, A, B, C, D, E>
> = [A, B, C, D, E, F];
export type Path7<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>,
    F extends Keys5<T, A, B, C, D, E>,
    G extends Keys6<T, A, B, C, D, E, F>
> = [A, B, C, D, E, F, G];
export type Path8<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>,
    F extends Keys5<T, A, B, C, D, E>,
    G extends Keys6<T, A, B, C, D, E, F>,
    H extends Keys7<T, A, B, C, D, E, F, G>
> = [A, B, C, D, E, F, G, H];

export type UpdateFn<T> = (curr: T, ...args: any[]) => T;
