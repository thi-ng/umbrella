import { Op2, Prim, Term } from "../api";
import {
    add,
    float,
    mul,
    sub
} from "../ast";

/**
 * Fits value `a` in [0..1] interval to new interval [b..c].
 *
 * @param a
 * @param b
 * @param c
 */
export const fit01 = <A extends Prim, B extends A, C extends A>(
    a: Term<A>,
    b: Term<B>,
    c: Term<C>
): Op2<A> => <any>add(<any>b, mul(sub(<any>b, c), a));

/**
 * Fits value `x` in [-1..+1] interval to [0..1] interval.
 *
 * @param x
 */
export const fit1101 = <T extends Prim>(x: Term<T>): Op2<T> =>
    <any>add(mul(<any>x, float(0.5)), float(0.5));
