import type { FloatTerm, Term, Type } from "@thi.ng/shader-ast";
import { ternary } from "@thi.ng/shader-ast/ast/controlflow";
import { float } from "@thi.ng/shader-ast/ast/lit";
import { lt } from "@thi.ng/shader-ast/ast/ops";

/**
 * Utility function to create an n-ary conditional based on given float value
 * `x` in [0,1] range and any number of branch terms (at least 1). Returns a
 * nested ternary expression.
 *
 * @remarks
 * This function is useful for A/B testing of multiple versions of a shader,
 * e.g. the popular technique of using columns based on the `gl_FragCoord.x` and
 * dynamically computed column thresholds (defined by the number of given branch
 * terms).
 *
 * @example
 * ```ts tangle:../../export/branches.ts
 * import { float, sym, vec3 } from "@thi.ng/shader-ast";
 * import { branches } from "@thi.ng/shader-ast-stdlib";
 * import { targetGLSL } from "@thi.ng/shader-ast-glsl";
 *
 * // dummy "position" symbol (would be gl_FragCoord.x or similar)
 * const pos = sym(float(0.11));
 *
 * // serialize expression to GLSL for better legibility
 * console.log(
 *   targetGLSL()(
 *     branches(
 *       pos,
 *       // branch terms/options...
 *       // branch thresholds are automatically computed
 *       // making it trivial to add/remove terms
 *       vec3(1,0,0),
 *       vec3(1,1,0),
 *       vec3(0,1,0),
 *       vec3(0,0,1),
 *     )
 *   )
 * );
 *
 * // re-formatted result:
 * // ((_sf5 < 0.25)
 * //   ? vec3(1.0, 0.0, 0.0)
 * //   : ((_sf5 < 0.5)
 * //   ? vec3(1.0, 1.0, 0.0)
 * //   : ((_sf5 < 0.75)
 * //   ? vec3(0.0, 1.0, 0.0)
 * //   : vec3(0.0, 0.0, 1.0))))
 * ```
 *
 * @param x
 * @param a
 * @param terms
 */
export const branches = <T extends Type>(
	x: FloatTerm,
	a: Term<T>,
	...terms: Term<T>[]
) => {
	const n = terms.length + 1;
	if (n < 2) return a;
	const delta = 1 / n;
	terms = [a, ...terms];
	return terms.reduceRight((acc, t, i) =>
		ternary(lt(x, float((i + 1) * delta)), t, acc)
	);
};
