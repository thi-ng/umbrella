import type { FnCall, Sym, Term } from "../api/nodes.js";
import type {
	BoolTerm,
	BVec2Term,
	BVec3Term,
	BVec4Term,
	FloatTerm,
	IntTerm,
	IVec2Term,
	IVec3Term,
	IVec4Term,
	UintTerm,
	UVec2Term,
	UVec3Term,
	UVec4Term,
	Vec2Term,
	Vec3Term,
	Vec4Term,
} from "../api/terms.js";
import type { Mat, Prim, Vec } from "../api/types.js";
import { builtinCall } from "../ast/function.js";
import { matchingBoolType, matchingPrimFor } from "../ast/item.js";

const primOp1 =
	(name: string) =>
	<T extends Prim>(a: Term<T>) =>
		builtinCall(name, a.type, a);

const primOp2 =
	(name: string) =>
	<A extends Prim, B extends A>(a: Term<A>, b: Term<B>) =>
		builtinCall(name, a.type, a, b);

const primOp3 =
	(name: string) =>
	<A extends Prim, B extends A, C extends B>(
		a: Term<A>,
		b: Term<B>,
		c: Term<C>
	) =>
		builtinCall(name, a.type, a, b, c);

/**
 * Returns normalized version of given vector.
 *
 * @param v -
 */
export const normalize = <T extends Vec>(v: Term<T>) =>
	builtinCall("normalize", v.type, v);

/**
 * Returns length / magnitude of given vector.
 *
 * @param v -
 */
export const length = <T extends Vec>(v: Term<T>) =>
	builtinCall("length", "float", v);

export const distance = <A extends Vec, B extends A>(a: Term<A>, b: Term<B>) =>
	builtinCall("distance", "float", a, b);

/**
 * Returns dot product of given vectors.
 *
 * @param a -
 * @param b -
 */
export const dot = <A extends Vec, B extends A>(a: Term<A>, b: Term<B>) =>
	builtinCall("dot", "float", a, b);

/**
 * Returns cross product of given 3D vectors.
 *
 * @param a -
 * @param b -
 */
export const cross = (a: Vec3Term, b: Vec3Term) =>
	builtinCall("cross", a.type, a, b);

export const reflect = <I extends Vec, N extends I>(i: Term<I>, n: Term<N>) =>
	builtinCall("reflect", i.type, i, n);

export const refract = <I extends Vec, N extends I>(
	i: Term<I>,
	n: Term<N>,
	ior: FloatTerm
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

export function atan<T extends Prim>(a: Term<T>): FnCall<T>;
// prettier-ignore
export function atan<A extends Prim, B extends A>(a: Term<A>, b: Term<B>): FnCall<A>;
export function atan(a: Term<any>, b?: Term<any>) {
	const f = b
		? builtinCall("atan", a.type, a, b)
		: builtinCall("atan", a.type, a);
	b && (f.info = "nn");
	return f;
}

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

export const powf = <T extends Prim>(x: Term<T>, y: FloatTerm) =>
	pow(x, matchingPrimFor(x, y));

// prettier-ignore
export function mod<A extends Prim, B extends A>(a: Term<A>, b: Term<B>): FnCall<A>;
export function mod<A extends Prim>(a: Term<A>, b: FloatTerm): FnCall<A>;
export function mod(a: Term<any>, b: Term<any>): FnCall<any> {
	const f = builtinCall("mod", a.type, a, b);
	b.type === "float" && (f.info = "n");
	return f;
}

/**
 * Important: Currently unsupported by JS target.
 *
 * TODO add additional metadata for JS (`b` is an output var), issue #96
 *
 * @param a -
 * @param b -
 */
// prettier-ignore
export const modf = <A extends Prim, B extends A>(a: Term<A>, b: Sym<B>): FnCall<A> =>
    builtinCall("modf", a.type, a, b);

// prettier-ignore
export function mix<A extends Prim, B extends A, C extends B>(a: Term<A>, b: Term<B>, c: Term<C>): FnCall<A>;
// prettier-ignore
export function mix<A extends Prim, B extends A>(a: Term<A>, b: Term<B>, c: FloatTerm): FnCall<A>;
export function mix(a: Term<any>, b: Term<any>, c: Term<any>): FnCall<any> {
	const f = builtinCall("mix", a.type, a, b, c);
	c.type === "float" && (f.info = "n");
	return f;
}

// prettier-ignore
export const matrixCompMult = <A extends Mat, B extends A>(a: Term<A>, b: Term<B>) =>
    builtinCall("matrixCompMult", a.type, a, b);

/**
 * Important: Not available in JS / GLSL ES 100
 *
 * @param a -
 */
export function isnan(a: FloatTerm | IntTerm | UintTerm): BoolTerm;
export function isnan(a: Vec2Term | IVec2Term | UVec2Term): BVec2Term;
export function isnan(a: Vec3Term | IVec3Term | UVec3Term): BVec3Term;
export function isnan(a: Vec4Term | IVec4Term | UVec4Term): BVec4Term;
export function isnan(a: any): FnCall<any> {
	return builtinCall("isnan", matchingBoolType(a), a);
}

/**
 * Important: Not available in JS / GLSL ES 100
 *
 * @param a -
 */
export function isinf(a: FloatTerm | IntTerm | UintTerm): BoolTerm;
export function isinf(a: Vec2Term | IVec2Term | UVec2Term): BVec2Term;
export function isinf(a: Vec3Term | IVec3Term | UVec3Term): BVec3Term;
export function isinf(a: Vec4Term | IVec4Term | UVec4Term): BVec4Term;
export function isinf(a: any): FnCall<any> {
	return builtinCall("isinf", matchingBoolType(a), a);
}
