import type { Sampler2DSym, Vec2Sym, Vec2Term } from "@thi.ng/shader-ast";
import { F, S2D, V2, V3 } from "@thi.ng/shader-ast/api/types";
import { defn, ret } from "@thi.ng/shader-ast/ast/function";
import { vec2, vec3 } from "@thi.ng/shader-ast/ast/lit";
import { add, sub } from "@thi.ng/shader-ast/ast/ops";
import { sym } from "@thi.ng/shader-ast/ast/sym";
import { $x, $y } from "@thi.ng/shader-ast/ast/swizzle";
import { normalize } from "@thi.ng/shader-ast/builtin/math";
import { texture } from "@thi.ng/shader-ast/builtin/texture";

const sample1 = (tex: Sampler2DSym, uv: Vec2Sym, unit: Vec2Term) =>
	sub($x(texture(tex, sub(uv, unit))), $x(texture(tex, add(uv, unit))));

/**
 * Computes the surface normal from a grayscale texture at given `uv` position
 * and using given `step` to define the half-distances between the 4 neighbor
 * lookups (north/south/east/west). The `z` value is used as the normal's Z
 * component (prior to normalization). `eps` is being added to all components to
 * avoid zero-vectors.
 *
 * @remarks
 * The function only uses the X (red) component of the texture.
 *
 * @param tex
 * @param uv
 * @param step
 * @param z
 * @param eps
 */
export const normal2 = defn(
	V3,
	null,
	[S2D, V2, V2, F, F],
	(tex, uv, step, z, eps) => {
		let sx: Vec2Sym;
		let sy: Vec2Sym;
		return [
			(sx = sym(vec2($x(step), 0))),
			(sy = sym(vec2(0, $y(step)))),
			ret(
				normalize(
					add(
						vec3(sample1(tex, uv, sx), sample1(tex, uv, sy), z),
						eps
					)
				)
			),
		];
	}
);
