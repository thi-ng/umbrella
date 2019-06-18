import { Sym, Term } from "../api";
import {
    $,
    add,
    defn,
    div,
    F32_0,
    F32_1,
    float,
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
    mix,
    mod
} from "../builtins";
import { clamp01 } from "./clamp";
import { fit1101 } from "./fit";

// Signed Distance Field primitives and operations based on work by
// Inigo Quilezles (iq).
//
// Reference:
//
// - http://www.iquilezles.org/www/articles/distfunctions2d/distfunctions2d.htm
// - http://www.iquilezles.org/www/articles/distfunctions/distfunctions.htm

//////////////// 2D primitives

/**
 * Returns signed distance from `p` to centered circle of radius `r`.
 *
 * @param p vec3
 * @param r f32
 */
export const sdCircle = defn("f32", "sdCircle", [["vec2"], ["f32"]], (p, r) => [
    ret(sub(length(p), r))
]);

/**
 * Returns signed distance from `p` to centered circle of radius `r`.
 *
 * @param p vec3
 * @param r f32
 */
export const sdLine2 = defn("f32", "sdLine2", [["vec2"], ["f32"]], (p, r) => [
    ret(sub(length(p), r))
]);

/**
 * Returns signed distance from `p` to centered AABB of `size`.
 *
 * @param p vec3
 * @param size vec3
 */
export const sdRect = defn("f32", "sdRect", [["vec2"], ["vec2"]], (p, size) => {
    let d: Sym<"vec2">;
    return [
        (d = sym(sub(abs(p), size))),
        ret(add(min(max($(d, "x"), $(d, "y")), F32_0), length(max(d, vec2()))))
    ];
});

//////////////// 3D primitives

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
 */
export const sdLine3 = defn(
    "f32",
    "sdLine3",
    [["vec3"], ["vec3"], ["vec3"]],
    (p, a, b) => {
        let pa: Sym<"vec3">, ba: Sym<"vec3">, h: Sym<"f32">;
        return [
            (pa = sym(sub(p, a))),
            (ba = sym(sub(b, a))),
            (h = sym(clamp01(div(dot(pa, ba), dot(ba, ba))))),
            ret(length(mul(sub(pa, ba), h)))
        ];
    }
);

//////////////// Combinators

/**
 * @param d1 f32
 * @param d2 f32
 */
export const sdOpSubtract = defn(
    "f32",
    "sdOpSubtract",
    [["f32"], ["f32"]],
    (d1, d2) => [ret(max(neg(d2), d1))]
);

/**
 * @param d1 f32
 * @param d2 f32
 */
export const sdOpUnion = defn(
    "f32",
    "sdOpUnion",
    [["f32"], ["f32"]],
    (d1, d2) => [ret(min(d1, d2))]
);

/**
 * @param d1 f32
 * @param d2 f32
 */
export const sdOpIntersect = defn(
    "f32",
    "sdOpIntersect",
    [["f32"], ["f32"]],
    (d1, d2) => [ret(max(d2, d1))]
);

/**
 * @param d1 f32
 * @param d2 f32
 */
export const sdOpSmoothUnion = defn(
    "f32",
    "sdOpSmoothUnion",
    [["f32"], ["f32"], ["f32"]],
    (a, b, k) => {
        let h: Sym<"f32">;
        return [
            (h = sym(clamp01(fit1101(div(sub(b, a), k))))),
            ret(sub(mix(b, a, h), mul(mul(k, h), sub(F32_1, h))))
        ];
    }
);

/**
 * @param d1 f32
 * @param d2 f32
 */
export const sdOpSmoothSubtract = defn(
    "f32",
    "sdOpSmoothSubtract",
    [["f32"], ["f32"], ["f32"]],
    (a, b, k) => {
        let h: Sym<"f32">;
        return [
            (h = sym(clamp01(fit1101(div(add(b, a), k))))),
            ret(add(mix(b, neg(a), h), mul(mul(k, h), sub(F32_1, h))))
        ];
    }
);

/**
 * @param d1 f32
 * @param d2 f32
 */
export const sdOpSmoothIntersect = defn(
    "f32",
    "sdOpSmoothIntersect",
    [["f32"], ["f32"], ["f32"]],
    (a, b, k) => {
        let h: Sym<"f32">;
        return [
            (h = sym(clamp01(fit1101(div(sub(b, a), k))))),
            ret(add(mix(b, a, h), mul(mul(k, h), sub(F32_1, h))))
        ];
    }
);

/**
 * Inline function. Essentially an isoline offset to create:
 *
 * - `r > 0`: rounded/thicker shapes
 * - `r < 0`: sharper/thinner shapes
 *
 * @param d
 * @param r
 */
export const sdOpRound = (d: Term<"f32">, r: Term<"f32">) => sub(d, r);

/**
 * Inline function. Bi-directional offset to create ring like shapes.
 *
 * @param d
 * @param r
 */
export const sdOpAnnular = (d: Term<"f32">, r: Term<"f32">) => sub(abs(d), r);

//////////////// Transformations

/**
 * Domain repetition by wrapping position `p` into period `c`.
 *
 * @param p vec2
 * @param c vec2
 */
export const sdTxRepeat2 = defn(
    "vec2",
    "sdTxRepeat3",
    [["vec2"], ["vec2"]],
    (p, c) => [ret(sub(mod(p, c), mul(c, float(0.5))))]
);

/**
 * Domain repetition by wrapping position `p` into period `c`.
 *
 * @param p vec3
 * @param c vec3
 */
export const sdTxRepeat3 = defn(
    "vec3",
    "sdTxRepeat3",
    [["vec3"], ["vec3"]],
    (p, c) => [ret(sub(mod(p, c), mul(c, float(0.5))))]
);
