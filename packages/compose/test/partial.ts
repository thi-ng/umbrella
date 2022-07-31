import * as assert from "assert";
import { group } from "@thi.ng/testament";
import { partial } from "../src/index.js";

const fn = (
	a: any,
	b: any,
	c: any,
	d: any,
	e: any,
	f: any,
	g: any,
	h: any,
	i: any
) => [a, b, c, d, e, f, g, h, i];
const res = [0, 1, 2, 3, 4, 5, 6, 7, 8];

group("partial", {
	"1-arg": () => {
		assert.deepStrictEqual(partial(fn, 0)(1, 2, 3, 4, 5, 6, 7, 8), res);
	},

	"2-arg": () => {
		assert.deepStrictEqual(partial(fn, 0, 1)(2, 3, 4, 5, 6, 7, 8), res);
	},

	"3-arg": () => {
		assert.deepStrictEqual(partial(fn, 0, 1, 2)(3, 4, 5, 6, 7, 8), res);
	},

	"4-arg": () => {
		assert.deepStrictEqual(partial(fn, 0, 1, 2, 3)(4, 5, 6, 7, 8), res);
	},

	"5-arg": () => {
		assert.deepStrictEqual(partial(fn, 0, 1, 2, 3, 4)(5, 6, 7, 8), res);
	},

	"6-arg": () => {
		assert.deepStrictEqual(partial(fn, 0, 1, 2, 3, 4, 5)(6, 7, 8), res);
	},

	"7-arg": () => {
		assert.deepStrictEqual(partial(fn, 0, 1, 2, 3, 4, 5, 6)(7, 8), res);
	},

	"8-arg": () => {
		assert.deepStrictEqual(partial(fn, 0, 1, 2, 3, 4, 5, 6, 7)(8), res);
	},
});
