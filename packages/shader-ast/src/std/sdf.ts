import {
    FloatSym,
    FloatTerm,
    Sym,
    Vec,
    Vec2Sym,
    Vec3Sym
} from "../api";
import {
    $,
    $x,
    $y,
    add,
    defn,
    div,
    FLOAT0,
    FLOAT05,
    FLOAT1,
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
    mod,
    sign,
    sqrt
} from "../builtins";
import {
    clamp01,
    cross2,
    fit1101,
    maxComp2,
    maxComp3
} from "./math";

// Signed Distance Field primitives and operations based on work by
// Inigo Quilezles (iq).
//
// Reference:
//
// - http://www.iquilezles.org/www/articles/distfunctions2d/distfunctions2d.htm
// - http://www.iquilezles.org/www/articles/distfunctions/distfunctions.htm

//////////////// Internal helpers

/**
 * Shared impl for sdLine2/3
 *
 * @param p
 * @param a
 * @param b
 */
const line = <T extends Vec>(p: Sym<T>, a: Sym<T>, b: Sym<T>) => {
    let pa: Sym<T>, ba: Sym<T>;
    return [
        (pa = sym(sub(p, a))),
        (ba = sym(sub(b, a))),
        ret(length(sub(pa, mul(ba, clamp01(div(dot(pa, ba), dot(ba, ba)))))))
    ];
};

//////////////// 2D primitives

/**
 * Returns signed distance from `p` to centered circle of radius `r`.
 *
 * @param p vec2
 * @param r float
 */
export const sdCircle = defn(
    "float",
    "sdCircle",
    [["vec2"], ["float"]],
    (p, r) => [ret(sub(length(p), r))]
);

/**
 * Returns signed distance from `p` to centered circle of radius `r`.
 *
 * @param p vec2
 * @param r float
 */
export const sdLine2 = defn(
    "float",
    "sdLine2",
    [["vec2"], ["vec2"], ["vec2"]],
    line
);

/**
 * Returns signed distance from `p` to centered AABB of `size`.
 *
 * @param p vec2
 * @param size vec2
 */
export const sdRect = defn(
    "float",
    "sdRect",
    [["vec2"], ["vec2"]],
    (p, size) => {
        let d: Vec2Sym;
        return [
            (d = sym(sub(abs(p), size))),
            ret(add(min(maxComp2(d), FLOAT0), length(max(d, vec2()))))
        ];
    }
);

/**
 * @param p vec2
 * @param a vec2
 * @param b vec2
 * @param c vec2
 */
export const sdTriangle = defn(
    "float",
    "sdTriangle",
    [["vec2"], ["vec2"], ["vec2"], ["vec2"]],
    (p, a, b, c) => {
        let e0: Vec2Sym, e1: Vec2Sym, e2: Vec2Sym;
        let v0: Vec2Sym, v1: Vec2Sym, v2: Vec2Sym;
        let pq0: Vec2Sym, pq1: Vec2Sym, pq2: Vec2Sym;
        let s: FloatSym;
        let d: Vec2Sym;

        const $pq = (v: Vec2Sym, e: Vec2Sym) =>
            sub(v, mul(e, clamp01(div(dot(v, e), dot(e, e)))));

        return [
            (e0 = sym(sub(b, a))),
            (e1 = sym(sub(c, b))),
            (e2 = sym(sub(a, c))),
            (v0 = sym(sub(p, a))),
            (v1 = sym(sub(p, b))),
            (v2 = sym(sub(p, c))),
            (pq0 = sym($pq(v0, e0))),
            (pq1 = sym($pq(v1, e1))),
            (pq2 = sym($pq(v2, e2))),
            (s = sym(sign(cross2(e0, e2)))),
            (d = sym(
                min(
                    min(
                        vec2(dot(pq0, pq0), mul(s, cross2(v0, e0))),
                        vec2(dot(pq1, pq1), mul(s, cross2(v1, e1)))
                    ),
                    vec2(dot(pq2, pq2), mul(s, cross2(v2, e2)))
                )
            )),
            ret(mul(neg(sqrt($x(d))), sign($y(d))))
        ];
    }
);

//////////////// 3D primitives

/**
 * Returns signed distance from `p` to plane.
 *
 * @param p vec3
 * @param n vec3
 * @param w float
 */
export const sdPlane = defn(
    "float",
    "sdPlane",
    [["vec3"], ["vec3"], ["float"]],
    (p, n, w) => [ret(add(dot(p, n), w))]
);

/**
 * Returns signed distance from `p` to centered sphere of radius `r`.
 *
 * @param p vec3
 * @param r float
 */
