import type { IBind, IObjectOf, IRelease } from "@thi.ng/api";
import type { IConfigure } from "./buffers.js";

export enum TextureFormat {
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
	SRGB8_ALPHA8 = 0x8c43,
}

export enum TextureType {
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
	FLOAT_32_UNSIGNED_INT_24_8_REV = 0x8dad,
}

export enum TextureTarget {
	TEXTURE_2D = 3553,
	TEXTURE_3D = 32879,
	TEXTURE_CUBE_MAP = 34067,
	TEXTURE_2D_ARRAY = 35866,
}

export enum TextureFilter {
	LINEAR = 9729,
	NEAREST = 9728,
	NEAREST_MIPMAP_NEAREST = 9984,
	LINEAR_MIPMAP_NEAREST = 9985,
	NEAREST_MIPMAP_LINEAR = 9986,
	LINEAR_MIPMAP_LINEAR = 9987,
}

export enum TextureRepeat {
	REPEAT = 10497,
	CLAMP = 33071,
	REPEAT_MIRROR = 33648,
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
	 * Format is renderable via extension
	 */
	renderExt?: boolean;
	/**
	 * Format is filterable (other than GL_NEAREST)
	 */
	filter?: boolean;
	/**
	 * WebGL 2 only
	 */
	gl2?: boolean;
}

const $ = (
	format: TextureFormat,
	types: (TextureType | number)[],
	num: number,
	render = false,
	filter = false,
	renderExt = render
) => ({
	format,
	types,
	render,
	renderExt,
	filter,
	num,
});

