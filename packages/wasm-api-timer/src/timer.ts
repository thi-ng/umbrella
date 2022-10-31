import type { Fn, Fn0, FnO } from "@thi.ng/api";
import type { IWasmAPI, WasmBridge } from "@thi.ng/wasm-api";
import { TimerExports, TimerImports, TimerType } from "./api.js";

/** @internal */
interface Timer {
	listener: number;
	timeout: any;
	kind: TimerType;
}

const START: Record<TimerType, FnO<Fn0<void>, any>> = {
	[TimerType.ONCE]: setTimeout,
	[TimerType.INTERVAL]: setInterval,
	[TimerType.IMMEDIATE]:
		typeof setImmediate === "function"
			? setImmediate
			: (x) => setTimeout(x, 0),
};

const CANCEL: Record<TimerType, Fn<any, void>> = {
	[TimerType.ONCE]: clearTimeout,
	[TimerType.INTERVAL]: clearInterval,
	[TimerType.IMMEDIATE]:
		typeof clearImmediate === "function" ? clearImmediate : clearTimeout,
};

export class WasmTimers implements IWasmAPI<TimerExports> {
	readonly id = "timer";

	parent!: WasmBridge<TimerExports>;
	listeners: Record<number, Timer> = {};

	async init(parent: WasmBridge<TimerExports>) {
		this.parent = parent;
		return true;
	}

	getImports(): TimerImports {
		return {
			_schedule: (listenerID, interval, kind) => {
				const handler = () =>
					this.parent.exports._timer_callback(listenerID, kind);
				const timeoutID = START[kind].call(null, handler, interval);
				this.listeners[listenerID] = {
					listener: listenerID,
					timeout: timeoutID,
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
