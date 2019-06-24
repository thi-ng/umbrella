import {
    $x,
    $y,
    FloatTerm,
    mul,
    sub,
    Vec2Term
} from "@thi.ng/shader-ast";

export const cross2 = (a: Vec2Term, b: Vec2Term) =>
    crossC2($x(a), $y(a), $x(b), $y(b));

export const crossC2 = (
    ax: FloatTerm,
    ay: FloatTerm,
    bx: FloatTerm,
    by: FloatTerm
) => sub(mul(ax, by), mul(ay, bx));
