import { TextureType, type ITexture } from "./api/texture.js";

export const isGL2Context = (
	gl: WebGLRenderingContext | WebGL2RenderingContext
): gl is WebGL2RenderingContext =>
	typeof WebGL2RenderingContext !== "undefined" &&
	gl instanceof WebGL2RenderingContext;

export const isFloatTexture = (tex: ITexture) =>
	tex.type === TextureType.FLOAT ||
	tex.type === TextureType.HALF_FLOAT ||
	tex.type === TextureType.HALF_FLOAT_OES ||
	tex.type === TextureType.FLOAT_32_UNSIGNED_INT_24_8_REV;
