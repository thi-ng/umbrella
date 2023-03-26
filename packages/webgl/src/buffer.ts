import {
	BIT_SHIFTS,
	asGLType,
	typedArrayType,
	type TypedArray,
} from "@thi.ng/api/typedarray";
import type { AttribPool } from "@thi.ng/vector-pools";
import type { IWebGLBuffer, IndexBufferSpec } from "./api/buffers.js";
import {
	DrawMode,
	type ModelAttributeSpec,
	type ModelAttributeSpecs,
	type ModelSpec,
} from "./api/model.js";
import { isGL2Context } from "./checks.js";
import { error } from "./error.js";

export class WebGLArrayBuffer<T extends TypedArray> implements IWebGLBuffer<T> {
	gl: WebGLRenderingContext;
	buffer: WebGLBuffer;
	target: number;
	mode: number;
	data?: T;

	constructor(
		gl: WebGLRenderingContext,
		data?: T,
		target: GLenum = gl.ARRAY_BUFFER,
		mode: GLenum = gl.STATIC_DRAW,
		retain = false
	) {
		this.gl = gl;
		this.buffer = gl.createBuffer() || error("error creating WebGL buffer");
		this.target = target;
		this.mode = mode;
		if (data) {
			this.set(data);
			if (retain) this.data = data;
		}
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
			delete (<any>this).buffer;
		}
		return true;
	}

	/**
	 * Re-applies retained data (from ctor arg) using
	 * {@link WebGLArrayBuffer.set}. Presumably the underlying data has been
	 * updated elsewhere, but needs to be reflected to WebGL.
	 *
	 * @remarks
	 * If no data is retained, this method is a no-op.
	 */
	update() {
		if (this.data) this.set(this.data);
	}

	set(data: T, mode = this.mode) {
		this.bind();
		this.gl.bufferData(this.target, data, mode);
		if (this.data) this.data = data;
	}

	setChunk(data: T, byteOffset = 0) {
		this.bind();
		this.gl.bufferSubData(this.target, byteOffset, data);
		if (this.data) {
			this.data.set(
				data,
				byteOffset >>> BIT_SHIFTS[typedArrayType(data)]
			);
		}
	}
}

export const defBuffer = (
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
	spec.mode == null && (spec.mode = DrawMode.TRIANGLES);
	// TODO auto-create VAO & inject into model spec?
	return spec;
};

const initBuffer = (
	gl: WebGLRenderingContext,
	src: ModelAttributeSpec | IndexBufferSpec,
	type: GLenum,
	mode: GLenum
) => {
	if (src.buffer) {
		src.data && src.buffer.set(<any>src.data);
	} else {
		src.buffer = new WebGLArrayBuffer(gl, src.data, type, mode);
	}
};

const compileAttribs = (
	gl: WebGLRenderingContext,
	attribs: ModelAttributeSpecs,
	mode: GLenum
) => {
	if (attribs) {
		for (let id in attribs) {
			initBuffer(gl, attribs[id], gl.ARRAY_BUFFER, mode);
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
		initBuffer(gl, index, gl.ELEMENT_ARRAY_BUFFER, mode);
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
	const buf = defBuffer(gl, pool.bytes(), target, mode);
	const spec = <ModelAttributeSpecs>{};
	for (let id of ids || Object.keys(pool.specs)) {
		const attr = pool.specs[id];
		spec[id] = {
			buffer: buf,
			size: attr.size,
			type: asGLType(attr.type),
			stride: pool.byteStride,
			offset: attr.byteOffset,
		};
	}
	return spec;
};
