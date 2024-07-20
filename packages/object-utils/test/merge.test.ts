import type { Fn, FnN } from "@thi.ng/api";
import { expect, test } from "bun:test";
import {
	meldApplyObj,
	meldDeepObj,
	mergeApplyMap,
	mergeApplyObj,
	mergeDeepObj,
} from "../src/index.js";

test("mergeApply map", () => {
	expect(
		mergeApplyMap(
			new Map([
				["a", 1],
				["b", 2],
				["c", 3],
			]),
			new Map<string, number | Fn<number, number>>([
				["a", (x) => x + 10],
				["b", 20],
				["d", 40],
			])
		)
	).toEqual(
		new Map([
			["a", 11],
			["b", 20],
			["c", 3],
			["d", 40],
		])
	);
});

test("mergeApply object", () => {
	const orig = { a: 1, b: 2, c: 3 };
	const src = { ...orig };
	expect(mergeApplyObj(src, { a: (x) => x + 10, b: 20, d: 40 })).toEqual({
		a: 11,
		b: 20,
		c: 3,
		d: 40,
	});
	expect(src).toEqual(orig);
});

test("mergeApply pollute", () => {
	const inc: FnN = (x) => x + 1;
	expect(
		mergeApplyObj(
			{ a: 1, ["__proto__"]: 1 },
			{ a: inc, ["__proto__"]: inc }
		)
	).toEqual({ a: 2 });
	expect(
		meldApplyObj({ a: 1, ["__proto__"]: 1 }, { a: inc, ["__proto__"]: inc })
	).toEqual({
		a: 2,
		["__proto__"]: 1,
	});
});

test("mergeDeepObj basic", () => {
	const orig = { a: { b: { c: 1 } } };
	const src = { ...orig };
	expect(
		mergeDeepObj(src, { a: { b: { d: 2 }, e: { f: 3 } }, g: 4 })
	).toEqual({ a: { b: { c: 1, d: 2 }, e: { f: 3 } }, g: 4 });
	expect(src).toEqual(orig);
});

test("meldDeepObj basic", () => {
	const orig = { a: { b: { c: 1 } } };
	const src = { ...orig };
	const dest = meldDeepObj(src, {
		a: { b: { d: 2 }, e: { f: 3 } },
		g: 4,
	});
	expect(dest).toEqual({
		a: { b: { c: 1, d: 2 }, e: { f: 3 } },
		g: 4,
	});
	expect(src === dest).toBeTrue();
	expect(src).not.toEqual(orig);
});

test("meldDeepObj pollute", () => {
	const p1 = JSON.parse(`{ "a": 1, "__proto__": { "eek": 2 } }`);
	const p2 = JSON.parse(`{ "a": 1, "b": { "__proto__": { "eek": 2 } } }`);
	expect(meldDeepObj({}, p1)).toEqual({ a: 1 });
	expect(meldDeepObj({}, p2)).toEqual(p2);
	expect(meldDeepObj({ b: { c: 1 } }, p2)).toEqual({ a: 1, b: { c: 1 } });
});
