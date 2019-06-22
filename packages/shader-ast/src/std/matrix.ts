import { Mat4Term, Vec3Sym, Vec3Term } from "../api";
import {
    $,
    defn,
    FLOAT1,
    mat4,
    mul,
    neg,
    ret,
    sub,
    sym,
    vec4
} from "../ast";
import { cross, dot, normalize } from "../builtins";

/**
 * Creates a mat4 view matrix from given `eyePos`, `target` and `up`
 * vector.
 *
 * @param eye vec3
 * @param target vec3
 * @param up vec3
 */
export const lookat = defn(
    "mat4",
    "lookat",
    [["vec3"], ["vec3"], ["vec3"]],
    (eye, target, up) => {
        let x: Vec3Sym;
        let y: Vec3Sym;
        let z: Vec3Sym;
        return [
            (z = sym(normalize(sub(eye, target)))),
            (x = sym(normalize(cross(up, z)))),
            (y = sym(normalize(cross(z, x)))),
            ret(
                mat4(
                    vec4(x, neg(dot(eye, x))),
                    vec4(up, neg(dot(eye, y))),
                    vec4(z, neg(dot(eye, z))),
                    vec4(0, 0, 0, 1)
                )
            )
        ];
    }
);

/**
 * Inline function. Multiplies `pos` with given model, view & projection
 * matrices (in order). `p` is extended to a vec4.
 *
 * @param p
 * @param model
 * @param view
 * @param proj
 */
export const transformMVP = (
    p: Vec3Term,
    model: Mat4Term,
    view: Mat4Term,
    proj: Mat4Term
) => mul(mul(proj, mul(view, model)), vec4(p, FLOAT1));

/**
 * Inline function. Multiplies `normal` with given 4x4 normal matrix
 * (e.g. transpose inverse of view * model).
 *
 * @param n
 * @param normalMat
 */
export const surfaceNormal = (n: Vec3Term, normalMat: Mat4Term) =>
    normalize($(mul(normalMat, vec4(n, 0)), "xyz"));
