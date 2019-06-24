import {
    defn,
    exp,
    FLOAT1,
    mul,
    neg,
    ret,
    sub
} from "@thi.ng/shader-ast";
import { clamp01 } from "../math/clamp";

/**
 * @param dist float
 * @param density float
 */
export const fogExp = defn(
    "float",
    "fogExp",
    [["float"], ["float"]],
    (dist, density) => [ret(sub(FLOAT1, clamp01(exp(mul(neg(density), dist)))))]
);
