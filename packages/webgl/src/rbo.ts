import { IRenderBuffer, RboOpts } from "./api";

export class RBO implements IRenderBuffer {
    gl: WebGLRenderingContext;
    buffer: WebGLRenderbuffer;
    format: number;
    width: number;
    height: number;

    constructor(gl: WebGLRenderingContext, opts?: Partial<RboOpts>) {
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

    configure(opts: Partial<RboOpts>) {
        const gl = this.gl;
        this.bind();
        gl.renderbufferStorage(
            gl.RENDERBUFFER,
            opts.format || gl.DEPTH_COMPONENT16,
            opts.width,
            opts.height
        );
        this.unbind();
        Object.assign(this, opts);
        return true;
    }
}

export const rbo = (gl: WebGLRenderingContext, opts?: Partial<RboOpts>) =>
    new RBO(gl, opts);
