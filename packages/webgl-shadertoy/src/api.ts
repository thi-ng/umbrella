// SPDX-License-Identifier: Apache-2.0
import type { Fn2 } from "@thi.ng/api";
import type { FloatSym, IntSym, ScopeBody, Vec2Sym } from "@thi.ng/shader-ast";
import type { GLSLTarget } from "@thi.ng/shader-ast-glsl";
import type {
	DefShaderOpts,
	ITexture,
	ModelSpec,
	UniformDecl,
} from "@thi.ng/webgl";

export type MainImageFn<U extends ShaderToyUniforms> = Fn2<
	GLSLTarget,
	U,
	ScopeBody
>;

export interface ShaderToyUniforms {
	resolution: Vec2Sym;
	mouse: Vec2Sym;
	mouseButtons: IntSym;
	time: FloatSym;
}

export interface ShaderToyOpts<U extends ShaderToyUniforms> {
	canvas: HTMLCanvasElement;
	gl: WebGLRenderingContext;
	/**
	 * Main user shader function
	 */
	main: MainImageFn<U>;
	/**
	 * Optional additional uniforms
	 */
	uniforms?: Partial<Record<keyof U, UniformDecl>>;
	/**
	 * Optional textures to bind
	 */
	textures?: ITexture[];
	/**
	 * Options for
	 * [`defShader`](https://docs.thi.ng/umbrella/webgl/functions/defShader.html).
	 */
	opts?: Partial<DefShaderOpts>;
}

export interface IShaderToy<U extends ShaderToyUniforms> {
	/**
	 * Starts automatic update/render loop, driven by `requestAnimationFrame()`.
	 * Alternatively, use {@link IShaderToy.update} directly to update/draw a
	 * single frame.
	 */
	start(): void;
	/**
	 * Stops automatic update/render loop.
	 */
	stop(): void;
	/**
	 * Updates and renders a single frame. The given `time` value will be stored
	 * in the eponymous shader uniform.
	 *
	 * @param time
	 */
	update(time?: number): void;
	/**
	 * Recompiles shader using new given shader `main` function and options.
	 * Updates {@link IShaderToy.model} spec.
	 *
	 * @param main
	 * @param opts
	 */
	recompile(main: MainImageFn<U>, opts?: Partial<DefShaderOpts>): void;
	/**
	 * Generated thi.ng/webgl model spec (full-canvas rect), incl. exposed
	 * uniforms and compiled shader.
	 */
	model: ModelSpec;
}
