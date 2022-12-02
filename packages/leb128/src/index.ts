import { hasWASM } from "@thi.ng/checks/has-wasm";
import { unsupported } from "@thi.ng/errors/unsupported";
import { base64Decode } from "@thi.ng/transducers-binary/base64";
import { BINARY } from "./binary.js";

interface LEB128 {
	memory: WebAssembly.Memory;
	buf: number;
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

const ensureWASM = () => !wasm && unsupported("WASM module unavailable");

const encode =
	(op: "leb128EncodeI64" | "leb128EncodeU64", signed: boolean) =>
	(x: bigint | number) => {
		ensureWASM();
		const value = signed
			? BigInt.asIntN(64, BigInt(x))
			: BigInt.asUintN(64, BigInt(x));
		return U8.slice(0, wasm[op](value));
	};

const decode =
	(op: "leb128DecodeI64" | "leb128DecodeU64", signed: boolean) =>
	(src: Uint8Array, idx = 0): [bigint, number] => {
		ensureWASM();
		U8.set(src.subarray(idx, Math.min(idx + 10, src.length)), 0);
		const value = wasm[op](0, 0);
		return [
			signed ? BigInt.asIntN(64, value) : BigInt.asUintN(64, value),
			U8[0],
		];
	};

/**
 * Encodes signed integer `x` into LEB128 varint format and returns
 * encoded bytes.
 *
 * @param x -
 */
export const encodeSLEB128 = encode("leb128EncodeI64", true);

/**
 * Takes Uint8Array with LEB128 encoded signed varint and an optional
 * start index to decode from. Returns 2-tuple of decoded value and
 * number of bytes consumed. Consumes up to 10 bytes from `src`.
 *
 * @param src -
 * @param idx -
 */
export const decodeSLEB128 = decode("leb128DecodeI64", true);

/**
 * Encodes unsigned integer `x` into LEB128 varint format and returns
 * encoded bytes. Values < 0 will be encoded as zero.
 *
 * @param x -
 */
export const encodeULEB128 = encode("leb128EncodeU64", false);

/**
 * Takes Uint8Array with LEB128 encoded unsigned varint and an optional
 * start index to decode from. Returns 2-tuple of decoded value and
 * number of bytes consumed. Consumes up to 10 bytes from `src`.
 *
 * @param src -
 * @param idx -
 */
export const decodeULEB128 = decode("leb128DecodeU64", false);
