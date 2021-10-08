import type {
    Fn,
    Fn2,
    Fn3,
    Fn4,
    IBind,
    IDeref,
    IObjectOf,
    IRelease,
    NumericArray,
} from "@thi.ng/api";
import type { Func, Sym } from "@thi.ng/shader-ast";
import type { GLSLTarget } from "@thi.ng/shader-ast-glsl";
import type { ReadonlyVec } from "@thi.ng/vectors";
import type { BlendEquation, BlendFunc } from "./blend";
import type { ExtensionBehaviors } from "./ext";
import type {
    GLIntVec,
    GLIntVec2,
    GLIntVec3,
    GLIntVec4,
    GLMat2,
    GLMat3,
    GLMat4,
    GLSL,
    GLSLArrayType,
    GLSLScalarType,
    GLUintVec,
    GLVec,
    GLVec2,
    GLVec3,
    GLVec4,
} from "./glsl";
import type { ModelAttributeSpecs, ModelSpec } from "./model";
import type { StencilFnParams, StencilOpParams } from "./stencil";

export interface GLSLSyntax {
    number: number;
    attrib: Fn3<string, ShaderAttribSpec, GLSLDeclPrefixes, string>;
    uniform: Fn3<string, UniformDecl, GLSLDeclPrefixes, string>;
    varying: Record<
        ShaderType,
        Fn3<string, ShaderVaryingSpec, GLSLDeclPrefixes, string>
    >;
    output: Fn3<string, ShaderOutputSpec, GLSLDeclPrefixes, string>;
}

export interface GLSLDeclPrefixes {
    a: string;
    v: string;
    u: string;
    o: string;
}

export type ShaderType = "vs" | "fs";

export type AttribType = "bool" | "float" | "int" | "vec2" | "vec3" | "vec4";

export type AttribBufferData =
    | Int8Array
    | Uint8Array
    | Uint8ClampedArray
    | Int16Array
    | Uint16Array
    | Float32Array;

export type UniformValue = number | NumericArray;

export type UniformValues = IObjectOf<
    UniformValue | Fn2<ShaderUniforms, any, UniformValue> | IDeref<UniformValue>
>;

export type UniformDefault<T> =
    | T
    | Fn2<ShaderUniforms, IObjectOf<number | ReadonlyVec>, T>;

export type UniformDecl =
    | GLSL
    | [GLSLScalarType, UniformDefault<number>]
    | ["bvec2", UniformDefault<GLIntVec2>]
    | ["bvec3", UniformDefault<GLIntVec3>]
    | ["bvec4", UniformDefault<GLIntVec4>]
    | ["ivec2", UniformDefault<GLIntVec2>]
    | ["ivec3", UniformDefault<GLIntVec3>]
    | ["ivec4", UniformDefault<GLIntVec4>]
    | ["vec2", UniformDefault<GLVec2>]
    | ["vec3", UniformDefault<GLVec3>]
    | ["vec4", UniformDefault<GLVec4>]
    | ["mat2", UniformDefault<GLMat2>]
    | ["mat3", UniformDefault<GLMat3>]
    | ["mat4", UniformDefault<GLMat4>]
    // | ["mat2x3", UniformDefault<GLMat23>]
    // | ["mat2x4", UniformDefault<GLMat24>]
    // | ["mat3x2", UniformDefault<GLMat23>]
    // | ["mat3x4", UniformDefault<GLMat34>]
    // | ["mat4x2", UniformDefault<GLMat24>]
    // | ["mat4x3", UniformDefault<GLMat34>]
    | ["bool[]", number, UniformDefault<GLIntVec>?]
    | ["int[]", number, UniformDefault<GLIntVec>?]
    | ["uint[]", number, UniformDefault<GLUintVec>?]
    | ["float[]", number, UniformDefault<GLVec>?]
    | ["bvec2[]", number, UniformDefault<GLIntVec>?]
    | ["bvec3[]", number, UniformDefault<GLIntVec>?]
    | ["bvec4[]", number, UniformDefault<GLIntVec>?]
    | ["ivec2[]", number, UniformDefault<GLIntVec>?]
    | ["ivec3[]", number, UniformDefault<GLIntVec>?]
    | ["ivec4[]", number, UniformDefault<GLIntVec>?]
    | ["uvec2[]", number, UniformDefault<GLUintVec>?]
    | ["uvec3[]", number, UniformDefault<GLUintVec>?]
    | ["uvec4[]", number, UniformDefault<GLUintVec>?]
    | ["vec2[]", number, UniformDefault<GLVec>?]
    | ["vec3[]", number, UniformDefault<GLVec>?]
    | ["vec4[]", number, UniformDefault<GLVec>?]
    | ["mat2[]", number, UniformDefault<GLVec>?]
    | ["mat3[]", number, UniformDefault<GLVec>?]
    | ["mat4[]", number, UniformDefault<GLVec>?]
    // | ["mat2x3[]", number, UniformDefault<GLVec>?]
    // | ["mat2x4[]", number, UniformDefault<GLVec>?]
    // | ["mat3x2[]", number, UniformDefault<GLVec>?]
    // | ["mat3x4[]", number, UniformDefault<GLVec>?]
    // | ["mat4x2[]", number, UniformDefault<GLVec>?]
    // | ["mat4x3[]", number, UniformDefault<GLVec>?]
    | ["sampler2D[]", number, UniformDefault<GLIntVec>?]
    | ["sampler3D[]", number, UniformDefault<GLIntVec>?]
    | ["samplerCube[]", number, UniformDefault<GLIntVec>?];

