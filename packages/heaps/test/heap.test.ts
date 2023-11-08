import { compare } from "@thi.ng/compare";
import { beforeEach, expect, test } from "bun:test";
import { Heap } from "../src/index.js";

const rcmp: (a: number, b: number) => number = (a, b) => b - a;

const src = [5, 2, 10, 20, 15, 18, 23, 22, -1];
let h: Heap<any>;

beforeEach(() => {
	h = new Heap(src);
});

test("length", () => {
	expect(h.length).toBe(src.length);
});

test("copy", () => {
	expect(drain(h.copy())).toEqual(drain(h));
	h = new Heap(src, { compare: rcmp });
	expect(drain(h.copy())).toEqual(drain(h));
});

test("peek", () => {
	expect(h.peek()).toBe(-1);
	h.push(-2);
	expect(h.peek()).toBe(-2);
});

test("pop", () => {
	expect(drain(h)).toEqual(src.slice().sort(compare));
	h = new Heap(src, { compare: rcmp });
	expect(drain(h)).toEqual(src.slice().sort(compare).reverse());
});

test("into", () => {
	expect(drain(h.into(src))).toEqual(src.concat(src).sort(compare));
});

test("pushPop", () => {
	expect(h.pushPop(-2)).toBe(-2);
	expect(h.length).toBe(src.length);
	expect(h.pushPop(-1)).toBe(-1);
	expect(h.length).toBe(src.length);
	expect(h.pushPop(11)).toBe(-1);
	expect(h.length).toBe(src.length);
	expect(h.pushPop(24)).toBe(2);
	expect(h.length).toBe(src.length);
});

test("min", () => {
	expect(h.min(0)).toEqual([]);
	expect(h.min(1)).toEqual([-1]);
	expect(h.min(2)).toEqual([-1, 2]);
	expect(h.min(3)).toEqual([-1, 2, 5]);
	expect(h.min(4)).toEqual([-1, 2, 5, 10]);
	expect(h.min()).toEqual(src.slice().sort(compare));
});

test("max", () => {
	expect(h.max(0)).toEqual([]);
	expect(h.max(1)).toEqual([23]);
	expect(h.max(2)).toEqual([23, 22]);
	expect(h.max(3)).toEqual([23, 22, 20]);
	expect(h.max(4)).toEqual([23, 22, 20, 18]);
	expect(h.max()).toEqual(src.slice().sort(compare).reverse());
});

test("parent", () => {
	expect(h.parent(0)).toBe(undefined);
	expect(h.parent(1)).toBe(-1);
	expect(h.parent(2)).toBe(-1);
	expect(h.parent(3)).toBe(2);
	expect(h.parent(4)).toBe(2);
	expect(h.parent(5)).toBe(10);
	expect(h.parent(6)).toBe(10);
});

test("children", () => {
	expect(h.children(0)).toEqual([2, 10]);
	expect(h.children(1)).toEqual([5, 15]);
	expect(h.children(2)).toEqual([18, 23]);
	expect(h.children(3)).toEqual([22, 20]);
	expect(h.children(4)).toBeUndefined();
});

const drain = (h: Heap<any>) => {
	const res = [];
	let x;
	while ((x = h.pop())) {
		res.push(x);
	}
	return res;
};
