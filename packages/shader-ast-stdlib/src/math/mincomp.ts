import {
    $w,
    $x,
    $y,
    $z,
    min,
    Vec2Sym,
    Vec3Sym,
    Vec4Sym,
} from "@thi.ng/shader-ast";

/**
 * Inline function. Returns min(v.x, v.y)
 *
 * @param v -
 */
export const minComp2 = (v: Vec2Sym | Vec3Sym | Vec4Sym) => min($x(v), $y(v));

/**
 * Inline function. Returns min(v.x, v.y, v.z)
 *
 * @param v -
 */
export const minComp3 = (v: Vec3Sym | Vec4Sym) => min(minComp2(v), $z(v));

/**
 * Inline function. Returns min(v.x, v.y, v.z, v.w)
 *
 * @param v -
 */
export const minComp4 = (v: Vec4Sym) => min(minComp3(v), $w(v));
