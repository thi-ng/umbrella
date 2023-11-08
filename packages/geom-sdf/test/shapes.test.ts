import { expect, test } from "bun:test";
import { box2, circle2 } from "../src/index.js";

test("circle", () => {
	const sdf = circle2([100, 200], 10);
	expect(sdf([80, 200])).toBe(10);
	expect(sdf([120, 200])).toBe(10);
	expect(sdf([100, 200])).toBe(-10);
	expect(sdf([110, 200])).toBe(0);
});

test("rect", () => {
	const sdf = box2([100, 200], [10, 10]);
	expect(sdf([80, 200])).toBe(10);
	expect(sdf([120, 200])).toBe(10);
	expect(sdf([100, 200])).toBe(-10);
	expect(sdf([90, 190])).toBe(0);
});
