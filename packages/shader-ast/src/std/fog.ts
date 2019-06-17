import {
    assign,
    defn,
    div,
    F32_1,
    float,
    mul,
    neg,
    ret,
    sub
} from "../ast";
import { exp, exp2 } from "../builtins";
import { clamp01 } from "./clamp";

/**
 * @param dist f32
 * @param start f32
 * @param end f32
 *
 */
export const fogLinear = defn(
    "f32",
    "fogLinear",
    [["f32"], ["f32"], ["f32"]],
    (dist, start, end) => [
        ret(sub(F32_1, clamp01(div(sub(end, dist), sub(end, start)))))
    ]
);

/**
 * @param dist f32
 * @param density f32
 */
export const fogExp = defn(
    "f32",
    "fogExp",
    [["f32"], ["f32"]],
    (dist, density) => [ret(sub(F32_1, clamp01(exp(mul(neg(density), dist)))))]
);

/**
 * @param dist f32
 * @param density f32
 */
export const fogExp2 = defn(
    "f32",
    "fogExp2",
    [["f32"], ["f32"]],
    (dist, density) => [
        assign(density, mul(density, dist)),
        ret(
            sub(
                F32_1,
                clamp01(exp2(mul(mul(density, density), float(1 / Math.LOG2E))))
            )
        )
    ]
);
