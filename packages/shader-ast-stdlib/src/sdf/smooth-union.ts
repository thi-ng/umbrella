import type { FloatSym, FloatTerm } from "@thi.ng/shader-ast";
import { defn, ret } from "@thi.ng/shader-ast/ast/function";
import { FLOAT1 } from "@thi.ng/shader-ast/ast/lit";
import { div, mul, sub } from "@thi.ng/shader-ast/ast/ops";
import { sym } from "@thi.ng/shader-ast/ast/sym";
import { mix } from "@thi.ng/shader-ast/builtin/math";
import { clamp01 } from "../math/clamp.js";
import { fit1101 } from "../math/fit.js";

/**
 * @param d1 - float
 * @param d2 - float
 * @param k - float
 */
export const sdfSmoothUnion = defn(
	"float",
	"sdOpSmoothUnion",
	["float", "float", "float"],
	(a, b, k) => {
		let h: FloatSym;
		return [
			(h = sym(clamp01(fit1101(div(sub(b, a), k))))),
			ret(sub(mix(b, a, h), mul(mul(k, h), sub(FLOAT1, h)))),
		];
	}
);

/**
 * Variadic compiletime macro for {@link sdfSmoothUnion}. Takes smooth factor
 * `k`, followed by any number (at least 1 required) of SDF terms.
 *
 * @param k -
 * @param terms -
 */
export const sdfSmoothUnionAll = (k: FloatTerm, ...terms: FloatTerm[]) =>
	terms.reduce((acc, x) => sdfSmoothUnion(acc, x, k));
