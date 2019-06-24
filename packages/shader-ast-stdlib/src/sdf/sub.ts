import {
    defn,
    max,
    neg,
    ret
} from "@thi.ng/shader-ast";

/**
 * @param d1 float
 * @param d2 float
 */
export const sdfSubtract = defn(
    "float",
    "sdOpSubtract",
    [["float"], ["float"]],
    (d1, d2) => [ret(max(neg(d2), d1))]
);
