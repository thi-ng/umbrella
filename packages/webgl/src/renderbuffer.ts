import { IRenderBuffer, RenderBufferOpts } from "./api";

export class RenderBuffer implements IRenderBuffer {
    gl: WebGLRenderingContext;
    buffer: WebGLRenderbuffer;
    format: number;
    width: number;
    height: number;

    constructor(gl: WebGLRenderingContext, opts?: Partial<RenderBufferOpts>) {
        this.gl = gl;
        this.buffer = gl.createRenderbuffer();
        opts && this.configure(opts);
    }

    bind() {
        this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, this.buffer);
        return true;
    }

    unbind() {
        this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, null);
        return true;
    }

    release() {
        this.gl.deleteRenderbuffer(this.buffer);
        delete this.buffer;
        return true;
    }

    configure(opts: Partial<RenderBufferOpts>) {
        const gl = this.gl;
        this.bind();
        gl.renderbufferStorage(
            gl.RENDERBUFFER,
            opts.format,
            opts.width,
            opts.height
        );
        this.unbind();
        Object.assign(this, opts);
        return true;
    }
}

export const renderBuffer = (
    gl: WebGLRenderingContext,
    opts?: Partial<RenderBufferOpts>
) => new RenderBuffer(gl, opts);

export const depthBuffer = (
    gl: WebGLRenderingContext,
    width: number,
    height: number
) =>
    new RenderBuffer(gl, {
        format: gl.DEPTH_COMPONENT16,
        width,
        height
    });
