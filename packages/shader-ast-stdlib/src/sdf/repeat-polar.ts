import type { FloatSym } from "@thi.ng/shader-ast";
import { F, V2 } from "@thi.ng/shader-ast/api/types";
import { defn, ret } from "@thi.ng/shader-ast/ast/function";
import { FLOAT05, TAU } from "@thi.ng/shader-ast/ast/lit";
import { add, div, mul, sub } from "@thi.ng/shader-ast/ast/ops";
import { $x, $y } from "@thi.ng/shader-ast/ast/swizzle";
import { sym } from "@thi.ng/shader-ast/ast/sym";
import { atan, length, mod } from "@thi.ng/shader-ast/builtin/math";
import { cossin } from "../math/sincos.js";

/**
 * @remarks
 * Based on HG_SDF (Mercury Demogroup). Does not compute cell index.
 *
 * @param p - point
 * @param n - number of polar repetitions
 */
export const sdfRepeatPolar2 = defn(V2, "sdfRepeatPolar2", [V2, F], (p, n) => {
	let angle: FloatSym;
	let angle2: FloatSym;
	let a: FloatSym;
	return [
		(angle = sym(div(TAU, n))),
		(angle2 = sym(mul(angle, FLOAT05))),
		(a = sym(sub(mod(add(angle2, atan($y(p), $x(p))), angle), angle2))),
		ret(cossin(a, length(p))),
	];
});
