import { defn, min, ret } from "@thi.ng/shader-ast";

/**
 * @param d1 float
 * @param d2 float
 */
export const sdfUnion = defn(
    "float",
    "sdOpUnion",
    [["float"], ["float"]],
    (d1, d2) => [ret(min(d1, d2))]
);
