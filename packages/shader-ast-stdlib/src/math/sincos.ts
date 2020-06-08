import { cos, FloatTerm, sin, vec2 } from "@thi.ng/shader-ast";

/**
 * Inline function. Returns vec2(sin(x), cos(x)).
 *
 * @param x -
 */
export const sincos = (x: FloatTerm) => vec2(sin(x), cos(x));

/**
 * Inline function. Returns vec2(cos(x), sin(x)).
 *
 * @param x -
 */
export const cossin = (x: FloatTerm) => vec2(cos(x), sin(x));
