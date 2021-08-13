import {
    add,
    defn,
    div,
    FLOAT1,
    FloatSym,
    FloatTerm,
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
 * @param k - float
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

/**
 * Variadic compiletime macro for {@link sdfSmoothSubtract}. Takes smooth factor
 * `k`, followed by any number (at least 1 required) of SDF terms.
 *
 * @param k
 * @param terms
 */
export const sdfSmoothSubtractAll = (k: FloatTerm, ...terms: FloatTerm[]) =>
    terms.reduce((acc, x) => sdfSmoothSubtract(acc, x, k));
