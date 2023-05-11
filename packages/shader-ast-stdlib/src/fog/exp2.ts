import { F } from "@thi.ng/shader-ast/api/types";
import { assign } from "@thi.ng/shader-ast/ast/assign";
import { defn, ret } from "@thi.ng/shader-ast/ast/function";
import { FLOAT1 } from "@thi.ng/shader-ast/ast/lit";
import { mul, sub } from "@thi.ng/shader-ast/ast/ops";
import { exp2 } from "@thi.ng/shader-ast/builtin/math";
import { clamp01 } from "../math/clamp.js";

/**
 * Similar to {@link fogExp}. Computes exponential fog factor [0..1], based on
 * given fully saturated fog distance and density. Uses
 * [`exp2()`](https://docs.thi.ng/umbrella/shader-ast/functions/exp2.html)
 * internally.
 *
 * @param dist - float
 * @param density - float
 */
export const fogExp2 = defn(F, "fogExp2", [F, F], (dist, density) => [
	assign(density, mul(density, dist)),
	ret(sub(FLOAT1, clamp01(exp2(mul(mul(density, density), -Math.LOG2E))))),
]);
