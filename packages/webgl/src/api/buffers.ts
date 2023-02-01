import type { IBind, IRelease } from "@thi.ng/api";
import type { ITexture } from "./texture.js";

export type IndexBufferData = Uint16Array | Uint32Array;

export interface IWebGLBuffer<T> extends IBind<void>, IRelease {
	set(data: T, mode?: GLenum): void;
	setChunk(data: T, byteOffset: number): void;
	update(): void;
}

export interface IConfigure<T> {
	configure(opts: T): boolean;
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

export interface IndexBufferSpec {
	/**
	 * Backing WebGLBuffer instance. Usually this will be
	 * auto-initialized by `makeBuffersInSpec`
	 */
	buffer?: IWebGLBuffer<IndexBufferData>;
	/**
	 * Raw attribute data from which `buffer` will be initialized
	 */
	data: IndexBufferData;
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
	 * Optional pre-instantiated {@link RBO} to be used as depth buffer
	 * for this FBO.
	 */
	depth?: ITexture | IRenderBuffer;
}

export interface RboOpts {
	format?: number;
	width: number;
	height: number;
}
