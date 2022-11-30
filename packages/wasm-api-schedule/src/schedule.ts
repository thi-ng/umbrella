import type { Fn, Fn0, FnO } from "@thi.ng/api";
import type { IWasmAPI, WasmBridge } from "@thi.ng/wasm-api";
import {
	ScheduleType,
	WasmScheduleExports,
	WasmScheduleImports,
} from "./api.js";

/** @internal */
interface ScheduledCall {
	id: number;
	timeout: any;
	kind: ScheduleType;
}

const START: Record<ScheduleType, FnO<Fn0<void>, any>> = {
	[ScheduleType.ONCE]: setTimeout,
	[ScheduleType.INTERVAL]: setInterval,
	[ScheduleType.IMMEDIATE]:
		typeof setImmediate !== "undefined"
			? setImmediate
			: (x) => setTimeout(x, 0),
};

const CANCEL: Record<ScheduleType, Fn<any, void>> = {
	[ScheduleType.ONCE]: clearTimeout,
	[ScheduleType.INTERVAL]: clearInterval,
	[ScheduleType.IMMEDIATE]:
		typeof clearImmediate !== "undefined" ? clearImmediate : clearTimeout,
};

export class WasmSchedule implements IWasmAPI<WasmScheduleExports> {
	static readonly id = "schedule";

	parent!: WasmBridge<WasmScheduleExports>;
	listeners: Record<number, ScheduledCall> = {};

	get id() {
		return WasmSchedule.id;
	}

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
		};
	}
}
