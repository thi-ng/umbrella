import type { Vec2Sym, Vec3Sym, Vec4Sym } from "@thi.ng/shader-ast";
import { F, V2 } from "@thi.ng/shader-ast/api/types";
import { assign } from "@thi.ng/shader-ast/ast/assign";
import { ternary } from "@thi.ng/shader-ast/ast/controlflow";
import { defn, ret } from "@thi.ng/shader-ast/ast/function";
import {
	FLOAT05,
	FLOAT1,
	VEC3_0,
	float,
	vec2,
	vec3,
	vec4,
} from "@thi.ng/shader-ast/ast/lit";
import { add, gt, mul, mulSelf, sub } from "@thi.ng/shader-ast/ast/ops";
import { $, $x, $xy, $y } from "@thi.ng/shader-ast/ast/swizzle";
import { sym } from "@thi.ng/shader-ast/ast/sym";
import {
	abs,
	dot,
	floor,
	fract,
	max,
	mod,
} from "@thi.ng/shader-ast/builtin/math";
import { magSq2 } from "../math/magsq.js";
import { permute3 } from "./permute.js";

/**
 * Array and textureless GLSL 2D simplex noise function. Ported from original
 * GLSL implementation by Ian McEwan & Ashima Arts.
 *
 * https://github.com/ashima/webgl-noise
 */
export const snoise2 = defn(F, "snoise2", [V2], (v) => {
	let C: Vec4Sym;
	let i: Vec2Sym;
	let i1: Vec2Sym;
	let x0: Vec2Sym;
	let x12: Vec4Sym;
	let p: Vec3Sym;
	let m: Vec3Sym;
	let x: Vec3Sym;
	let h: Vec3Sym;
	let ox: Vec3Sym;
	let a0: Vec3Sym;
	let g: Vec3Sym;
	return [
		(C = sym(
			vec4(
				0.211324865405187,
				0.366025403784439,
				-0.577350269189626,
				0.024390243902439
			)
		)),
		(i = sym(floor(add(v, dot(v, $(C, "yy")))))),
		(x0 = sym(add(sub(v, i), dot(i, $(C, "xx"))))),
		(i1 = sym(ternary(gt($x(x0), $y(x0)), vec2(1, 0), vec2(0, 1)))),
		(x12 = sym(sub(add($(x0, "xyxy"), $(C, "xxzz")), vec4(i1, 0, 0)))),
		assign(i, mod(i, float(289))),
		(p = sym(
			permute3(
				add(
					permute3(add(vec3(0, $y(i1), 1), $y(i))),
					add(vec3(0, $x(i1), 1), $x(i))
				)
			)
		)),
		(m = sym(
			max(
				sub(
					FLOAT05,
					vec3(magSq2(x0), magSq2($xy(x12)), magSq2($(x12, "zw")))
				),
				VEC3_0
			)
		)),
		mulSelf(m, m),
		mulSelf(m, m),
		(x = sym(sub(mul(2, fract(mul(p, $(C, "www")))), FLOAT1))),
		(h = sym(sub(abs(x), FLOAT05))),
		(ox = sym(floor(add(x, FLOAT05)))),
		(a0 = sym(sub(x, ox))),
		mulSelf(
			m,
			sub(
				1.79284291400159,
				mul(0.85373472095314, add(mul(a0, a0), mul(h, h)))
			)
		),
		(g = sym(vec3(add(mul($x(a0), $x(x0)), mul($x(h), $y(x0)))))),
		assign(
			$(g, "yz"),
			add(mul($(a0, "yz"), $(x12, "xz")), mul($(h, "yz"), $(x12, "yw")))
		),
		ret(mul(130, dot(m, g))),
	];
});
