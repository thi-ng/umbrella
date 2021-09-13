import type { FloatTerm } from "@thi.ng/shader-ast";
import { sub } from "@thi.ng/shader-ast/ast/ops";

/**
 * Inline function. Essentially an isoline offset to create:
 *
 * - `r > 0`: rounded/thicker shapes
 * - `r < 0`: sharper/thinner shapes
 *
 * @param d -
 * @param r -
 */
export const sdfRound = (d: FloatTerm, r: FloatTerm) => sub(d, r);
