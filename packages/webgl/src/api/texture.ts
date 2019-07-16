import { IBind, IObjectOf, IRelease } from "@thi.ng/api";
import { IConfigure } from "./buffers";

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

export const enum TextureTarget {
    TEXTURE_2D = 3553,
    TEXTURE_3D = 32879,
    TEXTURE_CUBE_MAP = 34067,
    TEXTURE_2D_ARRAY = 35866
}

export const enum TextureFilter {
    LINEAR = 9729,
    NEAREST = 9728,
    NEAREST_MIPMAP_NEAREST = 9984,
    LINEAR_MIPMAP_NEAREST = 9985,
    NEAREST_MIPMAP_LINEAR = 9986,
    LINEAR_MIPMAP_LINEAR = 9987
}

export const enum TextureRepeat {
    REPEAT = 10497,
    CLAMP = 33071,
    REPEAT_MIRROR = 33648
}

export interface TextureFormatDecl {
    /**
     * Base format
     */
    format: TextureFormat;
    /**
     * Acceptable types and their resulting byte size per pixel.
     * Interleaved layout `[format, size, format, size...]`
     */
    types: (TextureType | number)[];
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
        types: [
            TextureType.UNSIGNED_BYTE,
            1,
            TextureType.HALF_FLOAT,
            2,
            TextureType.HALF_FLOAT_OES,
            2,
            TextureType.FLOAT,
            4
        ]
    },
    [TextureFormat.DEPTH_COMPONENT16]: {
        format: TextureFormat.DEPTH_COMPONENT,
        render: true,
        num: 1,
        types: [TextureType.UNSIGNED_SHORT, 2, TextureType.UNSIGNED_INT, 4]
    },
    [TextureFormat.DEPTH_COMPONENT24]: {
        format: TextureFormat.DEPTH_COMPONENT,
        render: true,
        num: 1,
        types: [TextureType.UNSIGNED_INT, 4]
    },
    [TextureFormat.DEPTH_COMPONENT32F]: {
        format: TextureFormat.DEPTH_COMPONENT,
        render: true,
        num: 1,
        types: [TextureType.FLOAT, 4]
    },
    [TextureFormat.DEPTH24_STENCIL8]: {
        format: TextureFormat.DEPTH_STENCIL,
        render: true,
        num: 1,
        types: [TextureType.UNSIGNED_INT_24_8, 4]
    },
    [TextureFormat.DEPTH32F_STENCIL8]: {
        format: TextureFormat.DEPTH_STENCIL,
        render: true,
        num: 1,
        types: [TextureType.FLOAT_32_UNSIGNED_INT_24_8_REV, 4]
    },
    [TextureFormat.LUMINANCE_ALPHA]: {
        format: TextureFormat.LUMINANCE_ALPHA,
        render: true,
        filter: true,
        num: 2,
        types: [
            TextureType.UNSIGNED_BYTE,
            2,
            TextureType.HALF_FLOAT,
            4,
            TextureType.HALF_FLOAT_OES,
            4,
            TextureType.FLOAT,
            8
        ]
    },
    [TextureFormat.LUMINANCE]: {
        format: TextureFormat.LUMINANCE,
        render: true,
        filter: true,
        num: 1,
        types: [
            TextureType.UNSIGNED_BYTE,
            1,
            TextureType.HALF_FLOAT,
            2,
            TextureType.HALF_FLOAT_OES,
            2,
            TextureType.FLOAT,
            4
        ]
    },
    [TextureFormat.R11F_G11F_B10F]: {
        format: TextureFormat.RGB,
        filter: true,
        num: 3,
        types: [
            TextureType.FLOAT,
            12,
            TextureType.HALF_FLOAT,
            6,
            TextureType.UNSIGNED_INT_10F_11F_11F_REV,
            4
        ]
    },
    [TextureFormat.R16F]: {
        format: TextureFormat.RED,
        filter: true,
        num: 1,
        types: [TextureType.FLOAT, 4, TextureType.HALF_FLOAT, 2]
    },
    [TextureFormat.R16I]: {
        format: TextureFormat.RED_INTEGER,
        render: true,
        num: 1,
        types: [TextureType.SHORT, 2]
    },
    [TextureFormat.R16UI]: {
        format: TextureFormat.RED_INTEGER,
        render: true,
        num: 1,
        types: [TextureType.UNSIGNED_SHORT, 2]
    },
    [TextureFormat.R32F]: {
        format: TextureFormat.RED,
        num: 1,
        types: [TextureType.FLOAT, 4]
    },
    [TextureFormat.R32I]: {
        format: TextureFormat.RED_INTEGER,
        render: true,
        num: 1,
        types: [TextureType.INT, 4]
    },
    [TextureFormat.R32UI]: {
        format: TextureFormat.RED_INTEGER,
        render: true,
        num: 1,
        types: [TextureType.UNSIGNED_INT, 4]
    },
    [TextureFormat.R8_SNORM]: {
        format: TextureFormat.RED,
        filter: true,
        num: 1,
        types: [TextureType.BYTE, 1]
    },
    [TextureFormat.R8]: {
        format: TextureFormat.RED,
        render: true,
        filter: true,
        num: 1,
        types: [TextureType.UNSIGNED_BYTE, 1]
    },
    [TextureFormat.R8I]: {
        format: TextureFormat.RED_INTEGER,
        render: true,
        num: 1,
        types: [TextureType.BYTE, 1]
    },
    [TextureFormat.R8UI]: {
        format: TextureFormat.RED_INTEGER,
        render: true,
        num: 1,
        types: [TextureType.UNSIGNED_BYTE, 1]
    },
    [TextureFormat.RG16F]: {
        format: TextureFormat.RG,
        filter: true,
        num: 2,
        types: [TextureType.FLOAT, 8, TextureType.HALF_FLOAT, 4]
    },
    [TextureFormat.RG16I]: {
        format: TextureFormat.RG_INTEGER,
        render: true,
        num: 2,
        types: [TextureType.SHORT, 4]
    },
    [TextureFormat.RG16UI]: {
        format: TextureFormat.RG_INTEGER,
        render: true,
        num: 2,
        types: [TextureType.UNSIGNED_SHORT, 4]
    },
    [TextureFormat.RG32F]: {
        format: TextureFormat.RG,
        num: 2,
        types: [TextureType.FLOAT, 8]
    },
    [TextureFormat.RG32I]: {
        format: TextureFormat.RG_INTEGER,
        render: true,
        num: 2,
        types: [TextureType.INT, 8]
    },
    [TextureFormat.RG32UI]: {
        format: TextureFormat.RG_INTEGER,
        render: true,
        num: 2,
        types: [TextureType.UNSIGNED_INT, 8]
    },
    [TextureFormat.RG8_SNORM]: {
        format: TextureFormat.RG,
        filter: true,
        num: 2,
        types: [TextureType.BYTE, 2]
    },
    [TextureFormat.RG8]: {
        format: TextureFormat.RG,
        render: true,
        filter: true,
        num: 2,
        types: [TextureType.UNSIGNED_BYTE, 2]
    },
    [TextureFormat.RG8I]: {
        format: TextureFormat.RG_INTEGER,
        render: true,
        num: 2,
        types: [TextureType.BYTE, 2]
    },
    [TextureFormat.RG8UI]: {
        format: TextureFormat.RG_INTEGER,
        render: true,
        num: 2,
        types: [TextureType.UNSIGNED_BYTE, 2]
    },
    [TextureFormat.RGB]: {
        format: TextureFormat.RGB,
        render: true,
        filter: true,
        num: 3,
        types: [
            TextureType.UNSIGNED_BYTE,
            3,
            TextureType.HALF_FLOAT,
            6,
            TextureType.HALF_FLOAT_OES,
            6,
            TextureType.FLOAT,
            12,
            TextureType.UNSIGNED_SHORT_5_6_5,
            2
        ]
    },
    [TextureFormat.RGB10_A2]: {
        format: TextureFormat.RGBA,
        render: true,
        filter: true,
        num: 4,
        types: [TextureType.UNSIGNED_INT_2_10_10_10_REV, 4]
    },
    [TextureFormat.RGB10_A2UI]: {
        format: TextureFormat.RGBA_INTEGER,
        render: true,
        num: 4,
        types: [TextureType.UNSIGNED_INT_2_10_10_10_REV, 4]
    },
    [TextureFormat.RGB16F]: {
        format: TextureFormat.RGB,
        filter: true,
        num: 3,
        types: [TextureType.FLOAT, 12, TextureType.HALF_FLOAT, 6]
    },
    [TextureFormat.RGB16I]: {
        format: TextureFormat.RGB_INTEGER,
        num: 3,
        types: [TextureType.SHORT, 6]
    },
    [TextureFormat.RGB16UI]: {
        format: TextureFormat.RGB_INTEGER,
        num: 3,
        types: [TextureType.UNSIGNED_SHORT, 6]
    },
    [TextureFormat.RGB32F]: {
        format: TextureFormat.RGB,
        num: 3,
        types: [TextureType.FLOAT, 12]
    },
    [TextureFormat.RGB32I]: {
        format: TextureFormat.RGB_INTEGER,
        num: 3,
        types: [TextureType.INT, 12]
    },
    [TextureFormat.RGB32UI]: {
        format: TextureFormat.RGB_INTEGER,
        num: 3,
        types: [TextureType.UNSIGNED_INT, 12]
    },
    [TextureFormat.RGB5_A1]: {
        format: TextureFormat.RGBA,
        render: true,
        filter: true,
        num: 4,
        types: [
            TextureType.UNSIGNED_BYTE,
            4,
            TextureType.UNSIGNED_SHORT_5_5_5_1,
            2,
            TextureType.UNSIGNED_INT_2_10_10_10_REV,
            4
        ]
    },
    [TextureFormat.RGB565]: {
        format: TextureFormat.RGB,
        render: true,
        filter: true,
        num: 3,
        types: [
            TextureType.UNSIGNED_BYTE,
            3,
            TextureType.UNSIGNED_SHORT_5_6_5,
            2
        ]
    },
    [TextureFormat.RGB8_SNORM]: {
        format: TextureFormat.RGB,
        filter: true,
        num: 3,
        types: [TextureType.BYTE, 3]
    },
    [TextureFormat.RGB8]: {
        format: TextureFormat.RGB,
        render: true,
        filter: true,
        num: 3,
        types: [TextureType.UNSIGNED_BYTE, 3]
    },
    [TextureFormat.RGB8I]: {
        format: TextureFormat.RGB_INTEGER,
        num: 3,
        types: [TextureType.BYTE, 3]
    },
    [TextureFormat.RGB8UI]: {
        format: TextureFormat.RGB_INTEGER,
        num: 3,
        types: [TextureType.UNSIGNED_BYTE, 3]
    },
    [TextureFormat.RGB9_E5]: {
        format: TextureFormat.RGB,
        filter: true,
        num: 3,
        types: [
            TextureType.FLOAT,
            12,
            TextureType.HALF_FLOAT,
            6,
            TextureType.UNSIGNED_INT_5_9_9_9_REV,
            4
        ]
    },
    [TextureFormat.RGBA]: {
        format: TextureFormat.RGBA,
        render: true,
        filter: true,
        num: 4,
        types: [
            TextureType.UNSIGNED_BYTE,
            4,
            TextureType.HALF_FLOAT,
            8,
            TextureType.HALF_FLOAT_OES,
            8,
            TextureType.FLOAT,
            16,
            TextureType.UNSIGNED_SHORT_4_4_4_4,
            2,
            TextureType.UNSIGNED_SHORT_5_5_5_1,
            2
        ]
    },
    [TextureFormat.RGBA16F]: {
        format: TextureFormat.RGBA,
        filter: true,
        num: 4,
        types: [TextureType.FLOAT, 16, TextureType.HALF_FLOAT, 8]
    },
    [TextureFormat.RGBA16I]: {
        format: TextureFormat.RGBA_INTEGER,
        render: true,
        num: 4,
        types: [TextureType.SHORT, 8]
    },
    [TextureFormat.RGBA16UI]: {
        format: TextureFormat.RGBA_INTEGER,
        render: true,
        num: 4,
        types: [TextureType.UNSIGNED_SHORT, 8]
    },
    [TextureFormat.RGBA32F]: {
        format: TextureFormat.RGBA,
        num: 4,
        types: [TextureType.FLOAT, 16]
    },
    [TextureFormat.RGBA32I]: {
        format: TextureFormat.RGBA_INTEGER,
        render: true,
        num: 4,
        types: [TextureType.INT, 16]
    },
    [TextureFormat.RGBA32UI]: {
        format: TextureFormat.RGBA_INTEGER,
        render: true,
        num: 4,
        types: [TextureType.UNSIGNED_INT, 16]
    },
    [TextureFormat.RGBA4]: {
        format: TextureFormat.RGBA,
        render: true,
        filter: true,
        num: 4,
        types: [
            TextureType.UNSIGNED_BYTE,
            4,
            TextureType.UNSIGNED_SHORT_4_4_4_4,
            2
        ]
    },
    [TextureFormat.RGBA8_SNORM]: {
        format: TextureFormat.RGBA,
        filter: true,
        num: 4,
        types: [TextureType.BYTE, 4]
    },
    [TextureFormat.RGBA8]: {
        format: TextureFormat.RGBA,
        render: true,
        filter: true,
        num: 4,
        types: [TextureType.UNSIGNED_BYTE, 4]
    },
    [TextureFormat.RGBA8I]: {
        format: TextureFormat.RGBA_INTEGER,
        render: true,
        num: 4,
        types: [TextureType.BYTE, 4]
    },
    [TextureFormat.RGBA8UI]: {
        format: TextureFormat.RGBA_INTEGER,
        render: true,
        num: 4,
        types: [TextureType.UNSIGNED_BYTE, 4]
    },
    [TextureFormat.SRGB8_ALPHA8]: {
        format: TextureFormat.RGBA,
        render: true,
        filter: true,
        num: 4,
        types: [TextureType.UNSIGNED_BYTE, 4]
    },
    [TextureFormat.SRGB8]: {
        format: TextureFormat.RGB,
        filter: true,
        num: 3,
        types: [TextureType.UNSIGNED_BYTE, 3]
    }
};

// export const RENDERABLE_TEX_FORMATS = Object.keys(TEX_FORMATS).filter(
//     (id) => TEX_FORMATS[id].render!
// );

// export const FILTERABLE_TEX_FORMATS = Object.keys(TEX_FORMATS).filter(
//     (id) => TEX_FORMATS[id].filter!
// );

export interface TextureOpts {
    image: ArrayBufferView | TexImageSource | null;
    target: TextureTarget;
    type: TextureType;
    filter: TextureFilter | [TextureFilter, TextureFilter?];
    wrap: TextureRepeat | [TextureRepeat, TextureRepeat?, TextureRepeat?];
    lod: [number, number?];
    minMaxLevel: [number, number];
    level: number;
    format: TextureFormat;
    width: number;
    height: number;
    depth: number;
    mipmap: boolean;
    flip: boolean;
    premultiply: boolean;
    sub: boolean;
    pos: number[];
}

export interface ITexture
    extends IBind<number>,
        IConfigure<Partial<TextureOpts>>,
        IRelease {
    tex: WebGLTexture;
    target: TextureTarget;
    format: TextureFormat;
    type: TextureType;
    size: number[];
}
