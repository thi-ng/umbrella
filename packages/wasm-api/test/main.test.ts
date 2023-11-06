import { MemoryLogger } from "@thi.ng/logger";
import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { readFileSync } from "fs";
import {
	EVENT_MEMORY_CHANGED,
	WasmBridge,
	type IWasmAPI,
	type WasmExports,
} from "../src/index.js";

group("wasm-api", {
	allocators: async ({ done }) => {
		interface Allocators extends WasmExports {
			useFBA(): void;
			useGPA(): void;
			useNone(): void;
			check(addr: number, len: number): void;
		}

		const sizes: number[] = [];
		const logger = new MemoryLogger("wasm");
		const bridge = new WasmBridge<Allocators>([], logger);
		// record memory growth changes
		bridge.addListener(EVENT_MEMORY_CHANGED, (e) =>
			sizes.push(e.value.buffer.byteLength)
		);
		assert.ok(
			await bridge.instantiate(readFileSync("test/allocators.wasm"))
		);

		// no allocator by default
		assert.throws(() => bridge.allocate(256), "no alloc");

		bridge.exports.useFBA();
		assert.deepStrictEqual(
			bridge.allocate(256),
			[0x100b0, 256],
			"fba alloc #1"
		);
		assert.deepStrictEqual(
			bridge.allocate(16),
			[0x101b0, 16],
			"fba alloc #2"
		);
		assert.strictEqual(
			bridge.setString("hello fba!", 0x101b0, 16),
			10,
			"fba set string"
		);
		bridge.exports.check(0x101b0, 10);
		assert.deepStrictEqual(sizes, [131072], "mem sizes unchanged");

		bridge.exports.useGPA();
		assert.deepStrictEqual(
			bridge.allocate(256),
			[0x20000, 256],
			"gpa alloc #1"
		);
		assert.deepStrictEqual(
			bridge.allocate(16),
			[0x40000, 16],
			"gpa alloc #2"
		);
		assert.strictEqual(
			bridge.setString("hello gpa!", 0x40000, 16),
			10,
			"gpa set string"
		);
		bridge.exports.check(0x40000, 10);

		bridge.exports.useNone();
		assert.throws(() => bridge.allocate(256), "no alloc");

		assert.deepStrictEqual(sizes, [131072, 262144, 393216], "mem sizes #2");
		assert.deepStrictEqual(
			logger.journal.map((x) => x[3]),
			[
				"allocated 256 bytes @ 0x000100b0 .. 0x000101af",
				"allocated 16 bytes @ 0x000101b0 .. 0x000101bf",
				"hello fba!",
				"allocated 256 bytes @ 0x00020000 .. 0x000200ff",
				"allocated 16 bytes @ 0x00040000 .. 0x0004000f",
				"hello gpa!",
			]
		);
		done();
	},

	custom: async ({ done }) => {
		interface CustomWasm extends WasmExports {
			test_setVec2: () => void;
			test_epoch: () => void;
		}
		class CustomAPI implements IWasmAPI {
			readonly id = "custom";

			parent!: WasmBridge;

			async init(parent: WasmBridge) {
				this.parent = parent;
				return true;
			}

			getImports() {
				return {
					setVec2: (addr: number) => {
						this.parent.f32.set([10, 20], addr >> 2);
					},
				};
			}
		}

		const logger = new MemoryLogger("wasm");
		const bridge = new WasmBridge<CustomWasm>([new CustomAPI()], logger);
		assert.ok(await bridge.instantiate(readFileSync("test/custom.wasm")));

		bridge.exports.test_setVec2();
		assert.strictEqual(logger.journal.length, 3);
		assert.strictEqual(logger.journal[1][3], "0, 0");
		assert.strictEqual(logger.journal[2][3], "10, 20");

		logger.clear();
		const epoch = bridge.api.epoch();
		bridge.exports.test_epoch();
		assert.ok(logger.journal[0][3] >= epoch);
		done();
	},
});
