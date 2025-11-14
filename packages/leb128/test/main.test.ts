// SPDX-License-Identifier: Apache-2.0
import { hasWASM } from "@thi.ng/checks";
import { expect, test } from "bun:test";
import {
	decodeSLEB128,
	decodeULEB128,
	encodeSLEB128,
	encodeULEB128,
	encodeSLEB128Into,
	encodeULEB128Into,
} from "../src/index.js";

if (hasWASM()) {
	test("signed", () => {
		let a;
		expect([...(a = encodeSLEB128(Number.MAX_SAFE_INTEGER))]).toEqual([
			255, 255, 255, 255, 255, 255, 255, 15,
		]);
		expect(decodeSLEB128(a)).toEqual([BigInt(Number.MAX_SAFE_INTEGER), 8]);
		expect([...(a = encodeSLEB128(Number.MIN_SAFE_INTEGER))]).toEqual([
			129, 128, 128, 128, 128, 128, 128, 112,
		]);
		expect(decodeSLEB128(a)).toEqual([BigInt(Number.MIN_SAFE_INTEGER), 8]);
		expect(decodeSLEB128(encodeSLEB128(64))).toEqual([BigInt(64), 2]);
		expect(decodeSLEB128(encodeSLEB128(-64))).toEqual([BigInt(-64), 1]);

		let b = new Uint8Array(8);
		encodeSLEB128Into(b, Number.MAX_SAFE_INTEGER, 0);
		expect([...b]).toEqual([255, 255, 255, 255, 255, 255, 255, 15]);

		encodeSLEB128Into(b, Number.MIN_SAFE_INTEGER, 0);
		expect([...b]).toEqual([129, 128, 128, 128, 128, 128, 128, 112]);
	});

	test("unsigned", () => {
		let a: Uint8Array;
		expect([...(a = encodeULEB128(Number.MAX_SAFE_INTEGER))]).toEqual([
			255, 255, 255, 255, 255, 255, 255, 15,
		]);
		expect(decodeULEB128(a)).toEqual([BigInt(Number.MAX_SAFE_INTEGER), 8]);
		expect([...(a = encodeULEB128(Number.MIN_SAFE_INTEGER))]).toEqual([
			129, 128, 128, 128, 128, 128, 128, 240, 255, 1,
		]);
		expect(decodeULEB128(a)).toEqual([
			BigInt.asUintN(64, BigInt(Number.MIN_SAFE_INTEGER)),
			10,
		]);
		expect(decodeULEB128(encodeULEB128(127))).toEqual([BigInt(127), 1]);

		let b = new Uint8Array(10);
		let count = encodeULEB128Into(b, Number.MAX_SAFE_INTEGER, 0);
		expect([...b]).toEqual([255, 255, 255, 255, 255, 255, 255, 15, 0, 0]);
		expect(count).toBe(8);

		count = encodeULEB128Into(b, Number.MIN_SAFE_INTEGER, 0);
		expect([...b]).toEqual([
			129, 128, 128, 128, 128, 128, 128, 240, 255, 1,
		]);
		expect(count).toBe(10);
	});
} else {
	console.warn("WASM not available, skipping tests...");
}
