import * as assert from "assert";
import { splice } from "../src/splice";

const SRC = "abc";

describe("splice", () => {
    it("pos index", () => {
        assert.strictEqual(splice(SRC, "x", 0), "xabc");
        assert.strictEqual(splice(SRC, "x", 1), "axbc");
        assert.strictEqual(splice(SRC, "x", 2), "abxc");
        assert.strictEqual(splice(SRC, "x", 3), "abcx");
        assert.strictEqual(splice(SRC, "x", 4), "abcx");
    });
    it("neg index", () => {
        assert.strictEqual(splice(SRC, "x", -1), "abxc");
        assert.strictEqual(splice(SRC, "x", -2), "axbc");
        assert.strictEqual(splice(SRC, "x", -3), "xabc");
        assert.strictEqual(splice(SRC, "x", -4), "xabc");
    });
    it("w/ deletion", () => {
        assert.strictEqual(splice(SRC, "xx", 0, 1), "xxbc");
        assert.strictEqual(splice(SRC, "xx", 1, 2), "axxc");
        assert.strictEqual(splice(SRC, "xx", 2, 4), "abxx");
        assert.strictEqual(splice(SRC, "xx", -1, 4), "abxx");
        assert.strictEqual(splice(SRC, "xx", -2, 4), "axx");
        assert.strictEqual(splice(SRC, "xx", -3, 4), "xx");
        assert.strictEqual(splice(SRC, "xx", -3, 2), "xxc");
    });
});
