import {
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
    vec3,
    Vec3Sym,
} from "@thi.ng/shader-ast";
import { maxComp2, maxComp3 } from "../math/maxcomp";

/**
 * Returns signed distance from `p` to centered AABB of `size`.
 *
 * @param p - vec2
 * @param size - vec2
 */
export const sdfBox2 = defn("float", "sdRect", ["vec2", "vec2"], (p, size) => {
    let d: Vec2Sym;
    return [
        (d = sym(sub(abs(p), size))),
        ret(add(min(maxComp2(d), FLOAT0), length(max(d, vec2())))),
    ];
});

/**
 * Returns signed distance from `p` to centered AABB of `size`.
 *
 * @param p - vec3
 * @param size - vec3
 */
export const sdfBox3 = defn("float", "sdAABB", ["vec3", "vec3"], (p, size) => {
    let d: Vec3Sym;
    return [
        (d = sym(sub(abs(p), size))),
        ret(add(min(maxComp3(d), FLOAT0), length(max(d, vec3())))),
    ];
});
