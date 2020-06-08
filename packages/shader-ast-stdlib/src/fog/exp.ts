import { defn, exp, FLOAT1, mul, neg, ret, sub } from "@thi.ng/shader-ast";
import { clamp01 } from "../math/clamp";

/**
 * Computes exponential fog factor [0..1], based on given fully
 * saturated fog distance and density.
 *
 * @param dist - float
 * @param density - float
 */
export const fogExp = defn(
    "float",
    "fogExp",
    ["float", "float"],
    (dist, density) => [ret(sub(FLOAT1, clamp01(exp(mul(neg(density), dist)))))]
);
