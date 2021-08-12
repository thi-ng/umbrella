import {
    $x,
    $y,
    add,
    atan,
    defn,
    div,
    FLOAT05,
    FloatSym,
    length,
    mod,
    mul,
    ret,
    sub,
    sym,
    TAU,
} from "@thi.ng/shader-ast";
import { cossin } from "../math/sincos";

/**
 * @remarks
 * Based on HG_SDF (Mercury Demogroup). Does not compute cell index.
 *
 * @param p - point
 * @param n - number of polar repetitions
 */
export const sdfRepeatPolar2 = defn(
    "vec2",
    "sdfRepeatPolar2",
    ["vec2", "float"],
    (p, n) => {
        let angle: FloatSym;
        let angle2: FloatSym;
        let a: FloatSym;
        return [
            (angle = sym(div(TAU, n))),
            (angle2 = sym(mul(angle, FLOAT05))),
            (a = sym(sub(mod(add(angle2, atan($y(p), $x(p))), angle), angle2))),
            ret(mul(cossin(a), length(p))),
        ];
    }
);
