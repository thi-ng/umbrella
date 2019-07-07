import {
    Fn,
    Fn2,
    Fn3,
    Fn4,
    IBind,
    IDeref,
    IObjectOf,
    IRelease,
    Tuple,
    TypedArray
} from "@thi.ng/api";
import { Func, Sym, Type } from "@thi.ng/shader-ast";
import { GLSLTarget } from "@thi.ng/shader-ast-glsl";
import { AttribPool } from "@thi.ng/vector-pools";
import { ReadonlyVec } from "@thi.ng/vectors";

export const enum TextureFormat {
    ALPHA = 0x1906,
    DEPTH_COMPONENT = 0x1902,
    DEPTH_COMPONENT16 = 0x81a5,
    DEPTH_COMPONENT24 = 0x81a6,
    DEPTH_COMPONENT32F = 0x8cac,
    DEPTH_STENCIL = 0x84f9,
    DEPTH24_STENCIL8 = 0x88f0,
    DEPTH32F_STENCIL8 = 0x8cad,
    LUMINANCE = 0x1909,
    LUMINANCE_ALPHA = 0x190a,
    R11F_G11F_B10F = 0x8c3a,
    R16F = 0x822d,
    R16I = 0x8233,
    R16UI = 0x8234,
    R32F = 0x822e,
    R32I = 0x8235,
    R32UI = 0x8236,
    R8 = 0x8229,
    R8_SNORM = 0x8f94,
    R8I = 0x8231,
    R8UI = 0x8232,
    RED = 0x1903,
    RED_INTEGER = 0x8d94,
    RG = 0x8227,
    RG_INTEGER = 0x8228,
    RG16F = 0x822f,
    RG16I = 0x8239,
    RG16UI = 0x823a,
    RG32F = 0x8230,
    RG32I = 0x823b,
    RG32UI = 0x823c,
    RG8 = 0x822b,
    RG8_SNORM = 0x8f95,
    RG8I = 0x8237,
    RG8UI = 0x8238,
    RGB = 0x1907,
    RGB_INTEGER = 0x8d98,
    RGB10_A2 = 0x8059,
    RGB10_A2UI = 0x906f,
    RGB16F = 0x881b,
    RGB16I = 0x8d89,
    RGB16UI = 0x8d77,
    RGB32F = 0x8815,
    RGB32I = 0x8d83,
    RGB32UI = 0x8d71,
    RGB5_A1 = 0x8057,
    RGB565 = 0x8d62,
    RGB8 = 0x8051,
    RGB8_SNORM = 0x8f96,
    RGB8I = 0x8d8f,
    RGB8UI = 0x8d7d,
    RGB9_E5 = 0x8c3d,
    RGBA = 0x1908,
    RGBA_INTEGER = 0x8d99,
    RGBA16F = 0x881a,
    RGBA16I = 0x8d88,
    RGBA16UI = 0x8d76,
    RGBA32F = 0x8814,
    RGBA32I = 0x8d82,
    RGBA32UI = 0x8d70,
    RGBA4 = 0x8056,
    RGBA8 = 0x8058,
    RGBA8_SNORM = 0x8f97,
    RGBA8I = 0x8d8e,
    RGBA8UI = 0x8d7c,
    SRGB8 = 0x8c41,
    SRGB8_ALPHA8 = 0x8c43
}

export const enum TextureType {
    BYTE = 0x1400,
    UNSIGNED_BYTE,
    SHORT,
    UNSIGNED_SHORT,
    INT,
    UNSIGNED_INT,
    FLOAT,
    HALF_FLOAT = 0x140b,
    UNSIGNED_SHORT_4_4_4_4 = 0x8033,
    UNSIGNED_SHORT_5_5_5_1 = 0x8034,
    UNSIGNED_SHORT_5_6_5 = 0x8363,
    UNSIGNED_INT_2_10_10_10_REV = 0x8368,
    UNSIGNED_INT_24_8 = 0x84fa,
    UNSIGNED_INT_10F_11F_11F_REV = 0x8c3b,
    UNSIGNED_INT_5_9_9_9_REV = 0x8c3e,
    HALF_FLOAT_OES = 0x8d61,
    FLOAT_32_UNSIGNED_INT_24_8_REV = 0x8dad
}

