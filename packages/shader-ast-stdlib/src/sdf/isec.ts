import { defn, max, ret } from "@thi.ng/shader-ast";

/**
 * @param d1 float
 * @param d2 float
 */
export const sdfIntersect = defn(
    "float",
    "sdOpIntersect",
    [["float"], ["float"]],
    (d1, d2) => [ret(max(d2, d1))]
);
