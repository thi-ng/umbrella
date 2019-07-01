import {
    add,
    FLOAT05,
    FLOAT1,
    FLOAT2,
    mix,
    mul,
    Op2,
    Prim,
    sub,
    Term
} from "@thi.ng/shader-ast";

/**
 * Inline function. Fits value `a` in [0..1] interval to new interval
 * [b..c]. No clamping performed. Same as `mix(b, c, a)`
 *
 * @param a
 * @param b
 * @param c
 */
export const fit01 = <A extends Prim, B extends A, C extends B>(
    a: Term<A>,
    b: Term<B>,
    c: Term<C>
) => mix<A, A, A>(b, c, a);

/**
 * Inline function. Fits value `x` in [-1..+1] interval to [0..1]
 * interval. No clamping performed.
 *
 * @param x
 */
export const fit1101 = <T extends Prim>(x: Term<T>): Op2<T> =>
    <any>add(mul(<any>x, FLOAT05), FLOAT05);

/**
 * Inline function. Fits value `x` in [0..1] interval to [-1..+1]
 * interval. No clamping performed.
 *
 * @param x
 */
export const fit0111 = <T extends Prim>(x: Term<T>): Op2<T> =>
    <any>sub(mul(<any>x, FLOAT2), FLOAT1);
