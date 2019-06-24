import {
    clamp,
    FLOAT0,
    FLOAT1,
    FloatTerm,
    Prim,
    Term,
    vec2,
    Vec2Term,
    vec3,
    Vec3Term,
    vec4,
    Vec4Term
} from "@thi.ng/shader-ast";

/**
 * Inline function, expands to equivalent of `clamp(x, 0, 1)`.
 *
 * @param x
 */
export const clamp01 = <T extends Prim>(x: Term<T>): Term<T> =>
    <Term<any>>(
        (x.type === "float"
            ? clamp(<FloatTerm>x, FLOAT0, FLOAT1)
            : x.type === "vec2"
            ? clamp(<Vec2Term>x, vec2(), vec2(1))
            : x.type === "vec3"
            ? clamp(<Vec3Term>x, vec3(), vec3(1))
            : clamp(<Vec4Term>x, vec4(), vec4(1)))
    );
