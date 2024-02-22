import { MemoryLogger } from "@thi.ng/logger";
import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import {
	EVENT_MEMORY_CHANGED,
	WasmBridge,
	type IWasmAPI,
	type WasmExports,
} from "../src/index.js";
import { resolve } from "node:path";

test("allocators", async (done) => {
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
	expect(
		await bridge.instantiate(readFileSync(__dirname + "/allocators.wasm"))
	).toBeTrue();

	// no allocator by default
	expect(() => bridge.allocate(256)).toThrow();

	bridge.exports.useFBA();
	expect(bridge.allocate(256)).toEqual([0x100b0, 256]);
	expect(bridge.allocate(16)).toEqual([0x101b0, 16]);
	expect(bridge.setString("hello fba!", 0x101b0, 16)).toBe(10);
	bridge.exports.check(0x101b0, 10);
	expect(sizes).toEqual([131072]);

	bridge.exports.useGPA();
	expect(bridge.allocate(256)).toEqual([0x20000, 256]);
	expect(bridge.allocate(16)).toEqual([0x40000, 16]);
	expect(bridge.setString("hello gpa!", 0x40000, 16)).toBe(10);
	bridge.exports.check(0x40000, 10);

	bridge.exports.useNone();
	expect(() => bridge.allocate(256)).toThrow();

	expect(sizes).toEqual([131072, 262144, 393216]);
	expect(logger.journal.map((x) => x[3])).toEqual([
		"allocated 256 bytes @ 0x000100b0 .. 0x000101af",
		"allocated 16 bytes @ 0x000101b0 .. 0x000101bf",
		"hello fba!",
		"allocated 256 bytes @ 0x00020000 .. 0x000200ff",
		"allocated 16 bytes @ 0x00040000 .. 0x0004000f",
		"hello gpa!",
	]);
	done();
});

test("custom", async (done) => {
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
	expect(
		await bridge.instantiate(
			readFileSync(resolve(__dirname + "/custom.wasm"))
		)
	).toBeTrue();

	bridge.exports.test_setVec2();
	expect(logger.journal.length).toBe(3);
	expect(logger.journal[1][3]).toBe("0, 0");
	expect(logger.journal[2][3]).toBe("10, 20");

	logger.clear();
	const epoch = bridge.api.epoch();
	bridge.exports.test_epoch();
	expect(logger.journal[0][3] >= epoch).toBeTrue();
	done();
});
