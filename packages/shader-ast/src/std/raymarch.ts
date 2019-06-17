import { Swizzle2_3, Sym, TaggedFn1 } from "../api";
import {
    $,
    add,
    assign,
    brk,
    defn,
    div,
    F32_1,
    float,
    forLoop,
    gt,
    ifThen,
    inc,
    int,
    lt,
    mul,
    ret,
    sub,
    sym,
    vec2,
    vec3
} from "../ast";
import { cross, normalize } from "../builtins";

export interface RaymarchOpts {
    name: string;
    near: number;
    far: number;
    steps: number;
    eps: number;
    bias: number;
}

export const raymarch = (
    scene: TaggedFn1<"vec3", "vec2">,
    _opts?: Partial<RaymarchOpts>
) => {
    const opts: RaymarchOpts = {
        name: "raymarch",
        near: 0.1,
        far: 100,
        steps: 40,
        eps: 0.01,
        bias: 0.7,
        ..._opts
    };
    return defn(
        "vec2",
        opts.name,
        [["vec3"], ["vec3"]],
        (pos, dir) => {
            let total: Sym<"f32">;
            let res: Sym<"vec2">;
            return [
                (total = sym(float(opts.near))),
                (res = sym("vec2")),
                forLoop(
                    sym("i32", int(0)),
                    (i) => lt(i, int(opts.steps)),
                    (i) => assign(i, inc(i)),
                    () => [
                        assign(res, scene(add(pos, mul(dir, total)))),
                        ifThen(lt($(res, "x"), float(opts.eps)), [
                            ret(vec2(total, $(res, "y")))
                        ]),
                        assign(
                            total,
                            add(total, mul($(res, "x"), float(opts.bias)))
                        ),
                        ifThen(gt(total, float(opts.far)), [brk])
                    ]
                ),
                ret(vec2(opts.far, 0))
            ];
        },
        [scene]
    );
};

/**
 * Higher order function producing a function to compute the raymarched
 * scene normal for a given scene function and intersection position.
 * Like `raymarch()`, this function takes an existing scene function as
 * argument.
 *
 * @param scene
 * @param name
 */
export const raymarchNormal = (
    scene: TaggedFn1<"vec3", "vec2">,
    name = "raymarchNormal"
) =>
    defn(
        "vec3",
        name,
        [["vec3"], ["f32"]],
        (p, smooth) => {
            let dn: Sym<"vec2">;
            let comp = (id: Swizzle2_3) =>
                sub(
                    $(scene(add(p, $(dn, id))), "x"),
                    $(scene(sub(p, $(dn, id))), "x")
                );
            return [
                (dn = sym(vec2(smooth, 0))),
                ret(normalize(vec3(comp("xyy"), comp("yxy"), comp("yyx"))))
            ];
        },
        [scene]
    );

/**
 * @param eyePos vec3
 * @param target vec3
 * @param up vec3
 * @param uv vec2
 */
export const raymarchDir = defn(
    "vec3",
    "raymarchDir",
    [["vec3"], ["vec3"], ["vec3"], ["vec2"]],
    (eye, target, up, uv) => {
        let forward: Sym<"vec3">;
        let right: Sym<"vec3">;
        return [
            (forward = sym(normalize(sub(target, eye)))),
            (right = sym(cross(forward, up))),
            ret(
                normalize(
                    add(
                        add(
                            mul(right, $(uv, "x")),
                            mul(cross(right, forward), $(uv, "y"))
                        ),
                        forward
                    )
                )
            )
        ];
    }
);

/**
 * Takes `pos`, a screen coord (e.g. gl_FragCoord) and viewport
 * resolution `res`, returns aspect corrected uv, with uv.y in [-1..1]
 * interval.
 *
 * @param fragCoord vec2
 * @param res vec2
 */
export const aspectCorrectedUV = defn(
    "vec2",
    "aspectCorrectedUV",
    [["vec2"], ["vec2"]],
    (pos, res) => {
        let uv: Sym<"vec2">;
        return [
            (uv = sym("vec2", div(pos, res))),
            assign(uv, sub(mul(uv, float(2)), F32_1)),
            assign($(uv, "x"), mul($(uv, "x"), div($(res, "x"), $(res, "y")))),
            ret(uv)
        ];
    }
);
