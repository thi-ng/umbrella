import { TypedArray } from "@thi.ng/api";
import { AttribPool } from "@thi.ng/vector-pools";
import { IndexBufferSpec, IWebGLBuffer } from "./api/buffers";
import { ModelAttributeSpecs, ModelSpec } from "./api/model";
import { isGL2Context } from "./checks";
import { error } from "./error";

export class WebGLArrayBuffer<T extends TypedArray> implements IWebGLBuffer<T> {
    gl: WebGLRenderingContext;
    buffer: WebGLBuffer;
    target: number;
    mode: number;

    constructor(
        gl: WebGLRenderingContext,
        data?: T,
        target = gl.ARRAY_BUFFER,
        mode = gl.STATIC_DRAW
    ) {
        this.gl = gl;
        this.buffer = gl.createBuffer() || error("error creating WebGL buffer");
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

export const buffer = (
    gl: WebGLRenderingContext,
    data?: TypedArray,
    target = gl.ARRAY_BUFFER,
    mode = gl.STATIC_DRAW
) => new WebGLArrayBuffer(gl, data, target, mode);

export const compileModel = (
    gl: WebGLRenderingContext,
    spec: ModelSpec,
    mode = gl.STATIC_DRAW
) => {
    if (spec.attribPool) {
        spec.attribs = compileAttribPool(
            gl,
            spec.attribPool,
            undefined,
            gl.ARRAY_BUFFER,
            mode
        );
    } else {
        compileAttribs(gl, spec.attribs, mode);
    }
    spec.instances && compileAttribs(gl, spec.instances.attribs, mode);
    compileIndices(gl, spec.indices, mode);
    spec.mode == null && (spec.mode = gl.TRIANGLES);
    // TODO auto-create VAO & inject into model spec?
    return spec;
};

const compileAttribs = (
    gl: WebGLRenderingContext,
    attribs: ModelAttributeSpecs,
    mode: GLenum
) => {
    if (attribs) {
        for (let id in attribs) {
            if (attribs.hasOwnProperty(id)) {
                const attr = attribs[id];
                if (attr.buffer) {
                    attr.data && attr.buffer.set(attr.data);
                } else {
                    attr.buffer = new WebGLArrayBuffer(
                        gl,
                        attr.data,
                        gl.ARRAY_BUFFER,
                        mode
                    );
                }
            }
        }
    }
    return attribs;
};

export const compileIndices = (
    gl: WebGLRenderingContext,
    index: IndexBufferSpec | undefined,
    mode: GLenum = gl.STATIC_DRAW
) => {
    if (index) {
        if (index.buffer) {
            index.data && index.buffer.set(index.data);
        } else {
            index.buffer = new WebGLArrayBuffer(
                gl,
                index.data,
                gl.ELEMENT_ARRAY_BUFFER,
                mode
            );
        }
    }
    return index;
};

export const compileVAO = (gl: WebGLRenderingContext, spec: ModelSpec) => {
    if (spec.shader) {
        const isGL2 = isGL2Context(gl);
        const ext = !isGL2 ? gl.getExtension("OES_vertex_array_object") : null;
        if (isGL2 || ext) {
            let vao: WebGLVertexArrayObject;
            if (isGL2) {
                vao = (<WebGL2RenderingContext>gl).createVertexArray()!;
                (<WebGL2RenderingContext>gl).bindVertexArray(vao);
            } else {
                vao = ext!.createVertexArrayOES()!;
                ext!.bindVertexArrayOES(vao);
            }
            !!vao && error("error creating VAO");
            spec.shader.bindAttribs(spec.attribs);
            if (spec.indices!) {
                spec.indices!.buffer!.bind();
            }
            spec.shader.unbind(<any>null);
            if (isGL2) {
                (<WebGL2RenderingContext>gl).bindVertexArray(null);
            } else {
                ext!.bindVertexArrayOES(null);
            }
            return vao;
        }
    }
};

export const compileAttribPool = (
    gl: WebGLRenderingContext,
    pool: AttribPool,
    ids?: string[],
    target = gl.ARRAY_BUFFER,
    mode = gl.STATIC_DRAW
) => {
    const buf = buffer(gl, pool.bytes(), target, mode);
    const spec = <ModelAttributeSpecs>{};
    for (let id of ids || Object.keys(pool.specs)) {
        const attr = pool.specs[id];
        spec[id] = {
            buffer: buf,
            size: attr.size,
            type: attr.type,
            stride: pool.byteStride,
            offset: attr.byteOffset
        };
    }
    return spec;
};
