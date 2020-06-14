import {
    $x,
    $xy,
    $y,
    assign,
    defn,
    div,
    mul,
    ret,
    sym,
    Vec2Sym,
    Vec2Term,
    Vec4Term,
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
 * Takes `pos`, a screen coord (e.g. gl_FragCoord) and viewport
 * resolution `res`, returns aspect corrected uv, with uv.y in [-1..1]
 * interval.
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
            (uv = sym("vec2", fit0111(div(pos, res)))),
            assign($x(uv), mul($x(uv), div($x(res), $y(res)))),
            ret(uv),
        ];
    }
);
