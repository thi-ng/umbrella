import { hasWASM } from "@thi.ng/checks";
import { unsupported } from "@thi.ng/errors";
import { base64Decode } from "@thi.ng/transducers-binary";
import { BINARY } from "./binary";

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

/**
 * Promise indicating that the WASM module has been initialized and is
 * ready to use. A `false` result means WASM isn't available at all.
 */
export let READY: Promise<boolean>;

if (hasWASM()) {
    READY = WebAssembly.instantiate(new Uint8Array([...base64Decode(BINARY)]))
        .then((inst) => {
            wasm = inst.instance.exports;
            // mapped view of the data buffer
            U8 = new Uint8Array(wasm.memory.buffer, wasm.buf, 16);
        })
        .then(() => true);
} else {
    READY = Promise.resolve(false);
}

const ensureWASM = () => !wasm && unsupported("WASM module unavailable");

const copy = (src: Uint8Array, idx: number) =>
    U8.set(src.subarray(idx, Math.min(idx + 10, src.length)), 0);

/**
 * Encodes signed integer `x` into LEB128 varint format and returns
 * encoded bytes.
 *
 * @param x
 */
export const encodeSLEB128 = (x: number) => {
    ensureWASM();
    return U8.slice(0, wasm.leb128_encode_s_js(x));
};

/**
 * Takes Uint8Array with LEB128 encoded signed varint and an optional
 * start index to decode from. Returns 2-tuple of decoded value and
 * number of bytes consumed. Consumes up to 10 bytes from `src`.
 *
 * @param src
 * @param idx
 */
export const decodeSLEB128 = (src: Uint8Array, idx = 0) => {
    ensureWASM();
    copy(src, idx);
    return [wasm.leb128_decode_s_js(0, 0), U8[0]];
};

/**
 * Encodes unsigned integer `x` into LEB128 varint format and returns
 * encoded bytes. Values < 0 will be encoded as zero.
 *
 * @param x
 */
export const encodeULEB128 = (x: number) => {
    ensureWASM();
    return U8.slice(0, wasm.leb128_encode_u_js(x));
};

/**
 * Takes Uint8Array with LEB128 encoded unsigned varint and an optional
 * start index to decode from. Returns 2-tuple of decoded value and
 * number of bytes consumed. Consumes up to 10 bytes from `src`.
 *
 * @param src
 * @param idx
 */
export const decodeULEB128 = (src: Uint8Array, idx = 0) => {
    ensureWASM();
    copy(src, idx);
    return [wasm.leb128_decode_u_js(0, 0), U8[0]];
};
