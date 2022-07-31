import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { map, range } from "../src/index.js";

const identity = <T>(t: T): T => t;
const upper = (s: string) => s.toUpperCase();
const square = (n: number) => n * n;

group("map", {
	"applies function over iterable": () => {
		assert.deepStrictEqual([...map(identity, [])], []);
		assert.deepStrictEqual(
			[...map(identity, ["", "ab", "c"])],
			["", "ab", "c"]
		);
		assert.deepStrictEqual(
			[...map(upper, ["", "ab", "c"])],
			["", "AB", "C"]
		);
		assert.deepStrictEqual([...map(square, range(1, 4))], [1, 4, 9]);
		assert.deepStrictEqual([...map(upper, "")], []);
		assert.deepStrictEqual([...map(upper, "abc")], ["A", "B", "C"]);
	},
});
