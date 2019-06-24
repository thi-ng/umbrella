import {
    $w,
    $x,
    $y,
    $z,
    max,
    Vec2Sym,
    Vec3Sym,
    Vec4Sym
} from "@thi.ng/shader-ast";

export const maxComp2 = (v: Vec2Sym | Vec3Sym | Vec4Sym) => max($x(v), $y(v));

export const maxComp3 = (v: Vec3Sym | Vec4Sym) => max(maxComp2(v), $z(v));

export const maxComp4 = (v: Vec4Sym) => max(maxComp3(v), $w(v));
