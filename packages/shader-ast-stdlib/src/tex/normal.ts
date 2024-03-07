import type {
	Sampler2DSym,
	TaggedFn1,
	Vec2Sym,
	Vec2Term,
} from "@thi.ng/shader-ast";
import { F, S2D, V2, V3 } from "@thi.ng/shader-ast/api/types";
import { defn, ret } from "@thi.ng/shader-ast/ast/function";
import { vec2, vec3 } from "@thi.ng/shader-ast/ast/lit";
import { add, sub } from "@thi.ng/shader-ast/ast/ops";
import { $x, $y } from "@thi.ng/shader-ast/ast/swizzle";
import { sym } from "@thi.ng/shader-ast/ast/sym";
import { normalize } from "@thi.ng/shader-ast/builtin/math";
import { texture } from "@thi.ng/shader-ast/builtin/texture";
import { unpackFloat } from "../math/pack-float.js";

/** @internal */
const __defNormal2 = (decode: TaggedFn1<"vec4", "float">) =>
	defn(V3, null, [S2D, V2, V2, F, F], (tex, uv, step, z, eps) => {
		let sx: Vec2Sym;
		let sy: Vec2Sym;

		const sample1 = (tex: Sampler2DSym, uv: Vec2Sym, unit: Vec2Term) =>
			sub(
				decode(texture(tex, sub(uv, unit))),
				decode(texture(tex, add(uv, unit)))
			);

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
	});

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
export const normal2 = __defNormal2(<any>$x);

/**
 * Principally the same as {@link normal2}, but using a RGBA 8bit/channel
 * texture storing float values encoded using {@link packFloat}. WHen
 * `packedNormal2()` then samples this textures, each value will be
 * automatically decoded using {@link unpackFloat}.
 *
 * @param tex
 * @param uv
 * @param step
 * @param z
 * @param eps
 */
export const packedNormal2 = __defNormal2(unpackFloat);
