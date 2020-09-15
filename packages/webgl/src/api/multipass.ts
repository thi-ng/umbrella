import type { IObjectOf } from "@thi.ng/api";
import { AttribPool } from "@thi.ng/vector-pools";
import type { IFbo, IndexBufferSpec } from "./buffers";
import type { InstancingSpec, ModelAttributeSpecs, ModelSpec } from "./model";
import type {
    ShaderAttribSpecs,
    ShaderFn,
    ShaderState,
    ShaderVaryingSpecs,
    UniformDecl,
    UniformValues,
} from "./shader";
import type { ITexture, TextureOpts } from "./texture";

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
    attribs?: ShaderAttribSpecs;
    varying?: ShaderVaryingSpecs;
    uniforms?: Partial<PassUniforms>;
    uniformVals?: UniformValues;
    pre?: string;
    post?: string;
    replacePrelude?: boolean;
    generateDecls?: boolean;
    state?: Partial<ShaderState>;
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
    indices?: IndexBufferSpec;
    instances?: InstancingSpec;
    mode?: GLenum;
    num: number;
}
