// SPDX-License-Identifier: Apache-2.0
import { hasWASM } from "@thi.ng/checks/has-wasm";
import { ensureIndex } from "@thi.ng/errors/out-of-bounds";
import { unsupported } from "@thi.ng/errors/unsupported";
import { base64Decode } from "@thi.ng/transducers-binary/base64";
import { BINARY } from "./binary.js";

interface LEB128 {
	memory: WebAssembly.Memory;
	buf: number;
	leb128EncodeI64Into(
		dst: Uint8Array,
		x: bigint | number,
		pos: number
	): number;
	leb128EncodeU64Into(
		dst: Uint8Array,
		x: bigint | number,
		pos: number
	): number;
	leb128EncodeU64(x: bigint | number): number;
	leb128DecodeU64(buf: bigint | number, num: number): bigint;
	leb128EncodeI64(x: bigint | number): number;
	leb128DecodeI64(buf: bigint | number, num: number): bigint;
}

let wasm: LEB128;
let U8: Uint8Array;

if (hasWASM()) {
	const inst = new WebAssembly.Instance(
		new WebAssembly.Module(base64Decode(BINARY))
	);
	wasm = <any>inst.exports;
	// mapped view of the data buffer
	U8 = new Uint8Array(wasm.memory.buffer, wasm.buf, 16);
}

/** @internal */
const __ensureWASM = () => !wasm && unsupported("WASM module unavailable");

/** @internal */
const __encode =
	(op: "leb128EncodeI64" | "leb128EncodeU64", signed: boolean) =>
	(x: bigint | number) => {
		__ensureWASM();
		const value = signed
			? BigInt.asIntN(64, BigInt(x))
			: BigInt.asUintN(64, BigInt(x));
		return U8.slice(0, wasm[op](value));
	};

/** @internal */
const __encodeInto =
	(op: "leb128EncodeI64" | "leb128EncodeU64", signed: boolean) =>
	(dst: Uint8Array, x: bigint | number, pos: number = 0) => {
		__ensureWASM();
		const value = signed
			? BigInt.asIntN(64, BigInt(x))
			: BigInt.asUintN(64, BigInt(x));
		const size = wasm[op](value);

		// ensure bounds, the position must be between [0..length - size]
		// ensureIndex's range end is exclusive, so we add 1
		ensureIndex(pos, 0, dst.length - size + 1);
		dst.set(U8.subarray(0, size), pos);
		return size;
	};

/** @internal */
const __decode =
	(op: "leb128DecodeI64" | "leb128DecodeU64", signed: boolean) =>
	(src: Uint8Array, idx = 0): [bigint, number] => {
		__ensureWASM();
		U8.set(src.subarray(idx, Math.min(idx + 10, src.length)), 0);
		const value = wasm[op](0, 0);
		return [
			signed ? BigInt.asIntN(64, value) : BigInt.asUintN(64, value),
			U8[0],
		];
	};

/**
 * Encodes signed integer `x` into LEB128 varint format and returns encoded
 * bytes. Values will be coerced to i64 range prior to encoding.
 *
 * @param x -
 */
export const encodeSLEB128 = __encode("leb128EncodeI64", true);

/**
 * Takes an `Uint8Array` with LEB128 encoded signed varint and an optional start
 * index to decode from. Returns 2-tuple of decoded value and number of bytes
 * consumed. Consumes up to 10 bytes from `src`.
 *
 * @param src -
 * @param idx -
 */
export const decodeSLEB128 = __decode("leb128DecodeI64", true);

/**
 * Takes a destination `Uint8Array`, a signed integer `x`, and an optional
 * index/position to encode an LEB128 formatted byte sequence into the
 * destination. Returns the number of bytes written.
 *
 * @remarks
 * Also see {@link encodeSLEB128}.
 *
 * @param dst -
 * @param x -
 * @param pos -
 */
export const encodeSLEB128Into = __encodeInto("leb128EncodeI64", true);

/**
 * Encodes unsigned integer `x` into LEB128 varint format and returns encoded
 * bytes. Values will be coerced to u64 range prior to encoding.
 *
 * @param x -
 */
export const encodeULEB128 = __encode("leb128EncodeU64", false);

/**
 * Takes an `Uint8Array` with LEB128 encoded unsigned varint and an optional
 * start index to decode from. Returns 2-tuple of decoded value and number of
 * bytes consumed. Consumes up to 10 bytes from `src`.
 *
 * @param src -
 * @param idx -
 */
export const decodeULEB128 = __decode("leb128DecodeU64", false);

/**
 * Takes a destination Uint8Array, an unsigned integer `x`, and an optional
 * position to encode an LEB128 formatted byte sequence into the destination.
 * Returns the number of bytes written.
 *
 * @remarks
 * Also see {@link encodeULEB128}.
 *
 * @param dst -
 * @param x -
 * @param pos -
 */
export const encodeULEB128Into = __encodeInto("leb128EncodeU64", true);
