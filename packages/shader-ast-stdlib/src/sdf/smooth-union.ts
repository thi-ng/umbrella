import {
    defn,
    div,
    FLOAT1,
    FloatSym,
    mix,
    mul,
    ret,
    sub,
    sym,
} from "@thi.ng/shader-ast";
import { clamp01 } from "../math/clamp";
import { fit1101 } from "../math/fit";

/**
 * @param d1 - float
 * @param d2 - float
 */
export const sdfSmoothUnion = defn(
    "float",
    "sdOpSmoothUnion",
    ["float", "float", "float"],
    (a, b, k) => {
        let h: FloatSym;
        return [
            (h = sym(clamp01(fit1101(div(sub(b, a), k))))),
            ret(sub(mix(b, a, h), mul(mul(k, h), sub(FLOAT1, h)))),
        ];
    }
);
