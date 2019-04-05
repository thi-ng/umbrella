import { assert } from "@thi.ng/api";
import { FboOpts, IFbo } from "./api";
import { error } from "./error";

const GL_MAX_COLOR_ATTACHMENTS_WEBGL = 0x8cdf;
const COLOR_ATTACHMENT0_WEBGL = 0x8ce0;

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
 * https://developer.mozilla.org/en-US/docs/Web/API/WEBGL_draw_buffers
 */
export class FBO implements IFbo {
    gl: WebGLRenderingContext;
    fbo: WebGLFramebuffer;
    ext: WEBGL_draw_buffers;
    readonly maxAttachments: number;

    constructor(gl: WebGLRenderingContext, opts?: Partial<FboOpts>) {
        this.gl = gl;
        this.fbo = gl.createFramebuffer();
        this.ext = gl.getExtension("WEBGL_draw_buffers");
        // TODO WebGL2 support
        this.maxAttachments = this.ext
            ? gl.getParameter(GL_MAX_COLOR_ATTACHMENTS_WEBGL)
            : 1;
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
        delete this.fbo;
        delete this.ext;
        return true;
    }

    configure(opts: Partial<FboOpts>) {
        const gl = this.gl;
        this.bind();
        if (opts.tex) {
            if (this.ext) {
                assert(
                    opts.tex.length < this.maxAttachments,
                    `too many attachments (max. ${this.maxAttachments})`
                );
                const attachments: number[] = [];
                for (let i = 0; i < opts.tex.length; i++) {
                    const attach = COLOR_ATTACHMENT0_WEBGL + i;
                    gl.framebufferTexture2D(
                        gl.FRAMEBUFFER,
                        attach,
                        gl.TEXTURE_2D,
                        opts.tex[i].tex,
                        0
                    );
                    attachments[i] = attach;
                }
                // TODO WebGL2 support
                this.ext.drawBuffersWEBGL(attachments);
            } else {
                assert(
                    opts.tex.length === 1,
                    "only single color attachment allowed (webgl_draw_buffers ext unavailable)"
                );
                gl.framebufferTexture2D(
                    gl.FRAMEBUFFER,
                    gl.COLOR_ATTACHMENT0,
                    gl.TEXTURE_2D,
                    opts.tex[0].tex,
                    0
                );
            }
        }
        if (opts.depth) {
            gl.framebufferRenderbuffer(
                gl.FRAMEBUFFER,
                gl.DEPTH_ATTACHMENT,
                gl.RENDERBUFFER,
                opts.depth.buffer
            );
        }
        return this.validate();
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
                error(`FBO error: ${err}`);
        }
    }
}

export const fbo = (gl: WebGLRenderingContext, opts?: Partial<FboOpts>) =>
    new FBO(gl, opts);
