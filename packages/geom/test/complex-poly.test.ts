import { describe, expect, test } from "bun:test";
import {
	Polygon,
	arcLength,
	area,
	asPolygon,
	asSvg,
	bounds,
	closestPoint,
	complexPolygon,
	edges,
	flip,
	pointInside,
	rectWithCentroid,
	resample,
	rotate,
	scale,
	simplify,
	translate,
	vertices,
} from "../src/index.js";

const A = complexPolygon(asPolygon(rectWithCentroid([0, 0], 100)), [
	<Polygon>flip(asPolygon(rectWithCentroid([0, 0], 50))),
]);

describe("complex poly", () => {
	test("asSvg", () => {
		expect(asSvg(A)).toBe(
			'<path d="M-50,-50L50,-50L50,50L-50,50ZM-25,25L25,25L25,-25L-25,-25Z"/>'
		);
	});

	test("area", () => {
		expect(area(A)).toBe(100 * 100 - 50 * 50);
	});

	test("arcLength", () => {
		expect(arcLength(A)).toBe(100 * 4 + 50 * 4);
	});

	test("bounds", () => {
		expect(bounds(A)).toEqual(bounds(A.boundary)!);
	});

	test("closestPoint", () => {
		expect(closestPoint(A, [100, 0])).toEqual([50, 0]);
		expect(closestPoint(A, [10, 0])).toEqual([25, 0]);
		expect(closestPoint(A, [0, -30])).toEqual([0, -25]);
	});

	test("edges", () => {
		expect([...edges(A)]).toEqual(
			// prettier-ignore
			[
				[[-50, -50], [50, -50]],
				[[50, -50], [50, 50]],
				[[50, 50], [-50, 50]],
				[[-50, 50], [-50, -50]],
				[[-25, 25], [25, 25]],
				[[25, 25], [25, -25]],
				[[25, -25], [-25, -25]],
				[[-25, -25], [-25, 25]]
			]
		);
	});

	test("flip", () => {
		expect(flip(A)).toEqual(
			complexPolygon(
				<Polygon>flip(A.boundary),
				<Polygon[]>A.children.map(flip)
			)
		);
	});

	test("pointInside", () => {
		expect(pointInside(A, [0, 0])).toBe(false);
		expect(pointInside(A, [50.0001, 0])).toBe(false);
		expect(pointInside(A, [50, 0])).toBe(true);
		expect(pointInside(A, [25.0001, 0])).toBe(true);
	});

	test("resample", () => {
		const opts = { dist: 25 };
		expect(resample(A, opts)).toEqual(
			complexPolygon(
				<Polygon>resample(A.boundary, opts),
				A.children.map((c) => <Polygon>resample(c, opts))
			)
		);
	});

	test("simplify", () => {
		const opts = { dist: 25 };
		expect(simplify(resample(A, opts), 1e-3)).toEqual(A);
	});

	test("rotate", () => {
		const theta = Math.PI / 4;
		expect(rotate(A, theta)).toEqual(
			complexPolygon(
				<Polygon>rotate(A.boundary, theta),
				A.children.map((c) => <Polygon>rotate(c, theta))
			)
		);
	});

	test("scale", () => {
		const factor = [2, 3];
		expect(scale(A, factor)).toEqual(
			complexPolygon(
				<Polygon>scale(A.boundary, factor),
				A.children.map((c) => <Polygon>scale(c, factor))
			)
		);
	});

	test("translate", () => {
		const offset = [100, 200];
		expect(translate(A, offset)).toEqual(
			complexPolygon(
				<Polygon>translate(A.boundary, offset),
				A.children.map((c) => <Polygon>translate(c, offset))
			)
		);
	});

	test("vertices", () => {
		expect(vertices(A, { dist: 25 })).toEqual([
			[-50, -50],
			[-25, -50],
			[0, -50],
			[25, -50],
			[50, -50],
			[50, -25],
			[50, 0],
			[50, 25],
			[50, 50],
			[25, 50],
			[0, 50],
			[-25, 50],
			[-50, 50],
			[-50, 25],
			[-50, 0],
			[-50, -25],
			[-25, 25],
			[0, 25],
			[25, 25],
			[25, 0],
			[25, -25],
			[0, -25],
			[-25, -25],
			[-25, 0],
		]);
	});
});
