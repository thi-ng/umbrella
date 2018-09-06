export type Fn0<T> = () => T;
export type Fn1<A, B> = (a: A) => B;
export type Fn2<A, B, C> = (a: A, b: B) => C;
export type Fn3<A, B, C, D> = (a: A, b: B, c: C) => D;
export type Fn4<A, B, C, D, E> = (a: A, b: B, c: C, d: D) => E;
export type FnAny = (...xs: any[]) => any;

export interface MapLike<A, B> {
    has(key: A): boolean;
    get(key: A): B | undefined;
    set(key: A, val: B): any;
}