import { FunCall, Term, Vec } from "./api";
import { funcall } from "./ast";

/**
 * Returns normalized version of given vector.
 *
 * @param v
 */
export const normalize = <T extends Vec>(v: Term<T>) =>
    funcall("normalize", v.type, v);

/**
 * Returns length / magnitude of given vector.
 *
 * @param v
 */
export const length = <T extends Vec>(v: Term<T>) =>
    funcall("length", v.type, v);

/**
 * Returns dot product of given vectors.
 *
 * @param a
 * @param b
 */
export const dot = <A extends Vec, B extends A>(
    a: Term<A>,
    b: Term<B>
): FunCall<"f32"> => funcall("dot", "f32", a, b);

/**
 * Returns cross product of given 3D vectors.
 *
 * @param a
 * @param b
 */
export const cross = (a: Term<"vec3">, b: Term<"vec3">) =>
    funcall("cross", "vec3", a, b);
