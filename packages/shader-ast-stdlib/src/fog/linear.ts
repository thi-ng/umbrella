import { defn, ret } from "@thi.ng/shader-ast/ast/function";
import { clamp01 } from "../math/clamp";
import { fitNorm1 } from "../math/fit";

/**
 * Computes linear fog factor [0..1], based on given fog min/max
 * distances.
 *
 * @param dist - float
 * @param start - float
 * @param end - float
 *
 */
export const fogLinear = defn(
    "float",
    "fogLinear",
    ["float", "float", "float"],
    (dist, start, end) => [ret(clamp01(fitNorm1(dist, start, end)))]
);
