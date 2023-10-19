import type { Vec2Sym, Vec2Term, Vec4Term } from "@thi.ng/shader-ast";
import { F, V2 } from "@thi.ng/shader-ast/api/types";
import { assign } from "@thi.ng/shader-ast/ast/assign";
import { defn, ret } from "@thi.ng/shader-ast/ast/function";
import { VEC2_1, bvec4, vec2 } from "@thi.ng/shader-ast/ast/lit";
import { add, div, mul } from "@thi.ng/shader-ast/ast/ops";
import { $x, $xy, $y } from "@thi.ng/shader-ast/ast/swizzle";
import { sym } from "@thi.ng/shader-ast/ast/sym";
import { _any, greaterThan, lessThan } from "@thi.ng/shader-ast/builtin/bvec";
import { fit0111 } from "../math/fit.js";

/**
 * Computes UV coord in [0..1] interval from given `fragCoord` and screen `res`.
 *
 * @param fragCoord -
 * @param res -
 */
export const fragUV = (fragCoord: Vec4Term, res: Vec2Term) =>
	div($xy(fragCoord), res);

/**
 * Takes `pos`, a screen coord (e.g. gl_FragCoord) and viewport resolution
 * `res`, returns aspect corrected uv, with uv.y in [-1..1] interval and uv.x
 * scaled by the aspect ratio `resx / resy`.
 *
 * @param fragCoord - vec2
 * @param res - vec2
 */
export const aspectCorrectedUV = defn(
	V2,
	"aspectCorrectedUV",
	[V2, V2],
	(pos, res) => {
		let uv: Vec2Sym;
		return [
			(uv = sym(fit0111(div(pos, res)))),
			assign($x(uv), mul($x(uv), div($x(res), $y(res)))),
			ret(uv),
		];
	}
);

/**
 * Returns true if at least one coordinate of the given point is within the
 * `width` internal border region of UV rect ([0,0] .. [1,1]).
 *
 * ```c
 * borderMask(vec2(0.91, 0.5), 0.1) // true
 * borderMask(vec2(0.2, 0.01), 0.1) // true
 * borderMask(vec2(0.2, 0.2), 0.1) // false
 * ```
 */
export const borderMask = defn("bool", "borderMask", [V2, F], (uv, width) => [
	ret(
		_any(
			bvec4(
				lessThan(uv, vec2(width)),
				greaterThan(add(uv, width), VEC2_1)
			)
		)
	),
]);
