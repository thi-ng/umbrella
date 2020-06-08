import { defn, FLOAT05, mod, mul, ret, sub } from "@thi.ng/shader-ast";

/**
 * Domain repetition by wrapping position `p` into period `c`.
 *
 * @param p - vec2
 * @param c - vec2
 */
export const sdfRepeat2 = defn(
    "vec2",
    "sdTxRepeat3",
    ["vec2", "vec2"],
    (p, c) => [ret(sub(mod(p, c), mul(c, FLOAT05)))]
);

/**
 * Domain repetition by wrapping position `p` into period `c`.
 *
 * @param p - vec3
 * @param c - vec3
 */
export const sdfRepeat3 = defn(
    "vec3",
    "sdTxRepeat3",
    ["vec3", "vec3"],
    (p, c) => [ret(sub(mod(p, c), mul(c, FLOAT05)))]
);
