import type { Mat4Term, Vec3Term } from "@thi.ng/shader-ast";
import { vec4 } from "@thi.ng/shader-ast/ast/lit";
import { mul } from "@thi.ng/shader-ast/ast/ops";
import { $xyz } from "@thi.ng/shader-ast/ast/swizzle";
import { normalize } from "@thi.ng/shader-ast/builtin/math";

/**
 * Inline function. Multiplies `normal` with given 4x4 normal matrix
 * (e.g. transpose inverse of view * model).
 *
 * @param n -
 * @param normalMat -
 */
export const surfaceNormal = (n: Vec3Term, normalMat: Mat4Term) =>
    normalize($xyz(mul(normalMat, vec4(n, 0))));
