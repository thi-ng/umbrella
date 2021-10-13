import type { Vec2Sym, Vec3Sym } from "@thi.ng/shader-ast";
import { defn, ret } from "@thi.ng/shader-ast/ast/function";
import { vec2, vec3 } from "@thi.ng/shader-ast/ast/lit";
import { add, div, mul, sub } from "@thi.ng/shader-ast/ast/ops";
import { $, $x, $y, $z } from "@thi.ng/shader-ast/ast/swizzle";
import { sym } from "@thi.ng/shader-ast/ast/sym";
import { snoiseVec3 } from "./simplex3.js";

export const curlNoise3 = defn(
    "vec3",
    "curlNoise3",
    ["vec3", "float"],
    (p, e) => {
        let D: Vec2Sym;
        let px0: Vec3Sym;
        let px1: Vec3Sym;
        let py0: Vec3Sym;
        let py1: Vec3Sym;
        let pz0: Vec3Sym;
        let pz1: Vec3Sym;
        return [
            (D = sym(vec2(e, 0))),
            (px0 = sym(snoiseVec3(sub(p, $(D, "xyy"))))),
            (px1 = sym(snoiseVec3(add(p, $(D, "xyy"))))),
            (py0 = sym(snoiseVec3(sub(p, $(D, "yxy"))))),
            (py1 = sym(snoiseVec3(add(p, $(D, "yxy"))))),
            (pz0 = sym(snoiseVec3(sub(p, $(D, "yyx"))))),
            (pz1 = sym(snoiseVec3(add(p, $(D, "yyx"))))),
            ret(
                div(
                    vec3(
                        add(sub(sub($z(py1), $z(py0)), $y(pz1)), $y(pz0)),
                        add(sub(sub($x(pz1), $x(pz0)), $z(px1)), $z(px0)),
                        add(sub(sub($y(px1), $y(px0)), $x(py1)), $x(py0))
                    ),
                    mul(2, e)
                )
            ),
        ];
    }
);
