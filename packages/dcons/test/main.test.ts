import { compareNumDesc } from "@thi.ng/compare";
import { XsAdd } from "@thi.ng/random";
import { range } from "@thi.ng/transducers";
import { beforeEach, expect, test } from "bun:test";
import { AList, DCons, defDCons } from "../src/index.js";

let a: DCons<any>, src: number[];

beforeEach(() => {
	src = [1, 2, 3, 4, 5];
	a = defDCons(src);
});

test("is instanceof", () => {
	expect(a instanceof AList).toBeTrue();
	expect(a instanceof DCons).toBeTrue();
});

test("has tail", () => {
	expect(a.tail).toBeDefined();
});

test("has length", () => {
	expect(a.length).toBe(5);
	a = defDCons();
	expect(a.length).toBe(0);
});

test("is iterable", () => {
	expect([...a]).toEqual(src);
});

test("is seqable", () => {
	expect(a.seq()!.first()).toBe(1);
	expect(a.seq()!.next()!.first()).toBe(2);
	expect(a.seq(3)!.first()).toBe(4);
	expect(a.seq(3)!.next()!.first()).toBe(5);
	expect(a.seq(3)!.next()!.next()).toBeUndefined();
	expect(a.seq(2, 2)).toBeUndefined();
	expect(a.seq(2, 3)!.first()).toBe(3);
	expect(a.seq(2, 3)!.next()).toBeUndefined();
});

test("shuffle", () => {
	expect([...a.shuffle(undefined, new XsAdd(0x12345678))]).toEqual([
		3, 5, 1, 4, 2,
	]);
	expect([
		...defDCons(range(10)).shuffle(undefined, new XsAdd(0x12345678)),
	]).toEqual([3, 0, 7, 8, 5, 2, 9, 1, 6, 4]);
	expect([...defDCons().shuffle()]).toEqual([]);
	expect([...defDCons([1]).shuffle()]).toEqual([1]);
});

test("sort", () => {
	expect([...defDCons().sort()]).toEqual([]);
	expect([...defDCons([1]).sort()]).toEqual([1]);
	expect([...defDCons([1, -1]).sort()]).toEqual([-1, 1]);
	expect([...defDCons([8, -1, 17, 5, 8, 3, 11]).sort()]).toEqual([
		-1, 3, 5, 8, 8, 11, 17,
	]);
	expect([
		...defDCons([8, -1, 17, 5, 8, 3, 11]).sort(compareNumDesc),
	]).toEqual([17, 11, 8, 8, 5, 3, -1]);
});

test("works as stack", () => {
	expect(a.push(10).pop()).toBe(10);
	expect(a.pop()).toBe(5);
	a = defDCons();
	expect(a.pop()).toBeUndefined();
});

test("works as queue", () => {
	expect(a.push(10).drop()).toBe(1);
	expect(a.drop()).toBe(2);
	expect(a.drop()).toBe(3);
	expect(a.drop()).toBe(4);
	expect(a.drop()).toBe(5);
	expect(a.drop()).toBe(10);
	expect(a.drop()).toBeUndefined();
});

test("toString", () => {
	expect(defDCons([, null, 0, 1, ["a", "b"], "ab"]).toString()).toBe(
		"undefined, null, 0, 1, a,b, ab"
	);
});
