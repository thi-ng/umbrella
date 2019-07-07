import { FloatTerm, min } from "@thi.ng/shader-ast";

/**
 * Inline function. SDF shape union (a || b).
 *
 * @param a float
 * @param b float
 */
export const sdfUnion = (a: FloatTerm, b: FloatTerm) => min(a, b);
