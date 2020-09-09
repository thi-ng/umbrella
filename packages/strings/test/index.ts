import * as assert from "assert";
import * as str from "../src/index";

describe("strings", () => {
    it("padLeft", () => {
        assert.strictEqual(str.padLeft(4)(undefined), "    ");
        assert.strictEqual(str.padLeft(4, "0")(null), "0000");
        assert.strictEqual(str.padLeft(4)(1), "   1");
        assert.strictEqual(str.padLeft(4)(12), "  12");
        assert.strictEqual(str.padLeft(4)(123), " 123");
        assert.strictEqual(str.padLeft(4)(1234), "1234");
        assert.strictEqual(str.padLeft(4)(12345), "12345");
        assert.strictEqual(str.padLeft(5), str.padLeft(5));
    });

    it("padRight", () => {
        assert.strictEqual(str.padRight(4)(undefined), "    ");
        assert.strictEqual(str.padRight(4, "0")(null), "0000");
        assert.strictEqual(str.padRight(4)(1), "1   ");
        assert.strictEqual(str.padRight(4)(12), "12  ");
        assert.strictEqual(str.padRight(4)(123), "123 ");
        assert.strictEqual(str.padRight(4)(1234), "1234");
        assert.strictEqual(str.padRight(4)(12345), "12345");
        assert.strictEqual(str.padRight(5), str.padRight(5));
    });
});
