import { Sym } from "../api";
import {
    $,
    add,
    defn,
    div,
    F32_0,
    F32_1,
    mul,
    neg,
    ret,
    sub,
    sym,
    vec2,
    vec3
} from "../ast";
import {
    abs,
    dot,
    length,
    max,
    min,
    mix
} from "../builtins";
import { clamp01 } from "./clamp";
import { fit1101 } from "./fit";

/**
 * Returns signed distance from `p` to plane.
 *
 * @param p vec3
 * @param n vec3
 * @param w f32
 */
export const sdPlane = defn(
    "f32",
    "sdPlane",
    [["vec3"], ["vec3"], ["f32"]],
    (p, n, w) => [ret(add(dot(p, n), w))]
);

/**
 * Returns signed distance from `p` to centered sphere of radius `r`.
 *
 * @param p vec3
 * @param r f32
 */
export const sdSphere = defn("f32", "sdSphere", [["vec3"], ["f32"]], (p, r) => [
    ret(sub(length(p), r))
]);

/**
 * Returns signed distance from `p` to centered AABB of `size`.
 *
 * @param p vec3
 * @param size vec3
 */
export const sdAABB = defn("f32", "sdAABB", [["vec3"], ["vec3"]], (p, size) => {
    let d: Sym<"vec3">;
    return [
        (d = sym(sub(abs(p), size))),
        ret(
            add(
                min(max($(d, "x"), max($(d, "y"), $(d, "z"))), F32_0),
                length(max(d, vec3()))
            )
        )
    ];
});

/**
 * Returns signed distance from `p` to torus centered around Y-axis with
 * radii `r1`, `r2`.
 *
 * @param p vec3
 * @param r1 f32
 * @param r2 f32
 */
export const sdTorus = defn(
    "f32",
    "sdTorus",
    [["vec3"], ["f32"], ["f32"]],
    (p, r1, r2) => [
        ret(sub(length(vec2(sub(length($(p, "xz")), r2), $(p, "y"))), r1))
    ]
);

/**
 * Returns signed distance from `p` to cylinder centered around Y-axis
 * with height `h` and radius `r`.
 *
 * @param p vec3
 * @param h f32
 * @param r f32
 */
export const sdCylinder = defn(
    "f32",
    "sdCylinder",
    [["vec3"], ["f32"], ["f32"]],
    (p, h, r) => {
        let d: Sym<"vec2">;
        return [
            (d = sym(
                sub(abs(vec2(length($(p, "xz")), $(p, "y"))), vec2(h, r))
            )),
            ret(
                add(
                    min(max($(d, "x"), $(d, "y")), F32_0),
                    length(max(d, vec2()))
                )
            )
        ];
    }
);

/**
 * @param p vec3
 * @param a vec3
 * @param b vec3
 * @param r f32
 */
export const sdCapsule = defn(
    "f32",
    "sdCapsule",
    [["vec3"], ["vec3"], ["vec3"], ["f32"]],
    (p, a, b, r) => {
        let pa: Sym<"vec3">, ba: Sym<"vec3">, h: Sym<"f32">;
        return [
            (pa = sym(sub(p, a))),
            (ba = sym(sub(b, a))),
            (h = sym(clamp01(div(dot(pa, ba), dot(ba, ba))))),
            ret(sub(length(mul(sub(pa, ba), h)), r))
        ];
    }
);

/**
 * @param d1 f32
 * @param d2 f32
 */
export const sdSubtract = defn(
    "f32",
    "sdSubtract",
    [["f32"], ["f32"]],
    (d1, d2) => [ret(max(neg(d2), d1))]
);

/**
 * @param d1 f32
 * @param d2 f32
 */
export const sdUnion = defn("f32", "sdUnion", [["f32"], ["f32"]], (d1, d2) => [
    ret(min(d1, d2))
]);

/**
 * @param d1 f32
 * @param d2 f32
 */
export const sdBlend = defn(
    "f32",
    "sdBlend",
    [["f32"], ["f32"], ["f32"]],
    (a, b, f) => {
        let h: Sym<"f32">;
        return [
            (h = sym(clamp01(fit1101(div(sub(b, a), f))))),
            ret(sub(mix(b, a, h), mul(mul(f, h), sub(F32_1, h))))
        ];
    }
);
