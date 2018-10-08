import { EPS, sign1 } from "@thi.ng/vectors/math";
import { Vec2 } from "@thi.ng/vectors/vec2";

export const corner = (a: Readonly<Vec2>, b: Readonly<Vec2>, c: Readonly<Vec2>) => {
    const ax = a.x,
        ay = a.y;
    return (b.x - ax) * (c.y - ay) - (c.x - ax) * (b.y - ay);
};

export const classify = (a: Readonly<Vec2>, b: Readonly<Vec2>, c: Readonly<Vec2>, eps = EPS) =>
    sign1(corner(a, b, c), eps);
