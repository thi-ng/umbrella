import {
    add,
    defn,
    div,
    FLOAT1,
    FloatSym,
    mix,
    mul,
    neg,
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
export const sdfSmoothSubtract = defn(
    "float",
    "sdOpSmoothSubtract",
    ["float", "float", "float"],
    (a, b, k) => {
        let h: FloatSym;
        return [
            (h = sym(clamp01(fit1101(div(add(b, a), k))))),
            ret(add(mix(b, neg(a), h), mul(mul(k, h), sub(FLOAT1, h)))),
        ];
    }
);
