import { assert } from "@thi.ng/errors/assert";
import type { FboOpts, IFbo } from "./api/buffers.js";
import { ITexture, TEX_FORMATS } from "./api/texture.js";
import { isGL2Context } from "./checks.js";
import { error } from "./error.js";
import { RBO } from "./rbo.js";

const GL_COLOR_ATTACHMENT0_WEBGL = 0x8ce0;
const GL_MAX_COLOR_ATTACHMENTS_WEBGL = 0x8cdf;

/**
 * WebGL framebuffer wrapper w/ automatic detection & support for
 * multiple render targets (color attachments) and optional depth
 * buffer. Multiple targets are only supported if the
 * `WEBGL_draw_buffers` extension is available. The max. number of
 * attachments can be obtained via the `maxAttachments` property of the
 * FBO instance.
 *
 * ```
 * // create FBO w/ 2 render targets
 * fbo = new FBO(gl, { tex: [tex1, tex2] });
 * ```
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/WEBGL_draw_buffers}
 */
export class FBO implements IFbo {
	gl: WebGLRenderingContext;
	fbo: WebGLFramebuffer;
	ext?: WEBGL_draw_buffers;
	maxAttachments: number;

	constructor(gl: WebGLRenderingContext, opts?: Partial<FboOpts>) {
		this.gl = gl;
		this.fbo = gl.createFramebuffer() || error("error creating FBO");
		this.ext =
			!isGL2Context(gl) && opts && opts!.tex && opts!.tex!.length > 1
				? gl.getExtension("WEBGL_draw_buffers") ||
				  error("missing WEBGL_draw_buffers ext")
				: undefined;
		this.maxAttachments = gl.getParameter(GL_MAX_COLOR_ATTACHMENTS_WEBGL);
		opts && this.configure(opts);
	}

	bind() {
		this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.fbo);
		return true;
	}

	unbind() {
		this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
		return true;
	}

	release() {
		this.gl.deleteFramebuffer(this.fbo);
		delete (<any>this).fbo;
		delete (<any>this).ext;
		return true;
	}

	configure(opts: Partial<FboOpts>, unbind = true) {
		const gl = this.gl;
		this.bind();
		if (opts.tex) {
			assert(
				opts.tex.length < this.maxAttachments,
				`too many attachments (max. ${this.maxAttachments})`
			);
			const attachments: number[] = [];
			for (let i = 0; i < opts.tex.length; i++) {
				const tex = opts.tex[i];
				assert(
					!!(
						TEX_FORMATS[tex.format].render ||
						TEX_FORMATS[tex.format].renderExt
					),
					`texture #${i} has non-renderable format`
				);
				const attach = GL_COLOR_ATTACHMENT0_WEBGL + i;
				gl.framebufferTexture2D(
					gl.FRAMEBUFFER,
					attach,
					gl.TEXTURE_2D,
					tex.tex,
					0
				);
				attachments[i] = attach;
			}
			if (this.ext) {
				this.ext.drawBuffersWEBGL(attachments);
			} else if (isGL2Context(gl)) {
				gl.drawBuffers(attachments);
			}
		}
		if (opts.depth) {
			opts.depth instanceof RBO
				? gl.framebufferRenderbuffer(
						gl.FRAMEBUFFER,
						gl.DEPTH_ATTACHMENT,
						gl.RENDERBUFFER,
						opts.depth.buffer
				  )
				: gl.framebufferTexture2D(
						gl.FRAMEBUFFER,
						gl.DEPTH_ATTACHMENT,
						gl.TEXTURE_2D,
						(<ITexture>opts.depth).tex,
						0
				  );
		}
		this.validate();
		return unbind ? this.unbind() : true;
	}

	validate() {
		const gl = this.gl;
		const err = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
		switch (err) {
			case gl.FRAMEBUFFER_COMPLETE:
				return true;
			case gl.FRAMEBUFFER_UNSUPPORTED:
				error("FBO unsupported");
			case gl.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:
				error("FBO incomplete attachment");
			case gl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:
				error("FBO incomplete dimensions");
			case gl.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:
				error("FBO incomplete missing attachment");
			default:
				return error(`FBO error: ${err}`);
		}
	}
}

export const defFBO = (gl: WebGLRenderingContext, opts?: Partial<FboOpts>) =>
	new FBO(gl, opts);
