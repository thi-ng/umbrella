import type { FloatSym, Vec4Sym } from "@thi.ng/shader-ast";
import { S3D, V3, V4 } from "@thi.ng/shader-ast/api/types";
import { forLoop } from "@thi.ng/shader-ast/ast/controlflow";
import { defn, ret } from "@thi.ng/shader-ast/ast/function";
import { FLOAT05, UINT0, uint, vec4 } from "@thi.ng/shader-ast/ast/lit";
import {
	addSelf,
	div,
	inc,
	lt,
	mul,
	mulSelf,
} from "@thi.ng/shader-ast/ast/ops";
import { sym } from "@thi.ng/shader-ast/ast/sym";
import { texture } from "@thi.ng/shader-ast/builtin/texture";

/**
 * Higher order function to compute 3D texture-based FBM noise for given number
 * of octaves and decay factor (default: 1/octaves). Returns a 2-arg shader
 * function, taking a sampler3D and vec3 position and which returns summed noise
 * value as vec4.
 *
 * @remarks
 * Not compatible with WebGL 1.0 (texture type not natively supported).
 *
 * The texture should be configured to use linear filtering and texture repeat
 * mode.
 *
 * Using thi.ng/webgl (for example), the 3D noise texture can be initialized as
 * follows:
 *
 * @example
 * ```ts
 * import { repeatedly } from "@thi.ng/transducers";
 * import {
 *   defTexture,
 *   TextureFilter, TextureFormat, TextureRepeat, TextureTarget
 * } from "@thi.ng/webgl";
 *
 * // (GL context creation omitted here)
 *
 * const noiseTex = defTexture(gl, {
 *   width: 32,
 *   height: 32,
 *   depth: 32,
 *   target: TextureTarget.TEXTURE_3D,
 *   format: TextureFormat.RGB,
 *   filter: TextureFilter.LINEAR,
 *   wrap: TextureRepeat.REPEAT,
 *   image: new Uint8Array(
 *     repeatedly(() => Math.random() * 255.5, 32 * 32 * 32 * 3)
 *   )
 * });
 * ```
 *
 * @param octaves
 * @param decay
 */
export const fbmNoiseVec34 = (octaves: number, decay = 1 / octaves) =>
	defn(V4, null, [S3D, V3], (tex, p) => {
		let res: Vec4Sym;
		let amp: FloatSym;
		return [
			(res = sym(vec4())),
			(amp = sym(FLOAT05)),
			forLoop(
				sym(UINT0),
				(i) => lt(i, uint(octaves)),
				inc,
				() => [
					addSelf(res, mul(texture(tex, div(p, amp)), amp)),
					mulSelf(amp, decay),
				]
			),
			ret(res),
		];
	});
