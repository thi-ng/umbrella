import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { filter, range } from "../src/index.js";

const identity = (x: any) => x;
const always = () => true;
const never = () => false;
const vowel = (s: string) => /[aeiou]/.test(s);
const even = (n: number) => n % 2 === 0;

group("filter", {
	"applies predicate over iterable and forwards values testing truthy":
		() => {
			assert.deepStrictEqual(
				[...filter(identity, [true, false, "a", "", 0, 1, []])],
				[true, "a", 1, []]
			);
			assert.deepStrictEqual(
				[...filter(always, [true, false, "a", "", 0, 1, []])],
				[true, false, "a", "", 0, 1, []]
			);
			assert.deepStrictEqual(
				[...filter(never, [true, false, "a", "", 0, 1, []])],
				[]
			);
			assert.deepStrictEqual([...filter(vowel, ["", "a", "bc"])], ["a"]);
			assert.deepStrictEqual([...filter(even, range(1, 5))], [2, 4]);
			assert.deepStrictEqual([...filter(always, "")], []);
			assert.deepStrictEqual([...filter(always, "abc")], ["a", "b", "c"]);
			assert.deepStrictEqual([...filter(vowel, "abc")], ["a"]);
		},
});
