import * as assert from "assert";
import { escape, unescape } from "../src";

const SRC = "\ta\nb😎c£\\\x00";

describe("escape", () => {
    it("escape", () => {
        assert.strictEqual(escape(SRC), "\\ta\\nb\\U0001f60ec\\u00a3\\\\\\0");
    });

    it("roundtrip", () => {
        assert.strictEqual(unescape(escape(SRC)), SRC);
    });
});
