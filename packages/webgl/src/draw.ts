import { isArray } from "@thi.ng/checks/is-array";
import type { ModelSpec } from "./api/model.js";
import { isGL2Context } from "./checks.js";
import { error } from "./error.js";
import { bindTextures, unbindTextures } from "./texture.js";

export interface DrawFlags {
	/**
	 * Unless false (default: true), bind modelspec's textures
	 */
	bindTex: boolean;
	/**
	 * If true (default: false), unbind modelspec's textures after use
	 */
	unbindTex: boolean;
	/**
	 * Unless false (default: true), bind modelspec's shader before use
	 */
	bindShader: boolean;
	/**
	 * Unless false (default: true), unbind modelspec's shader after use
	 */
	unbindShader: boolean;
	/**
	 * Unless false (default: true), apply shader's `state` opts (if any)
	 */
	shaderState: boolean;
}

export const draw = (
	specs: ModelSpec | ModelSpec[],
	opts: Partial<DrawFlags> = {}
) => {
	const _specs = isArray(specs) ? specs : [specs];
	for (let i = 0, n = _specs.length; i < n; i++) {
		const spec = _specs[i];
		const indices = spec.indices;
		const gl = spec.shader.gl;
		opts.bindTex !== false && bindTextures(spec.textures);
		opts.shaderState !== false && spec.shader.prepareState();
		opts.bindShader !== false && spec.shader.bind(spec);
		if (indices && indices.buffer) {
			indices.buffer.bind();
			if (spec.instances) {
				drawInstanced(gl, spec);
			} else {
				gl.drawElements(
					spec.mode!,
					spec.num,
					indices.data instanceof Uint32Array
						? gl.UNSIGNED_INT
						: gl.UNSIGNED_SHORT,
					0
				);
			}
		} else {
			if (spec.instances) {
				drawInstanced(gl, spec);
			} else {
				gl.drawArrays(spec.mode!, 0, spec.num);
			}
		}
		opts.unbindShader !== false && spec.shader.unbind(<any>null);
		opts.unbindTex && unbindTextures(spec.textures);
	}
};

const drawInstanced = (gl: WebGLRenderingContext, spec: ModelSpec) => {
	const isGL2 = isGL2Context(gl);
	const ext = !isGL2 ? gl.getExtension("ANGLE_instanced_arrays") : undefined;
	if (!(isGL2 || ext)) {
		error("instancing not supported");
	}
	const sattribs = spec.shader.attribs;
	const iattribs = spec.instances!.attribs;
	spec.shader.bindAttribs(iattribs);
	for (let id in iattribs) {
		const attr = sattribs[id];
		if (attr) {
			let div = iattribs[id].divisor;
			div = div !== undefined ? div : 1;
			isGL2
				? (<WebGL2RenderingContext>gl).vertexAttribDivisor(
						attr.loc,
						div
				  )
				: ext!.vertexAttribDivisorANGLE(attr.loc, div);
		}
	}
	if (spec.indices) {
		const type =
			spec.indices.data instanceof Uint32Array
				? gl.UNSIGNED_INT
				: gl.UNSIGNED_SHORT;
		isGL2
			? (<WebGL2RenderingContext>gl).drawElementsInstanced(
					spec.mode!,
					spec.num,
					type,
					0,
					spec.instances!.num
			  )
			: ext!.drawElementsInstancedANGLE(
					spec.mode!,
					spec.num,
					type,
					0,
					spec.instances!.num
			  );
	} else {
		isGL2
			? (<WebGL2RenderingContext>gl).drawArraysInstanced(
					spec.mode!,
					0,
					spec.num,
					spec.instances!.num
			  )
			: ext!.drawArraysInstancedANGLE(
					spec.mode!,
					0,
					spec.num,
					spec.instances!.num
			  );
	}
	// reset attrib divisors to allow non-instanced draws later on
	for (let id in iattribs) {
		const attr = sattribs[id];
		attr &&
			(isGL2
				? (<WebGL2RenderingContext>gl).vertexAttribDivisor(attr.loc, 0)
				: ext!.vertexAttribDivisorANGLE(attr.loc, 0));
	}
	spec.shader.unbind(<any>null);
};
