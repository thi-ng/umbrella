import { hasWASM } from "@thi.ng/checks";
import * as assert from "assert";
import {
    decodeSLEB128,
    decodeULEB128,
    encodeSLEB128,
    encodeULEB128,
} from "../src/index";

describe("leb128", () => {
    if (hasWASM()) {
        it("signed", () => {
            let a;
            assert.deepEqual(
                [...(a = encodeSLEB128(Number.MAX_SAFE_INTEGER))],
                [255, 255, 255, 255, 255, 255, 255, 15]
            );
            assert.deepEqual(decodeSLEB128(a), [Number.MAX_SAFE_INTEGER, 8]);
            assert.deepEqual(
                [...(a = encodeSLEB128(Number.MIN_SAFE_INTEGER))],
                [129, 128, 128, 128, 128, 128, 128, 112]
            );
            assert.deepEqual(decodeSLEB128(a), [Number.MIN_SAFE_INTEGER, 8]);
            assert.deepEqual(decodeSLEB128(encodeSLEB128(64)), [64, 2]);
            assert.deepEqual(decodeSLEB128(encodeSLEB128(-64)), [-64, 1]);
        });

        it("unsigned", () => {
            let a;
            assert.deepEqual(
                [...(a = encodeULEB128(Number.MAX_SAFE_INTEGER))],
                [255, 255, 255, 255, 255, 255, 255, 15]
            );
            assert.deepEqual(decodeULEB128(a), [Number.MAX_SAFE_INTEGER, 8]);
            assert.deepEqual(
                [...(a = encodeULEB128(Number.MIN_SAFE_INTEGER))],
                [0]
            );
            assert.deepEqual(decodeULEB128(a), [0, 1]);
            assert.deepEqual(decodeULEB128(encodeULEB128(127)), [127, 1]);
        });
    } else {
        console.warn("WASM not available, skipping tests...");
    }
});
