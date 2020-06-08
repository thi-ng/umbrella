import * as assert from "assert";
import * as m from "../src/index";
import { range } from "@thi.ng/transducers";

describe("matrices", () => {
    it("identity (fixed)", () => {
        assert.deepEqual(m.identity22([]), m.IDENT22, "m22");
        assert.deepEqual(m.identity23([]), m.IDENT23, "m23");
        assert.deepEqual(m.identity33([]), m.IDENT33, "m33");
        assert.deepEqual(m.identity44([]), m.IDENT44, "m44");
    });

    it("identity (dyn)", () => {
        assert.deepEqual(m.identity([...range(4)]), m.IDENT22, "m22");
        assert.deepEqual(m.identity([...range(6)]), m.IDENT23, "m23");
        assert.deepEqual(m.identity([...range(9)]), m.IDENT33, "m33");
        assert.deepEqual(m.identity([...range(16)]), m.IDENT44, "m44");
    });
});
