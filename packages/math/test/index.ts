import * as assert from "assert";
import { fmod, mod, remainder } from "../src";

describe("math", () => {
    it("fmod", () => {
        assert.strictEqual(fmod(3.75, 2), 1.75);
        assert.strictEqual(fmod(-3.75, 2), -1.75);
        assert.strictEqual(3.75 % 2, 1.75);
        assert.strictEqual(-3.75 % 2, -1.75);
    });
    it("mod", () => {
        assert.strictEqual(mod(3.75, 2), 1.75);
        assert.strictEqual(mod(-3.75, 2), 0.25);
    });
    it("remainder", () => {
        assert.strictEqual(remainder(3.75, 2), -0.25);
        assert.strictEqual(remainder(-3.75, 2), 0.25);
    });
});
