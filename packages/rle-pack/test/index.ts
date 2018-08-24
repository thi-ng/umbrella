import * as assert from "assert";
import { encode, decode } from "../src/index";

const src = new Uint8Array(1024);
src.set([1, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 4, 4, 5, 4, 4, 3, 3, 3, 2, 2, 2, 2, 1, 1, 1, 1, 1], 512);

describe("rle-pack", () => {
    it("3bit", () => {
        let packed = encode(src, src.length, 3);
        assert.deepEqual(packed, [0, 0, 4, 0, 25, 27, 252, 96, 63, 242, 74, 29, 139, 2, 184, 27, 21, 14, 73, 24, 15, 16]);
        let dest = decode(packed);
        assert.deepEqual(dest, src);
        packed = encode(src, src.length, 3, [1, 2, 4, 9]);
        assert.deepEqual(packed, [0, 0, 4, 0, 24, 9, 196, 127, 249, 146, 158, 219, 10, 225, 182, 167, 153, 35, 241, 0]);
        dest = decode(packed);
        assert.deepEqual(dest, src);
    });
});
