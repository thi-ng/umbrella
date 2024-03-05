import type { FloatTerm } from "@thi.ng/shader-ast";
import { vec2 } from "@thi.ng/shader-ast/ast/lit";
import { mul } from "@thi.ng/shader-ast/ast/ops";
import { cos, sin } from "@thi.ng/shader-ast/builtin/math";

/**
 * Inline function. Returns vec2(sin(x), cos(x)), optionally scaled by `r`
 *
 * @param x -
 * @param r -
 */
export const sincos = (x: FloatTerm, r?: FloatTerm | number) => {
	const res = vec2(sin(x), cos(x));
	return r != undefined ? mul(res, r) : res;
};

/**
 * Inline function. Returns vec2(cos(x), sin(x)), optionally scaled by `r`.
 *
 * @param x -
 * @param r -
 */
export const cossin = (x: FloatTerm, r?: FloatTerm | number) => {
	const res = vec2(cos(x), sin(x));
	return r != undefined ? mul(res, r) : res;
};
