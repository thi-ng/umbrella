import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { defMTF, defTranspose } from "../src/index.js";

group("dcons (self-organizing)", {
	"mtf (n=5)": () => {
		const a = defMTF([1, 2, 3, 4, 5]);
		a.nth(3);
		assert.deepStrictEqual([...a], [4, 1, 2, 3, 5]);
		a.nth(3);
		assert.deepStrictEqual([...a], [3, 4, 1, 2, 5]);
		assert.strictEqual(a.find(3)!.value, 3);
		assert.deepStrictEqual([...a], [3, 4, 1, 2, 5]);
		assert.strictEqual(a.find(1)!.value, 1);
		assert.deepStrictEqual([...a], [1, 3, 4, 2, 5]);
		assert.strictEqual(a.findWith((x) => x === 2)!.value, 2);
		assert.deepStrictEqual([...a], [2, 1, 3, 4, 5]);
		a.setNth(4, 50);
		assert.deepStrictEqual([...a], [50, 2, 1, 3, 4]);
		a.setTail(40);
		assert.deepStrictEqual([...a], [40, 50, 2, 1, 3]);
	},

	"transpose (n=5)": () => {
		const a = defTranspose([1, 2, 3, 4, 5]);
		a.nth(3);
		assert.deepStrictEqual([...a], [1, 2, 4, 3, 5]);
		a.nth(3);
		assert.deepStrictEqual([...a], [1, 2, 3, 4, 5]);
		assert.strictEqual(a.find(3)!.value, 3);
		assert.deepStrictEqual([...a], [1, 3, 2, 4, 5]);
		assert.strictEqual(a.find(1)!.value, 1);
		assert.deepStrictEqual([...a], [1, 3, 2, 4, 5]);
		assert.strictEqual(a.findWith((x) => x === 2)!.value, 2);
		assert.deepStrictEqual([...a], [1, 2, 3, 4, 5]);
		a.setNth(4, 50);
		assert.deepStrictEqual([...a], [1, 2, 3, 50, 4]);
		a.setTail(40);
		assert.deepStrictEqual([...a], [1, 2, 3, 40, 50]);
	},
});
