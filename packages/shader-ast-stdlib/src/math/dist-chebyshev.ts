import {
    $,
    $x,
    $y,
    $z,
    abs,
    max,
    sub,
    Vec2Term,
    Vec3Term,
    Vec4Term,
} from "@thi.ng/shader-ast";

export const distChebyshev2 = (
    a: Vec2Term | Vec3Term | Vec4Term,
    b: Vec2Term | Vec3Term | Vec4Term
) => max(abs(sub($x(a), $x(b))), abs(sub($y(a), $y(b))));

export const distChebyshev3 = (
    a: Vec3Term | Vec4Term,
    b: Vec3Term | Vec4Term
) => max(distChebyshev2(a, b), abs(sub($z(a), $z(b))));

export const distChebyshev4 = (a: Vec4Term, b: Vec4Term) =>
    max(distChebyshev2(a, b), distChebyshev2($(a, "zw"), $(b, "zw")));
