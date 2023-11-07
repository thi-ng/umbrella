import { expect, test } from "bun:test";
import { aseq } from "../src/index.js";

test("basics", () => {
	expect(aseq(null)).toBeUndefined();
	expect(aseq([])).toBeUndefined();
	expect(aseq([1])!.first()).toBe(1);
	expect(aseq([1])!.next()).toBeUndefined();
	expect(aseq([1, 2])!.first()).toBe(1);
	expect(aseq([1, 2])!.next()!.first()).toBe(2);
	expect(aseq([1, 2])!.next()!.next()).toBeUndefined();
	expect(aseq([1, 2, 3])!.next()!.next()!.first()).toBe(3);
});

test("range", () => {
	expect(aseq([0, 1, 2, 3], 2, 2)).toBeUndefined();
	expect(aseq([0, 1, 2, 3], 3, 2)).toBeUndefined();
	expect(aseq([0, 1, 2, 3], 2, 4)!.first()).toBe(2);
	expect(aseq([0, 1, 2, 3], 2, 4)!.next()!.first()).toBe(3);
	expect(aseq([0, 1, 2, 3], 2, 4)!.next()!.next()).toBeUndefined();
});
