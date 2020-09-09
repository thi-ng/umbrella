import { XsAdd } from "@thi.ng/random";
import * as assert from "assert";
import { shuffle, shuffleRange } from "../src";

describe("arrays", () => {
    it("shuffle", () => {
        const src = "abcdefghijklmnopqrstuvwxyz";
        const buf = [...src];
        assert.strictEqual(shuffleRange(buf, 0, 0).join(""), src);
        assert.strictEqual(shuffleRange(buf, 0, 1).join(""), src);
        assert.strictEqual(shuffle(buf, 0).join(""), src);
        assert.strictEqual(shuffle(buf, 1).join(""), src);
        assert.throws(() => shuffleRange(buf, -1));
        assert.throws(() => shuffleRange(buf, 100));
        assert.throws(() => shuffleRange(buf, 1, 0));
        assert.throws(() => shuffleRange(buf, 0, 100));
        const rnd = new XsAdd(0xdeadbeef);
        assert.strictEqual(
            shuffleRange(buf, 10, 20, rnd).join(""),
            "abcdefghijnokpsqmtrluvwxyz"
        );
        assert.strictEqual(
            shuffle(buf, buf.length, rnd).join(""),
            "ovcwfhbnizgyekuqrdjslxpatm"
        );
    });
});
