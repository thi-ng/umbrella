import { expect, test } from "bun:test";
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

test("1-arg", () => {
	expect(partial(fn, 0)(1, 2, 3, 4, 5, 6, 7, 8)).toEqual(res);
});

test("2-arg", () => {
	expect(partial(fn, 0, 1)(2, 3, 4, 5, 6, 7, 8)).toEqual(res);
});

test("3-arg", () => {
	expect(partial(fn, 0, 1, 2)(3, 4, 5, 6, 7, 8)).toEqual(res);
});

test("4-arg", () => {
	expect(partial(fn, 0, 1, 2, 3)(4, 5, 6, 7, 8)).toEqual(res);
});

test("5-arg", () => {
	expect(partial(fn, 0, 1, 2, 3, 4)(5, 6, 7, 8)).toEqual(res);
});

test("6-arg", () => {
	expect(partial(fn, 0, 1, 2, 3, 4, 5)(6, 7, 8)).toEqual(res);
});

test("7-arg", () => {
	expect(partial(fn, 0, 1, 2, 3, 4, 5, 6)(7, 8)).toEqual(res);
});

test("8-arg", () => {
	expect(partial(fn, 0, 1, 2, 3, 4, 5, 6, 7)(8)).toEqual(res);
});
