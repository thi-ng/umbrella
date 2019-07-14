import { TypedArray } from "@thi.ng/api";
import {
    ShaderFn,
    ShaderSpec,
    ShaderUniformSpecs,
    UniformValues
} from "./shader";
import { ITexture, TextureOpts } from "./texture";

export interface GPGPUOpts {
    size: number;
    inputs?: number | GPGPUTextureConfig[];
    outputs?: number | GPGPUTextureConfig[];
    gl?: WebGLRenderingContext;
    version?: 1 | 2;
}

export interface GPGPUTextureConfig
    extends Partial<
        // Pick<TextureOpts, "internalFormat" | "format" | "type" | "flip">
        Pick<TextureOpts, "format" | "type" | "flip">
    > {
    stride: number;
}

export interface GPGPUJobConfig {
    shader: ShaderSpec;
    src: string | ShaderFn;
    uniforms: ShaderUniformSpecs;
    inputs: number;
    outputs?: number;
}

export interface GPGPUJobExecOpts {
    inputs: (ITexture | TypedArray)[];
    outputs?: number[];
    uniforms?: UniformValues;
}
