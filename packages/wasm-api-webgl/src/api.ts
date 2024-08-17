import type { WasmExports } from "@thi.ng/wasm-api";
import type { WasmDomExports } from "@thi.ng/wasm-api-dom";

export * from "./generated/api.js";

export interface WasmWebGLImports extends WebAssembly.ModuleImports {
	canvasGLContext(canvasID: number, opts: number): number;
	createShader(ctxID: number, shaderSpec: number): number;
	createModel(ctxID: number, modelSpec: number): number;
	createTexture(ctxID: number, texSpec: number): number;
	uniformFloat(modelID: number, name: number, value: number): void;
	uniformInt(modelID: number, name: number, value: number): void;
	uniformUint(modelID: number, name: number, value: number): void;
	uniformVec(
		modelID: number,
		name: number,
		value: number,
		size: number
	): void;
	updateAttrib(modelID: number, name: number, spec: number): void;
	draw(modelID: number): void;
	clear(ctxID: number, r: number, g: number, b: number, a: number): void;
}

export interface WasmWebGLExports extends WasmExports, WasmDomExports {}
