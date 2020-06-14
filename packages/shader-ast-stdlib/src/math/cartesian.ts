import {
    $x,
    $y,
    $z,
    defn,
    FloatSym,
    mul,
    ret,
    sym,
    Vec2Sym,
    Vec2Term,
    vec3,
} from "@thi.ng/shader-ast";
import { cossin } from "./sincos";

/**
 * Converts 2D polar vector `v`, i.e. `[r,θ]` (angle in radians) to
 * cartesian coordinates. See {@link polar2} for reverse operation.
 *
 * @param v -
 */
export const cartesian2 = (v: Vec2Term) => mul(cossin($y(v)), $x(v));

/**
 * Converts 3D polar/spherical vector `v`, i.e. `[r,θ,ϕ]` (angles in
 * radians) to cartesian coordinates. See {@link polar3} for reverse
 * operation.
 *
 * @param v -
 */
export const cartesian3 = defn("vec3", "cartesian3", ["vec3"], (v) => {
    let r: FloatSym;
    let t: Vec2Sym;
    let p: Vec2Sym;
    return [
        (r = sym($x(v))),
        (t = sym(cossin($y(v)))),
        (p = sym(cossin($z(v)))),
        ret(
            vec3(
                mul(mul(r, $x(t)), $x(p)),
                mul(mul(r, $x(t)), $y(p)),
                mul(r, $y(t))
            )
        ),
    ];
});
