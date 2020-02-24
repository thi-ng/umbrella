import { error } from "./error";
import type { IRenderBuffer, RboOpts } from "./api/buffers";

export class RBO implements IRenderBuffer {
    gl: WebGLRenderingContext;
    buffer: WebGLRenderbuffer;
    format!: number;
    width!: number;
    height!: number;

    constructor(gl: WebGLRenderingContext, opts: RboOpts) {
        this.gl = gl;
        this.buffer = gl.createRenderbuffer() || error("error creating RBO");
        this.configure(opts);
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

    configure(opts: RboOpts) {
        const gl = this.gl;
        this.bind();
        this.format = opts.format || gl.DEPTH_COMPONENT16;
        this.width = opts.width;
        this.height = opts.height;
        gl.renderbufferStorage(
            gl.RENDERBUFFER,
            opts.format || gl.DEPTH_COMPONENT16,
            opts.width,
            opts.height
        );
        this.unbind();
        return true;
    }
}

export const rbo = (gl: WebGLRenderingContext, opts: RboOpts) =>
    new RBO(gl, opts);
