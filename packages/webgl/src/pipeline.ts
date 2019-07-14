import { IObjectOf } from "@thi.ng/api";
import {
    assign,
    defMain,
    FLOAT0,
    FLOAT1,
    texture,
    vec4
} from "@thi.ng/shader-ast";
import { ShaderFn, ShaderSpec, ShaderUniformSpecs } from "./api/shader";
import { TextureOpts } from "./api/texture";
import { texture as _texture } from "./texture";

export const PASSTHROUGH_VS: ShaderFn = (gl, _, ins, outs) => [
    defMain(() => [
        assign(outs.v_uv, ins.uv),
        assign(gl.gl_Position, vec4(ins.position, FLOAT0, FLOAT1))
    ])
];

export const PASSTHROUGH_FS: ShaderFn = (_, unis, ins, outs) => [
    defMain(() => [assign(outs.fragColor, texture(unis.tex, ins.v_uv))])
];

export const FX_SHADER_SPEC: ShaderSpec = {
    vs: PASSTHROUGH_VS,
    fs: PASSTHROUGH_FS,
    attribs: { position: "vec2", uv: "vec2" },
    varying: { v_uv: "vec2" },
    uniforms: { tex: "sampler2D" },
    state: { depth: false },
    ext: {}
};
