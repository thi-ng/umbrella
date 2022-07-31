import type {
	ITexture,
	ReadableTextureFormat,
	TextureType,
} from "./api/texture.js";
import { FBO } from "./fbo.js";

export const readPixels = <
	T extends Uint8Array | Uint16Array | Uint32Array | Float32Array
>(
	gl: WebGLRenderingContext,
	x: number,
	y: number,
	w: number,
	h: number,
	format: ReadableTextureFormat,
	type: TextureType,
	out: T
) => {
	gl.readPixels(x, y, w, h, format, type, out);
	return out;
};

export const readTexture = <
	T extends Uint8Array | Uint16Array | Uint32Array | Float32Array
>(
	gl: WebGLRenderingContext,
	tex: ITexture,
	format: ReadableTextureFormat,
	type: TextureType,
	out: T
) => {
	const fbo = new FBO(gl, { tex: [tex] });
	fbo.bind();
	gl.readPixels(0, 0, tex.size[0], tex.size[1], format, type, out);
	fbo.unbind();
	fbo.release();
	return out;
};
