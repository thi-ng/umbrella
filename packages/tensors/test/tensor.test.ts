// SPDX-License-Identifier: Apache-2.0
import { expect, test } from "bun:test";
import { asTensor, range, tensor } from "../src/index.js";

test("tensor (0d)", () => {
	const a = tensor(1);
	expect(a.type).toBe("num");
	expect(a.shape).toEqual([]);
	expect(a.stride).toEqual([]);
	expect(a.data).toEqual([1]);
	expect(a.offset).toEqual(0);
	const b = tensor("u8", [], { data: [0, 0, 1], offset: 2 });
	expect(b.type).toBe("u8");
	expect(b.shape).toEqual([]);
	expect(b.stride).toEqual([]);
	expect(b.offset).toEqual(2);
	expect(b.data).toEqual(new Uint8Array([0, 0, 1]));
});

test("tensor (1d)", () => {
	const a = tensor([1, 2, 3, 4]);
	expect(a.type).toBe("num");
	expect(a.shape).toEqual([4]);
	expect(a.stride).toEqual([1]);
	expect(a.data).toEqual([1, 2, 3, 4]);
});

test("tensor (nested 2d)", () => {
	const a = tensor([
		[1, 2],
		[3, 4],
		[5, 6],
	]);
	expect(a.type).toBe("num");
	expect(a.shape).toEqual([3, 2]);
	expect(a.stride).toEqual([2, 1]);
	expect(a.data).toEqual([1, 2, 3, 4, 5, 6]);
});

test("tensor (nested 3d)", () => {
	const a = tensor([
		[
			[1, 2],
			[3, 4],
		],
		[
			[5, 6],
			[7, 8],
		],
	]);
	expect(a.type).toBe("num");
	expect(a.shape).toEqual([2, 2, 2]);
	expect(a.stride).toEqual([4, 2, 1]);
	expect(a.data).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
});

test("tensor (nested 4d)", () => {
	const a = tensor([
		[
			[
				[1, 2],
				[3, 4],
			],
			[
				[5, 6],
				[7, 8],
			],
		],
		[
			[
				[10, 20],
				[30, 40],
			],
			[
				[50, 60],
				[70, 80],
			],
		],
	]);
	expect(a.type).toBe("num");
	expect(a.shape).toEqual([2, 2, 2, 2]);
	expect(a.stride).toEqual([8, 4, 2, 1]);
	expect(a.data).toEqual([
		1, 2, 3, 4, 5, 6, 7, 8, 10, 20, 30, 40, 50, 60, 70, 80,
	]);
});

test("tensor (w/ type & shape)", () => {
	const a = tensor("u8", [2, 2], { data: [0, 0, 1, 2, 3, 4], offset: 2 });
	expect(a.type).toBe("u8");
	expect(a.shape).toEqual([2, 2]);
	expect(a.stride).toEqual([2, 1]);
	expect(a.offset).toBe(2);
	expect(a.data).toEqual(new Uint8Array([0, 0, 1, 2, 3, 4]));
	expect([...a]).toEqual([1, 2, 3, 4]);
});

test("range", () => {
	const a = range(4, { type: "u8" });
	expect(a.shape).toEqual([4]);
	expect(a.data).toEqual(new Uint8Array([0, 1, 2, 3]));
	const b = range(4, 0);
	expect(b.shape).toEqual([4]);
	expect(b.data).toEqual([4, 3, 2, 1]);
	const c = range(10, 49, 10);
	expect(c.shape).toEqual([4]);
	expect(c.data).toEqual([10, 20, 30, 40]);
});

test("asTensor", () => {
	const src = {
		data: [0, 0, 1, 2, 3, 4],
		type: <const>"num",
		shape: <[number, number]>[2, 2],
		stride: <[number, number]>[2, 1],
		offset: 2,
	};
	const dest = asTensor(src);
	expect(dest.type).toBe("num");
	expect(dest.shape).toEqual([2, 2]);
	expect(dest.stride).toEqual([2, 1]);
	expect(dest.offset).toBe(2);
	expect([...dest]).toEqual([1, 2, 3, 4]);
});
