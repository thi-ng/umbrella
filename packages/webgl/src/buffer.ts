import { TypedArray } from "@thi.ng/api";
import {
    IndexBufferSpec,
    IWebGLBuffer,
    ModelAttributeSpecs,
    ModelSpec
} from "./api";

export class WebGLArrayBuffer<T extends TypedArray> implements IWebGLBuffer<T> {
    gl: WebGLRenderingContext;
    buffer: WebGLBuffer;
    target: number;
    mode: number;

    constructor(
        gl: WebGLRenderingContext,
        target = gl.ARRAY_BUFFER,
        mode = gl.STATIC_DRAW,
        data?: T
    ) {
        this.gl = gl;
        this.buffer = gl.createBuffer();
        this.target = target;
        this.mode = mode;
        data && this.set(data);
    }

    bind() {
        this.gl.bindBuffer(this.target, this.buffer);
        return true;
    }

    unbind() {
        this.gl.bindBuffer(this.target, null);
        return true;
    }

    release() {
        if (this.buffer) {
            this.gl.deleteBuffer(this.buffer);
            delete this.buffer;
        }
        return true;
    }

    set(data: T, mode = this.mode) {
        this.bind();
        this.gl.bufferData(this.target, data, mode);
    }

    setChunk(data: T, offset = 0) {
        this.bind();
        this.gl.bufferSubData(this.target, offset, data);
    }
}

export const compileBuffers = (
    gl: WebGLRenderingContext,
    spec: ModelSpec,
    mode = gl.STATIC_DRAW
) => {
    compileAttribs(gl, spec.attribs, mode);
    spec.instances && compileAttribs(gl, spec.instances.attribs, mode);
    compileIndices(gl, spec.indices, mode);
    return spec;
};

const compileAttribs = (
    gl: WebGLRenderingContext,
    attribs: ModelAttributeSpecs,
    mode: GLenum
) => {
    if (!attribs) return;
    for (let id in attribs) {
        if (attribs.hasOwnProperty(id)) {
            const attr = attribs[id];
            if (attr.buffer) {
                attr.buffer.set(attr.data);
            } else {
                attr.buffer = new WebGLArrayBuffer(
                    gl,
                    gl.ARRAY_BUFFER,
                    mode,
                    attr.data
                );
            }
        }
    }
};

const compileIndices = (
    gl: WebGLRenderingContext,
    index: IndexBufferSpec,
    mode: GLenum
) => {
    if (!index) return;
    if (index.buffer) {
        index.buffer.set(index.data);
    } else {
        index.buffer = new WebGLArrayBuffer(
            gl,
            gl.ELEMENT_ARRAY_BUFFER,
            mode,
            index.data
        );
    }
};
