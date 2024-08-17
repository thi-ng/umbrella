import type { Fn0 } from "@thi.ng/api";
import { ConsoleLogger, ROOT } from "@thi.ng/logger";
import { WasmBridge, type WasmExports } from "@thi.ng/wasm-api";
import { WasmDom } from "@thi.ng/wasm-api-dom";
import {
	WasmSchedule,
	type WasmScheduleExports,
} from "@thi.ng/wasm-api-schedule";
import { WasmWebGL, type WasmWebGLExports } from "@thi.ng/wasm-api-webgl";
import WASM_URL from "./main.wasm?url";

ROOT.set(new ConsoleLogger());

/**
 * Combined WASM exports of all API modules used, incl. any custom user defined
 * additions.
 *
 * @remarks
 * These are usually all functions/symbols which can be called/accessed from the
 * JS side.
 */
interface WasmApp extends WasmExports, WasmScheduleExports, WasmWebGLExports {
	/**
	 * Custom user defined start function (see /zig/main.zig)
	 */
	start: Fn0<void>;
}

// main app initialization

(async () => {
	// create new WASM bridge with extra API module
	const bridge = new WasmBridge<WasmApp>(
		[new WasmWebGL(), new WasmDom(), new WasmSchedule()],
		new ConsoleLogger("wasm")
	);
	// instantiate WASM module & bindings
	await bridge.instantiate(fetch(WASM_URL));
	// call WASM main function to kick off
	bridge.exports.start();
})();
