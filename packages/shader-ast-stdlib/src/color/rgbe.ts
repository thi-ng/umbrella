import { V3 } from "@thi.ng/shader-ast/api/types";
import { ternary } from "@thi.ng/shader-ast/ast/controlflow";
import { defn, ret } from "@thi.ng/shader-ast/ast/function";
import { INT0, VEC3_0, float, vec3 } from "@thi.ng/shader-ast/ast/lit";
import { gt, mul, sub } from "@thi.ng/shader-ast/ast/ops";
import { $w, $xyz } from "@thi.ng/shader-ast/ast/swizzle";
import { exp2 } from "@thi.ng/shader-ast/builtin/math";

/**
 * RGBE (Radiance HDR) to linear float RGB conversion. The input vec is supposed
 * to contain unsigned byte values, with the last component being the exponent.
 *
 * @remarks
 * Reference: https://en.wikipedia.org/wiki/RGBE_image_format
 *
 * Code based on:
 * https://github.com/box/hdrCompressor/blob/master/src/rgbe/rgbe.c
 *
 */
export const decodeRGBE = defn(V3, "decodeRGBE", ["ivec4"], (col) => {
	return [
		ret(
			ternary(
				gt($w(col), INT0),
				mul(vec3($xyz(col)), exp2(float(sub($w(col), 136)))),
				VEC3_0
			)
		),
	];
});
