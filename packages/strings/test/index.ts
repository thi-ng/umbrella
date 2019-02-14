import * as assert from "assert";
import * as str from "../src/index";

describe("strings", () => {
    it("padLeft", () => {
        assert.equal(str.padLeft(4)(undefined), "    ");
        assert.equal(str.padLeft(4, "0")(null), "0000");
        assert.equal(str.padLeft(4)(1), "   1");
        assert.equal(str.padLeft(4)(12), "  12");
        assert.equal(str.padLeft(4)(123), " 123");
        assert.equal(str.padLeft(4)(1234), "1234");
        assert.equal(str.padLeft(4)(12345), "12345");
        assert.strictEqual(str.padLeft(5), str.padLeft(5));
    });

    it("padRight", () => {
        assert.equal(str.padRight(4)(undefined), "    ");
        assert.equal(str.padRight(4, "0")(null), "0000");
        assert.equal(str.padRight(4)(1), "1   ");
        assert.equal(str.padRight(4)(12), "12  ");
        assert.equal(str.padRight(4)(123), "123 ");
        assert.equal(str.padRight(4)(1234), "1234");
        assert.equal(str.padRight(4)(12345), "12345");
        assert.strictEqual(str.padRight(5), str.padRight(5));
    });
});
