import { expect, test } from "bun:test";
import { map, range } from "../src/index.js";

const identity = <T>(t: T): T => t;
const upper = (s: string) => s.toUpperCase();
const square = (n: number) => n * n;

test("applies function over iterable", () => {
	expect([...map(identity, [])]).toEqual([]);
	expect([...map(identity, ["", "ab", "c"])]).toEqual(["", "ab", "c"]);
	expect([...map(upper, ["", "ab", "c"])]).toEqual(["", "AB", "C"]);
	expect([...map(square, range(1, 4))]).toEqual([1, 4, 9]);
	expect([...map(upper, "")]).toEqual([]);
	expect([...map(upper, "abc")]).toEqual(["A", "B", "C"]);
});
