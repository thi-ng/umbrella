import type { Vec2Sym } from "@thi.ng/shader-ast/api/syms";
import { ternary } from "@thi.ng/shader-ast/ast/controlflow";
import { defn, ret } from "@thi.ng/shader-ast/ast/function";
import { vec2 } from "@thi.ng/shader-ast/ast/lit";
import { gt, madd, mul, neg, sub } from "@thi.ng/shader-ast/ast/ops";
import { $x, $y } from "@thi.ng/shader-ast/ast/swizzle";
import { sym } from "@thi.ng/shader-ast/ast/sym";
import { abs, cos, length, sin } from "@thi.ng/shader-ast/builtin/math";

/**
 * Returns signed distance from `p` to 2D circular arc with `aperture` (in
 * [0..π] interval), radius `ra` and `thickness`.
 *
 * @remarks
 * Slightly modified version (easier to use aperture control) of original GLSL
 * impl by Inigo Quilez:
 *
 * - https://www.shadertoy.com/view/wl23RK
 * - https://iquilezles.org/articles/distfunctions2d/
 */
export const sdfArc2 = defn(
	"float",
	"sdfArc",
	["vec2", "float", "float", "float"],
	(p, apert, ra, rb) => {
		let q: Vec2Sym;
		let sc: Vec2Sym;
		return [
			(q = sym(vec2(abs($x(p)), $y(p)))),
			(sc = sym(vec2(sin(apert), cos(apert)))),
			ret(
				sub(
					ternary(
						gt(mul($y(sc), $x(q)), mul($x(sc), $y(q))),
						length(madd(sc, neg(ra), q)),
						abs(sub(length(q), ra))
					),
					rb
				)
			),
		];
	}
);
