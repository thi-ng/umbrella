import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { escape, unescape } from "../src/index.js"

const SRC = "\ta\nb😎c£\\\x00";

group("escape", {
    escape: () => {
        assert.strictEqual(escape(SRC), "\\ta\\nb\\U0001f60ec\\u00a3\\\\\\0");
    },

    roundtrip: () => {
        assert.strictEqual(unescape(escape(SRC)), SRC);
    },
});
