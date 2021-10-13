import type { IObjectOf } from "@thi.ng/api";
import { isNumber } from "@thi.ng/checks/is-number";
import { IDENT44 } from "@thi.ng/matrices/constants";
import { mulM44 } from "@thi.ng/matrices/mulm";
import { normal44 } from "@thi.ng/matrices/normal-mat";
import { ortho } from "@thi.ng/matrices/ortho";
import type { ReadonlyVec } from "@thi.ng/vectors";
import type { GLMat4 } from "./api/glsl.js";
import type { ShaderUniforms } from "./api/shader.js";

const $ = (a: any, b: any, id: string) => a[id] || b[id].defaultVal || IDENT44;

/**
 * Computes the inverse transpose of given 4x4 matrix uniform, i.e.
 * `transpose(invert(m))`.
 *
 * @param model -
 */
export const autoNormalMatrix1 =
    (model = "model") =>
    (shaderU: ShaderUniforms, specU: IObjectOf<number | ReadonlyVec>) =>
        <GLMat4>normal44([], $(specU, shaderU, model));

/**
 * Computes the inverse transpose of the matrix product of given 4x4
 * matrix uniforms, i.e. `transpose(invert(view * model))`.
 *
 * @param model -
 * @param view -
 */
export const autoNormalMatrix2 =
    (model = "model", view = "view") =>
    (shaderU: ShaderUniforms, specU: IObjectOf<number | ReadonlyVec>) =>
        <GLMat4>(
            normal44(
                null,
                mulM44([], $(specU, shaderU, view), $(specU, shaderU, model))
            )
        );

/**
 * Constructs a orthographic projection matrix for using 2D screen
 * coords, with origin in the top-left corner of the viewport. If a
 * WebGL context is given, the its `drawingBufferWidth` &
 * `drawingBufferHeight` values are used.
 *
 * @param width -
 * @param height -
 */
export function screen2d(width: number, height: number): GLMat4;
export function screen2d(gl: WebGLRenderingContext): GLMat4;
export function screen2d(a: WebGLRenderingContext | number, b?: number) {
    return isNumber(a)
        ? ortho([], 0, a, b!, 0, -1, 1)
        : ortho([], 0, a.drawingBufferWidth, a.drawingBufferHeight, 0, -1, 1);
}
