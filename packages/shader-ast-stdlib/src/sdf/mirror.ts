import {
    add,
    defn,
    div,
    FLOAT05,
    floor,
    mod,
    mul,
    ret,
    sub,
    sym,
    Vec2Sym,
    VEC2_1,
    VEC2_2,
} from "@thi.ng/shader-ast";

/**
 * @remarks
 * Based on HG_SDF (Mercury Demogroup). Does not compute cell index.
 *
 * @param p - point
 * @param size - mirror box size
 */
export const sdfMirror2 = defn(
    "vec2",
    "sdfMirror2",
    ["vec2", "vec2"],
    (p, size) => {
        let halfSize: Vec2Sym;
        return [
            (halfSize = sym(mul(size, FLOAT05))),
            ret(
                mul(
                    sub(mod(add(p, halfSize), size), halfSize),
                    sub(
                        mul(mod(floor(div(add(p, halfSize), size)), VEC2_2), 2),
                        VEC2_1
                    )
                )
            ),
        ];
    }
);