export interface TextureFormatDecl {
    /**
     * Base format
     */
    format: TextureFormat;
    /**
     * Acceptable types and their byte sizes
     */
    types: { [id: number]: number };
    /**
     * Number of color components
     */
    num: number;
    /**
     * Format is renderable
     */
    render?: boolean;
    /**
     * Format is filterable (other than GL_NEAREST)
     */
    filter?: boolean;
    /**
     * WebGL 2 only
     */
    gl2?: boolean;
}

export const TEX_FORMATS: IObjectOf<TextureFormatDecl> = {
    [TextureFormat.ALPHA]: {
        format: TextureFormat.ALPHA,
        render: true,
        filter: true,
        num: 1,
        types: {
            [TextureType.UNSIGNED_BYTE]: 1,
            [TextureType.HALF_FLOAT]: 2,
            [TextureType.HALF_FLOAT_OES]: 2,
            [TextureType.FLOAT]: 4
        }
    },
    [TextureFormat.DEPTH_COMPONENT16]: {
        format: TextureFormat.DEPTH_COMPONENT,
        render: true,
        num: 1,
        types: {
            [TextureType.UNSIGNED_SHORT]: 2,
            [TextureType.UNSIGNED_INT]: 4
        }
    },
    [TextureFormat.DEPTH_COMPONENT24]: {
        format: TextureFormat.DEPTH_COMPONENT,
        render: true,
        num: 1,
        types: { [TextureType.UNSIGNED_INT]: 4 }
    },
    [TextureFormat.DEPTH_COMPONENT32F]: {
        format: TextureFormat.DEPTH_COMPONENT,
        render: true,
        num: 1,
        types: { [TextureType.FLOAT]: 4 }
    },
    [TextureFormat.DEPTH24_STENCIL8]: {
        format: TextureFormat.DEPTH_STENCIL,
        render: true,
        num: 1,
        types: { [TextureType.UNSIGNED_INT_24_8]: 4 }
    },
    [TextureFormat.DEPTH32F_STENCIL8]: {
        format: TextureFormat.DEPTH_STENCIL,
        render: true,
        num: 1,
        types: { [TextureType.FLOAT_32_UNSIGNED_INT_24_8_REV]: 4 }
    },
    [TextureFormat.LUMINANCE_ALPHA]: {
        format: TextureFormat.LUMINANCE_ALPHA,
        render: true,
        filter: true,
        num: 2,
        types: {
            [TextureType.UNSIGNED_BYTE]: 2,
            [TextureType.HALF_FLOAT]: 4,
            [TextureType.HALF_FLOAT_OES]: 4,
            [TextureType.FLOAT]: 8
        }
    },
    [TextureFormat.LUMINANCE]: {
        format: TextureFormat.LUMINANCE,
        render: true,
        filter: true,
        num: 1,
        types: {
            [TextureType.UNSIGNED_BYTE]: 1,
            [TextureType.HALF_FLOAT]: 2,
            [TextureType.HALF_FLOAT_OES]: 2,
            [TextureType.FLOAT]: 4
        }
    },
    [TextureFormat.R11F_G11F_B10F]: {
        format: TextureFormat.RGB,
        filter: true,
        num: 3,
        types: {
            [TextureType.FLOAT]: 12,
            [TextureType.HALF_FLOAT]: 6,
            [TextureType.UNSIGNED_INT_10F_11F_11F_REV]: 4
        }
    },
    [TextureFormat.R16F]: {
        format: TextureFormat.RED,
        filter: true,
        num: 1,
        types: { [TextureType.FLOAT]: 4, [TextureType.HALF_FLOAT]: 2 }
    },
    [TextureFormat.R16I]: {
        format: TextureFormat.RED_INTEGER,
        render: true,
        num: 1,
        types: { [TextureType.SHORT]: 2 }
    },
    [TextureFormat.R16UI]: {
        format: TextureFormat.RED_INTEGER,
        render: true,
        num: 1,
        types: { [TextureType.UNSIGNED_SHORT]: 2 }
    },
    [TextureFormat.R32F]: {
        format: TextureFormat.RED,
        num: 1,
        types: { [TextureType.FLOAT]: 4 }
    },
    [TextureFormat.R32I]: {
        format: TextureFormat.RED_INTEGER,
        render: true,
        num: 1,
        types: { [TextureType.INT]: 4 }
    },
    [TextureFormat.R32UI]: {
        format: TextureFormat.RED_INTEGER,
        render: true,
        num: 1,
        types: { [TextureType.UNSIGNED_INT]: 4 }
    },
    [TextureFormat.R8_SNORM]: {
        format: TextureFormat.RED,
        filter: true,
        num: 1,
        types: { [TextureType.BYTE]: 1 }
    },
    [TextureFormat.R8]: {
        format: TextureFormat.RED,
        render: true,
        filter: true,
        num: 1,
        types: { [TextureType.UNSIGNED_BYTE]: 1 }
    },
    [TextureFormat.R8I]: {
        format: TextureFormat.RED_INTEGER,
        render: true,
        num: 1,
        types: { [TextureType.BYTE]: 1 }
    },
    [TextureFormat.R8UI]: {
        format: TextureFormat.RED_INTEGER,
        render: true,
        num: 1,
        types: { [TextureType.UNSIGNED_BYTE]: 1 }
    },
    [TextureFormat.RG16F]: {
        format: TextureFormat.RG,
        filter: true,
        num: 2,
        types: { [TextureType.FLOAT]: 8, [TextureType.HALF_FLOAT]: 4 }
    },
    [TextureFormat.RG16I]: {
        format: TextureFormat.RG_INTEGER,
        render: true,
        num: 2,
        types: { [TextureType.SHORT]: 4 }
    },
    [TextureFormat.RG16UI]: {
        format: TextureFormat.RG_INTEGER,
        render: true,
        num: 2,
        types: { [TextureType.UNSIGNED_SHORT]: 4 }
    },
    [TextureFormat.RG32F]: {
        format: TextureFormat.RG,
        num: 2,
        types: { [TextureType.FLOAT]: 8 }
    },
    [TextureFormat.RG32I]: {
        format: TextureFormat.RG_INTEGER,
        render: true,
        num: 2,
        types: { [TextureType.INT]: 8 }
    },
    [TextureFormat.RG32UI]: {
        format: TextureFormat.RG_INTEGER,
        render: true,
        num: 2,
        types: { [TextureType.UNSIGNED_INT]: 8 }
    },
    [TextureFormat.RG8_SNORM]: {
        format: TextureFormat.RG,
        filter: true,
        num: 2,
        types: { [TextureType.BYTE]: 2 }
    },
    [TextureFormat.RG8]: {
        format: TextureFormat.RG,
        render: true,
        filter: true,
        num: 2,
        types: { [TextureType.UNSIGNED_BYTE]: 2 }
    },
    [TextureFormat.RG8I]: {
        format: TextureFormat.RG_INTEGER,
        render: true,
        num: 2,
        types: { [TextureType.BYTE]: 2 }
    },
    [TextureFormat.RG8UI]: {
        format: TextureFormat.RG_INTEGER,
        render: true,
        num: 2,
        types: { [TextureType.UNSIGNED_BYTE]: 2 }
    },
    [TextureFormat.RGB]: {
        format: TextureFormat.RGB,
        render: true,
        filter: true,
        num: 3,
        types: {
            [TextureType.UNSIGNED_BYTE]: 3,
            [TextureType.HALF_FLOAT]: 6,
            [TextureType.HALF_FLOAT_OES]: 6,
            [TextureType.FLOAT]: 12,
            [TextureType.UNSIGNED_SHORT_5_6_5]: 2
        }
    },
    [TextureFormat.RGB10_A2]: {
        format: TextureFormat.RGBA,
        render: true,
        filter: true,
        num: 4,
        types: { [TextureType.UNSIGNED_INT_2_10_10_10_REV]: 4 }
    },
    [TextureFormat.RGB10_A2UI]: {
        format: TextureFormat.RGBA_INTEGER,
        render: true,
        num: 4,
        types: { [TextureType.UNSIGNED_INT_2_10_10_10_REV]: 4 }
    },
    [TextureFormat.RGB16F]: {
        format: TextureFormat.RGB,
        filter: true,
        num: 3,
        types: { [TextureType.FLOAT]: 12, [TextureType.HALF_FLOAT]: 6 }
    },
    [TextureFormat.RGB16I]: {
        format: TextureFormat.RGB_INTEGER,
        num: 3,
        types: { [TextureType.SHORT]: 6 }
    },
    [TextureFormat.RGB16UI]: {
        format: TextureFormat.RGB_INTEGER,
        num: 3,
        types: { [TextureType.UNSIGNED_SHORT]: 6 }
    },
    [TextureFormat.RGB32F]: {
        format: TextureFormat.RGB,
        num: 3,
        types: { [TextureType.FLOAT]: 12 }
    },
    [TextureFormat.RGB32I]: {
        format: TextureFormat.RGB_INTEGER,
        num: 3,
        types: { [TextureType.INT]: 12 }
    },
    [TextureFormat.RGB32UI]: {
        format: TextureFormat.RGB_INTEGER,
        num: 3,
        types: { [TextureType.UNSIGNED_INT]: 12 }
    },
    [TextureFormat.RGB5_A1]: {
        format: TextureFormat.RGBA,
        render: true,
        filter: true,
        num: 4,
        types: {
            [TextureType.UNSIGNED_BYTE]: 4,
            [TextureType.UNSIGNED_SHORT_5_5_5_1]: 2,
            [TextureType.UNSIGNED_INT_2_10_10_10_REV]: 4
        }
    },
    [TextureFormat.RGB565]: {
        format: TextureFormat.RGB,
        render: true,
        filter: true,
        num: 3,
        types: {
            [TextureType.UNSIGNED_BYTE]: 3,
            [TextureType.UNSIGNED_SHORT_5_6_5]: 2
        }
    },
    [TextureFormat.RGB8_SNORM]: {
        format: TextureFormat.RGB,
        filter: true,
        num: 3,
        types: { [TextureType.BYTE]: 3 }
    },
    [TextureFormat.RGB8]: {
        format: TextureFormat.RGB,
        render: true,
        filter: true,
        num: 3,
        types: { [TextureType.UNSIGNED_BYTE]: 3 }
    },
    [TextureFormat.RGB8I]: {
        format: TextureFormat.RGB_INTEGER,
        num: 3,
        types: { [TextureType.BYTE]: 3 }
    },
    [TextureFormat.RGB8UI]: {
        format: TextureFormat.RGB_INTEGER,
        num: 3,
        types: { [TextureType.UNSIGNED_BYTE]: 3 }
    },
    [TextureFormat.RGB9_E5]: {
        format: TextureFormat.RGB,
        filter: true,
        num: 3,
        types: {
            [TextureType.FLOAT]: 12,
            [TextureType.HALF_FLOAT]: 6,
            [TextureType.UNSIGNED_INT_5_9_9_9_REV]: 4
        }
    },
    [TextureFormat.RGBA]: {
        format: TextureFormat.RGBA,
        render: true,
        filter: true,
        num: 4,
        types: {
            [TextureType.UNSIGNED_BYTE]: 4,
            [TextureType.HALF_FLOAT]: 8,
            [TextureType.HALF_FLOAT_OES]: 8,
            [TextureType.FLOAT]: 16,
            [TextureType.UNSIGNED_SHORT_4_4_4_4]: 2,
            [TextureType.UNSIGNED_SHORT_5_5_5_1]: 2
        }
    },
    [TextureFormat.RGBA16F]: {
        format: TextureFormat.RGBA,
        filter: true,
        num: 4,
        types: { [TextureType.FLOAT]: 16, [TextureType.HALF_FLOAT]: 8 }
    },
    [TextureFormat.RGBA16I]: {
        format: TextureFormat.RGBA_INTEGER,
        render: true,
        num: 4,
        types: { [TextureType.SHORT]: 8 }
    },
    [TextureFormat.RGBA16UI]: {
        format: TextureFormat.RGBA_INTEGER,
        render: true,
        num: 4,
        types: { [TextureType.UNSIGNED_SHORT]: 8 }
    },
    [TextureFormat.RGBA32F]: {
        format: TextureFormat.RGBA,
        num: 4,
        types: { [TextureType.FLOAT]: 16 }
    },
    [TextureFormat.RGBA32I]: {
        format: TextureFormat.RGBA_INTEGER,
        render: true,
        num: 4,
        types: { [TextureType.INT]: 16 }
    },
    [TextureFormat.RGBA32UI]: {
        format: TextureFormat.RGBA_INTEGER,
        render: true,
        num: 4,
        types: { [TextureType.UNSIGNED_INT]: 16 }
    },
    [TextureFormat.RGBA4]: {
        format: TextureFormat.RGBA,
        render: true,
        filter: true,
        num: 4,
        types: {
            [TextureType.UNSIGNED_BYTE]: 4,
            [TextureType.UNSIGNED_SHORT_4_4_4_4]: 2
        }
    },
    [TextureFormat.RGBA8_SNORM]: {
        format: TextureFormat.RGBA,
        filter: true,
        num: 4,
        types: { [TextureType.BYTE]: 4 }
    },
    [TextureFormat.RGBA8]: {
        format: TextureFormat.RGBA,
        render: true,
        filter: true,
        num: 4,
        types: { [TextureType.UNSIGNED_BYTE]: 4 }
    },
    [TextureFormat.RGBA8I]: {
        format: TextureFormat.RGBA_INTEGER,
        render: true,
        num: 4,
        types: { [TextureType.BYTE]: 4 }
    },
    [TextureFormat.RGBA8UI]: {
        format: TextureFormat.RGBA_INTEGER,
        render: true,
        num: 4,
        types: { [TextureType.UNSIGNED_BYTE]: 4 }
    },
    [TextureFormat.SRGB8_ALPHA8]: {
        format: TextureFormat.RGBA,
        render: true,
        filter: true,
        num: 4,
        types: { [TextureType.UNSIGNED_BYTE]: 4 }
    },
    [TextureFormat.SRGB8]: {
        format: TextureFormat.RGB,
        filter: true,
        num: 3,
        types: {
            [TextureType.UNSIGNED_BYTE]: 3
        }
    }
};