export const TEX_FORMATS: IObjectOf<TextureFormatDecl> = {
	[TextureFormat.ALPHA]: $(
		TextureFormat.ALPHA,
		[
			TextureType.UNSIGNED_BYTE,
			1,
			TextureType.HALF_FLOAT,
			2,
			TextureType.HALF_FLOAT_OES,
			2,
			TextureType.FLOAT,
			4,
		],
		1,
		true,
		true
	),
	[TextureFormat.DEPTH_COMPONENT]: $(
		TextureFormat.DEPTH_COMPONENT,
		[TextureType.UNSIGNED_SHORT, 2, TextureType.UNSIGNED_INT, 4],
		1,
		true
	),
	[TextureFormat.DEPTH_COMPONENT16]: $(
		TextureFormat.DEPTH_COMPONENT,
		[TextureType.UNSIGNED_SHORT, 2, TextureType.UNSIGNED_INT, 4],
		1,
		true
	),
	[TextureFormat.DEPTH_COMPONENT24]: $(
		TextureFormat.DEPTH_COMPONENT,
		[TextureType.UNSIGNED_INT, 4],
		1,
		true
	),
	[TextureFormat.DEPTH_COMPONENT32F]: $(
		TextureFormat.DEPTH_COMPONENT,
		[TextureType.FLOAT, 4],
		1,
		true
	),
	[TextureFormat.DEPTH_STENCIL]: $(
		TextureFormat.DEPTH_STENCIL,
		[TextureType.UNSIGNED_INT_24_8, 4],
		1,
		true
	),
	[TextureFormat.DEPTH24_STENCIL8]: $(
		TextureFormat.DEPTH_STENCIL,
		[TextureType.UNSIGNED_INT_24_8, 4],
		1,
		true
	),
	[TextureFormat.DEPTH32F_STENCIL8]: $(
		TextureFormat.DEPTH_STENCIL,
		[TextureType.FLOAT_32_UNSIGNED_INT_24_8_REV, 4],
		1,
		true
	),
	[TextureFormat.LUMINANCE_ALPHA]: $(
		TextureFormat.LUMINANCE_ALPHA,
		[
			TextureType.UNSIGNED_BYTE,
			2,
			TextureType.HALF_FLOAT,
			4,
			TextureType.HALF_FLOAT_OES,
			4,
			TextureType.FLOAT,
			8,
		],
		2,
		true,
		true
	),
	[TextureFormat.LUMINANCE]: $(
		TextureFormat.LUMINANCE,
		[
			TextureType.UNSIGNED_BYTE,
			1,
			TextureType.HALF_FLOAT,
			2,
			TextureType.HALF_FLOAT_OES,
			2,
			TextureType.FLOAT,
			4,
		],
		1,
		true,
		true
	),
	[TextureFormat.R11F_G11F_B10F]: $(
		TextureFormat.RGB,
		[
			TextureType.FLOAT,
			12,
			TextureType.HALF_FLOAT,
			6,
			TextureType.UNSIGNED_INT_10F_11F_11F_REV,
			4,
		],
		3,
		false,
		true,
		true
	),
	[TextureFormat.R16F]: $(
		TextureFormat.RED,
		[TextureType.FLOAT, 4, TextureType.HALF_FLOAT, 2],
		1,
		false,
		true,
		true
	),
	[TextureFormat.R16I]: $(
		TextureFormat.RED_INTEGER,
		[TextureType.SHORT, 2],
		1,
		true
	),
	[TextureFormat.R16UI]: $(
		TextureFormat.RED_INTEGER,
		[TextureType.UNSIGNED_SHORT, 2],
		1,
		true
	),
	[TextureFormat.R32F]: $(
		TextureFormat.RED,
		[TextureType.FLOAT, 4],
		1,
		false,
		false,
		true
	),
	[TextureFormat.R32I]: $(
		TextureFormat.RED_INTEGER,
		[TextureType.INT, 4],
		1,
		true
	),
	[TextureFormat.R32UI]: $(
		TextureFormat.RED_INTEGER,
		[TextureType.UNSIGNED_INT, 4],
		1,
		true
	),
	[TextureFormat.R8_SNORM]: $(
		TextureFormat.RED,
		[TextureType.BYTE, 1],
		1,
		false,
		true
	),
	[TextureFormat.R8]: $(
		TextureFormat.RED,
		[TextureType.UNSIGNED_BYTE, 1],
		1,
		true,
		true
	),
	[TextureFormat.R8I]: $(
		TextureFormat.RED_INTEGER,
		[TextureType.BYTE, 1],
		1,
		true
	),
	[TextureFormat.R8UI]: $(
		TextureFormat.RED_INTEGER,
		[TextureType.UNSIGNED_BYTE, 1],
		1,
		true
	),
	[TextureFormat.RG16F]: $(
		TextureFormat.RG,
		[TextureType.FLOAT, 8, TextureType.HALF_FLOAT, 4],
		2,
		false,
		true,
		true
	),
	[TextureFormat.RG16I]: $(
		TextureFormat.RG_INTEGER,
		[TextureType.SHORT, 4],
		2,
		true
	),
	[TextureFormat.RG16UI]: $(
		TextureFormat.RG_INTEGER,
		[TextureType.UNSIGNED_SHORT, 4],
		2,
		true
	),
	[TextureFormat.RG32F]: $(
		TextureFormat.RG,
		[TextureType.FLOAT, 8],
		2,
		false,
		false,
		true
	),
	[TextureFormat.RG32I]: $(
		TextureFormat.RG_INTEGER,
		[TextureType.INT, 8],
		2,
		true
	),
	[TextureFormat.RG32UI]: $(
		TextureFormat.RG_INTEGER,
		[TextureType.UNSIGNED_INT, 8],
		2,
		true
	),
	[TextureFormat.RG8_SNORM]: $(
		TextureFormat.RG,
		[TextureType.BYTE, 2],
		2,
		false,
		true
	),
	[TextureFormat.RG8]: $(
		TextureFormat.RG,
		[TextureType.UNSIGNED_BYTE, 2],
		2,
		true,
		true
	),
	[TextureFormat.RG8I]: $(
		TextureFormat.RG_INTEGER,
		[TextureType.BYTE, 2],
		2,
		true
	),
	[TextureFormat.RG8UI]: $(
		TextureFormat.RG_INTEGER,
		[TextureType.UNSIGNED_BYTE, 2],
		2,
		true
	),
	[TextureFormat.RGB]: $(
		TextureFormat.RGB,
		[
			TextureType.UNSIGNED_BYTE,
			3,
			TextureType.HALF_FLOAT,
			6,
			TextureType.HALF_FLOAT_OES,
			6,
			TextureType.FLOAT,
			12,
			TextureType.UNSIGNED_SHORT_5_6_5,
			2,
		],
		3,
		true,
		true
	),
	[TextureFormat.RGB10_A2]: $(
		TextureFormat.RGBA,
		[TextureType.UNSIGNED_INT_2_10_10_10_REV, 4],
		4,
		true,
		true
	),
	[TextureFormat.RGB10_A2UI]: $(
		TextureFormat.RGBA_INTEGER,
		[TextureType.UNSIGNED_INT_2_10_10_10_REV, 4],
		4,
		true
	),
	[TextureFormat.RGB16F]: $(
		TextureFormat.RGB,
		[TextureType.FLOAT, 12, TextureType.HALF_FLOAT, 6],
		3,
		false,
		true
	),
	[TextureFormat.RGB16I]: $(
		TextureFormat.RGB_INTEGER,
		[TextureType.SHORT, 6],
		3
	),
	[TextureFormat.RGB16UI]: $(
		TextureFormat.RGB_INTEGER,
		[TextureType.UNSIGNED_SHORT, 6],
		3
	),
	[TextureFormat.RGB32F]: $(TextureFormat.RGB, [TextureType.FLOAT, 12], 3),
	[TextureFormat.RGB32I]: $(
		TextureFormat.RGB_INTEGER,
		[TextureType.INT, 12],
		3
	),
	[TextureFormat.RGB32UI]: $(
		TextureFormat.RGB_INTEGER,
		[TextureType.UNSIGNED_INT, 12],
		3
	),
	[TextureFormat.RGB5_A1]: $(
		TextureFormat.RGBA,
		[
			TextureType.UNSIGNED_BYTE,
			4,
			TextureType.UNSIGNED_SHORT_5_5_5_1,
			2,
			TextureType.UNSIGNED_INT_2_10_10_10_REV,
			4,
		],
		4,
		true,
		true
	),
	[TextureFormat.RGB565]: $(
		TextureFormat.RGB,
		[TextureType.UNSIGNED_BYTE, 3, TextureType.UNSIGNED_SHORT_5_6_5, 2],
		3,
		true,
		true
	),
	[TextureFormat.RGB8_SNORM]: $(
		TextureFormat.RGB,
		[TextureType.BYTE, 3],
		3,
		false,
		true
	),
	[TextureFormat.RGB8]: $(
		TextureFormat.RGB,
		[TextureType.UNSIGNED_BYTE, 3],
		3,
		true,
		true
	),
	[TextureFormat.RGB8I]: $(
		TextureFormat.RGB_INTEGER,
		[TextureType.BYTE, 3],
		3
	),
	[TextureFormat.RGB8UI]: $(
		TextureFormat.RGB_INTEGER,
		[TextureType.UNSIGNED_BYTE, 3],
		3
	),
	[TextureFormat.RGB9_E5]: $(
		TextureFormat.RGB,
		[
			TextureType.FLOAT,
			12,
			TextureType.HALF_FLOAT,
			6,
			TextureType.UNSIGNED_INT_5_9_9_9_REV,
			4,
		],
		3,
		false,
		true
	),
	[TextureFormat.RGBA]: $(
		TextureFormat.RGBA,
		[
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
			2,
		],
		4,
		true,
		true
	),
	[TextureFormat.RGBA16F]: $(
		TextureFormat.RGBA,
		[TextureType.FLOAT, 16, TextureType.HALF_FLOAT, 8],
		4,
		false,
		true,
		true
	),
	[TextureFormat.RGBA16I]: $(
		TextureFormat.RGBA_INTEGER,
		[TextureType.SHORT, 8],
		4,
		true
	),
	[TextureFormat.RGBA16UI]: $(
		TextureFormat.RGBA_INTEGER,
		[TextureType.UNSIGNED_SHORT, 8],
		4,
		true
	),
	[TextureFormat.RGBA32F]: $(
		TextureFormat.RGBA,
		[TextureType.FLOAT, 16],
		4,
		false,
		false,
		true
	),
	[TextureFormat.RGBA32I]: $(
		TextureFormat.RGBA_INTEGER,
		[TextureType.INT, 16],
		4,
		true
	),
	[TextureFormat.RGBA32UI]: $(
		TextureFormat.RGBA_INTEGER,
		[TextureType.UNSIGNED_INT, 16],
		4,
		true
	),
	[TextureFormat.RGBA4]: $(
		TextureFormat.RGBA,
		[TextureType.UNSIGNED_BYTE, 4, TextureType.UNSIGNED_SHORT_4_4_4_4, 2],
		4,
		true,
		true
	),
	[TextureFormat.RGBA8_SNORM]: $(
		TextureFormat.RGBA,
		[TextureType.BYTE, 4],
		4,
		false,
		true
	),
	[TextureFormat.RGBA8]: $(
		TextureFormat.RGBA,
		[TextureType.UNSIGNED_BYTE, 4],
		4,
		true,
		true
	),
	[TextureFormat.RGBA8I]: $(
		TextureFormat.RGBA_INTEGER,
		[TextureType.BYTE, 4],
		4,
		true
	),
	[TextureFormat.RGBA8UI]: $(
		TextureFormat.RGBA_INTEGER,
		[TextureType.UNSIGNED_BYTE, 4],
		4,
		true
	),
	[TextureFormat.SRGB8_ALPHA8]: $(
		TextureFormat.RGBA,
		[TextureType.UNSIGNED_BYTE, 4],
		4,
		true,
		true
	),
	[TextureFormat.SRGB8]: $(
		TextureFormat.RGB,
		[TextureType.UNSIGNED_BYTE, 3],
		3,
		false,
		true
	),
};

