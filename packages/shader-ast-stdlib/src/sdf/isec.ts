import { FloatTerm, max } from "@thi.ng/shader-ast";

/**
 * Inline function. SDF shape intersection (a & b).
 *
 * @param a - float
 * @param b - float
 */
export const sdfIntersect = (a: FloatTerm, b: FloatTerm) => max(b, a);
