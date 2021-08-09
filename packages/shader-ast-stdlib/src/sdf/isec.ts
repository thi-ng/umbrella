import { FloatTerm, max } from "@thi.ng/shader-ast";

/**
 * Inline function. Variadic SDF shape intersection (a & b) for any number of
 * terms (at least 1 required).
 *
 * @param a -
 * @param terms -
 */
export const sdfIntersect = (a: FloatTerm, ...terms: FloatTerm[]) =>
    terms.reduce((a, b) => max(a, b), a);
