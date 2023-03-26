import type { Fn0 } from "@thi.ng/api";
import { WasmBridge } from "@thi.ng/wasm-api";
import {
	WasmCanvas2D,
	type WasmCanvas2DExports,
} from "@thi.ng/wasm-api-canvas";
import { WasmDom, type WasmDomExports } from "@thi.ng/wasm-api-dom";
import WASM_URL from "./main.wasm?url";

/**
 * Combined WASM exports of all API modules used, incl. any custom user defined
 * additions.
 *
 * @remarks
 * These are usually all functions/symbols which can be called/accessed from the
 * JS side.
 */
interface WasmApp extends WasmCanvas2DExports, WasmDomExports {
	/**
	 * Custom user defined start function (see /zig/main.zig)
	 */
	start: Fn0<void>;
}

// main app initialization

(async () => {
	// create new WASM bridge with extra API modules
	const bridge = new WasmBridge<WasmApp>([new WasmCanvas2D(), new WasmDom()]);
	// instantiate WASM module & bindings
	await bridge.instantiate(fetch(WASM_URL));
	// call WASM main function to kick off
	bridge.exports.start();
})();
