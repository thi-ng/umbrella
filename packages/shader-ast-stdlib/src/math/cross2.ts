import type { FloatTerm, Vec2Term } from "@thi.ng/shader-ast";
import { mul, sub } from "@thi.ng/shader-ast/ast/ops";
import { $x, $y } from "@thi.ng/shader-ast/ast/swizzle";

/**
 * Inline function. Computes 2D "cross product" of given vectors. See
 * {@link crossC2}.
 *
 * @param a -
 * @param b -
 */
export const cross2 = (a: Vec2Term, b: Vec2Term) =>
    crossC2($x(a), $y(a), $x(b), $y(b));

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
