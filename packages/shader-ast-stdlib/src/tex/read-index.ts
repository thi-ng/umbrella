import type { IntTerm, IVec2Term, Sampler2DTerm } from "@thi.ng/shader-ast";
import { $x, $xy, $xyz } from "@thi.ng/shader-ast/ast/swizzle";
import { texture } from "@thi.ng/shader-ast/builtin/texture";
import { indexToUV } from "./index-uv.js";

/**
 * Inline function. Returns x component at index `i` in `tex`.
 *
 * @param tex -
 * @param i -
 * @param size -
 */
export const readIndex1 = (tex: Sampler2DTerm, i: IntTerm, size: IVec2Term) =>
    $x(readIndex4(tex, i, size));

/**
 * Inline function. Returns vec2 (x,y components) at index `i` in `tex`.
 *
 * @param tex -
 * @param i -
 * @param size -
 */
export const readIndex2 = (tex: Sampler2DTerm, i: IntTerm, size: IVec2Term) =>
    $xy(readIndex4(tex, i, size));

/**
 * Inline function. Returns vec3 (x,y,z components) at index `i` in `tex`.
 *
 * @param tex -
 * @param i -
 * @param size -
 */
export const readIndex3 = (tex: Sampler2DTerm, i: IntTerm, size: IVec2Term) =>
    $xyz(readIndex4(tex, i, size));

/**
 * Inline function. Returns vec4 at index `i` in `tex`.
 *
 * @param tex -
 * @param i -
 * @param size -
 */
export const readIndex4 = (tex: Sampler2DTerm, i: IntTerm, size: IVec2Term) =>
    texture(tex, indexToUV(i, size));
