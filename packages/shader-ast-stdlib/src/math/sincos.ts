import type { FloatTerm } from "@thi.ng/shader-ast";
import { vec2 } from "@thi.ng/shader-ast/ast/lit";
import { cos, sin } from "@thi.ng/shader-ast/builtin/math";

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
