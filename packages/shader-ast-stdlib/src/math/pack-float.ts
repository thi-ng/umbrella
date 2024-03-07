import type { Vec4Sym } from "@thi.ng/shader-ast";
import { F, V4 } from "@thi.ng/shader-ast/api/types";
import { defn, ret } from "@thi.ng/shader-ast/ast/function";
import { vec4 } from "@thi.ng/shader-ast/ast/lit";
import { mul, sub } from "@thi.ng/shader-ast/ast/ops";
import { $ } from "@thi.ng/shader-ast/ast/swizzle";
import { sym } from "@thi.ng/shader-ast/ast/sym";
import { dot, fract } from "@thi.ng/shader-ast/builtin/math";

/**
 * Encodes a float value in [0,1) interval to a vec4 suitable for a 8bit/channel
 * render texture. Use {@link unpackFloat} for reverse op.
 *
 * @remarks
 * Reference:
 * https://aras-p.info/blog/2009/07/30/encoding-floats-to-rgba-the-final/
 */
export const packFloat = defn(V4, null, [F], (x) => {
	let res: Vec4Sym;
	return [
		(res = sym(fract(mul(vec4(1, 255, 65025, 16581375), x)))),
		ret(sub(res, mul($(res, "yzww"), vec4(1 / 255, 1 / 255, 1 / 255, 0)))),
	];
});

/**
 * Reverse op of {@link packFloat}.
 *
 * @remarks
 * Also see {@link packedNormal2} for related functionality.
 *
 * Reference:
 * https://aras-p.info/blog/2009/07/30/encoding-floats-to-rgba-the-final/
 */
export const unpackFloat = defn(F, null, [V4], (v) => [
	ret(dot(v, vec4(1, 1 / 255, 1 / 65025, 1 / 16581375))),
]);
