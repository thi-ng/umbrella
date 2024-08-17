import { GLType } from "@thi.ng/api/typedarray";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { unsupported } from "@thi.ng/errors/unsupported";
import type {
	IWasmAPI,
	MemoryViewType,
	WasmBridge,
	WasmModuleSpec,
	WasmType,
	WasmTypeBase,
} from "@thi.ng/wasm-api";
import { WasmDomModule, type WasmDom } from "@thi.ng/wasm-api-dom";
import { ObjectIndex } from "@thi.ng/wasm-api/object-index";
import type {
	AttribBufferData,
	GLVec,
	ITexture,
	ModelAttributeSpec,
	Shader,
	ShaderAttribSpec,
	ShaderAttribSpecs,
	ShaderUniformSpecs,
	ShaderVaryingSpec,
	ShaderVaryingSpecs,
	UniformDecl,
	ModelAttributeSpecs as WEBGL_ModelAttributeSpecs,
	ModelSpec as WEBGL_ModelSpec,
	ShaderSpec as WEBGL_ShaderSpec,
	UniformValue as WEBGL_UniformValue,
	UniformValues as WEBGL_UniformValues,
} from "@thi.ng/webgl";
import { compileModel } from "@thi.ng/webgl/buffer";
import { draw } from "@thi.ng/webgl/draw";
import { defShader } from "@thi.ng/webgl/shader";
import { defTexture } from "@thi.ng/webgl/texture";
import type {
	AttribUpdateSpec,
	ModelAttribData,
	WasmWebGLExports,
	WasmWebGLImports,
	WebGLContextOpts,
} from "./api.js";
import {
	$AttribUpdateSpec,
	$ModelSpec,
	$ShaderSpec,
	$TextureSpec,
	$UniformValue,
	$WebGLContextOpts,
	ImageType,
	ShaderAttribType,
	UniformType,
	WebGLPowerPreference,
	type ImageData,
	type ModelAttribSpec,
	type ModelSpec,
	type ModelUniform,
	type ShaderSpec,
	type TextureSpec,
	type UniformValue,
} from "./generated/api.js";

/**
 * WASM module descriptor for use as dependency object in other module
 * definitions or for direct use with
 * [`WasmBridge`](https://docs.thi.ng/umbrella/wasm-api/classes/WasmBridge.html).
 *
 * @remarks
 * Module defines the following dependencies:
 * - [WasmDomModule](https://docs.thi.ng/umbrella/wasm-api-dom/variables/WasmDomModule.html)
 *
 * See
 * [`WasmModuleSpec`](https://docs.thi.ng/umbrella/wasm-api/interfaces/WasmModuleSpec.html)
 * for more details.
 */
export const WasmWebGLModule: WasmModuleSpec<WasmWebGLExports> = {
	id: "webgl",
	deps: [WasmDomModule],
	factory: () => new WasmWebGL(),
};

export class WasmWebGL implements IWasmAPI<WasmWebGLExports> {
	parent!: WasmBridge<WasmWebGLExports>;
	dom!: WasmDom;

	contexts!: ObjectIndex<WebGL2RenderingContext>;
	models!: ObjectIndex<WEBGL_ModelSpec>;
	shaders!: ObjectIndex<Shader>;
	textures!: ObjectIndex<ITexture>;

	$ShaderSpec!: WasmType<ShaderSpec>;
	$ModelSpec!: WasmType<ModelSpec>;
	$TextureSpec!: WasmType<TextureSpec>;
	$UniformValue!: WasmType<UniformValue>;
	$AttribUpdateSpec!: WasmType<AttribUpdateSpec>;
	$WebGLContextOpts!: WasmType<WebGLContextOpts>;

	async init(parent: WasmBridge<WasmWebGLExports>) {
		this.parent = parent;
		this.dom = <WasmDom>this.parent.modules.dom;
		const defIndex = <T>(name: string) =>
			new ObjectIndex<T>({ name, logger: parent.logger });
		this.contexts = defIndex("ctx");
		this.shaders = defIndex("sha");
		this.models = defIndex("mod");
		this.textures = defIndex("tex");
		this.$AttribUpdateSpec = $AttribUpdateSpec(this.parent);
		this.$ModelSpec = $ModelSpec(this.parent);
		this.$ShaderSpec = $ShaderSpec(this.parent);
		this.$TextureSpec = $TextureSpec(this.parent);
		this.$UniformValue = $UniformValue(this.parent);
		this.$WebGLContextOpts = $WebGLContextOpts(this.parent);
		return true;
	}

