import type { FloatTerm } from "@thi.ng/shader-ast";
import { neg } from "@thi.ng/shader-ast/ast/ops";
import { max } from "@thi.ng/shader-ast/builtin/math";

/**
 * Inline function. Variadic SDF shape subtraction (a - b) for any number of
 * terms (at least 1 required).
 *
 * @param a -
 * @param terms -
 */
export const sdfSubtract = (a: FloatTerm, ...terms: FloatTerm[]) =>
    terms.reduce((a, b) => max(a, neg(b)), a);
