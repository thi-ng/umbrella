import {
    $,
    $y,
    abs,
    add,
    defn,
    FLOAT0,
    length,
    max,
    min,
    ret,
    sub,
    sym,
    vec2,
    Vec2Sym,
} from "@thi.ng/shader-ast";
import { maxComp2 } from "../math/maxcomp";

/**
 * Returns signed distance from `p` to cylinder centered around Y-axis
 * with height `h` and radius `r`.
 *
 * @param p - vec3
 * @param h - float
 * @param r - float
 */
export const sdfCylinder = defn(
    "float",
    "sdCylinder",
    ["vec3", "float", "float"],
    (p, h, r) => {
        let d: Vec2Sym;
        return [
            (d = sym(sub(abs(vec2(length($(p, "xz")), $y(p))), vec2(h, r)))),
            ret(add(min(maxComp2(d), FLOAT0), length(max(d, vec2())))),
        ];
    }
);
