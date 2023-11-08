import { expect, test } from "bun:test";
import {
	Classifier,
	clamp,
	classify,
	compare,
	fold,
	interval as i,
	intersection,
	samples,
	union,
} from "../src/index.js";

test("classify", () => {
	const check = (a: string, b: string, res: Classifier) =>
		expect(classify(i(a), i(b))).toBe(res);
	check("[0..100]", "[0..100]", Classifier.EQUIV);
	check("[0..100]", "(0..100]", Classifier.SUPERSET);
	check("[0..100]", "[0..100)", Classifier.SUPERSET);
	check("[0..100]", "(0..100)", Classifier.SUPERSET);
	check("[0..100]", "[10..90]", Classifier.SUPERSET);
	check("[10..90]", "[0..100]", Classifier.SUBSET);
	check("[0..100]", "[100..101]", Classifier.OVERLAP_RIGHT);
	check("[0..100]", "(100..101]", Classifier.DISJOINT_LEFT);
	check("[0..100]", "[-1..0]", Classifier.OVERLAP_LEFT);
	check("[0..100]", "[-1..0)", Classifier.DISJOINT_RIGHT);
});

test("union", () => {
	const a = i("[0..100]");
	expect(union(a, a).equiv(a)).toBeTrue();
	expect(union(a, i("(0..100)")).equiv(a)).toBeTrue();
	expect(union(a, i("[0..100)")).equiv(a)).toBeTrue();
	expect(union(a, i("(0..100]")).equiv(a)).toBeTrue();
	expect(union(a, i("[0..100]")).equiv(a)).toBeTrue();

	expect(union(a, i("(-1..99)")).equiv(i("(-1..100]"))).toBeTrue();
	expect(union(a, i("[-1..99)")).equiv(i("[-1..100]"))).toBeTrue();
	expect(union(a, i("[1..101)")).equiv(i("[0..101)"))).toBeTrue();
	expect(union(a, i("[1..101]")).equiv(i("[0..101]"))).toBeTrue();
	expect(union(a, i("(-1..101)")).equiv(i("(-1..101)"))).toBeTrue();
	expect(union(a, i("[-1..101)")).equiv(i("[-1..101)"))).toBeTrue();
	expect(union(a, i("(-1..101]")).equiv(i("(-1..101]"))).toBeTrue();
	expect(union(a, i("[-1..101]")).equiv(i("[-1..101]"))).toBeTrue();

	expect(union(a, i("(0..0)")).equiv(a)).toBeTrue();
	expect(union(a, i("[0..0]")).equiv(a)).toBeTrue();
	expect(union(a, i("(100..100)")).equiv(a)).toBeTrue();
	expect(union(a, i("[100..100]")).equiv(a)).toBeTrue();

	expect(union(a, i("[-1..0]")).equiv(i("[-1..100]"))).toBeTrue();
	expect(union(a, i("[-1..0)")).equiv(i("[-1..100]"))).toBeTrue();
	expect(union(a, i("[100..101]")).equiv(i("[0..101]"))).toBeTrue();
	expect(union(a, i("(100..101]")).equiv(i("[0..101]"))).toBeTrue();
});

