import {
    $y,
    defn,
    div,
    FLOAT2,
    neg,
    normalize,
    radians,
    ret,
    sub,
    sym,
    tan,
    Vec2Sym,
    vec3,
} from "@thi.ng/shader-ast";

/**
 * @param fragCoord - vec2
 * @param res - vec2
 * @param fov - float vertical FOV (in degrees)
 */
export const raymarchDir = defn(
    "vec3",
    "raymarchDir",
    ["vec2", "vec2", "float"],
    (frag, res, fov) => {
        let uv: Vec2Sym;
        return [
            (uv = sym(sub(frag, div(res, FLOAT2)))),
            ret(
                normalize(
                    vec3(uv, neg(div($y(res), tan(div(radians(fov), FLOAT2)))))
                )
            ),
        ];
    }
);