export type ReadableTextureFormat =
	| TextureFormat.ALPHA
	| TextureFormat.RED
	| TextureFormat.RG
	| TextureFormat.RGB
	| TextureFormat.RGBA
	| TextureFormat.RED_INTEGER
	| TextureFormat.RG_INTEGER
	| TextureFormat.RGB_INTEGER
	| TextureFormat.RGBA_INTEGER;

// export const RENDERABLE_TEX_FORMATS = Object.keys(TEX_FORMATS).filter(
//     (id) => TEX_FORMATS[id].render!
// );

// export const FILTERABLE_TEX_FORMATS = Object.keys(TEX_FORMATS).filter(
//     (id) => TEX_FORMATS[id].filter!
// );

export interface TextureOpts {
	/**
	 * If this value is null or a typedarray then size options (i.e.
	 * `width`, `height`, `depth`) MUST be given (the latter only if
	 * `target` is TEXTURE_3D).
	 */
	image: ArrayBufferView | TexImageSource | null;
	/**
	 * @defaultValue TextureTarget.TEXTURE_2D
	 */
	target: TextureTarget;
	/**
	 * Only needed if overriding `format`'s default type.
	 */
	type: TextureType;
	/**
	 * @defaultValue TextureFilter.NEAREST
	 */
	filter: TextureFilter | [TextureFilter, TextureFilter?];
	/**
	 * @defaultValue TextureRepeat.CLAMP
	 */
	wrap: TextureRepeat | [TextureRepeat, TextureRepeat?, TextureRepeat?];
	/**
	 * Min/max level-of-detail values.
	 *
	 * @defaultValue none
	 */
	lod: [number, number?];
	/**
	 * Min/max mipmap levels (ints)
	 *
	 * @defaultValue none
	 */
	minMaxLevel: [number, number];
	/**
	 * Mipmap level to configure (e.g. if providing custom mipmaps)
	 *
	 * @defaultValue 0
	 */
	level: number;
	/**
	 * @defaultValue TextureFormat.RGBA
	 */
	format: TextureFormat;
	/**
	 * Texture width in pixels. Only used if `image` is null or a typed
	 * array.
	 *
	 * @defaultValue none
	 */
	width: number;
	/**
	 * Texture height in pixels. Only used if `image` is null or a typed
	 * array.
	 *
	 * @defaultValue none
	 */
	height: number;
	/**
	 * Texture depth in pixels. Only used if `target` is
	 * `TextureTarget.TEXTURE_3D`
	 *
	 * @defaultValue none
	 */
	depth: number;
	/**
	 * True, if mipmaps should be generated.
	 *
	 * @defaultValue false
	 */
	mipmap: boolean;
	/**
	 * True, if source data should be flipped along its vertical axis.
	 *
	 * @defaultValue none
	 */
	flip: boolean;
	/**
	 * True, if the source data's color channels should be
	 * pre-multiplied with the alpha channel.
	 *
	 * @defaultValue none
	 */
	premultiply: boolean;
	/**
	 * True, if given `image` is only defining a sub-image (i.e. partial
	 * update of a previously configured texture). If true, also uses
	 * `pos` option.
	 */
	sub: boolean;
	/**
	 * Pixel position offset for `sub` image updates.
	 */
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