export const sdSphere = defn(
    "float",
    "sdSphere",
    [["vec3"], ["float"]],
    (p, r) => [ret(sub(length(p), r))]
);

/**
 * Returns signed distance from `p` to centered AABB of `size`.
 *
 * @param p vec3
 * @param size vec3
 */
export const sdAABB = defn(
    "float",
    "sdAABB",
    [["vec3"], ["vec3"]],
    (p, size) => {
        let d: Vec3Sym;
        return [
            (d = sym(sub(abs(p), size))),
            ret(add(min(maxComp3(d), FLOAT0), length(max(d, vec3()))))
        ];
    }
);

/**
 * Returns signed distance from `p` to torus centered around Y-axis with
 * radii `r1`, `r2`.
 *
 * @param p vec3
 * @param r1 float
 * @param r2 float
 */
export const sdTorus = defn(
    "float",
    "sdTorus",
    [["vec3"], ["float"], ["float"]],
    (p, r1, r2) => [
        ret(sub(length(vec2(sub(length($(p, "xz")), r2), $y(p))), r1))
    ]
);

/**
 * Returns signed distance from `p` to cylinder centered around Y-axis
 * with height `h` and radius `r`.
 *
 * @param p vec3
 * @param h float
 * @param r float
 */
export const sdCylinder = defn(
    "float",
    "sdCylinder",
    [["vec3"], ["float"], ["float"]],
    (p, h, r) => {
        let d: Vec2Sym;
        return [
            (d = sym(sub(abs(vec2(length($(p, "xz")), $y(p))), vec2(h, r)))),
            ret(add(min(maxComp2(d), FLOAT0), length(max(d, vec2()))))
        ];
    }
);

/**
 * @param p vec3
 * @param a vec3
 * @param b vec3
 */
export const sdLine3 = defn(
    "float",
    "sdLine3",
    [["vec3"], ["vec3"], ["vec3"]],
    line
);

//////////////// Combinators

/**
 * @param d1 float
 * @param d2 float
 */
export const sdOpSubtract = defn(
    "float",
    "sdOpSubtract",
    [["float"], ["float"]],
    (d1, d2) => [ret(max(neg(d2), d1))]
);

/**
 * @param d1 float
 * @param d2 float
 */
export const sdOpUnion = defn(
    "float",
    "sdOpUnion",
    [["float"], ["float"]],
    (d1, d2) => [ret(min(d1, d2))]
);

/**
 * @param d1 float
 * @param d2 float
 */
export const sdOpIntersect = defn(
    "float",
    "sdOpIntersect",
    [["float"], ["float"]],
    (d1, d2) => [ret(max(d2, d1))]
);

/**
 * @param d1 float
 * @param d2 float
 */
export const sdOpSmoothUnion = defn(
    "float",
    "sdOpSmoothUnion",
    [["float"], ["float"], ["float"]],
    (a, b, k) => {
        let h: FloatSym;
        return [
            (h = sym(clamp01(fit1101(div(sub(b, a), k))))),
            ret(sub(mix(b, a, h), mul(mul(k, h), sub(FLOAT1, h))))
        ];
    }
);

/**
 * @param d1 float
 * @param d2 float
 */
export const sdOpSmoothSubtract = defn(
    "float",
    "sdOpSmoothSubtract",
    [["float"], ["float"], ["float"]],
    (a, b, k) => {
        let h: FloatSym;
        return [
            (h = sym(clamp01(fit1101(div(add(b, a), k))))),
            ret(add(mix(b, neg(a), h), mul(mul(k, h), sub(FLOAT1, h))))
        ];
    }
);

/**
 * @param d1 float
 * @param d2 float
 */
export const sdOpSmoothIntersect = defn(
    "float",
    "sdOpSmoothIntersect",
    [["float"], ["float"], ["float"]],
    (a, b, k) => {
        let h: FloatSym;
        return [
            (h = sym(clamp01(fit1101(div(sub(b, a), k))))),
            ret(add(mix(b, a, h), mul(mul(k, h), sub(FLOAT1, h))))
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
export const sdOpRound = (d: FloatTerm, r: FloatTerm) => sub(d, r);

/**
 * Inline function. Bi-directional offset to create ring like shapes.
 *
 * @param d
 * @param r
 */
export const sdOpAnnular = (d: FloatTerm, r: FloatTerm) => sub(abs(d), r);

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
    (p, c) => [ret(sub(mod(p, c), mul(c, FLOAT05)))]
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
    (p, c) => [ret(sub(mod(p, c), mul(c, FLOAT05)))]
);
