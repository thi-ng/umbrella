import {
    $,
    $x,
    add,
    defn,
    normalize,
    ret,
    sub,
    Swizzle2_3,
    sym,
    vec2,
    Vec2Sym,
    vec3,
} from "@thi.ng/shader-ast";
import type { RaymarchScene } from "../api";

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
