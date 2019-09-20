import { IObjectOf } from "@thi.ng/api";
import { AttribPool } from "@thi.ng/vector-pools";
import { IFbo, IndexBufferSpec } from "./buffers";
import { InstancingSpec, ModelAttributeSpecs, ModelSpec } from "./model";
import {
    ShaderFn,
    ShaderState,
    ShaderVaryingSpecs,
    UniformDecl,
    UniformValues
} from "./shader";
import { ITexture, TextureOpts } from "./texture";

export interface Multipass {
    start(): void;
    stop(): void;
    update(time?: number): void;

    fbos: IFbo[];
    models: ModelSpec[];
    passes: PassOpts[];
    textures: IObjectOf<ITexture>;
}

export interface MultipassOpts {
    gl: WebGLRenderingContext;
    textures: IObjectOf<Partial<TextureOpts>>;
    passes: PassOpts[];
    width: number;
    height: number;
    uniforms?: Partial<PassUniforms>;
    uniformVals?: UniformValues;
}

export interface PassOpts {
    vs?: string | ShaderFn;
    fs: string | ShaderFn;
    model?: PassModelSpec;
    inputs: string[];
    outputs: string[];
    varying?: ShaderVaryingSpecs;
    uniforms?: Partial<PassUniforms>;
    uniformVals?: UniformValues;
    state?: ShaderState;
}

export interface PassUniforms {
    inputs: never;
    outputs: never;
    resolution: "vec2";
    time: "float";
    [id: string]: UniformDecl;
}

export interface PassModelSpec {
    attribs: ModelAttributeSpecs;
    attribPool?: AttribPool;
    uniforms?: UniformValues;
    indices?: IndexBufferSpec;
    instances?: InstancingSpec;
    mode?: GLenum;
    num: number;
}
