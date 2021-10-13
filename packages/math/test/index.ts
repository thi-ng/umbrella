import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { fmod, mod, remainder } from "../src/index.js"

group("math", {
    fmod: () => {
        assert.strictEqual(fmod(3.75, 2), 1.75);
        assert.strictEqual(fmod(-3.75, 2), -1.75);
        assert.strictEqual(3.75 % 2, 1.75);
        assert.strictEqual(-3.75 % 2, -1.75);
    },

    mod: () => {
        assert.strictEqual(mod(3.75, 2), 1.75);
        assert.strictEqual(mod(-3.75, 2), 0.25);
    },

    remainder: () => {
        assert.strictEqual(remainder(3.75, 2), -0.25);
        assert.strictEqual(remainder(-3.75, 2), 0.25);
    },
});
