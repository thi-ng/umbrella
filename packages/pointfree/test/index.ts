import * as assert from "assert";
import * as pf from "../src/index";
import { RunResult } from "../src/api";

describe("pointfree", () => {

    it("unwrap", () => {
        const res: RunResult = [[[1, 2, 3], {}], true];
        assert.equal(pf.unwrap([[[], {}], true]), undefined);
        assert.equal(pf.unwrap(res), 3);
        assert.deepEqual(pf.unwrap(res, 2), [2, 3]);
        assert.deepEqual(pf.unwrap(res, 3), [1, 2, 3]);
        assert.deepEqual(pf.unwrap(res, 4), [1, 2, 3]);
    });

    it("condM", () => {
        const classify = (x) =>
            pf.runU([[x], {}],
                pf.condM({
                    0: ["zero"],
                    1: ["one"],
                    default: [
                        pf.dup,
                        pf.isPos,
                        pf.cond(["many"], ["invalid"])
                    ]
                }));

        assert.equal(classify(0), "zero");
        assert.equal(classify(1), "one");
        assert.equal(classify(100), "many");
        assert.equal(classify(-1), "invalid");
    });
});
