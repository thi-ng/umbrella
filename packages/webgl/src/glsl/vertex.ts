import { defglsl } from "./assemble";

/**
 * Multiplies `pos` with model, view & projection matrices (in order).
 *
 * @param pos
 * @param model
 * @param view
 * @param proj
 */
export const mvp = defglsl(
    `vec4 mvp(vec3 pos, mat4 model, mat4 view, mat4 proj) {
    return proj * view * model * vec4(pos, 1.0);
}`
);

/**
 * Multiplies `normal` with given 4x4 normal matrix (e.g. transpose
 * inverse of view * model).
 *
 * @param normal
 * @param normalMat
 */
export const surfaceNormal = defglsl(
    `vec3 surfaceNormal(vec3 normal, mat4 normalMat) {
    return normalize((normalMat * vec4(normal, 0.0)).xyz);
}`
);
