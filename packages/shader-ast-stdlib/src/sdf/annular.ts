import type { FloatTerm } from "@thi.ng/shader-ast";
import { sub } from "@thi.ng/shader-ast/ast/ops";
import { abs } from "@thi.ng/shader-ast/builtin/math";

/**
 * Inline function. Bi-directional offset to create ring like shapes.
 *
 * @param d -
 * @param r -
 */
export const sdfAnnular = (d: FloatTerm, r: FloatTerm) => sub(abs(d), r);
