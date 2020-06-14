import * as assert from "assert";
import { splice } from "../src/splice";

const SRC = "abc";

describe("splice", () => {
    it("pos index", () => {
        assert.equal(splice(SRC, "x", 0), "xabc");
        assert.equal(splice(SRC, "x", 1), "axbc");
        assert.equal(splice(SRC, "x", 2), "abxc");
        assert.equal(splice(SRC, "x", 3), "abcx");
        assert.equal(splice(SRC, "x", 4), "abcx");
    });
    it("neg index", () => {
        assert.equal(splice(SRC, "x", -1), "abxc");
        assert.equal(splice(SRC, "x", -2), "axbc");
        assert.equal(splice(SRC, "x", -3), "xabc");
        assert.equal(splice(SRC, "x", -4), "xabc");
    });
    it("w/ deletion", () => {
        assert.equal(splice(SRC, "xx", 0, 1), "xxbc");
        assert.equal(splice(SRC, "xx", 1, 2), "axxc");
        assert.equal(splice(SRC, "xx", 2, 4), "abxx");
        assert.equal(splice(SRC, "xx", -1, 4), "abxx");
        assert.equal(splice(SRC, "xx", -2, 4), "axx");
        assert.equal(splice(SRC, "xx", -3, 4), "xx");
        assert.equal(splice(SRC, "xx", -3, 2), "xxc");
    });
});
