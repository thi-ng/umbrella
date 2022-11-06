import type { Fn0 } from "@thi.ng/api";
import { FMT_HHmmss, FMT_yyyyMMdd } from "@thi.ng/date";
import { IWasmAPI, WasmBridge, WasmExports, WasmType } from "@thi.ng/wasm-api";
import { DOMExports, WasmDom } from "@thi.ng/wasm-api-dom";
import { ScheduleExports, WasmSchedule } from "@thi.ng/wasm-api-schedule";
import { $Task, Task, TaskState } from "./api";
import WASM_URL from "./main.wasm?url";

interface WasmApp extends WasmExports, DOMExports, ScheduleExports {
	start: Fn0<void>;
}

/**
 * Custom WASM API module for basic canvas drawing, i.e. the functions returned
 * by `getImports()` are being made available to the WASM binary.
 */
class TodoHandlers implements IWasmAPI<WasmApp> {
	readonly id = "todo";
	readonly dependencies = [WasmDom.id, WasmSchedule.id];

	parent!: WasmBridge<WasmApp>;
	$Task!: WasmType<Task>;

	async init(parent: WasmBridge<WasmApp>) {
		this.parent = parent;
		this.$Task = $Task(parent);
		return true;
	}

	getImports() {
		return {
			_formatDateTime: (epoch: number, addr: number, maxLen: number) => {
				epoch *= 1000;
				const res =
					FMT_yyyyMMdd(epoch, false) + " " + FMT_HHmmss(epoch, false);
				return this.parent.setString(res, addr, maxLen);
			},

			loadTasks: (slice: number) => {
				const src = localStorage.getItem("tasks") || "[]";
				const tasks = JSON.parse(src);
				const [addr] = this.parent.allocate(
					this.$Task.size * tasks.length,
					true
				);
				let currAddr = addr;
				for (let task of tasks) {
					let inst = this.$Task.instance(currAddr);
					inst.body.setAlloc(task.body);
					inst.state = TaskState.OPEN;
					inst.dateCreated = task.dateCreated;
					currAddr += this.$Task.size;
				}
				this.parent.u32.set([addr, tasks.length], slice >> 2);
			},

			persistTasks: (addr: number, num: number) => {
				const tasks: any = [];
				for (; num-- > 0; addr += this.$Task.size) {
					const task = this.$Task.instance(addr);
					tasks.push({
						body: task.body.deref(),
						dateCreated: task.dateCreated,
					});
				}
				localStorage.setItem("tasks", JSON.stringify(tasks));
			},
		};
	}
}

// main app initialization

(async () => {
	// create new WASM bridge with extra API module
	const bridge = new WasmBridge<WasmApp>([
		new WasmDom(),
		new WasmSchedule(),
		new TodoHandlers(),
	]);
	// instantiate WASM module & bindings
	await bridge.instantiate(fetch(WASM_URL));
	// call exported WASM function
	bridge.exports.start();
})();
