import { abs, FloatTerm, sub } from "@thi.ng/shader-ast";

/**
 * Inline function. Bi-directional offset to create ring like shapes.
 *
 * @param d
 * @param r
 */
export const sdfAnnular = (d: FloatTerm, r: FloatTerm) => sub(abs(d), r);
