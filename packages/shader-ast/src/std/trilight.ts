import { Sym } from "../api";
import {
    add,
    defn,
    F32_0,
    F32_1,
    mul,
    neg,
    ret,
    sub,
    sym
} from "../ast";
import { abs, dot, max } from "../builtins";

/**
 * Tom Forsyth's Trilight lighting model.
 *
 * https://tomforsyth1000.github.io/papers/trilight/trilight.html
 *
 * @param surfNormal vec3
 * @param lightDir vec3
 * @param col1 vec3
 * @param col2 vec3
 * @param col3 vec3
 */
export const trilight = defn(
    "vec3",
    "trilight",
    [["vec3"], ["vec3"], ["vec3"], ["vec3"], ["vec3"]],
    (n, l, c1, c2, c3) => {
        let d: Sym<"f32">;
        return [
            (d = sym(dot(n, l))),
            ret(
                add(
                    add(mul(c1, max(d, F32_0)), mul(c2, sub(F32_1, abs(d)))),
                    mul(c3, max(dot(neg(n), l), F32_0))
                )
            )
        ];
    }
);
