import {
    $,
    add,
    assign,
    defMain,
    dot,
    FLOAT0,
    gt,
    max,
    mul,
    normalize,
    pow,
    sub,
    Sym,
    sym,
    ternary,
    vec4
} from "@thi.ng/shader-ast";
import { diffuseLighting, surfaceNormal } from "@thi.ng/shader-ast-stdlib";
import { Material } from "../api/material";
import { ShaderOpts, ShaderSpec } from "../api/shader";
import { defMaterial } from "../material";
import { autoNormalMatrix1 } from "../matrices";
import { colorAttrib, positionAttrib } from "../utils";

export type PhongOpts = ShaderOpts<
    Pick<Material, "ambientCol" | "diffuseCol" | "specularCol">
>;

export const PHONG = (opts: Partial<PhongOpts> = {}): ShaderSpec => ({
    vs: (gl, unis, ins, outs) => [
        defMain(() => {
            let worldPos: Sym<"vec4">;
            return [
                (worldPos = sym(
                    mul(unis.model, vec4(positionAttrib(opts, ins), 1))
                )),
                assign(outs.vnormal, surfaceNormal(ins.normal, unis.normalMat)),
                assign(outs.vlight, sub(unis.lightPos, $(worldPos, "xyz"))),
                assign(outs.veye, sub(unis.eyePos, $(worldPos, "xyz"))),
                assign(outs.vcolor, colorAttrib(opts, ins, unis.diffuseCol)),
                assign(gl.gl_Position, mul(mul(unis.proj, unis.view), worldPos))
            ];
        })
    ],
    fs: (_, unis, ins, outs) => [
        defMain(() => {
            let normal: Sym<"vec3">;
            let light: Sym<"vec3">;
            let directional: Sym<"float">;
            let specular: Sym<"float">;
            return [
                (normal = sym(normalize(ins.vnormal))),
                (light = sym(normalize(ins.vlight))),
                (directional = sym(max(dot(normal, light), FLOAT0))),
                (specular = sym(
                    ternary(
                        gt(directional, FLOAT0),
                        pow(
                            dot(
                                normal,
                                normalize(add(light, normalize(ins.veye)))
                            ),
                            unis.shininess
                        ),
                        FLOAT0
                    )
                )),
                assign(
                    outs.fragColor,
                    add(
                        diffuseLighting(
                            directional,
                            ins.vcolor,
                            unis.lightCol,
                            unis.ambientCol
                        ),
                        mul(unis.specularCol, specular)
                    )
                )
            ];
        })
    ],
    attribs: {
        position: "vec3",
        normal: "vec3",
        ...(opts.color && !opts.instanceColor
            ? { [opts.color]: "vec3" }
            : null),
        ...(opts.instancePos ? { [opts.instancePos]: "vec3" } : null),
        ...(opts.instanceColor ? { [opts.instanceColor]: "vec3" } : null)
    },
    varying: {
        vnormal: "vec3",
        veye: "vec3",
        vlight: "vec3",
        vcolor: "vec3"
    },
    uniforms: {
        model: "mat4",
        normalMat: ["mat4", autoNormalMatrix1()],
        view: "mat4",
        proj: "mat4",
        shininess: ["float", 32],
        eyePos: "vec3",
        lightPos: ["vec3", [0, 0, 2]],
        lightCol: ["vec3", [1, 1, 1]],
        ...defMaterial(opts.material)
    },
    state: {
        depth: true,
        ...opts.state
    }
});
