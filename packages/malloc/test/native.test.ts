import { expect, test } from "bun:test";
import { NativePool } from "../src/index.js";

const pool = new NativePool();

test("mallocAs", () => {
	expect(pool.mallocAs("f32", 0)).toEqual(new Float32Array(0));
	expect(pool.mallocAs("f32", 4)).toEqual(new Float32Array(4));
});

test("callocAs", () => {
	expect(pool.callocAs("f32", 0, 1)).toEqual(new Float32Array([]));
	expect(pool.callocAs("f32", 4, 1)).toEqual(new Float32Array([1, 1, 1, 1]));
});

test("reallocAs", () => {
	expect(
		pool.reallocArray(new Float32Array([1, 2, 3, 4, 5, 6, 7, 8]), 4)
	).toEqual(new Float32Array([1, 2, 3, 4]));
});
