import { IObjectOf } from "@thi.ng/api";
import {
    IDENT44,
    invert44,
    mulM44,
    transpose44
} from "@thi.ng/matrices";
import { ReadonlyVec } from "@thi.ng/vectors";
import { GLMat4, ShaderUniforms } from "./api";

const $ = (a: any, b: any, id: string) => a[id] || b[id].defaultVal || IDENT44;

/**
 * Computes the inverse transpose of given 4x4 matrix uniform, i.e.
 * `transpose(invert(m))`.
 *
 * @param model
 */
export const autoNormalMatrix1 = (model = "model") => (
    shaderU: ShaderUniforms,
    specU: IObjectOf<number | ReadonlyVec>
) => <GLMat4>transpose44(null, invert44([], $(specU, shaderU, model)));

/**
 * Computes the inverse transpose of the matrix product of given 4x4
 * matrix uniforms, i.e. `transpose(invert(view * model))`.
 *
 * @param model
 * @param view
 */
export const autoNormalMatrix2 = (model = "model", view = "view") => (
    shaderU: ShaderUniforms,
    specU: IObjectOf<number | ReadonlyVec>
) =>
    <GLMat4>(
        transpose44(
            null,
            invert44(
                null,
                mulM44([], $(specU, shaderU, view), $(specU, shaderU, model))
            )
        )
    );
