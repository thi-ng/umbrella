import type { FloatSym, Vec2Sym } from "@thi.ng/shader-ast";
import { assign } from "@thi.ng/shader-ast/ast/assign";
import { brk, forLoop, ifThen } from "@thi.ng/shader-ast/ast/controlflow";
import { defn, ret } from "@thi.ng/shader-ast/ast/function";
import { float, int, INT0, vec2 } from "@thi.ng/shader-ast/ast/lit";
import { gt, inc, lt, madd } from "@thi.ng/shader-ast/ast/ops";
import { $x, $y } from "@thi.ng/shader-ast/ast/swizzle";
import { sym } from "@thi.ng/shader-ast/ast/sym";
import type { RaymarchOpts, RaymarchScene } from "../api";
import { rayPointAt } from "./point-at";

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
                sym(INT0),
                (i) => lt(i, int(opts.steps)),
                inc,
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
