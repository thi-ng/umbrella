import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { padLast } from "../src/index.js";

group("padLast", {
	all: () => {
		assert.deepStrictEqual([...padLast(8, 0, [])], []);
		assert.deepStrictEqual(
			[...padLast(8, 0, [1])],
			[1, 0, 0, 0, 0, 0, 0, 0]
		);
		assert.deepStrictEqual(
			[...padLast(8, 0, [1, 2, 3, 4, 5])],
			[1, 2, 3, 4, 5, 0, 0, 0]
		);
		assert.deepStrictEqual([...padLast(2, 0, [1, 2, 3])], [1, 2, 3, 0]);
		assert.deepStrictEqual([...padLast(2, 0, [1, 2, 3, 4])], [1, 2, 3, 4]);
	},
});
