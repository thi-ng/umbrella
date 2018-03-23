import * as assert from "assert";
import * as pf from "../src/index";

describe("pointfree", () => {

    it("unwrap", () => {
        const res: pf.RunResult = [true, [1, 2, 3], {}];
        assert.equal(pf.unwrap(<any>[, []]), undefined);
        assert.equal(pf.unwrap(res), 3);
        assert.deepEqual(pf.unwrap(res, 2), [2, 3]);
        assert.deepEqual(pf.unwrap(res, 3), [1, 2, 3]);
        assert.deepEqual(pf.unwrap(res, 4), [1, 2, 3]);
    });

});