export type GLSL = Type;

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
export type GLMat23 = Tuple<number, 6> | Float32Array;
export type GLMat24 = Tuple<number, 8> | Float32Array;
export type GLMat34 = Tuple<number, 12> | Float32Array;

export type AttribType = "bool" | "float" | "int" | "vec2" | "vec3" | "vec4";

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
    UniformValue | Fn2<ShaderUniforms, any, UniformValue> | IDeref<UniformValue>
>;

export type ShaderType = "vs" | "fs";

export type GLSLScalarType =
    | "bool"
    | "float"
    | "int"
    | "uint"
    | "sampler2D"
    | "samplerCube";

export type GLSLArrayType =
    | "bool[]"
    | "int[]"
    | "uint[]"
    | "float[]"
    | "bvec2[]"
    | "bvec3[]"
    | "bvec4[]"
    | "ivec2[]"
    | "ivec3[]"
    | "ivec4[]"
    | "uvec2[]"
    | "uvec3[]"
    | "uvec4[]"
    | "vec2[]"
    | "vec3[]"
    | "vec4[]"
    | "mat2[]"
    | "mat3[]"
    | "mat4[]"
    // | "mat2x3[]"
    // | "mat2x4[]"
    // | "mat3x2[]"
    // | "mat3x4[]"
    // | "mat4x2[]"
    // | "mat4x3[]"
    | "sampler2D[]"
    | "sampler3D[]"
    | "samplerCube[]";

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
    | ["sampler2D[]", number, UniformDefault<number>?]
    | ["sampler3D[]", number, UniformDefault<number>?]
    | ["samplerCube[]", number, UniformDefault<number>?];

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

