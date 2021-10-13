import { hasWASM } from "@thi.ng/checks/has-wasm";
import { unsupported } from "@thi.ng/errors/unsupported";
import { base64Decode } from "@thi.ng/transducers-binary/base64";
import { BINARY } from "./binary.js";

interface LEB128 {
    memory: WebAssembly.Memory;
    buf: number;
    leb128_encode_u_js(x: number): number;
    leb128_decode_u_js(buf: number, num: number): number;
    leb128_encode_s_js(x: number): number;
    leb128_decode_s_js(buf: number, num: number): number;
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
    (op: "leb128_encode_s_js" | "leb128_encode_u_js") => (x: number) => {
        ensureWASM();
        return U8.slice(0, wasm[op](x));
    };

const decode =
    (op: "leb128_decode_s_js" | "leb128_decode_u_js") =>
    (src: Uint8Array, idx = 0) => {
        ensureWASM();
        U8.set(src.subarray(idx, Math.min(idx + 10, src.length)), 0);
        return [wasm[op](0, 0), U8[0]];
    };

/**
 * Encodes signed integer `x` into LEB128 varint format and returns
 * encoded bytes.
 *
 * @param x -
 */
export const encodeSLEB128 = encode("leb128_encode_s_js");

/**
 * Takes Uint8Array with LEB128 encoded signed varint and an optional
 * start index to decode from. Returns 2-tuple of decoded value and
 * number of bytes consumed. Consumes up to 10 bytes from `src`.
 *
 * @param src -
 * @param idx -
 */
export const decodeSLEB128 = decode("leb128_decode_s_js");

/**
 * Encodes unsigned integer `x` into LEB128 varint format and returns
 * encoded bytes. Values < 0 will be encoded as zero.
 *
 * @param x -
 */
export const encodeULEB128 = encode("leb128_encode_u_js");

/**
 * Takes Uint8Array with LEB128 encoded unsigned varint and an optional
 * start index to decode from. Returns 2-tuple of decoded value and
 * number of bytes consumed. Consumes up to 10 bytes from `src`.
 *
 * @param src -
 * @param idx -
 */
export const decodeULEB128 = decode("leb128_decode_u_js");
