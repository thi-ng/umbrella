import type { WasmExports } from "@thi.ng/wasm-api";
import type { ScheduleType } from "./generated/api.js";

export * from "./generated/api.js";

export interface ScheduleExports extends WasmExports {
	_schedule_init(): void;
	_schedule_callback(timerID: number, type: ScheduleType): void;
}

export interface ScheduleImports extends WebAssembly.ModuleImports {
	/**
	 * Schedules given callback of given kind.
	 *
	 * @param type
	 * @param delay
	 * @param listenerID
	 */
	_schedule(type: ScheduleType, delay: number, listenerID: number): void;
	/**
	 * Cancels & removes the sheduled callback for given ID.
	 *
	 * @param listenerID
	 */
	_cancel(listenerID: number): void;
}
