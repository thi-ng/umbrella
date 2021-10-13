import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { interpolateKeys } from "../src/index.js"

group("interpolateKeys", {
    basic: () => {
        assert.strictEqual(
            interpolateKeys("{a0}{b.b}{_c}", { a0: 1, "b.b": 2, _c: 3 }),
            "123"
        );
    },

    "invalid key": () => {
        assert.throws(() => interpolateKeys("{a}", {}));
    },
});
