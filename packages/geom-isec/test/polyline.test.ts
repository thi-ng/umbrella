import { IntersectionType } from "@thi.ng/geom-api";
import { expect, test } from "bun:test";
import {
	intersectLinePolylineAll,
	intersectRayPolylineAll,
} from "../src/index.js";

const pts = [
	[0, 0],
	[100, 0],
	[100, 50],
	[0, 100],
];

test("ray (x)", () => {
	expect(intersectRayPolylineAll([-50, 25], [1, 0], pts, false)).toEqual({
		type: IntersectionType.INTERSECT,
		isec: [[100, 25]],
	});
	expect(intersectRayPolylineAll([-50, 25], [1, 0], pts, true)).toEqual({
		type: IntersectionType.INTERSECT,
		isec: [
			[0, 25],
			[100, 25],
		],
	});
});

test("ray (y)", () => {
	expect(intersectRayPolylineAll([50, -50], [0, 1], pts, false)).toEqual({
		type: IntersectionType.INTERSECT,
		isec: [
			[50, 0],
			[50, 75],
		],
	});
	expect(intersectRayPolylineAll([50, -50], [0, 1], pts, true)).toEqual({
		type: IntersectionType.INTERSECT,
		isec: [
			[50, 0],
			[50, 75],
		],
	});
});

test("line (x)", () => {
	expect(intersectLinePolylineAll([-50, 25], [50, 25], pts, false)).toEqual({
		type: IntersectionType.NONE,
	});
	expect(intersectLinePolylineAll([-50, 25], [110, 25], pts, false)).toEqual({
		type: IntersectionType.INTERSECT,
		isec: [[100, 25]],
	});
	expect(intersectLinePolylineAll([-50, 25], [50, 25], pts, true)).toEqual({
		type: IntersectionType.INTERSECT,
		isec: [[0, 25]],
	});
	expect(intersectLinePolylineAll([-50, 25], [110, 25], pts, true)).toEqual({
		type: IntersectionType.INTERSECT,
		isec: [
			[0, 25],
			[100, 25],
		],
	});
});

test("line (y)", () => {
	expect(intersectLinePolylineAll([50, -25], [50, -20], pts, false)).toEqual({
		type: IntersectionType.NONE,
	});
	expect(intersectLinePolylineAll([50, -25], [50, 50], pts, false)).toEqual({
		type: IntersectionType.INTERSECT,
		isec: [[50, 0]],
	});
	expect(intersectLinePolylineAll([50, -25], [50, 100], pts, false)).toEqual({
		type: IntersectionType.INTERSECT,
		isec: [
			[50, 0],
			[50, 75],
		],
	});
});

test("ray minD/maxD", () => {
	const I = Infinity;
	expect(intersectRayPolylineAll([50, 25], [1, 0], pts, true, -I, I)).toEqual(
		{
			type: IntersectionType.INTERSECT,
			isec: [
				[0, 25],
				[100, 25],
			],
		}
	);
	expect(intersectRayPolylineAll([-50, 25], [1, 0], pts, true, 60)).toEqual({
		type: IntersectionType.INTERSECT,
		isec: [[100, 25]],
	});
	expect(intersectRayPolylineAll([50, 25], [1, 0], pts, true, 0, 10)).toEqual(
		{
			type: IntersectionType.NONE,
		}
	);
});
