import * as assert from "assert";
import { encodeBytes, decodeBytes } from "../src/index";

describe("rle-pack", () => {
    it("3bit", () => {
        const src = new Uint8Array(1024);
        src.set([1, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 4, 4, 5, 4, 4, 3, 3, 3, 2, 2, 2, 2, 1, 1, 1, 1, 1], 512);
        const packed = encodeBytes(src, src.length, 3);
        assert.deepEqual(packed, [0, 0, 4, 0, 140, 7, 254, 73, 67, 177, 96, 87, 3, 98, 161, 201, 35, 1, 226]);
        const dest = decodeBytes(packed, 3);
        assert.deepEqual(dest, src);
    });
});
