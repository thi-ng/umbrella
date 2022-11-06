import type { Fn0 } from "@thi.ng/api";
import { WasmBridge, WasmExports } from "@thi.ng/wasm-api";
import { DOMExports, WasmDom } from "@thi.ng/wasm-api-dom";
import { ScheduleExports, WasmSchedule } from "@thi.ng/wasm-api-schedule";
import WASM_URL from "./main.wasm?url";

interface WasmApp extends WasmExports, DOMExports, ScheduleExports {
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
