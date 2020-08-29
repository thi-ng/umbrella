import {
    $x,
    $y,
    assign,
    brk,
    defn,
    float,
    FloatSym,
    forLoop,
    gt,
    ifThen,
    inc,
    int,
    lt,
    madd,
    ret,
    sym,
    vec2,
    Vec2Sym,
} from "@thi.ng/shader-ast";
import { rayPointAt } from "./point-at";
import type { RaymarchOpts, RaymarchScene } from "../api";

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
 * @param scene -
 * @param _opts -
 */
export const raymarchScene = (
    scene: RaymarchScene,
    _opts?: Partial<RaymarchOpts>
) => {
    const opts: RaymarchOpts = {
        name: "raymarchScene",
        near: 0.1,
        far: 10,
        steps: 100,
        eps: 0.01,
        bias: 0.7,
        ..._opts,
    };
    return defn("vec2", opts.name, ["vec3", "vec3"], (pos, dir) => {
        let total: FloatSym;
        let res: Vec2Sym;
        return [
            (total = sym(float(opts.near))),
            (res = sym("vec2")),
            forLoop(
                sym(int(0)),
                (i) => lt(i, int(opts.steps)),
                (i) => inc(i),
                () => [
                    assign(res, scene(rayPointAt(pos, dir, total))),
                    ifThen(lt($x(res), float(opts.eps)), [
                        ret(vec2(total, $y(res))),
                    ]),
                    assign(total, madd($x(res), float(opts.bias), total)),
                    ifThen(gt(total, float(opts.far)), [brk]),
                ]
            ),
            ret(vec2(opts.far, 0)),
        ];
    });
};
