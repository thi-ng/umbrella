import type { FloatSym, Vec2Sym } from "@thi.ng/shader-ast";
import { F, V2, V4 } from "@thi.ng/shader-ast/api/types";
import { ternary } from "@thi.ng/shader-ast/ast/controlflow";
import { defn, ret } from "@thi.ng/shader-ast/ast/function";
import { FLOAT0, VEC2_0 } from "@thi.ng/shader-ast/ast/lit";
import { add, gt, sub } from "@thi.ng/shader-ast/ast/ops";
import { $, $x, $xy, $y } from "@thi.ng/shader-ast/ast/swizzle";
import { sym } from "@thi.ng/shader-ast/ast/sym";
import { abs, length, max, min } from "@thi.ng/shader-ast/builtin/math";
import { maxComp2 } from "../math/maxcomp.js";

/**
 * Returns signed distance from `p` to centered 2D rect of `size` and corner
 * radii defined by given vec4 `r`.
 *
 * @remarks
 * Ported from original GLSL impl by Inigo Quilez:
 * - https://iquilezles.org/articles/distfunctions2d/
 *
 * @param p - vec2
 * @param size - vec2
 * @param r - vec4
 */
export const sdfBoxRounded = defn(
	F,
	"sdfBoxRounded",
	[V2, V2, V4],
	(p, size, r) => {
		let q: Vec2Sym, t: Vec2Sym, d: FloatSym;
		return [
			(t = sym(ternary(gt($x(p), FLOAT0), $xy(r), $(r, "zw")))),
			(d = sym(ternary(gt($y(p), FLOAT0), $x(t), $y(t)))),
			(q = sym(add(sub(abs(p), size), d))),
			ret(sub(add(min(maxComp2(q), FLOAT0), length(max(q, VEC2_0))), d)),
		];
	}
);
