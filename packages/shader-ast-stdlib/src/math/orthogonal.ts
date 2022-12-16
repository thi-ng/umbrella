import type { Vec2Term } from "@thi.ng/shader-ast";
import { ternary } from "@thi.ng/shader-ast/ast/controlflow";
import { defn, ret } from "@thi.ng/shader-ast/ast/function";
import { vec2, vec3 } from "@thi.ng/shader-ast/ast/lit";
import { gt, neg } from "@thi.ng/shader-ast/ast/ops";
import { $x, $y, $z } from "@thi.ng/shader-ast/ast/swizzle";
import { abs } from "@thi.ng/shader-ast/builtin/math";

/**
 * Inline function. Returns counter-clockwise perpendicular vector (assuming
 * Y-up). [-y, x]
 *
 * @param v -
 */
export const perpendicularCCW = (v: Vec2Term) => vec2(neg($y(v)), $x(v));

/**
 * Inline function. Returns clockwise perpendicular vector (assuming Y-up).
 * [y,-x]
 *
 * @param v -
 */
export const perpendicularCW = (v: Vec2Term) => vec2($y(v), neg($x(v)));

/**
 * Returns an orthogonal vector to `v`.
 *
 * http://lolengine.net/blog/2013/09/21/picking-orthogonal-vector-combing-coconuts
 */
export const orthogonal3 = defn("vec3", "orthogonal3", ["vec3"], (v) => [
	ret(
		ternary(
			gt(abs($x(v)), abs($z(v))),
			vec3(neg($y(v)), $x(v), 0),
			vec3(0, neg($z(v)), $y(v))
		)
	),
]);
