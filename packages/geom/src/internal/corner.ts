import { sign } from "@thi.ng/math/abs";
import { EPS } from "@thi.ng/math/api";
import { Vec2 } from "@thi.ng/vectors/vec2";

export const corner =
    (a: Readonly<Vec2>, b: Readonly<Vec2>, c: Readonly<Vec2>) => {
        const ax = a.x;
        const ay = a.y;
        return (b.x - ax) * (c.y - ay) - (c.x - ax) * (b.y - ay);
    };

export const classify =
    (a: Readonly<Vec2>, b: Readonly<Vec2>, c: Readonly<Vec2>, eps = EPS) =>
        sign(corner(a, b, c), eps);

export const clockwise2 =
    (a: Readonly<Vec2>, b: Readonly<Vec2>, c: Readonly<Vec2>) =>
        corner(a, b, c) < 0;

export const classifyPointInTriangle2 =
    (p: Readonly<Vec2>, a: Readonly<Vec2>, b: Readonly<Vec2>, c: Readonly<Vec2>) => {
        const s = clockwise2(a, b, c) ? 1 : -1;
        return sign(
            Math.min(
                s * corner(a, c, p),
                s * corner(b, a, p),
                s * corner(c, b, p)
            )
        );
    };

export const pointInTriangle2 =
    (p: Readonly<Vec2>, a: Readonly<Vec2>, b: Readonly<Vec2>, c: Readonly<Vec2>) => {
        const s = clockwise2(a, b, c) ? 1 : -1;
        return s * corner(a, c, p) >= 0 &&
            s * corner(b, a, p) >= 0 &&
            s * corner(c, b, p) >= 0;
    };
