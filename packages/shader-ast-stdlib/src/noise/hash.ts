import type { FloatSym, Vec3Sym, Vec4Sym } from "@thi.ng/shader-ast";
import { F, V2, V3, V4 } from "@thi.ng/shader-ast/api/types";
import { defn, ret } from "@thi.ng/shader-ast/ast/function";
import { mat2, vec2, vec3, vec4 } from "@thi.ng/shader-ast/ast/lit";
import { add, addSelf, mul, mulSelf } from "@thi.ng/shader-ast/ast/ops";
import { $, $x, $y, $z } from "@thi.ng/shader-ast/ast/swizzle";
import { sym } from "@thi.ng/shader-ast/ast/sym";
import { dot, fract, sin } from "@thi.ng/shader-ast/builtin/math";

/**
 * iq's hash PRNG producing 2D results.
 *
 * @param p -
 */
export const hash2 = defn(V2, "hash2", [V2], (p) => [
	ret(fract(mul(sin(mul(p, mat2(127.1, 311.7, 269.5, 183.3))), 43758.5453))),
]);

/**
 * iq's hash PRNG producing 3D results.
 *
 * @param p -
 */
export const hash3 = defn(V3, "hash3", [V2], (p) => [
	ret(
		fract(
			mul(
				sin(
					vec3(
						dot(p, vec2(127.1, 311.7)),
						dot(p, vec2(269.5, 183.3)),
						dot(p, vec2(419.2, 371.9))
					)
				),
				43758.5453
			)
		)
	),
]);

const H = vec3(0.1031, 0.103, 0.0973);
const H4 = vec4(0.1031, 0.103, 0.0973, 0.1099);

/**
 * 1D hash.
 *
 * Dave Hoskins (https://www.shadertoy.com/view/4djSRW)
 *
 * @param p -
 */
export const hash11 = defn(F, "hash11", [F], (p) => {
	let x: FloatSym;
	return [
		(x = sym(fract(mul(p, 0.1031)))),
		mulSelf(x, add(x, 19.19)),
		mulSelf(x, add(x, x)),
		ret(fract(x)),
	];
});

const __hash1 = <T extends "vec2" | "vec3">(V: T) =>
	defn(F, null, [V], (p) => {
		let x: Vec3Sym;
		return [
			(x = sym(fract(mul($(<any>p, "xyx"), 0.1031)))),
			addSelf(x, dot(x, add($(x, "yzx"), 19.19))),
			ret(fract(mul(add($x(x), $y(x)), $z(x)))),
		];
	});

/**
 * 2D -> 1D hash.
 *
 * Dave Hoskins (https://www.shadertoy.com/view/4djSRW)
 *
 * @param p -
 */
export const hash12 = __hash1(V2);

/**
 * 3D -> 1D hash.
 *
 * Dave Hoskins (https://www.shadertoy.com/view/4djSRW)
 *
 * @param p -
 */
export const hash13 = __hash1(V3);

/**
 * 1D -> 2D hash.
 *
 * Dave Hoskins (https://www.shadertoy.com/view/4djSRW)
 *
 * @param p -
 */
export const hash21 = defn(V2, "hash21", [F], (p) => {
	let x: Vec3Sym;
	return [
		(x = sym(fract(mul(vec3(p), H)))),
		addSelf(x, dot(x, add($(x, "yzx"), 19.19))),
		ret(fract(mul(add($(x, "xx"), $(x, "yz")), $(x, "zy")))),
	];
});

/**
 * 2D -> 2D hash.
 *
 * Dave Hoskins (https://www.shadertoy.com/view/4djSRW)
 *
 * @param p -
 */
export const hash22 = defn(V2, "hash22", [V2], (p) => {
	let x: Vec3Sym;
	return [
		(x = sym(fract(mul($(p, "xyx"), H)))),
		addSelf(x, dot(x, add($(x, "yzx"), 19.19))),
		ret(fract(mul(add($(x, "xx"), $(x, "yz")), $(x, "zy")))),
	];
});

/**
 * 3D -> 2D hash.
 *
 * Dave Hoskins (https://www.shadertoy.com/view/4djSRW)
 *
 * @param p -
 */
export const hash23 = defn(V2, "hash23", [V3], (p) => {
	let x: Vec3Sym;
	return [
		(x = sym(fract(mul(p, H)))),
		addSelf(x, dot(x, add($(x, "yzx"), 19.19))),
		ret(fract(mul(add($(x, "xx"), $(x, "yz")), $(x, "zy")))),
	];
});

const __hash3 = <T extends "float" | "vec3">(I: T) =>
	defn(V3, null, [I], (p) => {
		let x: Vec3Sym;
		return [
			(x = sym(fract(mul(<any>p, H)))),
			addSelf(x, dot(x, add($(x, "yzx"), 19.19))),
			ret(fract(mul(add($(x, "xxy"), $(x, "yzz")), $(x, "zyx")))),
		];
	});

/**
 * 1D -> 3D hash.
 *
 * Dave Hoskins (https://www.shadertoy.com/view/4djSRW)
 *
 * @param p -
 */
export const hash31 = __hash3(F);

/**
 * 2D -> 3D hash.
 *
 * Dave Hoskins (https://www.shadertoy.com/view/4djSRW)
 *
 * @param p -
 */
export const hash32 = defn(V3, "hash32", [V2], (p) => {
	let x: Vec3Sym;
	return [
		(x = sym(fract(mul($(p, "xyx"), H)))),
		addSelf(x, dot(x, add($(x, "yzx"), 19.19))),
		ret(fract(mul(add($(x, "xxy"), $(x, "yzz")), $(x, "zyx")))),
	];
});

/**
 * 3D -> 3D hash.
 *
 * Dave Hoskins (https://www.shadertoy.com/view/4djSRW)
 *
 * @param p -
 */
export const hash33 = __hash3(V3);

const __hash4 = <T extends "float" | "vec4">(I: T) =>
	defn(V4, null, [I], (p) => {
		let x: Vec4Sym;
		return [
			(x = sym(fract(mul(<any>p, H4)))),
			addSelf(x, dot(x, add($(x, "wzxy"), 19.19))),
			ret(fract(mul(add($(x, "xxyz"), $(x, "yzzw")), $(x, "zywx")))),
		];
	});

const __hash4a = <T extends "vec2" | "vec3">(I: T) =>
	defn(V4, null, [I], (p) => {
		let x: Vec4Sym;
		return [
			(x = sym(fract(mul($(<any>p, "xyxy"), H4)))),
			addSelf(x, dot(x, add($(x, "wzxy"), 19.19))),
			ret(fract(mul(add($(x, "xxyz"), $(x, "yzzw")), $(x, "zywx")))),
		];
	});

/**
 * 1D -> 4D hash.
 *
 * Dave Hoskins (https://www.shadertoy.com/view/4djSRW)
 *
 * @param p -
 */
export const hash41 = __hash4(F);

/**
 * 2D -> 4D hash.
 *
 * Dave Hoskins (https://www.shadertoy.com/view/4djSRW)
 *
 * @param p -
 */
export const hash42 = __hash4a(V2);

/**
 * 3D -> 4D hash.
 *
 * Dave Hoskins (https://www.shadertoy.com/view/4djSRW)
 *
 * @param p -
 */
export const hash43 = __hash4a(V3);

/**
 * 4D -> 4D hash.
 *
 * Dave Hoskins (https://www.shadertoy.com/view/4djSRW)
 *
 * @param p -
 */
export const hash44 = __hash4(V4);
