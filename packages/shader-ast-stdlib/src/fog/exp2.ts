import { assign, defn, exp2, FLOAT1, mul, ret, sub } from "@thi.ng/shader-ast";
import { clamp01 } from "../math/clamp";

/**
 * Similar to {@link fogExp}. Computes exponential fog factor [0..1],
 * based on given fully saturated fog distance and density. Uses
 * {@link @thi.ng/shader-ast#exp2} internally.
 *
 * @param dist - float
 * @param density - float
 */
export const fogExp2 = defn(
    "float",
    "fogExp2",
    ["float", "float"],
    (dist, density) => [
        assign(density, mul(density, dist)),
        ret(
            sub(FLOAT1, clamp01(exp2(mul(mul(density, density), -Math.LOG2E))))
        ),
    ]
);
