import { Prim, Term, Vec } from "./api";
import { builtinCall } from "./ast";

const primOp1 = (name: string) => <T extends Prim>(a: Term<T>) =>
    builtinCall(name, a.type, a);

const primOp2 = (name: string) => <A extends Prim, B extends A>(
    a: Term<A>,
    b: Term<B>
) => builtinCall(name, a.type, a, b);

const primOp3 = (name: string) => <A extends Prim, B extends A, C extends A>(
    a: Term<A>,
    b: Term<B>,
    c: Term<C>
) => builtinCall(name, a.type, a, b, c);

/**
 * Returns normalized version of given vector.
 *
 * @param v
 */
export const normalize = <T extends Vec>(v: Term<T>) =>
    builtinCall("normalize", v.type, v);

/**
 * Returns length / magnitude of given vector.
 *
 * @param v
 */
export const length = <T extends Vec>(v: Term<T>) =>
    builtinCall("length", "f32", v);

export const distance = <A extends Vec, B extends A>(a: Term<A>, b: Term<B>) =>
    builtinCall("distance", "f32", a, b);

/**
 * Returns dot product of given vectors.
 *
 * @param a
 * @param b
 */
export const dot = <A extends Vec, B extends A>(a: Term<A>, b: Term<B>) =>
    builtinCall("dot", "f32", a, b);

/**
 * Returns cross product of given 3D vectors.
 *
 * @param a
 * @param b
 */
export const cross = (a: Term<"vec3">, b: Term<"vec3">) =>
    builtinCall("cross", a.type, a, b);

export const reflect = <I extends Vec, N extends I>(i: Term<I>, n: Term<N>) =>
    builtinCall("reflect", i.type, i, n);

export const refract = <I extends Vec, N extends I>(
    i: Term<I>,
    n: Term<N>,
    ior: Term<"f32">
) => builtinCall("refract", i.type, i, n, ior);

export const faceForward = <I extends Vec, N extends I, R extends I>(
    i: Term<I>,
    n: Term<N>,
    nref: Term<R>
) => builtinCall("faceForward", i.type, i, n, nref);

export const min = primOp2("min");
export const max = primOp2("max");
export const clamp = primOp3("clamp");

export const step = primOp2("step");
export const smoothstep = primOp3("smoothstep");

export const radians = primOp1("radians");
export const degrees = primOp1("degrees");

export const cos = primOp1("cos");
export const sin = primOp1("sin");
export const tan = primOp1("tan");
export const acos = primOp1("acos");
export const asin = primOp1("asin");
export const atan = primOp1("atan");
export const atan2 = primOp2("atan2");

export const pow = primOp2("pow");
export const exp = primOp1("exp");
export const log = primOp1("log");
export const exp2 = primOp1("exp2");
export const log2 = primOp1("log2");
export const sqrt = primOp1("sqrt");
export const inversesqrt = primOp1("inversesqrt");

export const abs = primOp1("abs");
export const sign = primOp1("sign");
export const floor = primOp1("floor");
export const ceil = primOp1("ceil");
export const fract = primOp1("fract");
export const mod = primOp2("mod");
