import { delay } from "../src";

import * as assert from "assert";

describe("delay", () => {
    it("only executes once", () => {
        let num = 0;
        const a = delay(() => ++num);
        assert(!a.isRealized());
        assert.strictEqual(a.deref(), 1);
        assert.strictEqual(a.deref(), 1);
        assert(a.isRealized());
    });
});
