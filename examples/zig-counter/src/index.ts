import type { Fn0 } from "@thi.ng/api";
import { WasmBridge, WasmExports } from "@thi.ng/wasm-api";
import { WasmDom, WasmDomExports } from "@thi.ng/wasm-api-dom";
import { WasmSchedule, WasmScheduleExports } from "@thi.ng/wasm-api-schedule";
import WASM_URL from "./main.wasm?url";

/**
 * Combined WASM exports of all API modules used, incl. any custom user defined
 * additions.
 *
 * @remarks
 * These are usually all functions/symbols which can be called/accessed from the
 * JS side.
 */
interface WasmApp extends WasmExports, WasmDomExports, WasmScheduleExports {
	/**
	 * Custom user defined start function (see /zig/main.zig)
	 */
	start: Fn0<void>;
}

// main app initialization

(async () => {
	// create new WASM bridge with extra API module
	const bridge = new WasmBridge<WasmApp>([new WasmDom(), new WasmSchedule()]);
	// instantiate WASM module & bindings
	await bridge.instantiate(fetch(WASM_URL));
	// call WASM main function to kick off
	bridge.exports.start();
})();
