// SPDX-License-Identifier: Apache-2.0
import { describe, expect, test } from "bun:test";
import {
	arcLength,
	area,
	asPath,
	asPolygon,
	asPolyline,
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

const A = complexPolygon(asPolygon(rectWithCentroid([0, 0], 100))[0], [
	flip(asPolygon(rectWithCentroid([0, 0], 50))[0]),
]);

describe("complex poly", () => {
	test("asPath", () => {
		expect(asSvg(asPath(A, { linear: true }))).toBe(
			'<path d="M-50,-50H50V50H-50V-50zM-25,25H25V-25H-25V25z"/>'
		);
		expect(asSvg(asPath(A, {}))).toBe(
			'<path d="M0,-50C16.667,-50,50,-16.667,50,0C50,16.667,16.667,50,0,50C-16.667,50,-50,16.667,-50,0C-50,-16.667,-16.667,-50,0,-50zM0,25C8.333,25,25,8.333,25,0C25,-8.333,8.333,-25,0,-25C-8.333,-25,-25,-8.333,-25,0C-25,8.333,-8.333,25,0,25z"/>'
		);
	});

	test("asPolygon", () => {
		expect(asPolygon(A)).toEqual([A.boundary, ...A.children]);
	});

	test("asPolyline", () => {
		expect(asPolyline(A)).toEqual([
			asPolyline(A.boundary)[0],
			...A.children.map((child) => asPolyline(child)[0]),
		]);
	});

	test("asSvg", () => {
		expect(asSvg(A)).toBe(
			'<path d="M-50,-50L50,-50L50,50L-50,50zM-25,25L25,25L25,-25L-25,-25z"/>'
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
				flip(A.boundary),
				A.children.map((x) => flip(x))
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
				resample(A.boundary, opts),
				A.children.map((c) => resample(c, opts))
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
				rotate(A.boundary, theta),
				A.children.map((c) => rotate(c, theta))
			)
		);
	});

	test("scale", () => {
		const factor = [2, 3];
		expect(scale(A, factor)).toEqual(
			complexPolygon(
				scale(A.boundary, factor),
				A.children.map((c) => scale(c, factor))
			)
		);
	});

	test("translate", () => {
		const offset = [100, 200];
		expect(translate(A, offset)).toEqual(
			complexPolygon(
				translate(A.boundary, offset),
				A.children.map((c) => translate(c, offset))
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
