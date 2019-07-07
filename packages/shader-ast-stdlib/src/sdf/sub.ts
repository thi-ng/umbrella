import { FloatTerm, max, neg } from "@thi.ng/shader-ast";

/**
 * Inline function.  SDF shape subtraction (a - b).
 *
 * @param a float
 * @param b float
 */
export const sdfSubtract = (a: FloatTerm, b: FloatTerm) => max(neg(b), a);
