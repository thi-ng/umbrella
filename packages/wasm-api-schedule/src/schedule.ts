// SPDX-License-Identifier: Apache-2.0
import type { Fn, Fn0, FnO } from "@thi.ng/api";
import type { IWasmAPI, WasmBridge, WasmModuleSpec } from "@thi.ng/wasm-api";
import {
	ScheduleType,
	type WasmScheduleExports,
	type WasmScheduleImports,
} from "./api.js";

/**
 * WASM module descriptor for use as dependency object in other module
 * definitions or for direct use with
 * [`WasmBridge`](https://docs.thi.ng/umbrella/wasm-api/classes/WasmBridge.html).
 *
 * @remarks
 * Module defines the following dependencies:
 * - none
 *
 * See
 * [`WasmModuleSpec`](https://docs.thi.ng/umbrella/wasm-api/interfaces/WasmModuleSpec.html)
 * for more details.
 */
export const WasmScheduleModule: WasmModuleSpec<WasmScheduleExports> = {
	id: "schedule",
	factory: () => new WasmSchedule(),
};

/** @internal */
interface ScheduledCall {
	id: number;
	timeout: any;
	kind: ScheduleType;
}

/** @internal */
const START: Record<ScheduleType, FnO<Fn0<void>, any>> = {
	[ScheduleType.ONCE]: setTimeout,
	[ScheduleType.INTERVAL]: setInterval,
	[ScheduleType.IMMEDIATE]:
		typeof setImmediate !== "undefined"
			? setImmediate
			: (x) => setTimeout(x, 0),
	[ScheduleType.RAF]:
		typeof requestAnimationFrame !== "undefined"
			? requestAnimationFrame
			: (x) => setTimeout(x, 16),
};

/** @internal */
const CANCEL: Record<ScheduleType, Fn<any, void>> = {
	[ScheduleType.ONCE]: clearTimeout,
	[ScheduleType.INTERVAL]: clearInterval,
	[ScheduleType.IMMEDIATE]:
		typeof clearImmediate !== "undefined" ? clearImmediate : clearTimeout,
	[ScheduleType.RAF]:
		typeof cancelAnimationFrame !== "undefined"
			? cancelAnimationFrame
			: clearTimeout,
};

export class WasmSchedule implements IWasmAPI<WasmScheduleExports> {
	parent!: WasmBridge<WasmScheduleExports>;
	listeners: Record<number, ScheduledCall> = {};

	async init(parent: WasmBridge<WasmScheduleExports>) {
		this.parent = parent;
		if (parent.exports._schedule_init) {
			parent.exports._schedule_init();
		} else {
			parent.logger.warn("schedule module unused, skipping auto-init...");
		}
		return true;
	}

	getImports(): WasmScheduleImports {
		return {
			_schedule: (kind, delay, listenerID) => {
				this.listeners[listenerID] = {
					id: listenerID,
					timeout: START[kind].call(
						null,
						() =>
							this.parent.exports._schedule_callback(
								listenerID,
								kind
							),
						delay
					),
					kind,
				};
			},

			_cancel: (listenerID) => {
				const listener = this.listeners[listenerID];
				if (listener) {
					CANCEL[listener.kind].call(null, listenerID);
					delete this.listeners[listenerID];
				}
			},

			now: () => performance.now(),
		};
	}
}
