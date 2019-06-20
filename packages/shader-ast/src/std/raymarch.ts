import { Swizzle2_3, Sym, TaggedFn1 } from "../api";
import {
    $,
    $x,
    $y,
    add,
    assign,
    brk,
    defn,
    div,
    F32_0,
    F32_05,
    F32_1,
    F32_2,
    float,
    forLoop,
    gt,
    ifThen,
    inc,
    int,
    lt,
    lte,
    mul,
    neg,
    ret,
    sub,
    sym,
    vec2,
    vec3
} from "../ast";
import { normalize, radians, tan } from "../builtins";
import { clamp01, fit0111 } from "./math";

export type RaymarchScene = TaggedFn1<"vec3", "vec2">;

export interface RaymarchOpts {
    /**
     * Name of generated function. Default: "raymarch"
     */
    name: string;
    /**
     * Near clipping plane. Default: 0.1
     */
    near: number;
    /**
     * Far clipping plane: Default: 10
     */
    far: number;
    /**
     * Max. iteration steps. Default: 100
     */
    steps: number;
    /**
     * Surface tolerance, i.e. search stops once distance returned from
     * `scene` function is less than this value. Default: 0.01
     */
    eps: number;
    /**
     * March step distance falloff / decay factor. Default: 0.7
     */
    bias: number;
}

/**
 * Higher order function producing a function to perform a raymarch
 * using the provided `scene` function and options to configure the
 * raymarch process itself.
 *
 * Returns an AST function which takes 2 args: ray origin, normalized
 * ray direction and returning a 2D vector of:
 *
 * - x = the signed distance to the `scene` defined SDF surface
 * - y = user data provided by `scene` (e.g. material ID)
 *
 * The `scene` function itself takes a 3D point as input and returns a
 * vec2 with the same component meaning as above.
 *
 * @param scene
 * @param _opts
 */
export const raymarchScene = (
    scene: RaymarchScene,
    _opts?: Partial<RaymarchOpts>
) => {
    const opts: RaymarchOpts = {
        name: "raymarch",
        near: 0.1,
        far: 10,
        steps: 100,
        eps: 0.01,
        bias: 0.7,
        ..._opts
    };
    return defn("vec2", opts.name, [["vec3"], ["vec3"]], (pos, dir) => {
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
                    ifThen(lt($x(res), float(opts.eps)), [
                        ret(vec2(total, $y(res)))
                    ]),
                    assign(total, add(total, mul($x(res), float(opts.bias)))),
                    ifThen(gt(total, float(opts.far)), [brk])
                ]
            ),
            ret(vec2(opts.far, 0))
        ];
    });
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
export const raymarchNormal = (scene: RaymarchScene, name = "raymarchNormal") =>
    defn("vec3", name, [["vec3"], ["f32"]], (p, smooth) => {
        let dn: Sym<"vec2">;
        let comp = (id: Swizzle2_3) =>
            sub($x(scene(add(p, $(dn, id)))), $x(scene(sub(p, $(dn, id)))));
        return [
            (dn = sym(vec2(smooth, 0))),
            ret(normalize(vec3(comp("xyy"), comp("yxy"), comp("yyx"))))
        ];
    });

/**
 * @param fragCoord vec2
 * @param res vec2
 * @param fov f32 vertical FOV (in degrees)
 */
export const raymarchDir = defn(
    "vec3",
    "raymarchDir",
    [["vec2"], ["vec2"], ["f32"]],
    (frag, res, fov) => {
        let uv: Sym<"vec2">;
        return [
            (uv = sym(sub(frag, div(res, F32_2)))),
            ret(
                normalize(
                    vec3(uv, neg(div($y(res), tan(div(radians(fov), F32_2)))))
                )
            )
        ];
    }
);

/**
 * Higher order function returning an function to compute the Ambient
 * Occlusion term / shadow factor for given SDF scene function. The
 * returned function takes 2 arguments: surface pos and normal. It
 * returns a float in [0..1] interval (zero = fully occluded).
 *
 * @param scene
 * @param numSamples
 */
export const raymarchAO = (scene: RaymarchScene, numSamples = 5) =>
    defn("f32", "raymarchAO", [["vec3"], ["vec3"]], (p, n) => {
        let r: Sym<"f32">;
        let w: Sym<"f32">;
        let d0: Sym<"f32">;
        return [
            (r = sym(F32_0)),
            (w = sym(F32_1)),
            forLoop(
                sym("f32", float(1)),
                (i) => lte(i, float(numSamples)),
                (i) => assign(i, inc(i)),
                (i) => [
                    (d0 = sym(mul(i, float(1 / numSamples)))),
                    assign(
                        r,
                        add(r, mul(w, sub(d0, $x(scene(add(p, mul(n, d0)))))))
                    ),
                    assign(w, mul(w, F32_05))
                ]
            ),
            ret(sub(F32_1, clamp01(r)))
        ];
    });

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
            (uv = sym("vec2", fit0111(div(pos, res)))),
            assign($x(uv), mul($x(uv), div($x(res), $y(res)))),
            ret(uv)
        ];
    }
);
