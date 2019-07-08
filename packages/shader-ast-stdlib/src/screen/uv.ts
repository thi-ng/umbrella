import {
    $x,
    $y,
    assign,
    defn,
    div,
    mul,
    ret,
    sym,
    Vec2Sym
} from "@thi.ng/shader-ast";
import { fit0111 } from "../math/fit";

/**
 * Takes `pos`, a screen coord (e.g. gl_FragCoord) and viewport
 * resolution `res`, returns aspect corrected uv, with uv.y in [-1..1]
 * interval.
 *
 * @param fragCoord vec2
 * @param res vec2
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
            ret(uv)
        ];
    }
);
