import {
    Op2,
    Prim,
    Sym,
    Term
} from "../api";
import {
    $w,
    $x,
    $y,
    $z,
    add,
    FLOAT0,
    FLOAT05,
    FLOAT1,
    FLOAT2,
    mul,
    sub,
    vec2,
    vec3,
    vec4
} from "../ast";
import { clamp, max } from "../builtins";

/**
 * Inline function, expands to equivalent of `clamp(x, 0, 1)`.
 *
 * @param x
 */
export const clamp01 = <T extends Prim>(x: Term<T>): Term<T> =>
    <Term<any>>(
        (x.type === "float"
            ? clamp(<Term<"float">>x, FLOAT0, FLOAT1)
            : x.type === "vec2"
            ? clamp(<Term<"vec2">>x, vec2(), vec2(1))
            : x.type === "vec3"
            ? clamp(<Term<"vec3">>x, vec3(), vec3(1))
            : clamp(<Term<"vec4">>x, vec4(), vec4(1)))
    );

/**
 * Fits value `a` in [0..1] interval to new interval [b..c]. No clamping
 * performed.
 *
 * @param a
 * @param b
 * @param c
 */
export const fit01 = <A extends Prim, B extends A, C extends A>(
    a: Term<A>,
    b: Term<B>,
    c: Term<C>
): Op2<A> => <any>add(<any>b, mul(sub(<any>b, c), a));

/**
 * Inline function. Fits value `x` in [-1..+1] interval to [0..1]
 * interval. No clamping performed.
 *
 * @param x
 */
export const fit1101 = <T extends Prim>(x: Term<T>): Op2<T> =>
    <any>add(mul(<any>x, FLOAT05), FLOAT05);

/**
 * Inline function. Fits value `x` in [0..1] interval to [-1..+1]
 * interval. No clamping performed.
 *
 * @param x
 */
export const fit0111 = <T extends Prim>(x: Term<T>): Op2<T> =>
    <any>sub(mul(<any>x, FLOAT2), FLOAT1);

export const maxComp2 = (v: Sym<"vec2">) => max($x(v), $y(v));

export const maxComp3 = (v: Sym<"vec3">) => max(max($x(v), $y(v)), $z(v));

export const maxComp4 = (v: Sym<"vec4">) =>
    max(max(max($x(v), $y(v)), $z(v)), $w(v));

export const cross2 = (a: Term<"vec2">, b: Term<"vec2">) =>
    crossC2($x(a), $y(a), $x(b), $y(b));

export const crossC2 = (
    ax: Term<"float">,
    ay: Term<"float">,
    bx: Term<"float">,
    by: Term<"float">
) => sub(mul(ax, by), mul(ay, bx));
