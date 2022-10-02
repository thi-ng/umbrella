import type { WasmExports } from "@thi.ng/wasm-api";

export * from "./generated/api.js";

export interface DOMExports extends WasmExports {
	dom_callListener: (listenerID: number, event: number) => void;
}

export interface DOMImports extends WebAssembly.ModuleImports {
	getWindowInfo: (ptr: number) => void;

	createElement: (optsAddr: number) => number;

	createCanvas: (optsAddr: number) => number;

	setCanvasSize: (
		elementID: number,
		width: number,
		height: number,
		dpr: number
	) => void;

	_setStringAttrib: (
		elementID: number,
		nameAddr: number,
		valAddr: number
	) => void;
	_setNumericAttrib: (
		elementID: number,
		nameAddr: number,
		val: number
	) => void;

	_addListener: (ctxID: number, name: number, listenerID: number) => void;
	_removeListener: (listenerID: number) => void;

	_setInnerHtml: (elementID: number, body: number) => void;
	_setInnerText: (elementID: number, body: number) => void;
}