export type GLSLExtensionBehavior = "require" | "warn" | boolean;

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
    ext?: IObjectOf<GLSLExtensionBehavior>;
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
    blendFn: Tuple<GLenum, 2>;
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
    uv: string;
    material: Partial<T>;
    state: Partial<ShaderState>;
}

export interface IShader extends IBind<ModelSpec>, IRelease {
    gl: WebGLRenderingContext;
    attribs: IObjectOf<ShaderAttrib>;
    uniforms: ShaderUniforms;

    bindAttribs(specAttribs: ModelAttributeSpecs): void;
    bindUniforms(specUnis: UniformValues): void;
    prepareState(state?: Partial<ShaderState>): void;
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
     * Geometry attributes given as `AttribPool` instance.
     */
    attribPool?: AttribPool;
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
     * WebGL draw mode. Defaults to `TRIANGLES`
     */
    mode?: GLenum;
    /**
     * Number of vertices/indices to draw
     */
    num: number;
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
    data?: AttribBufferData;
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
    num: number;
}

export interface TextureOpts {
    image: ArrayBufferView | TexImageSource | null;
    target: GLenum;
    type: GLenum;
    filter: GLenum | [GLenum, GLenum?];
    wrap: GLenum | [GLenum, GLenum?, GLenum?];
    lod: [GLenum, GLenum?];
    minMaxLevel: [GLenum, GLenum];
    level: GLenum;
    format: GLenum;
    internalFormat: GLenum;
    width: number;
    height: number;
    mipmap: boolean;
    flip: boolean;
    premultiply: boolean;
    sub: boolean;
    pos: number[];
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
    depth?: ITexture | IRenderBuffer;
}

