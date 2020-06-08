import { add, defn, dot, ret } from "@thi.ng/shader-ast";

/**
 * Returns signed distance from `p` to plane defined by `normal` and `w`.
 *
 * @param p - vec2
 * @param normal - vec2
 * @param w - float
 */
export const sdfPlane2 = defn(
    "float",
    "sdPlane",
    ["vec2", "vec2", "float"],
    (p, n, w) => [ret(add(dot(p, n), w))]
);

/**
 * Returns signed distance from `p` to plane defined by `normal` and `w`.
 *
 * @param p - vec3
 * @param normal - vec3
 * @param w - float
 */
export const sdfPlane3 = defn(
    "float",
    "sdPlane",
    ["vec3", "vec3", "float"],
    (p, n, w) => [ret(add(dot(p, n), w))]
);