	getImports(): WasmWebGLImports {
		return {
			canvasGLContext: (canvasID, optsAddr) => {
				const opts = this.$WebGLContextOpts.instance(optsAddr);
				const ctx = (<HTMLCanvasElement>(
					this.dom!.elements.get(canvasID)
				)).getContext("webgl2", {
					alpha: !!opts.alpha,
					antialias: !!opts.antialias,
					depth: !!opts.depth,
					desynchronized: !!opts.desynchronized,
					failIfMajorPerformanceCaveat:
						!!opts.failIfMajorPerformanceCaveat,
					powerPreference: WebGLPowerPreference[
						opts.powerPreference
					].replace("_", "-"),
					premultipliedAlpha: !!opts.premultipliedAlpha,
					preserveDrawingBuffer: !!opts.preserveDrawingBuffer,
					stencil: !!opts.stencil,
				});
				if (!ctx) unsupported("WebGL2 not supported");
				return this.contexts.addUnique(<WebGL2RenderingContext>ctx);
			},

			createShader: (ctxID, addr) => {
				const buildAttribs = (spec: ShaderSpec) => {
					const attribs: ShaderAttribSpecs = {};
					for (let att of spec.attribs) {
						attribs[att.name.deref()] = <ShaderAttribSpec>(
							ShaderAttribType[att.type]
						);
					}
					return attribs;
				};

				const buildVarying = (spec: ShaderSpec) => {
					const varyings: ShaderVaryingSpecs = {};
					for (let v of spec.varying) {
						varyings[v.name.deref()] = <ShaderVaryingSpec>(
							ShaderAttribType[v.type]
						);
					}
					return varyings;
				};

				const buildUniforms = (spec: ShaderSpec) => {
					const uniforms: ShaderUniformSpecs = {};
					for (let uni of spec.uniforms) {
						uniforms[uni.name.deref()] = <UniformDecl>[
							UniformType[uni.type],
							(<any>uni.default)[UniformType[uni.type]],
						];
					}
					return uniforms;
				};

				const gl = this.contexts.get(ctxID);
				const spec = this.$ShaderSpec.instance(addr);
				const $spec: WEBGL_ShaderSpec = {
					vs: spec.vs.deref(),
					fs: spec.fs.deref(),
					attribs: buildAttribs(spec),
					varying: buildVarying(spec),
					uniforms: buildUniforms(spec),
				};
				const shader = defShader(gl, $spec, {
					logger: this.parent.logger,
				});
				return this.shaders.add(shader);
			},

			createModel: (ctxID, addr) => {
				const buildAttribs = (specs: ModelAttribSpec[]) => {
					const attribs: WEBGL_ModelAttributeSpecs = {};
					for (let att of specs) {
						attribs[att.name.deref()] = <ModelAttributeSpec>{
							type: att.type,
							size: att.size,
							stride: att.stride,
							offset: att.offset,
							data: att.data[
								<keyof ModelAttribData>(
									GLType[att.type].toLowerCase()
								)
							],
						};
					}
					return attribs;
				};

				const buildUniforms = (specs: ModelUniform[]) => {
					const uniforms: WEBGL_UniformValues = {};
					for (let uni of specs) {
						uniforms[uni.name.deref()] = <WEBGL_UniformValue>(
							(<any>uni.value)[UniformType[uni.type]]
						);
					}
					return uniforms;
				};

				const gl = this.contexts.get(ctxID);
				const spec = this.$ModelSpec.instance(addr);
				const modelSpec: WEBGL_ModelSpec = {
					shader: this.shaders.get(spec.shader),
					attribs: buildAttribs(spec.attribs),
					uniforms: buildUniforms(spec.uniforms),
					mode: <any>spec.mode,
					num: spec.num,
				};
				if (spec.numInstances) {
					modelSpec.instances = {
						attribs: buildAttribs(spec.instances),
						num: spec.numInstances,
					};
				}
				if (spec.textures.length) {
					modelSpec.textures = [...spec.textures].map((id) =>
						this.textures.get(id)
					);
				}
				return this.models.add(compileModel(gl, modelSpec));
			},

			createTexture: (ctxID, addr) => {
				type I = Exclude<keyof ImageData, "none" | keyof WasmTypeBase>;
				const gl = this.contexts.get(ctxID);
				const spec = this.$TextureSpec.instance(addr);
				const img =
					spec.imgType !== ImageType.none
						? spec.img[<I>ImageType[spec.imgType]]
						: null;
				const tex = defTexture(gl, {
					width: spec.width,
					height: spec.height,
					depth: spec.depth,
					image: img,
					filter: spec.filter,
					format: spec.format,
					wrap: spec.wrap,
					target: spec.target,
					type: spec.type,
				});
				return this.textures.add(tex);
			},

			uniformInt: this.uniformScalar.bind(this),
			uniformUInt: this.uniformScalar.bind(this),
			uniformFloat: this.uniformScalar.bind(this),

			uniformVec: (
				modelID: number,
				name: number,
				value: number,
				size: number
			) => this.uniformVec(modelID, name, "f32", value >> 2, size),

			uniformIVec: (
				modelID: number,
				name: number,
				value: number,
				size: number
			) => this.uniformVec(modelID, name, "i32", value >> 2, size),

			uniformUVec: (
				modelID: number,
				name: number,
				value: number,
				size: number
			) => this.uniformVec(modelID, name, "u32", value >> 2, size),

			updateAttrib: (modelID, name, addr) => {
				const model = this.models.get(modelID);
				const id = this.parent.getString(name);
				const attrib = model.attribs[id];
				if (!attrib) illegalArgs(`unknown attrib: ${id}`);
				const spec = this.$AttribUpdateSpec.instance(addr);
				attrib.buffer!.setChunk(
					<AttribBufferData>(
						spec.data[
							<keyof ModelAttribData>(
								GLType[spec.type].toLowerCase()
							)
						]
					),
					spec.offset
				);
			},

			draw: (modelID) => {
				draw(this.models.get(modelID));
			},

			clear: (ctxID, r, g, b, a) => {
				const gl = this.contexts.get(ctxID);
				gl.clearColor(r, g, b, a);
				gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
			},
		};
	}

	/**
	 * Shared handler for setting a scalar uniform in a ModelSpec
	 *
	 * @param modelID
	 * @param name
	 * @param value
	 */
	uniformScalar(modelID: number, name: number, value: number) {
		const spec = this.models.get(modelID);
		const id = this.parent.getString(name);
		spec.uniforms![id] = value;
	}

	uniformVec(
		modelID: number,
		name: number,
		type: MemoryViewType,
		addr: number,
		size: number
	) {
		const spec = this.models.get(modelID);
		const id = this.parent.getString(name);
		const val = this.parent[type].subarray(addr, addr + size).slice();
		spec.uniforms![id] = <GLVec>val;
	}
}
