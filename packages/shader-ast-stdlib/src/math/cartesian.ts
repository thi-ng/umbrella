import type { FloatSym, Vec2Sym, Vec2Term } from "@thi.ng/shader-ast";
import { V3 } from "@thi.ng/shader-ast/api/types";
import { defn, ret } from "@thi.ng/shader-ast/ast/function";
import { vec3 } from "@thi.ng/shader-ast/ast/lit";
import { mul } from "@thi.ng/shader-ast/ast/ops";
import { $x, $y, $z } from "@thi.ng/shader-ast/ast/swizzle";
import { sym } from "@thi.ng/shader-ast/ast/sym";
import { cossin } from "./sincos.js";

/**
 * Converts 2D polar vector `v`, i.e. `[r,θ]` (angle in radians) to
 * cartesian coordinates. See {@link polar2} for reverse operation.
 *
 * @param v -
 */
export const cartesian2 = (v: Vec2Term) => cossin($y(v), $x(v));

/**
 * Converts 3D polar/spherical vector `v`, i.e. `[r,θ,ϕ]` (angles in
 * radians) to cartesian coordinates. See {@link polar3} for reverse
 * operation.
 *
 * @param v -
 */
export const cartesian3 = defn(V3, "cartesian3", [V3], (v) => {
	let r: FloatSym;
	let t: Vec2Sym;
	let p: Vec2Sym;
	return [
		(r = sym($x(v))),
		(t = sym(cossin($y(v)))),
		(p = sym(cossin($z(v)))),
		ret(
			vec3(
				mul(mul(r, $x(t)), $x(p)),
				mul(mul(r, $x(t)), $y(p)),
				mul(r, $y(t))
			)
		),
	];
});
