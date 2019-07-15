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

export type GPGPUSize = number | [number, number];
export interface ShaderPipelineOpts {
    size: GPGPUSize;
    gl: WebGLRenderingContext | WebGL2RenderingContext;
    // canvas?: HTMLCanvasElement;
    version?: 1 | 2;
    textures: IObjectOf<TextureOpts>;
    passes: ShaderPass;
}

export interface ShaderPass {
    inputs: string[];
    outputs: string[];
    size?: [number, number];
    uniforms?: ShaderUniformSpecs;
    fn: ShaderFn;
}

// export const shaderPipeline = (opts: ShaderPipelineOpts) => {
//     let width: number, height: number;
//     const gl = opts.gl;
//     if (isNumber(opts.size)) {
//         width = height = ceilPow2(Math.ceil(Math.sqrt(opts.size / 4)));
//     } else {
//         [width, height] = opts.size;
//     }
//     const textures = Object.keys(opts.textures).reduce((acc, id) => {
//         const tex = opts.textures[id];
//         const format = TEX_FORMATS[tex.format];
//         acc[id] = _texture(gl, {
//             width,
//             height
//         });
//     }, {});
// };