export interface RboOpts {
    format?: number;
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
    ext: (keyof WebGLExtensionMap)[];
}

export interface GPGPUOpts {
    size: number;
    inputs?: number | GPGPUTextureConfig[];
    outputs?: number | GPGPUTextureConfig[];
    gl?: WebGLRenderingContext;
    version?: 1 | 2;
}

export interface GPGPUTextureConfig
    extends Partial<
        Pick<TextureOpts, "internalFormat" | "format" | "type" | "flip">
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

export const GL_COLOR_ATTACHMENT0_WEBGL = 0x8ce0;
export const GL_MAX_COLOR_ATTACHMENTS_WEBGL = 0x8cdf;
export const GL_RGBA = 0x1908;
export const GL_RGBA32F = 0x8814;

// [SRC_ALPHA, ONE_MINUS_SRC_ALPHA]
export const DEFAULT_BLEND: Tuple<GLenum, 2> = [0x302, 0x303];

export const GL_EXT_INFO = {
    WEBGL_draw_buffers: {
        gl: true,
        alias: "GL_EXT_draw_buffers"
    },
    OES_standard_derivatives: {
        gl: true,
        alias: "GL_OES_standard_derivatives"
    }
};

export interface WebGLExtensionMap {
    EXT_blend_minmax: EXT_blend_minmax;
    EXT_color_buffer_float: WEBGL_color_buffer_float;
    EXT_texture_filter_anisotropic: EXT_texture_filter_anisotropic;
    EXT_frag_depth: EXT_frag_depth;
    EXT_shader_texture_lod: EXT_shader_texture_lod;
    EXT_sRGB: EXT_sRGB;
    OES_vertex_array_object: OES_vertex_array_object;
    WEBGL_color_buffer_float: WEBGL_color_buffer_float;
    WEBGL_compressed_texture_astc: WEBGL_compressed_texture_astc;
    WEBGL_compressed_texture_s3tc_srgb: WEBGL_compressed_texture_s3tc_srgb;
    WEBGL_debug_shaders: WEBGL_debug_shaders;
    WEBGL_draw_buffers: WEBGL_draw_buffers;
    WEBGL_lose_context: WEBGL_lose_context;
    WEBGL_depth_texture: WEBGL_depth_texture;
    WEBGL_debug_renderer_info: WEBGL_debug_renderer_info;
    WEBGL_compressed_texture_s3tc: WEBGL_compressed_texture_s3tc;
    OES_texture_half_float_linear: OES_texture_half_float_linear;
    OES_texture_half_float: OES_texture_half_float;
    OES_texture_float_linear: OES_texture_float_linear;
    OES_texture_float: OES_texture_float;
    OES_standard_derivatives: OES_standard_derivatives;
    OES_element_index_uint: OES_element_index_uint;
    ANGLE_instanced_arrays: ANGLE_instanced_arrays;
}
