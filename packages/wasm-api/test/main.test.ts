// SPDX-License-Identifier: Apache-2.0
import { MemoryLogger } from "@thi.ng/logger";
import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
	EVENT_MEMORY_CHANGED,
	WasmBridge,
	WasmStringPtr,
	type IWasmAPI,
	type WasmExports,
} from "../src/index.js";

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
	expect(bridge.allocate(256)).toEqual([0x10e0, 256]);
	expect(bridge.allocate(16)).toEqual([0x11e0, 16]);
	expect(bridge.setString("hello fba!", 0x11e0, 16)).toBe(10);
	bridge.exports.check(0x11e0, 10);
	expect(sizes).toEqual([0x10000]);

	bridge.exports.useGPA();
	expect(bridge.allocate(256)).toEqual([0x10000, 256]);
	expect(bridge.allocate(16)).toEqual([0x30000, 16]);
	expect(bridge.setString("hello gpa!", 0x30000, 16)).toBe(10);
	bridge.exports.check(0x30000, 10);

	bridge.exports.useNone();
	expect(() => bridge.allocate(256)).toThrow();

	expect(sizes).toEqual([0x10000, 0x30000, 0x50000]);
	expect(logger.journal.map((x) => x[3])).toEqual([
		"allocated 256 bytes @ 0x000010e0 .. 0x000011df",
		"allocated 16 bytes @ 0x000011e0 .. 0x000011ef",
		"hello fba!",
		"allocated 256 bytes @ 0x00010000 .. 0x000100ff",
		"allocated 16 bytes @ 0x00030000 .. 0x0003000f",
		"hello gpa!",
	]);
	done();
});

test("custom", async (done) => {
	interface CustomWasm extends WasmExports {
		test_setVec2: () => void;
		test_epoch: () => void;
		test_optStringPtr: () => void;
		test_optStringPtrNull: () => void;
	}
	class CustomAPI implements IWasmAPI {
		parent!: WasmBridge;
		optPtr!: WasmStringPtr;

		async init(parent: WasmBridge) {
			this.parent = parent;
			return true;
		}

		getImports() {
			return {
				setVec2: (addr: number) => {
					this.parent.f32.set([10, 20], addr >> 2);
				},
				structWithOptPtr: (addr: number) => {
					this.optPtr = new WasmStringPtr(this.parent, addr, true);
				},
			};
		}
	}

	const logger = new MemoryLogger("wasm");
	// const logger = new ConsoleLogger("wasm");
	const bridge = new WasmBridge<CustomWasm>(
		[{ id: "custom", factory: () => new CustomAPI() }],
		logger
	);
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

	bridge.exports.test_optStringPtrNull();
	let ptr = (<CustomAPI>bridge.modules.custom).optPtr;
	expect(ptr.isNull).toBeTrue();
	expect(ptr.addr).toBe(0);
	expect(ptr.base).toBe(0x1000);
	expect(ptr.length).toBe(0);
	expect(ptr.deref()).toBe("");

	bridge.exports.test_optStringPtr();
	ptr = (<CustomAPI>bridge.modules.custom).optPtr;
	expect(ptr.isNull).toBeFalse();
	expect(ptr.addr).toBe(0x1008);
	expect(ptr.base).toBe(0x1004);
	expect(ptr.length).toBe(3);
	expect(ptr.deref()).toBe("foo");

	done();
});
