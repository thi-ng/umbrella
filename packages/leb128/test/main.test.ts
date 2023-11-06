import { hasWASM } from "@thi.ng/checks";
import { group } from "@thi.ng/testament";
import * as assert from "assert";
import {
	decodeSLEB128,
	decodeULEB128,
	encodeSLEB128,
	encodeULEB128,
} from "../src/index.js";

if (hasWASM()) {
	group("leb128", {
		signed: () => {
			let a;
			assert.deepStrictEqual(
				[...(a = encodeSLEB128(Number.MAX_SAFE_INTEGER))],
				[255, 255, 255, 255, 255, 255, 255, 15]
			);
			assert.deepStrictEqual(decodeSLEB128(a), [
				BigInt(Number.MAX_SAFE_INTEGER),
				8,
			]);
			assert.deepStrictEqual(
				[...(a = encodeSLEB128(Number.MIN_SAFE_INTEGER))],
				[129, 128, 128, 128, 128, 128, 128, 112]
			);
			assert.deepStrictEqual(decodeSLEB128(a), [
				BigInt(Number.MIN_SAFE_INTEGER),
				8,
			]);
			assert.deepStrictEqual(decodeSLEB128(encodeSLEB128(64)), [
				BigInt(64),
				2,
			]);
			assert.deepStrictEqual(decodeSLEB128(encodeSLEB128(-64)), [
				BigInt(-64),
				1,
			]);
		},

		unsigned: () => {
			let a: Uint8Array;
			assert.deepStrictEqual(
				[...(a = encodeULEB128(Number.MAX_SAFE_INTEGER))],
				[255, 255, 255, 255, 255, 255, 255, 15]
			);
			assert.deepStrictEqual(decodeULEB128(a), [
				BigInt(Number.MAX_SAFE_INTEGER),
				8,
			]);
			assert.deepStrictEqual(
				[...(a = encodeULEB128(Number.MIN_SAFE_INTEGER))],
				[129, 128, 128, 128, 128, 128, 128, 240, 255, 1]
			);
			assert.deepStrictEqual(decodeULEB128(a), [
				BigInt.asUintN(64, BigInt(Number.MIN_SAFE_INTEGER)),
				10,
			]);
			assert.deepStrictEqual(decodeULEB128(encodeULEB128(127)), [
				BigInt(127),
				1,
			]);
		},
	});
} else {
	console.warn("WASM not available, skipping tests...");
}
