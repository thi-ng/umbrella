import type { FloatSym, NumericF, Vec2Term } from "@thi.ng/shader-ast";
import { defn, ret } from "@thi.ng/shader-ast/ast/function";
import { mat2, mat3, mat4, vec3 } from "@thi.ng/shader-ast/ast/lit";
import { add, mul, neg, sub } from "@thi.ng/shader-ast/ast/ops";
import { $x, $y, $z } from "@thi.ng/shader-ast/ast/swizzle";
import { sym } from "@thi.ng/shader-ast/ast/sym";
import { cos, sin } from "@thi.ng/shader-ast/builtin/math";
import { perpendicularCCW } from "../math/orthogonal.js";
import { cossin } from "../math/sincos.js";
import { m33ToM44 } from "./convert.js";

export const rotation2 = defn("mat2", "rotation2", ["float"], (theta) => {
	let cs: Vec2Term;
	return [(cs = sym(cossin(theta))), ret(mat2(cs, perpendicularCCW(cs)))];
});

export const rotationX3 = defn("mat3", "rotationX3", ["float"], (theta) => {
	let cs: Vec2Term;
	return [
		(cs = sym(cossin(theta))),
		ret(mat3(1, 0, 0, 0, $x(cs), $y(cs), 0, neg($y(cs)), $x(cs))),
	];
});

export const rotationY3 = defn("mat3", "rotationY3", ["float"], (theta) => {
	let cs: Vec2Term;
	return [
		(cs = sym(cossin(theta))),
		ret(mat3($x(cs), 0, neg($y(cs)), 0, 1, 0, $y(cs), 0, $x(cs))),
	];
});

export const rotationZ3 = defn("mat3", "rotationZ3", ["float"], (theta) => {
	let cs: Vec2Term;
	return [
		(cs = sym(cossin(theta))),
		ret(mat3($x(cs), $y(cs), 0, neg($y(cs)), $x(cs), 0, 0, 0, 1)),
	];
});

export const rotationX4 = defn("mat4", "rotationX4", ["float"], (theta) => {
	let cs: Vec2Term;
	return [
		(cs = sym(cossin(theta))),
		ret(
			mat4(
				1,
				0,
				0,
				0,
				0,
				$x(cs),
				$y(cs),
				0,
				0,
				neg($y(cs)),
				$x(cs),
				0,
				0,
				0,
				0,
				1
			)
		),
	];
});

export const rotationY4 = defn("mat4", "rotationY4", ["float"], (theta) => {
	let cs: Vec2Term;
	return [
		(cs = sym(cossin(theta))),
		ret(
			mat4(
				$x(cs),
				0,
				neg($y(cs)),
				0,
				0,
				1,
				0,
				0,
				$y(cs),
				0,
				$x(cs),
				0,
				0,
				0,
				0,
				1
			)
		),
	];
});

export const rotationZ4 = defn("mat4", "rotationZ4", ["float"], (theta) => {
	let cs: Vec2Term;
	return [
		(cs = sym(cossin(theta))),
		ret(
			mat4(
				$x(cs),
				$y(cs),
				0,
				0,
				neg($y(cs)),
				$x(cs),
				0,
				0,
				0,
				0,
				1,
				0,
				0,
				0,
				0,
				1
			)
		),
	];
});

export const rotationAroundAxis3 = defn(
	"mat3",
	"rotationAroundAxis3",
	["vec3", "float"],
	(axis, theta) => {
		let s: FloatSym;
		let c: FloatSym;
		let t: FloatSym;
		const $$ = (
			a: NumericF,
			b: NumericF,
			c: NumericF,
			d: NumericF,
			e: NumericF,
			f: NumericF,
			g: NumericF
		) => add(mul(mul(axis, a), t), mul(vec3(b, c, d), vec3(e, f, g)));
		return [
			(s = sym(sin(theta))),
			(c = sym(cos(theta))),
			(t = sym(sub(1, c))),
			ret(
				mat3(
					$$($x(axis), 1, $z(axis), neg($y(axis)), c, s, s),
					$$($y(axis), neg($z(axis)), 1, $x(axis), s, c, s),
					$$($z(axis), $y(axis), neg($x(axis)), 1, s, s, c)
				)
			),
		];
	}
);

export const rotationAroundAxis4 = defn(
	"mat4",
	"rotationAroundAxis4",
	["vec3", "float"],
	(axis, theta) => [ret(m33ToM44(rotationAroundAxis3(axis, theta)))]
);
