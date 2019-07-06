import {
    $x,
    $y,
    defn,
    mat2,
    mat3,
    mat4,
    neg,
    ret,
    sym,
    Vec2Term
} from "@thi.ng/shader-ast";
import { perpendicularCCW } from "../math/orthogonal";
import { cossin } from "../math/sincos";

export const rotation2 = defn("mat2", "rotation2", [["float"]], (theta) => {
    let cs: Vec2Term;
    return [(cs = sym(cossin(theta))), ret(mat2(cs, perpendicularCCW(cs)))];
});

export const rotationX3 = defn("mat3", "rotationX3", [["float"]], (theta) => {
    let cs: Vec2Term;
    return [
        (cs = sym(cossin(theta))),
        ret(mat3(1, 0, 0, 0, $x(cs), $y(cs), 0, neg($y(cs)), $x(cs)))
    ];
});

export const rotationY3 = defn("mat3", "rotationY3", [["float"]], (theta) => {
    let cs: Vec2Term;
    return [
        (cs = sym(cossin(theta))),
        ret(mat3($x(cs), 0, neg($y(cs)), 0, 1, 0, $y(cs), 0, $x(cs)))
    ];
});

export const rotationZ3 = defn("mat3", "rotationZ3", [["float"]], (theta) => {
    let cs: Vec2Term;
    return [
        (cs = sym(cossin(theta))),
        ret(mat3($x(cs), $y(cs), 0, neg($y(cs)), $x(cs), 0, 0, 0, 1))
    ];
});

export const rotationX4 = defn("mat3", "rotationX4", [["float"]], (theta) => {
    let cs: Vec2Term;
    return [
        (cs = sym(cossin(theta))),
        ret(
            mat4(
                1,
                0,
                0,
                0,
                0,
                $x(cs),
                $y(cs),
                0,
                0,
                neg($y(cs)),
                $x(cs),
                0,
                0,
                0,
                0,
                1
            )
        )
    ];
});

export const rotationY4 = defn("mat3", "rotationY4", [["float"]], (theta) => {
    let cs: Vec2Term;
    return [
        (cs = sym(cossin(theta))),
        ret(
            mat4(
                $x(cs),
                0,
                neg($y(cs)),
                0,
                0,
                1,
                0,
                0,
                $y(cs),
                0,
                $x(cs),
                0,
                0,
                0,
                0,
                1
            )
        )
    ];
});

export const rotationZ4 = defn("mat4", "rotationZ4", [["float"]], (theta) => {
    let cs: Vec2Term;
    return [
        (cs = sym(cossin(theta))),
        ret(
            mat4(
                $x(cs),
                $y(cs),
                0,
                0,
                neg($y(cs)),
                $x(cs),
                0,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                0,
                1
            )
        )
    ];
});
