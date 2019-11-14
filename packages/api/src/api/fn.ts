/**
 * No-effect placeholder function.
 */
export const NO_OP = () => {};

/**
 * A no-arg function, returning T.
 */
export type Fn0<T> = () => T;

/**
 * A single arg function from A to B.
 */
export type Fn<A, B> = (a: A) => B;

/**
 * A 2-arg function from A,B to C.
 */
export type Fn2<A, B, C> = (a: A, b: B) => C;

/**
 * A 3-arg function from A,B,C to D.
 */
export type Fn3<A, B, C, D> = (a: A, b: B, c: C) => D;

/**
 * A 4-arg function from A,B,C,D to E.
 */
export type Fn4<A, B, C, D, E> = (a: A, b: B, c: C, d: D) => E;

/**
 * A 5-arg function from A,B,C,D,E to F.
 */
export type Fn5<A, B, C, D, E, F> = (a: A, b: B, c: C, d: D, e: E) => F;

/**
 * A 6-arg function from A,B,C,D,E,F to G.
 */
export type Fn6<A, B, C, D, E, F, G> = (
    a: A,
    b: B,
    c: C,
    d: D,
    e: E,
    f: F
) => G;

/**
 * A 7-arg function from A,B,C,D,E,F,G to H.
 */
export type Fn7<A, B, C, D, E, F, G, H> = (
    a: A,
    b: B,
    c: C,
    d: D,
    e: E,
    f: F,
    g: G
) => H;

/**
 * A 8-arg function from A,B,C,D,E,F,G,H to I.
 */
export type Fn8<A, B, C, D, E, F, G, H, I> = (
    a: A,
    b: B,
    c: C,
    d: D,
    e: E,
    f: F,
    g: G,
    h: H
) => I;

/**
 * A 9-arg function from A,B,C,D,E,F,G,H,I to J.
 */
export type Fn9<A, B, C, D, E, F, G, H, I, J> = (
    a: A,
    b: B,
    c: C,
    d: D,
    e: E,
    f: F,
    g: G,
    h: H,
    i: I
) => J;

/**
 * A 10-arg function from A,B,C,D,E,F,G,H,I,J to K.
 */
export type Fn10<A, B, C, D, E, F, G, H, I, J, K> = (
    a: A,
    b: B,
    c: C,
    d: D,
    e: E,
    f: F,
    g: G,
    h: H,
    i: I,
    j: J
) => K;

export type FnO<A, B> = (a: A, ...xs: any[]) => B;

export type FnO2<A, B, C> = (a: A, b: B, ...xs: any[]) => C;

export type FnO3<A, B, C, D> = (a: A, b: B, c: C, ...xs: any[]) => D;

export type FnO4<A, B, C, D, E> = (a: A, b: B, c: C, d: D, ...xs: any[]) => E;

export type FnO5<A, B, C, D, E, F> = (
    a: A,
    b: B,
    c: C,
    d: D,
    e: E,
    ...xs: any[]
) => F;

export type FnO6<A, B, C, D, E, F, G> = (
    a: A,
    b: B,
    c: C,
    d: D,
    e: E,
    f: F,
    ...xs: any[]
) => G;

export type FnO7<A, B, C, D, E, F, G, H> = (
    a: A,
    b: B,
    c: C,
    d: D,
    e: E,
    f: F,
    g: G,
    ...xs: any[]
) => H;

export type FnO8<A, B, C, D, E, F, G, H, I> = (
    a: A,
    b: B,
    c: C,
    d: D,
    e: E,
    f: F,
    g: G,
    h: H,
    ...xs: any[]
) => I;

export type FnO9<A, B, C, D, E, F, G, H, I, J> = (
    a: A,
    b: B,
    c: C,
    d: D,
    e: E,
    f: F,
    g: G,
    h: H,
    i: I,
    ...xs: any[]
) => J;

export type FnO10<A, B, C, D, E, F, G, H, I, J, K> = (
    a: A,
    b: B,
    c: C,
    d: D,
    e: E,
    f: F,
    g: G,
    h: H,
    i: I,
    j: J,
    ...xs: any[]
) => K;

/**
 * An untyped vararg arg function to type T.
 */
export type FnAny<T> = (...xs: any[]) => T;

/**
 * A typed vararg arg function from A to B.
 */
export type FnAnyT<A, B> = (...xs: A[]) => B;
