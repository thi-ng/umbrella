import type { FloatSym } from "@thi.ng/shader-ast";
import { F } from "@thi.ng/shader-ast/api/types";
import { ternary } from "@thi.ng/shader-ast/ast/controlflow";
import { defn, ret } from "@thi.ng/shader-ast/ast/function";
import { FLOAT0, FLOAT1, FLOAT2 } from "@thi.ng/shader-ast/ast/lit";
import { div, lt, mul, sub } from "@thi.ng/shader-ast/ast/ops";
import { sym } from "@thi.ng/shader-ast/ast/sym";
import {
	abs,
	ceil,
	floor,
	mix,
	mod,
	step,
} from "@thi.ng/shader-ast/builtin/math";

/**
 * GLSL 100 trunc() polyfill.
 */
export const trunc = defn(F, null, [F], (x) => [
	ret(ternary(lt(x, FLOAT0), ceil(x), floor(x))),
]);

/**
 * Returns `x - y * trunc(x / y)`, i.e. essentially the same as JS `%` operator.
 * Result will always have the sign of `x`.
 */
export const modulo = defn(F, null, [F, F], (x, y) => [
	ret(sub(x, mul(y, trunc(div(x, y))))),
]);

/**
 * Same as thi.ng/math foldback01(). Folds `x` into the closed [0..1] interval,
 * using infinite internal reflection on either side of the interval.
 *
 * @param x
 */
export const foldback01 = defn(F, null, [F], (x) => {
	let y: FloatSym;
	return [
		(y = sym(mod(abs(x), FLOAT2))),
		ret(mix(y, sub(FLOAT2, y), step(FLOAT1, y))),
	];
});
