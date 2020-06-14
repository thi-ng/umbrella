import {
    $x,
    $y,
    $z,
    abs,
    defn,
    gt,
    neg,
    ret,
    ternary,
    vec2,
    Vec2Term,
    vec3,
} from "@thi.ng/shader-ast";

/**
 * Inline function. Returns counter-clockwise perpendicular vector
 * (assuming Y-up). [-y, x]
 *
 * @param v -
 */
export const perpendicularCCW = (v: Vec2Term) => vec2(neg($y(v)), $x(v));

/**
 * Inline function. Returns clockwise perpendicular vector (assuming
 * Y-up). [y,-x]
 *
 * @param v -
 */
export const perpendicularCW = (v: Vec2Term) => vec2($y(v), neg($x(v)));

/**
 * Returns an orthogonal vector to `v`.
 *
 * {@link http://lolengine.net/blog/2013/09/21/picking-orthogonal-vector-combing-coconuts}
 */
export const orthogonal3 = defn("vec3", "orthogonal3", ["vec3"], (v) => [
    ret(
        ternary(
            gt(abs($x(v)), abs($z(v))),
            vec3(neg($y(v)), $x(v), 0),
            vec3(0, neg($z(v)), $y(v))
        )
    ),
]);
