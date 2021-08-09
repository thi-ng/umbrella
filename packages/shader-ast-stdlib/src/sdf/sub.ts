import { FloatTerm, max, neg } from "@thi.ng/shader-ast";

/**
 * Inline function. Variadic SDF shape subtraction (a - b) for any number of
 * terms (at least 1 required).
 *
 * @param a -
 * @param terms -
 */
export const sdfSubtract = (a: FloatTerm, ...terms: FloatTerm[]) =>
    terms.reduce((a, b) => max(a, neg(b)), a);
