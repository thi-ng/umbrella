import { expect, test } from "bun:test";
import { range } from "@thi.ng/transducers";
import * as m from "../src/index.js";

test("identity (blank)", () => {
	expect(m.identity22([])).toEqual(m.IDENT22);
	expect(m.identity23([])).toEqual(m.IDENT23);
	expect(m.identity33([])).toEqual(m.IDENT33);
	expect(m.identity44([])).toEqual(m.IDENT44);
});

test("identity (fill)", () => {
	expect(m.identity([...range(4)])).toEqual(m.IDENT22);
	expect(m.identity([...range(6)])).toEqual(m.IDENT23);
	expect(m.identity([...range(9)])).toEqual(m.IDENT33);
	expect(m.identity([...range(16)])).toEqual(m.IDENT44);
});
