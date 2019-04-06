import {
    Fn,
    Fn2,
    Fn3,
    IBind,
    IObjectOf,
    IRelease,
    Tuple,
    TypedArray
} from "@thi.ng/api";
import { ReadonlyVec } from "@thi.ng/vectors";

export enum GLSL {
    bool,
    int,
    uint,
    float,
    vec2,
    vec3,
    vec4,
    bvec2,
    bvec3,
    bvec4,
    ivec2,
    ivec3,
    ivec4,
    mat2,
    mat3,
    mat4,
    sampler2D,
    samplerCube,
    bool_array,
    float_array,
    int_array,
    uint_array,
    vec2_array,
    vec3_array,
    vec4_array,
    bvec2_array,
    bvec3_array,
    bvec4_array,
    ivec2_array,
    ivec3_array,
    ivec4_array,
    mat2_array,
    mat3_array,
    mat4_array,
    sampler2D_array,
    samplerCube_array
}

export type GLVec = number[] | Float32Array;
export type GLVec2 = Tuple<number, 2> | Float32Array;
export type GLVec3 = Tuple<number, 3> | Float32Array;
export type GLVec4 = Tuple<number, 4> | Float32Array;

export type GLIntVec = number[] | Int32Array;
export type GLUintVec = number[] | Uint32Array;
export type GLIntVec2 = Tuple<number, 2> | Int32Array;
export type GLIntVec3 = Tuple<number, 3> | Int32Array;
export type GLIntVec4 = Tuple<number, 4> | Int32Array;

export type GLMat2 = Tuple<number, 4> | Float32Array;
export type GLMat3 = Tuple<number, 9> | Float32Array;
export type GLMat4 = Tuple<number, 16> | Float32Array;

export type AttribType =
    | GLSL.bool
    | GLSL.float
    | GLSL.int
    | GLSL.vec2
    | GLSL.vec3
    | GLSL.vec4;

export type AttribBufferData =
    | Int8Array
    | Uint8Array
    | Uint8ClampedArray
    | Int16Array
    | Uint16Array
    | Float32Array;

export type IndexBufferData = Uint16Array | Uint32Array;

export type ModelAttributeSpecs = IObjectOf<ModelAttributeSpec>;

export type UniformValue = number | number[] | TypedArray;

export type UniformValues = IObjectOf<
    UniformValue | Fn2<ShaderUniforms, any, UniformValue>
>;

export type ShaderType = "vs" | "fs";

export type ScalarType =
    | GLSL.bool
    | GLSL.float
    | GLSL.int
    | GLSL.uint
    | GLSL.sampler2D
    | GLSL.samplerCube;

export type UniformDefault<T> =
    | T
    | Fn2<ShaderUniforms, IObjectOf<number | ReadonlyVec>, T>;

export type UniformDecl =
    | GLSL
    | [ScalarType, UniformDefault<number>]
    | [GLSL.bvec2, UniformDefault<GLIntVec2>]
    | [GLSL.bvec3, UniformDefault<GLIntVec3>]
    | [GLSL.bvec4, UniformDefault<GLIntVec4>]
    | [GLSL.ivec2, UniformDefault<GLIntVec2>]
    | [GLSL.ivec3, UniformDefault<GLIntVec3>]
    | [GLSL.ivec4, UniformDefault<GLIntVec4>]
    | [GLSL.vec2, UniformDefault<GLVec2>]
    | [GLSL.vec3, UniformDefault<GLVec3>]
    | [GLSL.vec4, UniformDefault<GLVec4>]
    | [GLSL.mat2, UniformDefault<GLMat2>]
    | [GLSL.mat3, UniformDefault<GLMat3>]
    | [GLSL.mat4, UniformDefault<GLMat4>]
    | [GLSL.bool_array, number, UniformDefault<GLIntVec>?]
    | [GLSL.int_array, number, UniformDefault<GLIntVec>?]
    | [GLSL.uint_array, number, UniformDefault<GLUintVec>?]
    | [GLSL.float_array, number, UniformDefault<GLVec>?]
    | [GLSL.vec2_array, number, UniformDefault<GLVec>?]
    | [GLSL.vec3_array, number, UniformDefault<GLVec>?]
    | [GLSL.vec4_array, number, UniformDefault<GLVec>?]
    | [GLSL.sampler2D_array, number, UniformDefault<number>?]
    | [GLSL.samplerCube_array, number, UniformDefault<number>?];

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

export type ShaderVaryingSpec = GLSL;

export type ShaderUniformSpecs = IObjectOf<UniformDecl>;

export type ShaderUniforms = IObjectOf<ShaderUniform>;

export type ShaderOutputSpecs = IObjectOf<ShaderOutputSpec>;

export type ShaderOutputSpec = GLSL | [GLSL, number];

export interface ShaderUniform {
    type: GLSL;
    loc: WebGLUniformLocation;
    setter: Fn<UniformValue, void>;
    defaultFn: (shaderUnis: any, specUnis: any) => UniformValue;
    defaultVal: UniformValue;
}

export enum GLSLVersion {
    GLES_100 = "100",
    GLES_300 = "300 es"
}

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

export interface ShaderSnippet {
    /**
     * Array of dependent snippets.
     */
    deps?: ShaderSnippet[];
    /**
     * Snippet source code.
     */
    src: string;
}

