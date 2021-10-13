import { group } from "@thi.ng/testament";
import { range } from "@thi.ng/transducers";
import * as assert from "assert";
import * as m from "../src/index.js"

group("matrices", {
    "identity (fixed)": () => {
        assert.deepStrictEqual(m.identity22([]), m.IDENT22, "m22");
        assert.deepStrictEqual(m.identity23([]), m.IDENT23, "m23");
        assert.deepStrictEqual(m.identity33([]), m.IDENT33, "m33");
        assert.deepStrictEqual(m.identity44([]), m.IDENT44, "m44");
    },

    "identity (dyn)": () => {
        assert.deepStrictEqual(m.identity([...range(4)]), m.IDENT22, "m22");
        assert.deepStrictEqual(m.identity([...range(6)]), m.IDENT23, "m23");
        assert.deepStrictEqual(m.identity([...range(9)]), m.IDENT33, "m33");
        assert.deepStrictEqual(m.identity([...range(16)]), m.IDENT44, "m44");
    },
});
