import { $x, defn, FloatTerm, lt, min, ret, ternary } from "@thi.ng/shader-ast";

/**
 * Inline function. SDF shape union (a || b).
 *
 * @param a - float
 * @param b - float
 */
export const sdfUnion = (a: FloatTerm, b: FloatTerm) => min(a, b);

/**
 * SDF shape union for vec2 terms, i.e. the common form where the X coord
 * defines distance and Y an object or material ID.
 *
 * @param a -
 * @param b -
 */
export const sdfUnion2 = defn("vec2", "sdfUnion2", ["vec2", "vec2"], (a, b) => [
    ret(ternary(lt($x(a), $x(b)), a, b)),
]);
