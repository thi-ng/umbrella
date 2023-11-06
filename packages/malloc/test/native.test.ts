import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { NativePool } from "../src/index.js";

const pool = new NativePool();

group("native", {
	mallocAs: () => {
		assert.deepStrictEqual(pool.mallocAs("f32", 0), new Float32Array(0));
		assert.deepStrictEqual(pool.mallocAs("f32", 4), new Float32Array(4));
	},

	callocAs: () => {
		assert.deepStrictEqual(
			pool.callocAs("f32", 0, 1),
			new Float32Array([])
		);
		assert.deepStrictEqual(
			pool.callocAs("f32", 4, 1),
			new Float32Array([1, 1, 1, 1])
		);
	},

	reallocAs: () => {
		assert.deepStrictEqual(
			pool.reallocArray(new Float32Array([1, 2, 3, 4, 5, 6, 7, 8]), 4),
			new Float32Array([1, 2, 3, 4])
		);
	},
});