/**
 * Object of attribute types w/ optional locations.
 */
export type ShaderAttribSpecs = IObjectOf<ShaderAttribSpec>;

export type ShaderAttribSpec = AttribType | [AttribType, number];

/**
 * Object of instantiated shader attributes.
 */
export type ShaderAttribs = IObjectOf<ShaderAttrib>;

export interface ShaderAttrib {
    type: AttribType;
    loc: number;
}

export type ShaderVaryingSpecs = IObjectOf<ShaderVaryingSpec>;

export type ShaderVaryingSpec = GLSL | [GLSLArrayType, number];

export type ShaderUniformSpecs = IObjectOf<UniformDecl>;

export type ShaderUniforms = IObjectOf<ShaderUniform>;

export type ShaderOutputSpecs = IObjectOf<ShaderOutputSpec>;

export type ShaderOutputSpec = GLSL | [GLSL, number];

export interface ShaderUniform {
    type: GLSL;
    loc: WebGLUniformLocation;
    setter: Fn<UniformValue | undefined | null, void>;
    defaultFn?: (shaderUnis: any, specUnis: any) => UniformValue;
    defaultVal?: UniformValue;
}

export const DEFAULT_OUTPUT: ShaderOutputSpecs = { fragColor: ["vec4", 0] };

export type ShaderFn = Fn4<
    GLSLTarget,
    IObjectOf<Sym<any>>, // uni
    IObjectOf<Sym<any>>, // attribs
    IObjectOf<Sym<any>>, // vary
    (Sym<any> | Func<any>)[]
>;

export interface ShaderSpec {
    /**
     * Vertex shader GLSL source code.
     */
    vs: string | ShaderFn;
    /**
     * Fragment shader GLSL source code.
     */
    fs: string | ShaderFn;
    /**
     * Attribute type declarations.
     */
    attribs: ShaderAttribSpecs;
    /**
     * Varying type declarations.
     */
    varying?: ShaderVaryingSpecs;
    /**
     * Uniform type declarations with optional defaults.
     */
    uniforms?: ShaderUniformSpecs;
    /**
     * WebGL2 only. Fragment shader output variable type declarations.
     * Default: `{ fragColor: GLSL.vec4 }`
     */
    outputs?: ShaderOutputSpecs;
    /**
     * Flag to indicate code generation for attribs, varying, uniforms
     * and outputs. Default: true.
     */
    generateDecls?: boolean;
    /**
     * Variable naming convention variable prefixes for GLSL code gen.
     *
     * Defaults:
     *
     * - Attributes: `a_`
     * - Varying: `v_`
     * - Uniforms: `u_`
     * - Outputs: `o_`
     */
    declPrefixes?: Partial<GLSLDeclPrefixes>;
    /**
     * Optional prelude source, prepended before main shader code, the
     * default prelude (unless disabled) and any other generated code.
     */
    pre?: string;
    /**
     * Optional source code to be appended after main shader code.
     */
    post?: string;
    /**
     * If true, disables default prelude. Default: false
     */
    replacePrelude?: boolean;
    /**
     * Optional shader drawing state flags. Default: none.
     */
    state?: Partial<ShaderState>;
    /**
     * WebGL extension config for code generation. Keys in this object
     * are extension names and their values specify the desired
     * behavior. Boolean values will be translated in "enable" /
     * "disable".
     */
    ext?: ExtensionBehaviors;
}

export interface ShaderState {
    /**
     * Enable depth test
     */
    depth: boolean;
    /**
     * Cull faces
     */
    cull: boolean;
    /**
     * Cull mode
     */
    cullMode: GLenum;
    /**
     * Enable blending
     */
    blend: boolean;
    /**
     * 2-element array of glBlendFunction coefficients
     *
     * @defaultValue `[gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA]`
     */
    blendFn: BlendFunc;
    /**
     * glBlendEquation mode
     */
    blendEq: BlendEquation;
    /**
     * Enable stencil test
     */
    stencil: boolean;
    /**
     * glStencilFn params
     */
    stencilFn: StencilFnParams;
    /**
     * glStencilOp params
     */
    stencilOp: StencilOpParams;
    /**
     * glStencilMask arg
     */
    stencilMask: number;
}

export interface ShaderPresetOpts<T> {
    instancePos: string;
    instanceColor: string;
    color: string;
    uv: string;
    material: Partial<T>;
    state: Partial<ShaderState>;
}

export interface DefShaderOpts {
    /**
     * Number of fractional digits for GLSL float literals
     */
    prec: number;
}

export interface IShader extends IBind<ModelSpec>, IRelease {
    gl: WebGLRenderingContext;
    attribs: IObjectOf<ShaderAttrib>;
    uniforms: ShaderUniforms;

    bindAttribs(specAttribs: ModelAttributeSpecs): void;
    bindUniforms(specUnis: UniformValues): void;
    prepareState(state?: Partial<ShaderState>): void;
}
