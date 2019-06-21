import { hasWASM } from "@thi.ng/checks";
import { unsupported } from "@thi.ng/errors";
import { base64Decode } from "@thi.ng/transducers-binary";

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
    WebAssembly.instantiate(
        new Uint8Array([
            ...base64Decode(
                "AGFzbQEAAAABCgJgAXwBf2AAAXwDBQQAAQABBQMBAAEGBwF/AEGACAsHZAYGbWVtb3J5AgASbGViMTI4X2VuY29kZV91X2pzAAADYnVmAwASbGViMTI4X2RlY29kZV91X2pzAAESbGViMTI4X2VuY29kZV9zX2pzAAISbGViMTI4X2RlY29kZV9zX2pzAAMKhQQEdAICfwF+AkAgAEQAAAAAAADwQ2MgAEQAAAAAAAAAAGZxBEAgALEiA0KAAVoNAQtBgAggA6dB/wBxOgAAQQEPCwNAIAFBgAhqIAOnIgJB/wBxIAJBgAFyIANCB4giA1AbOgAAIAFBAWohASADQgBSDQALIAELXgIDfwJ+AkADQCAAQQlLDQEgAUEBaiEBIABBgAhqLAAAIgJB/wBxrSAEhiADhCEDIABBAWohACAEQgd8IQQgAkF/TA0AC0GACCABOgAAIAO6DwtBgAggADoAACADuguuAQIEfwF+An5CgICAgICAgICAfyAAmUQAAAAAAADgQ2NFDQAaIACwCyIFQkB9QoABVARAQYAIIAVCOYinQcAAcSAFp0E/cXI6AABBAQ8LA0AgBaciAkHAAHEhAyABQYAIagJ/AkAgBUIHhyIFQgBRBEAgA0UNAQtBASEEIAJBgH9yIAVCf1IgA0VyDQEaC0EAIQQgAkH/AHELOgAAIAFBAWohASAEDQALIAFB/wFxC38CBH8DfgJAA0AgAEEBaiEBIAVCB3whBiAAQYAIai0AACIDQRh0QRh1IQIgA0H/AHGtIAWGIASEIQQgAEEISw0BIAEhACAGIQUgAkEASA0ACwsgAUH/AXFBCUsgAkHAAHFFckUEQCAEQn8gBkI/g4aEIQQLQYAIIAE6AAAgBLkL"
            )
        ])
    ).then((inst) => {
        wasm = inst.instance.exports;
        // mapped view of the data buffer
        U8 = new Uint8Array(wasm.memory.buffer, wasm.buf, 16);
    });
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
