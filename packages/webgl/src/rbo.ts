import type { IRenderBuffer, RboOpts } from "./api/buffers";
import { error } from "./error";

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
        delete (<any>this).buffer;
        return true;
    }

    configure(opts: RboOpts, unbind = true) {
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
        return unbind ? this.unbind() : true;
    }
}

export const defRBO = (gl: WebGLRenderingContext, opts: RboOpts) =>
    new RBO(gl, opts);
