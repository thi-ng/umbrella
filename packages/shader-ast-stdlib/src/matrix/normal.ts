import {
    $xyz,
    Mat4Term,
    mul,
    normalize,
    Vec3Term,
    vec4,
} from "@thi.ng/shader-ast";

/**
 * Inline function. Multiplies `normal` with given 4x4 normal matrix
 * (e.g. transpose inverse of view * model).
 *
 * @param n -
 * @param normalMat -
 */
export const surfaceNormal = (n: Vec3Term, normalMat: Mat4Term) =>
    normalize($xyz(mul(normalMat, vec4(n, 0))));
