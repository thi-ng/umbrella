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
    vec3
} from "@thi.ng/shader-ast";

/**
 * Returns an orthogonal vector to `v`.
 *
 * http://lolengine.net/blog/2013/09/21/picking-orthogonal-vector-combing-coconuts
 */
export const orthogonal = defn("vec3", "orthogonal", [["vec3"]], (v) => [
    ret(
        ternary(
            gt(abs($x(v)), abs($z(v))),
            vec3(neg($y(v)), $x(v), 0),
            vec3(0, neg($z(v)), $y(v))
        )
    )
]);
