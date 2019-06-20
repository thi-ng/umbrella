import {
    assign,
    defn,
    div,
    FLOAT1,
    float,
    mul,
    neg,
    ret,
    sub
} from "../ast";
import { exp, exp2 } from "../builtins";
import { clamp01 } from "./math";

/**
 * @param dist float
 * @param start float
 * @param end float
 *
 */
export const fogLinear = defn(
    "float",
    "fogLinear",
    [["float"], ["float"], ["float"]],
    (dist, start, end) => [
        ret(sub(FLOAT1, clamp01(div(sub(end, dist), sub(end, start)))))
    ]
);

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

/**
 * @param dist float
 * @param density float
 */
export const fogExp2 = defn(
    "float",
    "fogExp2",
    [["float"], ["float"]],
    (dist, density) => [
        assign(density, mul(density, dist)),
        ret(
            sub(
                FLOAT1,
                clamp01(exp2(mul(mul(density, density), float(-Math.LOG2E))))
            )
        )
    ]
);