export interface ShaderSpec {
    /**
     * Vertex shader GLSL source code.
     */
    vs: string;
    /**
     * Fragment shader GLSL source code.
     */
    fs: string;
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
     * GLSL version. Default: GLSLVersion.GLES_100
     */
    version?: GLSLVersion;
    /**
     * Flag to indicate code generation for attribs, vaarying, uniforms
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
     * (default: `[gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA]`)
     */
    blendFn: [GLenum, GLenum];
    /**
     * glBlendEquation mode
     */
    blendEq: GLenum;
    /**
     * Enable stencil test
     */
    stencil: boolean;
    /**
     * glStencilFn params
     */
    stencilFn: Tuple<GLenum, 3>;
    /**
     * glStencilOp params
     */
    stencilOp: Tuple<GLenum, 3>;
    /**
     * glStencilMask arg
     */
    stencilMask: GLenum;
}

export interface ShaderOpts<T> {
    instancePos: string;
    instanceColor: string;
    color: string;
    material: Partial<T>;
    state: Partial<ShaderState>;
    version: GLSLVersion;
}

export interface IShader extends IBind<ModelSpec>, IRelease {
    gl: WebGLRenderingContext;
    attribs: IObjectOf<ShaderAttrib>;
    uniforms: ShaderUniforms;

    bindAttribs(specAttribs: ModelAttributeSpecs): void;
}

export interface IWebGLBuffer<T> extends IBind<void>, IRelease {
    set(data: T, mode?: GLenum): void;
    setChunk(data: T, offset: number): void;
}

export interface IConfigure<T> {
    configure(opts: T): boolean;
}

export interface ITexture
    extends IBind<number>,
        IConfigure<Partial<TextureOpts>>,
        IRelease {
    tex: WebGLTexture;
}

export interface IFbo
    extends IBind<void>,
        IConfigure<Partial<FboOpts>>,
        IRelease {}

export interface IRenderBuffer extends IBind<void>, IRelease {
    buffer: WebGLRenderbuffer;
    format: GLenum;
    width: number;
    height: number;
}

export interface ModelSpec {
    /**
     * Initialized `IShader` instance
     */
    shader: IShader;
    /**
     * GLSL attribute declarations
     */
    attribs: ModelAttributeSpecs;
    /**
     * GLSL uniform value overrides
     */
    uniforms?: UniformValues;
    /**
     * Buffer spec for indexed geometry
     */
    indices?: IndexBufferSpec;
    /**
     * Array of initialized `ITexture` instances.
     * Each non-null item will be auto-bound to its respective texture unit,
     * each time the model is drawn via `draw()`
     */
    textures?: ITexture[];
    /**
     * Extra configuration for instanced geometry
     */
    instances?: InstancingSpec;
    /**
     * WebGL draw mode
     */
    mode: GLenum;
    /**
     * Number of primitives to draw
     */
    numItems: number;
}

/**
 * Data specification of a single WebGL attribute
 */
export interface ModelAttributeSpec {
    /**
     * Backing `WebGLArrayBuffer` instance. Usually this will be
     * auto-initialized by `compileBuffers()`
     */
    buffer?: IWebGLBuffer<AttribBufferData>;
    /**
     * Raw attribute data from which `buffer` will be initialized
     */
    data: AttribBufferData;
    /**
     * Attribute element size (in component values, not bytes).
     * Default: 3
     */
    size?: number;
    /**
     * Auto-normalization flag when writing buffer data.
     * Default: false
     */
    normalized?: boolean;
    /**
     * Byte offset of 1st attrib component.
     * Default: 0
     */
    offset?: number;
    /**
     * Attribute stride in bytes.
     * Default: 0 = densely packed
     */
    stride?: number;
    /**
     * Attribute's WebGL data type.
     * Default: gl.FLOAT
     */
    type?: GLenum;
    /**
     * Only used for instanced attributes.
     * See: https://www.khronos.org/registry/OpenGL/extensions/ANGLE/ANGLE_instanced_arrays.txt
     */
    divisor?: number;
}

export interface IndexBufferSpec {
    /**
     * Backing `WebGLBuffer` instance. Usually this will be
     * auto-initialized by `makeBuffersInSpec()`
     */
    buffer?: IWebGLBuffer<IndexBufferData>;
    /**
     * Raw attribute data from which `buffer` will be initialized
     */
    data: IndexBufferData;
}

export interface InstancingSpec {
    attribs: IObjectOf<ModelAttributeSpec>;
    numItems: number;
}

export interface TextureOpts {
    image: ArrayBufferView | TexImageSource;
    target: GLenum;
    type: GLenum;
    filter: GLenum | GLenum[];
    wrap: GLenum | GLenum[];
    format: GLenum;
    mipmap: GLenum;
    width: number;
    height: number;
    flip: boolean;
    premultiply: boolean;
}

export interface FboOpts {
    /**
     * Array of Texture instances to be used as color attachments.
     * Multiple attachments are only allowed if the `webgl_draw_buffers`
     * extension is available. The texture at `[0]` will be mapped to
     * `COLOR_ATTACHMENT0` (or `COLOR_ATTACHMENT0_WEBGL`), other indices
     * are mapped to their respective attachment IDs.
     */
    tex: ITexture[];
    /**
     * Optional pre-instantiated `RenderBuffer` to be used as depth
     * buffer for this FBO.
     */
    depth?: IRenderBuffer;
}

export interface RenderBufferOpts {
    format: number;
    width: number;
    height: number;
}

export interface Material {
    ambientCol: GLVec3;
    diffuseCol: GLVec3;
    specularCol: GLVec3;
}

export interface WeblGLCanvasOpts {
    canvas: string | HTMLCanvasElement;
    parent: HTMLElement;
    opts: Partial<WebGLContextAttributes>;
    version: 1 | 2;
    width: number;
    height: number;
    autoScale: boolean;
    onContextLost: EventListener;
}
