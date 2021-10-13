import type { Swizzle2_3, Vec2Sym } from "@thi.ng/shader-ast";
import { defn, ret } from "@thi.ng/shader-ast/ast/function";
import { vec2, vec3 } from "@thi.ng/shader-ast/ast/lit";
import { add, sub } from "@thi.ng/shader-ast/ast/ops";
import { $, $x } from "@thi.ng/shader-ast/ast/swizzle";
import { sym } from "@thi.ng/shader-ast/ast/sym";
import { normalize } from "@thi.ng/shader-ast/builtin/math";
import type { RaymarchScene } from "../api.js";

/**
 * Higher order function producing a function to compute the raymarched
 * scene normal for a given scene function and intersection position.
 * Like {@link raymarchScene}, this function takes an existing scene
 * function as argument.
 *
 * @param scene -
 * @param name -
 */
export const raymarchNormal = (scene: RaymarchScene, name = "raymarchNormal") =>
    defn("vec3", name, ["vec3", "float"], (p, smooth) => {
        let dn: Vec2Sym;
        const comp = (id: Swizzle2_3) =>
            sub($x(scene(add(p, $(dn, id)))), $x(scene(sub(p, $(dn, id)))));
        return [
            (dn = sym(vec2(smooth, 0))),
            ret(normalize(vec3(comp("xyy"), comp("yxy"), comp("yyx")))),
        ];
    });
