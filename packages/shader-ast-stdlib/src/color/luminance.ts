import { dot, vec3, Vec3Term } from "@thi.ng/shader-ast";

/**
 * Inline function. Computes luminance of given RGB color
 *
 * @param rgb -
 */
export const luminanceRGB = (rgb: Vec3Term) =>
    dot(rgb, vec3(0.299, 0.587, 0.114));
