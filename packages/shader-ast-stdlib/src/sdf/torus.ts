import { $, $y, defn, length, ret, sub, vec2 } from "@thi.ng/shader-ast";

/**
 * Returns signed distance from `p` to torus centered around Y-axis with
 * radii `r1`, `r2`.
 *
 * @param p - vec3
 * @param r1 - float
 * @param r2 - float
 */
export const sdfTorus = defn(
    "float",
    "sdTorus",
    ["vec3", "float", "float"],
    (p, r1, r2) => [
        ret(sub(length(vec2(sub(length($(p, "xz")), r2), $y(p))), r1)),
    ]
);
