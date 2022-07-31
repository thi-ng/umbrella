import { compare } from "@thi.ng/compare";
import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { Heap } from "../src/index.js";

const rcmp: (a: number, b: number) => number = (a, b) => b - a;

const src = [5, 2, 10, 20, 15, 18, 23, 22, -1];
let h: Heap<any>;

group(
	"Heap",
	{
		length: () => {
			assert.strictEqual(h.length, src.length);
		},

		copy: () => {
			assert.deepStrictEqual(drain(h.copy()), drain(h));
			h = new Heap(src, { compare: rcmp });
			assert.deepStrictEqual(drain(h.copy()), drain(h));
		},

		peek: () => {
			assert.strictEqual(h.peek(), -1);
			h.push(-2);
			assert.strictEqual(h.peek(), -2);
		},

		pop: () => {
			assert.deepStrictEqual(drain(h), src.slice().sort(compare));
			h = new Heap(src, { compare: rcmp });
			assert.deepStrictEqual(
				drain(h),
				src.slice().sort(compare).reverse()
			);
		},

		into: () => {
			assert.deepStrictEqual(
				drain(h.into(src)),
				src.concat(src).sort(compare)
			);
		},

		pushPop: () => {
			assert.strictEqual(h.pushPop(-2), -2);
			assert.strictEqual(h.length, src.length);
			assert.strictEqual(h.pushPop(-1), -1);
			assert.strictEqual(h.length, src.length);
			assert.strictEqual(h.pushPop(11), -1);
			assert.strictEqual(h.length, src.length);
			assert.strictEqual(h.pushPop(24), 2);
			assert.strictEqual(h.length, src.length);
		},

		min: () => {
			assert.deepStrictEqual(h.min(0), []);
			assert.deepStrictEqual(h.min(1), [-1]);
			assert.deepStrictEqual(h.min(2), [-1, 2]);
			assert.deepStrictEqual(h.min(3), [-1, 2, 5]);
			assert.deepStrictEqual(h.min(4), [-1, 2, 5, 10]);
			assert.deepStrictEqual(h.min(), src.slice().sort(compare));
		},

		max: () => {
			assert.deepStrictEqual(h.max(0), []);
			assert.deepStrictEqual(h.max(1), [23]);
			assert.deepStrictEqual(h.max(2), [23, 22]);
			assert.deepStrictEqual(h.max(3), [23, 22, 20]);
			assert.deepStrictEqual(h.max(4), [23, 22, 20, 18]);
			assert.deepStrictEqual(
				h.max(),
				src.slice().sort(compare).reverse()
			);
		},

		parent: () => {
			assert.strictEqual(h.parent(0), undefined);
			assert.strictEqual(h.parent(1), -1);
			assert.strictEqual(h.parent(2), -1);
			assert.strictEqual(h.parent(3), 2);
			assert.strictEqual(h.parent(4), 2);
			assert.strictEqual(h.parent(5), 10);
			assert.strictEqual(h.parent(6), 10);
		},

		children: () => {
			assert.deepStrictEqual(h.children(0), [2, 10]);
			assert.deepStrictEqual(h.children(1), [5, 15]);
			assert.deepStrictEqual(h.children(2), [18, 23]);
			assert.deepStrictEqual(h.children(3), [22, 20]);
			assert.deepStrictEqual(h.children(4), undefined);
		},
	},
	{
		beforeEach: () => {
			h = new Heap(src);
		},
	}
);

const drain = (h: Heap<any>) => {
	const res = [];
	let x;
	while ((x = h.pop())) {
		res.push(x);
	}
	return res;
};
