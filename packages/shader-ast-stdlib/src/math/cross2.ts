import type { FloatTerm } from "@thi.ng/shader-ast";
import { F, V2 } from "@thi.ng/shader-ast/api/types";
import { defn, ret } from "@thi.ng/shader-ast/ast/function";
import { mul, sub } from "@thi.ng/shader-ast/ast/ops";
import { $x, $y } from "@thi.ng/shader-ast/ast/swizzle";

/**
 * Computes 2D "cross product" of given vectors. Also see
 * {@link crossC2}.
 *
 * @param a -
 * @param b -
 */
export const cross2 = defn(F, "cross2", [V2, V2], (a, b) => [
	ret(sub(mul($x(a), $y(b)), mul($y(a), $x(b)))),
]);

/**
 * Inline function. Computes 2D cross product of given individual
 * components: ax * by - ay * bx
 *
 * @param ax -
 * @param ay -
 * @param bx -
 * @param by -
 */
export const crossC2 = (
	ax: FloatTerm,
	ay: FloatTerm,
	bx: FloatTerm,
	by: FloatTerm
) => sub(mul(ax, by), mul(ay, bx));
