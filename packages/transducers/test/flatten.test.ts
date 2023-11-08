import { expect, test } from "bun:test";
import { flatten, range } from "../src/index.js";

test("empty arrays", () => {
	expect([...flatten([])]).toEqual([]);
	expect([...flatten([[], []])]).toEqual([]);
});

test("arrays", () => {
	expect([...flatten([undefined])]).toEqual([undefined]);
	expect([...flatten([[undefined], null])]).toEqual([undefined, null]);
});

test("strings", () => {
	expect([...flatten(["", "a"])]).toEqual(["", "a"]);
	expect([...flatten([[], ["a"], ""])]).toEqual(["a", ""]);
});

test("strings (atomic)", () => {
	expect([...flatten([["abc"]])]).toEqual(["abc"]);
	expect([...flatten(["abc"])]).toEqual(["abc"]);
	expect([...flatten("abc")]).toEqual(["abc"]);
	expect([...flatten([""])]).toEqual([""]);
	expect([...flatten("")]).toEqual([""]);
});

test("iterators", () => {
	expect([...flatten(range(0))]).toEqual([]);
	expect([...flatten([range(0)])]).toEqual([]);
	expect<any>([...flatten([range(2), range(0)])]).toEqual([0, 1]);
});
