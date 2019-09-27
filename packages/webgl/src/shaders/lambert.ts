import {
    $,
    assign,
    defMain,
    mul,
    normalize,
    texture,
    vec4
} from "@thi.ng/shader-ast";
import {
    diffuseLighting,
    halfLambert,
    lambert,
    surfaceNormal,
    transformMVP
} from "@thi.ng/shader-ast-stdlib";
import { Material } from "../api/material";
import { ShaderOpts, ShaderSpec } from "../api/shader";
import { defMaterial } from "../material";
import { autoNormalMatrix2 } from "../matrices";
import { colorAttrib, positionAttrib } from "../utils";

export interface LambertOpts
    extends ShaderOpts<Pick<Material, "ambientCol" | "diffuseCol">> {
    bidir: boolean;
}

export const LAMBERT = (opts: Partial<LambertOpts> = {}): ShaderSpec => ({
    vs: (gl, unis, ins, outs) => [
        defMain(() => [
            opts.uv ? assign(outs.vuv, ins[opts.uv]) : null,
            assign(outs.vcolor, colorAttrib(opts, ins, unis.diffuseCol)),
            assign(outs.vnormal, surfaceNormal(ins.normal, unis.normalMat)),
            assign(
                gl.gl_Position,
                transformMVP(
                    positionAttrib(opts, ins),
                    unis.model,
                    unis.view,
                    unis.proj
                )
            )
        ])
    ],
    fs: (_, unis, ins, outs) => [
        defMain(() => [
            assign(
                outs.fragColor,
                vec4(
                    diffuseLighting(
                        (opts.bidir !== false ? halfLambert : lambert)(
                            normalize(ins.vnormal),
                            unis.lightDir
                        ),
                        opts.uv
                            ? mul(
                                  $(texture(unis.tex, ins.vuv), "xyz"),
                                  ins.vcolor
                              )
                            : ins.vcolor,
                        unis.lightCol,
                        unis.ambientCol
                    ),
                    1
                )
            )
        ])
    ],
    // pre: ALIAS_TEXTURE,
    attribs: {
        position: "vec3",
        normal: "vec3",
        ...(opts.uv ? { [opts.uv]: "vec2" } : null),
        ...(opts.color && !opts.instanceColor
            ? { [opts.color]: "vec3" }
            : null),
        ...(opts.instancePos ? { [opts.instancePos]: "vec3" } : null),
        ...(opts.instanceColor ? { [opts.instanceColor]: "vec3" } : null)
    },
    varying: {
        vcolor: "vec3",
        vnormal: "vec3",
        ...(opts.uv ? { vuv: "vec2" } : null)
    },
    uniforms: {
        model: "mat4",
        view: "mat4",
        proj: "mat4",
        normalMat: ["mat4", autoNormalMatrix2()],
        lightDir: ["vec3", [0, 1, 0]],
        lightCol: ["vec3", [1, 1, 1]],
        ...defMaterial(
            { diffuseCol: [1, 1, 1], ...opts.material },
            { specularCol: false }
        ),
        ...(opts.uv ? { tex: "sampler2D" } : null)
    },
    state: {
        depth: true,
        ...opts.state
    }
});
