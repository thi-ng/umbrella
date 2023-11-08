import { always, identity, never } from "@thi.ng/api";
import { expect, test } from "bun:test";
import { filter, range } from "../src/index.js";

const vowel = (s: string) => /[aeiou]/.test(s);
const even = (n: number) => n % 2 === 0;

test("applies predicate over iterable and forwards values testing truthy", () => {
	expect([
		...filter(identity<any>, [true, false, "a", "", 0, 1, []]),
	]).toEqual([true, "a", 1, []]);
	expect([...filter(always, [true, false, "a", "", 0, 1, []])]).toEqual([
		true,
		false,
		"a",
		"",
		0,
		1,
		[],
	]);
	expect([...filter(never, [true, false, "a", "", 0, 1, []])]).toEqual([]);
	expect([...filter(vowel, ["", "a", "bc"])]).toEqual(["a"]);
	expect([...filter(even, range(1, 5))]).toEqual([2, 4]);
	expect([...filter(always, "")]).toEqual([]);
	expect([...filter(always, "abc")]).toEqual(["a", "b", "c"]);
	expect([...filter(vowel, "abc")]).toEqual(["a"]);
});
