import {
    defn,
    div,
    FLOAT1,
    FloatSym,
    FloatTerm,
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
 * @param k - float
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

/**
 * Variadic compiletime macro for {@link sdfSmoothUnion}. Takes smooth factor
 * `k`, followed by any number (at least 1 required) of SDF terms.
 *
 * @param k
 * @param terms
 */
export const sdfSmoothUnionAll = (k: FloatTerm, ...terms: FloatTerm[]) =>
    terms.reduce((acc, x) => sdfSmoothUnion(acc, x, k));
