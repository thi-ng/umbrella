import { expect, test } from "bun:test";
import { pointInSegment } from "../src/index.js";

test("2d", () => {
	expect(pointInSegment([0, 0], [-10, -10], [10, 10])).toBeTrue();
	expect(pointInSegment([-5, -5], [-10, -10], [10, 10])).toBeTrue();
	expect(pointInSegment([5, 5], [-10, -10], [10, 10])).toBeTrue();
	expect(pointInSegment([5, 5.01], [-10, -10], [10, 10])).toBeFalse();
	expect(pointInSegment([5, 5.01], [-10, -10], [10, 10], 0.01)).toBeTrue();
	expect(pointInSegment([5, 4.99], [-10, -10], [10, 10], 0.01)).toBeTrue();
	expect(pointInSegment([5, 5.02], [-10, -10], [10, 10], 0.01)).toBeFalse();
	expect(pointInSegment([5, 4.98], [-10, -10], [10, 10], 0.01)).toBeFalse();
});

test("2d axis aligned", () => {
	expect(pointInSegment([9, 10], [5, 10], [10, 10])).toBeTrue();
	expect(pointInSegment([9, 10], [10, 10], [5, 10])).toBeTrue();
	expect(pointInSegment([10, 9], [10, 5], [10, 10])).toBeTrue();
	expect(pointInSegment([10, 9], [10, 10], [10, 5])).toBeTrue();
	expect(pointInSegment([4.9, 10], [5, 10], [10, 10], 0.1)).toBeTrue();
	expect(pointInSegment([4.89, 10], [5, 10], [10, 10], 0.1)).toBeFalse();
	expect(pointInSegment([10.1, 10], [5, 10], [10, 10], 0.1)).toBeTrue();
	expect(pointInSegment([10.11, 10], [5, 10], [10, 10], 0.1)).toBeFalse();
	expect(pointInSegment([9, 10.1], [5, 10], [10, 10], 0.1)).toBeTrue();
	expect(pointInSegment([9, 10.11], [5, 10], [10, 10], 0.1)).toBeFalse();
	expect(pointInSegment([9, 9.9], [5, 10], [10, 10], 0.1)).toBeTrue();
	expect(pointInSegment([9, 9.89], [5, 10], [10, 10], 0.1)).toBeFalse();
});
