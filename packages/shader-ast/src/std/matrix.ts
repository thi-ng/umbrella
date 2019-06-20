import { Sym } from "../api";
import {
    defn,
    mat4,
    neg,
    ret,
    sub,
    sym,
    vec4
} from "../ast";
import { cross, dot, normalize } from "../builtins";

export const lookat = defn(
    "mat4",
    "lookat",
    [["vec3"], ["vec3"], ["vec3"]],
    (eye, target, up) => {
        let x: Sym<"vec3">;
        let y: Sym<"vec3">;
        let z: Sym<"vec3">;
        return [
            (z = sym(normalize(sub(eye, target)))),
            (x = sym(normalize(cross(up, z)))),
            (y = sym(normalize(cross(z, x)))),
            ret(
                mat4(
                    vec4(x, neg(dot(eye, x))),
                    vec4(up, neg(dot(eye, y))),
                    vec4(z, neg(dot(eye, z))),
                    vec4(0, 0, 0, 1)
                )
            )
        ];
    }
);
