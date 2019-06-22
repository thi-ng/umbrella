import {
    FloatTerm,
    Op2,
    Prim,
    Term,
    Vec2Sym,
    Vec2Term,
    Vec3Sym,
    Vec3Term,
    Vec4Sym,
    Vec4Term
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
            ? clamp(<FloatTerm>x, FLOAT0, FLOAT1)
            : x.type === "vec2"
            ? clamp(<Vec2Term>x, vec2(), vec2(1))
            : x.type === "vec3"
            ? clamp(<Vec3Term>x, vec3(), vec3(1))
            : clamp(<Vec4Term>x, vec4(), vec4(1)))
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

export const maxComp2 = (v: Vec2Sym) => max($x(v), $y(v));

export const maxComp3 = (v: Vec3Sym) => max(max($x(v), $y(v)), $z(v));

export const maxComp4 = (v: Vec4Sym) =>
    max(max(max($x(v), $y(v)), $z(v)), $w(v));

export const cross2 = (a: Vec2Term, b: Vec2Term) =>
    crossC2($x(a), $y(a), $x(b), $y(b));

export const crossC2 = (
    ax: FloatTerm,
    ay: FloatTerm,
    bx: FloatTerm,
    by: FloatTerm
) => sub(mul(ax, by), mul(ay, bx));
