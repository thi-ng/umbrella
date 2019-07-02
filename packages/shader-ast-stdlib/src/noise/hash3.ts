import {
    defn,
    dot,
    fract,
    mul,
    ret,
    sin,
    vec2,
    vec3
} from "@thi.ng/shader-ast";

/**
 * IQ's hash3 PRNG.
 */
export const hash3 = defn("vec3", "hash3", [["vec2"]], (p) => [
    ret(
        fract(
            mul(
                sin(
                    vec3(
                        dot(p, vec2(127.1, 311.7)),
                        dot(p, vec2(269.5, 183.3)),
                        dot(p, vec2(419.2, 371.9))
                    )
                ),
                43758.5453
            )
        )
    )
]);
