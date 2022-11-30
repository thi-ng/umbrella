import type { Fn0 } from "@thi.ng/api";
import { IWasmAPI, WasmBridge, WasmExports } from "@thi.ng/wasm-api";
import { WasmDom, WasmDomExports } from "@thi.ng/wasm-api-dom";
import WASM_URL from "./main.wasm?url";

/**
 * Combined WASM exports of all API modules used, incl. any custom user defined
 * additions.
 *
 * @remarks
 * These are usually all functions/symbols which can be called/accessed from the
 * JS side.
 */
interface WasmApp extends WasmExports, WasmDomExports {
	/**
	 * Custom user defined start function (see /zig/main.zig)
	 */
	start: Fn0<void>;
}

class CanvasPixelAccess implements IWasmAPI<WasmApp> {
	readonly id = "pixels";

	parent!: WasmBridge<WasmApp>;
	dom!: WasmDom;
	contexts: {
		ctx: CanvasRenderingContext2D;
		img: ImageData;
		u32: Uint32Array;
	}[] = [];

	async init(parent: WasmBridge<WasmApp>) {
		this.parent = parent;
		this.dom = <WasmDom>this.parent.modules.dom;
		return true;
	}

	getImports() {
		return {
			updatePixelsABGR: (
				canvasID: number,
				pixelsAddr: number,
				numPixels: number
			) => {
				const { ctx, img, u32 } = this.ensureContext(canvasID);
				u32.set(this.parent.getU32Array(pixelsAddr, numPixels));
				ctx.putImageData(img, 0, 0);
			},

			updatePixelsLUT: (
				canvasID: number,
				pixelsAddr: number,
				numPixels: number,
				lutAddr: number,
				numLut: number
			) => {
				const { ctx, img, u32 } = this.ensureContext(canvasID);
				const src = this.parent.getU8Array(pixelsAddr, numPixels);
				const fmt = this.parent.getU32Array(lutAddr, numLut);
				for (let i = 0; i < numPixels; i++) u32[i] = fmt[src[i]];
				ctx.putImageData(img, 0, 0);
			},
		};
	}

	protected ensureContext(canvasID: number) {
		let $ctx = this.contexts[canvasID];
		if (!$ctx) {
			const canvas = <HTMLCanvasElement>this.dom.elements.get(canvasID);
			const ctx = canvas.getContext("2d")!;
			const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
			return (this.contexts[canvasID] = {
				ctx,
				img,
				u32: new Uint32Array(img.data.buffer),
			});
		}
		return $ctx;
	}
}

// main app initialization

(async () => {
	// create new WASM bridge with extra API modules
	const bridge = new WasmBridge<WasmApp>([
		new WasmDom(),
		new CanvasPixelAccess(),
	]);
	// instantiate WASM module & bindings
	await bridge.instantiate(fetch(WASM_URL));
	// call WASM main function to kick off
	bridge.exports.start();
})();
