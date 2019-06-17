import { Prim, Term } from "../api";
import {
    F32_0,
    F32_1,
    vec2,
    vec3,
    vec4
} from "../ast";
import { clamp } from "../builtins";

export const clamp01 = <T extends Prim>(x: Term<T>): Term<T> =>
    <Term<any>>(
        (x.type === "f32"
            ? clamp(<Term<"f32">>x, F32_0, F32_1)
            : x.type === "vec2"
            ? clamp(<Term<"vec2">>x, vec2(), vec2(1))
            : x.type === "vec3"
            ? clamp(<Term<"vec3">>x, vec3(), vec3(1))
            : clamp(<Term<"vec4">>x, vec4(), vec4(1)))
    );
