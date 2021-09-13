import type { FloatTerm } from "@thi.ng/shader-ast";
import { max } from "@thi.ng/shader-ast/builtin/math";

/**
 * Inline function. Variadic SDF shape intersection (a & b) for any number of
 * terms (at least 1 required).
 *
 * @param a -
 * @param terms -
 */
export const sdfIntersect = (a: FloatTerm, ...terms: FloatTerm[]) =>
    terms.reduce((a, b) => max(a, b), a);
