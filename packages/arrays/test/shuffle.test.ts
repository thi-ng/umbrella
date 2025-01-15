import { XsAdd } from "@thi.ng/random";
import { expect, test } from "bun:test";
import { shuffle, shuffleRange } from "../src/index.js";

test("shuffle", () => {
	const src = "abcdefghijklmnopqrstuvwxyz";
	const buf = [...src];
	expect(shuffleRange(buf, 0, 0).join("")).toEqual(src);
	expect(shuffleRange(buf, 0, 1).join("")).toEqual(src);
	expect(shuffle(buf, 0).join("")).toEqual(src);
	expect(shuffle(buf, 1).join("")).toEqual(src);
	expect(() => shuffleRange(buf, -1)).toThrow();
	expect(() => shuffleRange(buf, 100)).toThrow();
	expect(() => shuffleRange(buf, 1, 0)).toThrow();
	expect(() => shuffleRange(buf, 0, 100)).toThrow();
	const rnd = new XsAdd(0xdeadbeef);
	expect(shuffleRange(buf, 10, 20, rnd).join("")).toEqual(
		"abcdefghijtqrpnoklmsuvwxyz"
	);
	expect(shuffle(buf, buf.length, rnd).join("")).toEqual(
		"hfzmnrsgxjbdictoapluqvkyew"
	);
	expect(shuffle([])).toEqual([]);
	expect(shuffle([1])).toEqual([1]);
	expect(shuffle([1, 2], 2, new XsAdd(0xdecafbad))).toEqual([2, 1]);
});
