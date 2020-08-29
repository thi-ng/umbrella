import {
    add,
    defn,
    FloatSym,
    mul,
    PrimTypeMap,
    ret,
    sub,
    sym,
} from "@thi.ng/shader-ast";

const $ = <N extends 1 | 2 | 3 | 4, T extends PrimTypeMap[N]>(n: N, type: T) =>
    defn(
        type,
        `mixQuadratic${n > 1 ? n : ""}`,
        [type, type, type, "float"],
        (a, b, c, t) => {
            let s: FloatSym;
            return [
                (s = sym(sub(1, t))),
                ret(
                    add(
                        add(
                            mul(<any>a, mul(s, s)),
                            mul(<any>b, mul(2, mul(s, t)))
                        ),
                        mul(<any>c, mul(t, t))
                    )
                ),
            ];
        }
    );

export const mixQuadratic = $(1, "float");
export const mixQuadratic2 = $(2, "vec2");
export const mixQuadratic3 = $(3, "vec3");
export const mixQuadratic4 = $(4, "vec4");
