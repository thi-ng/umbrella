// SPDX-License-Identifier: Apache-2.0
import { F, I, V2, V4 } from "@thi.ng/shader-ast/api/types";
import { assign } from "@thi.ng/shader-ast/ast/assign";
import { defMain, defn } from "@thi.ng/shader-ast/ast/function";
import { FLOAT0, FLOAT1, vec4 } from "@thi.ng/shader-ast/ast/lit";
import type { DefShaderOpts, ModelSpec } from "@thi.ng/webgl";
import { compileModel } from "@thi.ng/webgl/buffer";
import { draw } from "@thi.ng/webgl/draw";
import { defQuadModel } from "@thi.ng/webgl/geo/quad";
import { defShader } from "@thi.ng/webgl/shader";
import type {
	IShaderToy,
	MainImageFn,
	ShaderToyOpts,
	ShaderToyUniforms,
} from "./api.js";

export class ShaderToy<U extends ShaderToyUniforms> implements IShaderToy<U> {
	model: ModelSpec;
	t0!: number;
	active = false;

	constructor(public opts: ShaderToyOpts<U>) {
		this.model = defQuadModel({ uv: false });
		this.model.textures = opts.textures || [];
		compileModel(opts.gl, this.model);

		opts.canvas.addEventListener("mousemove", (e) => {
			const rect = opts.canvas.getBoundingClientRect();
			const dpr = window.devicePixelRatio;
			this.model.uniforms!.mouse = [
				(e.clientX - rect.left) * dpr,
				(rect.height - (e.clientY - rect.top)) * dpr,
			];
		});
		opts.canvas.addEventListener("mousedown", (e) => {
			this.model.uniforms!.mouseButtons = e.buttons;
		});
		opts.canvas.addEventListener("mouseup", (e) => {
			this.model.uniforms!.mouseButtons = e.buttons;
		});
		this.recompile(opts.main);
	}

	start() {
		this.t0 = Date.now();
		this.active = true;
		const update = () => {
			this.update((Date.now() - this.t0) * 1e-3);
			this.active && requestAnimationFrame(update);
		};
		requestAnimationFrame(update);
	}

	stop() {
		this.active = false;
	}

	update(time: number) {
		const {
			opts: { gl },
			model,
		} = this;
		const w = gl.drawingBufferWidth;
		const h = gl.drawingBufferHeight;
		model.uniforms!.time = time;
		model.uniforms!.resolution = [w, h];
		gl.viewport(0, 0, w, h);
		draw(model);
	}

	recompile(main: MainImageFn<U>, shaderOpts?: Partial<DefShaderOpts>) {
		const { opts, model } = this;
		if (model.shader) {
			model.shader.release();
		}
		model.shader = defShader(
			opts.gl,
			{
				vs: (gl, _, ins) => [
					defMain(() => [
						assign(
							gl.gl_Position,
							vec4(ins.position, FLOAT0, FLOAT1)
						),
					]),
				],
				fs: (gl, unis, _, outputs) => [
					defMain(() => [
						assign(
							outputs.fragColor,
							defn(V4, "mainImage", [], () =>
								main(gl, <any>unis)
							)()
						),
					]),
				],
				attribs: {
					position: V2,
				},
				uniforms: {
					resolution: V2,
					mouse: [V2, [0, 0]],
					mouseButtons: [I, 0],
					time: F,
					...opts.uniforms,
				},
			},
			shaderOpts || opts.opts
		);
	}
}

export const shaderToy = <U extends ShaderToyUniforms>(
	opts: ShaderToyOpts<U>
) => new ShaderToy(opts);
