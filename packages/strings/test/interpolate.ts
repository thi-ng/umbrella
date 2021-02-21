import * as assert from "assert";
import { interpolateKeys } from "../src";

describe("interpolateKeys", () => {
    it("basic", () => {
        assert.strictEqual(
            interpolateKeys("{a0}{b.b}{_c}", { a0: 1, "b.b": 2, _c: 3 }),
            "123"
        );
    });

    it("invalid key", () => {
        assert.throws(() => interpolateKeys("{a}", {}));
    });
});
