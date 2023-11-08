import { expect, test } from "bun:test";
import { drop, range } from "../src/index.js";

test("starts iterating after N items", () => {
	expect([...drop(0, [true, false])]).toEqual([true, false]);
	expect([...drop(1, [true, false])]).toEqual([false]);
	expect([...drop(2, [true, false])]).toEqual([]);
	expect([...drop(3, [true, false])]).toEqual([]);
	expect([...drop(2, range(0, 4))]).toEqual([2, 3]);
	expect([...drop(0, ["", "ab", "c"])]).toEqual(["", "ab", "c"]);
	expect([...drop(1, ["", "ab", "c"])]).toEqual(["ab", "c"]);
	expect([...drop(2, ["", "ab", "c"])]).toEqual(["c"]);
	expect([...drop(0, "")]).toEqual([]);
	expect([...drop(1, "")]).toEqual([]);
	expect([...drop(0, "abc")]).toEqual(["a", "b", "c"]);
	expect([...drop(1, "abc")]).toEqual(["b", "c"]);
	expect([...drop(2, "abc")]).toEqual(["c"]);
});
