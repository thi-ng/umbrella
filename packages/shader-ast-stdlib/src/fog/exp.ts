import { defn, ret } from "@thi.ng/shader-ast/ast/function";
import { FLOAT1 } from "@thi.ng/shader-ast/ast/lit";
import { mul, neg, sub } from "@thi.ng/shader-ast/ast/ops";
import { exp } from "@thi.ng/shader-ast/builtin/math";
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
