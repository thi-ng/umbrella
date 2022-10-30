import type { WasmExports } from "@thi.ng/wasm-api";
import type { TimerType } from "./generated/api.js";

export * from "./generated/api.js";

export interface TimerExports extends WasmExports {
	_timer_callback(timerID: number, type: TimerType): void;
}

export interface TimerImports extends WebAssembly.ModuleImports {
	/**
	 * Schedules given timer callback of given kind.
	 *
	 * @param listenerID
	 * @param interval
	 * @param type
	 */
	_setTimeout(listenerID: number, interval: number, type: TimerType): void;
	/**
	 * Cancels & removes the timer callback for given ID.
	 *
	 * @param listenerID
	 */
	_cancelTimeout(listenerID: number): void;
}
