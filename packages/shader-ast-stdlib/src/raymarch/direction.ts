import type { Vec2Sym } from "@thi.ng/shader-ast";
import { F, V2, V3 } from "@thi.ng/shader-ast/api/types";
import { defn, ret } from "@thi.ng/shader-ast/ast/function";
import { FLOAT2, vec3 } from "@thi.ng/shader-ast/ast/lit";
import { div, neg, sub } from "@thi.ng/shader-ast/ast/ops";
import { $y } from "@thi.ng/shader-ast/ast/swizzle";
import { sym } from "@thi.ng/shader-ast/ast/sym";
import { normalize, radians, tan } from "@thi.ng/shader-ast/builtin/math";

/**
 * @param fragCoord - vec2
 * @param res - vec2
 * @param fov - float vertical FOV (in degrees)
 */
export const raymarchDir = defn(
	V3,
	"raymarchDir",
	[V2, V2, F],
	(frag, res, fov) => {
		let uv: Vec2Sym;
		return [
			(uv = sym(sub(frag, div(res, FLOAT2)))),
			ret(
				normalize(
					vec3(uv, neg(div($y(res), tan(div(radians(fov), FLOAT2)))))
				)
			),
		];
	}
);
