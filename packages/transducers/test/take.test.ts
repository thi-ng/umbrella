import { expect, test } from "bun:test";
import { range, take } from "../src/index.js";

test("iterates up to N items", () => {
	expect([...take(0, [true, false])]).toEqual([]);
	expect([...take(1, [true, false])]).toEqual([true]);
	expect([...take(2, [true, false])]).toEqual([true, false]);
	expect([...take(3, [true, false])]).toEqual([true, false]);
	expect([...take(2, range(0, 4))]).toEqual([0, 1]);
	expect([...take(0, ["", "ab", "c"])]).toEqual([]);
	expect([...take(1, ["", "ab", "c"])]).toEqual([""]);
	expect([...take(2, ["", "ab", "c"])]).toEqual(["", "ab"]);
	expect([...take(0, "")]).toEqual([]);
	expect([...take(1, "")]).toEqual([]);
	expect([...take(0, "abc")]).toEqual([]);
	expect([...take(1, "abc")]).toEqual(["a"]);
	expect([...take(2, "abc")]).toEqual(["a", "b"]);
});
