import type { Vec3Term } from "@thi.ng/shader-ast";
import { vec3 } from "@thi.ng/shader-ast/ast/lit";
import { dot } from "@thi.ng/shader-ast/builtin/math";

/**
 * Inline function. Computes luminance of given RGB color
 *
 * @param rgb -
 */
export const luminanceRGB = (rgb: Vec3Term) =>
    dot(rgb, vec3(0.299, 0.587, 0.114));
