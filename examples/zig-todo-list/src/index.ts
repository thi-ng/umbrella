import type { Fn0 } from "@thi.ng/api";
import { FMT_HHmmss, FMT_yyyyMMdd } from "@thi.ng/date";
import {
	WasmBridge,
	type IWasmAPI,
	type WasmExports,
	type WasmType,
} from "@thi.ng/wasm-api";
import { WasmDom, type WasmDomExports } from "@thi.ng/wasm-api-dom";
import {
	WasmSchedule,
	type WasmScheduleExports,
} from "@thi.ng/wasm-api-schedule";
import { $Task, TaskState, type Task } from "./api";
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
	start: Fn0<void>;
}

/**
 * Custom WASM API module for to-do list related functionality, i.e. the
 * functions returned by `getImports()` are being made available to the WASM
 * binary.
 */
class TodoHandlers implements IWasmAPI<WasmApp> {
	readonly id = "todo";
	readonly dependencies = [WasmDom.id, WasmSchedule.id];

	parent!: WasmBridge<WasmApp>;
	$Task!: WasmType<Task>;

	async init(parent: WasmBridge<WasmApp>) {
		this.parent = parent;
		// Pre-initialize generated $Task type wrapper
		this.$Task = $Task(parent);
		return true;
	}

	getImports() {
		return {
			/**
			 * Takes a unix epoch (in seconds) and a target address and max
			 * length. Formats timestamp and writes result to memory from
			 * `addr`. Returns string length.
			 *
			 * @param epoch
			 * @param addr
			 * @param maxLen
			 */
			_formatDateTime: (epoch: number, addr: number, maxLen: number) => {
				epoch *= 1000;
				const res =
					FMT_yyyyMMdd(epoch, false) + " " + FMT_HHmmss(epoch, false);
				return this.parent.setString(res, addr, maxLen);
			},

			/**
			 * Reads tasks from local storage, allocates & writes them to
			 * memory. Stores details (i.e. start address and number of tasks)
			 * in provided `slice` pointer.
			 *
			 * @param slice
			 */
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

			/**
			 * Reads `num` tasks from memory and stores them in local storage
			 * .
			 * @param addr
			 * @param num
			 */
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