test("intersection", () => {
	const a = i("[0..100]");
	expect(intersection(a, a)!.equiv(a)).toBeTrue();
	expect(intersection(a, i("(0..100)"))!.equiv(i("(0..100)"))).toBeTrue();
	expect(intersection(a, i("[0..100)"))!.equiv(i("[0..100)"))).toBeTrue();
	expect(intersection(a, i("(0..100]"))!.equiv(i("(0..100]"))).toBeTrue();
	expect(intersection(a, i("[0..100]"))!.equiv(i("[0..100]"))).toBeTrue();

	expect(intersection(a, i("(-1..99)"))!.equiv(i("[0..99)"))).toBeTrue();
	expect(intersection(a, i("[-1..99)"))!.equiv(i("[0..99)"))).toBeTrue();
	expect(intersection(a, i("[1..101)"))!.equiv(i("[1..100]"))).toBeTrue();
	expect(intersection(a, i("[1..101]"))!.equiv(i("[1..100]"))).toBeTrue();
	expect(intersection(a, i("(-1..101)"))!.equiv(i("[0..100]"))).toBeTrue();
	expect(intersection(a, i("[-1..101)"))!.equiv(i("[0..100]"))).toBeTrue();
	expect(intersection(a, i("(-1..101]"))!.equiv(i("[0..100]"))).toBeTrue();
	expect(intersection(a, i("[-1..101]"))!.equiv(i("[0..100]"))).toBeTrue();

	expect(intersection(a, i("(0..0)")) === undefined).toBeTrue();
	expect(intersection(a, i("[0..0]"))!.equiv(i("[0..0]"))).toBeTrue();
	expect(intersection(a, i("(100..100)")) === undefined).toBeTrue();
	expect(intersection(a, i("[100..100]"))!.equiv(i("[100..100]"))).toBeTrue();

	expect(intersection(a, i("[-1..0]"))!.equiv(i("[0..0]"))).toBeTrue();
	expect(intersection(a, i("[-1..0)")) === undefined).toBeTrue();
	expect(intersection(a, i("[100..101]"))!.equiv(i("[100..100]"))).toBeTrue();
	expect(intersection(a, i("(100..101]")) === undefined).toBeTrue();
});

test("compare", () => {
	const a = i("[0..1]");
	const b = i("(0..1]");
	const c = i("[0..1)");
	const d = i("(0..1)");
	expect(compare(a, a)).toBe(0);
	expect(compare(a, b)).toBe(-1);
	expect(compare(a, c)).toBe(1);
	expect(compare(a, d)).toBe(-1);
});

test("clamp", () => {
	const eps = 1e-3;
	for (let [x, a, b, c, d] of [
		[-1, 0, eps, 0, eps],
		[2, 1, 1, 1 - eps, 1 - eps],
		[0.5, 0.5, 0.5, 0.5, 0.5],
	]) {
		expect(clamp(i("[0,1]"), x, eps)).toBe(a);
		expect(clamp(i("(0,1]"), x, eps)).toBe(b);
		expect(clamp(i("[0,1)"), x, eps)).toBe(c);
		expect(clamp(i("(0,1)"), x, eps)).toBe(d);
	}
});

test("samples", () => {
	expect([...samples(i(10, 12), 5)]).toEqual([10, 10.5, 11, 11.5, 12]);
	expect([...samples(i(10, 12, true, false), 5)]).toEqual([
		10.5, 11, 11.5, 12,
	]);
	expect([...samples(i(10, 12, false, true), 5)]).toEqual([
		10, 10.5, 11, 11.5,
	]);
	expect([...samples(i(10, 12, true, true), 5)]).toEqual([10.5, 11, 11.5]);
});

test("foldClosed", () => {
	expect(fold(i("[1,100]"), 0, 0.01)).toBe(99);
	expect(fold(i("[1,100]"), 1, 0.01)).toBe(1);
	expect(fold(i("[1,100]"), 100, 0.01)).toBe(100);
	expect(fold(i("[1,100]"), 101, 0.01)).toBe(2);
});

test("foldOpenLeft", () => {
	expect(fold(i("(1,100]"), 0, 0.01)).toBe(99);
	expect(fold(i("(1,100]"), 1, 0.01)).toBe(100);
	expect(fold(i("(1,100]"), 100, 0.01)).toBe(100);
	expect(fold(i("(1,100]"), 101, 0.01)).toBe(2.01);
});

test("foldOpenRight", () => {
	expect(fold(i("[1,100)"), 0, 0.01)).toBe(98.99);
	expect(fold(i("[1,100)"), 1, 0.01)).toBe(1);
	expect(fold(i("[1,100)"), 100, 0.01)).toBe(1);
	expect(fold(i("[1,100)"), 101, 0.01)).toBe(2);
});

test("foldOpen", () => {
	expect(fold(i("(1,100)"), 0, 0.01)).toBe(98.99);
	expect(fold(i("(1,100)"), 1, 0.01)).toBe(99.99);
	expect(fold(i("(1,100)"), 100, 0.01)).toBe(1.01);
	expect(fold(i("(1,100)"), 101, 0.01)).toBe(2.01);
});
