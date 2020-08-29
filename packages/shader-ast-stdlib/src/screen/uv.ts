import {
    $x,
    $xy,
    $y,
    add,
    assign,
    bvec4,
    defn,
    div,
    greaterThan,
    lessThan,
    mul,
    ret,
    sym,
    vec2,
    Vec2Sym,
    Vec2Term,
    Vec4Term,
    _any,
} from "@thi.ng/shader-ast";
import { fit0111 } from "../math/fit";

/**
 * Computes UV coord in [0..1] interval from given `fragCoord` and screen `res`.
 *
 * @param fragCoord -
 * @param res -
 */
export const fragUV = (fragCoord: Vec4Term, res: Vec2Term) =>
    div($xy(fragCoord), res);

/**
 * Takes `pos`, a screen coord (e.g. gl_FragCoord) and viewport resolution
 * `res`, returns aspect corrected uv, with uv.y in [-1..1] interval and uv.x
 * scaled by the aspect ratio `resx / resy`.
 *
 * @param fragCoord - vec2
 * @param res - vec2
 */
export const aspectCorrectedUV = defn(
    "vec2",
    "aspectCorrectedUV",
    ["vec2", "vec2"],
    (pos, res) => {
        let uv: Vec2Sym;
        return [
            (uv = sym(fit0111(div(pos, res)))),
            assign($x(uv), mul($x(uv), div($x(res), $y(res)))),
            ret(uv),
        ];
    }
);

/**
 * Returns true if at least one coordinate of the given point is within the
 * `width` internal border region of UV rect ([0,0] .. [1,1]).
 *
 * ```c
 * borderMask(vec2(0.91, 0.5), 0.1) // true
 * borderMask(vec2(0.2, 0.01), 0.1) // true
 * borderMask(vec2(0.2, 0.2), 0.1) // false
 * ```
 */
export const borderMask = defn(
    "bool",
    "borderMask",
    ["vec2", "float"],
    (uv, width) => [
        ret(
            _any(
                bvec4(
                    lessThan(uv, vec2(width)),
                    greaterThan(add(uv, width), vec2(1))
                )
            )
        ),
    ]
);
