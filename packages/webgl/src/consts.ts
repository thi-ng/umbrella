import { IObjectOf } from "@thi.ng/api";

export enum Format {
    RED = 6403,
    R11F_G11F_B10F = 35898,
    R16F = 33325,
    R16I = 33331,
    R16UI = 33332,
    R32F = 33326,
    R32I = 33333,
    R32UI = 33334,
    R8_SNORM = 36756,
    R8 = 33321,
    R8I = 33329,
    R8UI = 33330,
    RG = 33319,
    RG16F = 33327,
    RG16I = 33337,
    RG16UI = 33338,
    RG32F = 33328,
    RG32I = 33339,
    RG32UI = 33340,
    RG8_SNORM = 36757,
    RG8 = 33323,
    RG8I = 33335,
    RG8UI = 33336,
    RGB_INTEGER = 36248,
    RGB = 6407,
    RGB10_A2 = 32857,
    RGB10_A2UI = 36975,
    RGB16F = 34843,
    RGB16I = 36233,
    RGB16UI = 36215,
    RGB32F = 34837,
    RGB32I = 36227,
    RGB32UI = 36209,
    RGB5_A1 = 32855,
    RGB565 = 36194,
    RGB8_SNORM = 36758,
    RGB8 = 32849,
    RGB8I = 36239,
    RGB8UI = 36221,
    RGB9_E5 = 35901,
    RGBA_INTEGER = 36249,
    RGBA = 6408,
    RGBA16F = 34842,
    RGBA16I = 36232,
    RGBA16UI = 36214,
    RGBA32F = 34836,
    RGBA32I = 36226,
    RGBA32UI = 36208,
    RGBA4 = 32854,
    RGBA8_SNORM = 36759,
    RGBA8 = 32856,
    RGBA8I = 36238,
    RGBA8UI = 36220
}

export const enum Type {
    BYTE = 5120,
    UNSIGNED_BYTE,
    SHORT,
    UNSIGNED_SHORT,
    INT,
    UNSIGNED_INT,
    FLOAT,
    HALF_FLOAT = 5131
}

export interface TextureFormat {
    /**
     * Base format
     */
    format: GLenum;
    /**
     * Color component type
     */
    type: GLenum;
    /**
     * Bytes per pixel (in JS land)
     */
    size: number;
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

// prettier-ignore
export const TEX_FORMATS: IObjectOf<TextureFormat> = {
    [Format.R8]:         { format: Format.RED, type: Type.UNSIGNED_BYTE, size: 1, render: true, filter: true },
    [Format.R8_SNORM]:   { format: Format.RED, type: Type.BYTE, size: 1, filter: true },
    [Format.RG8]:        { format: Format.RG, type: Type.UNSIGNED_BYTE, size: 2, render: true, filter: true },
    [Format.RG8_SNORM]:  { format: Format.RG, type: Type.BYTE, size: 2, filter: true },
    [Format.RGB8]:       { format: Format.RGB, type: Type.UNSIGNED_BYTE, size: 3, render: true, filter: true },
    [Format.RGB8_SNORM]: { format: Format.RGB, type: Type.BYTE, size: 3, filter: true },
    [Format.R16F]:       { format: Format.RED, type: Type.FLOAT, size: 4, filter: true },
    [Format.R32F]:       { format: Format.RED, type: Type.FLOAT, size: 4, filter: true },
    [Format.RGBA]:       { format: Format.RGBA, type: Type.UNSIGNED_BYTE, size: 4, render: true, filter: true },
    [Format.RGBA16F]:    { format: Format.RGBA, type: Type.FLOAT, size: 3, gl2: true },
    [Format.RGBA32F]:    { format: Format.RGBA, type: Type.FLOAT, size: 16, gl2: true },
};
