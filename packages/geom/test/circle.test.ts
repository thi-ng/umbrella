import { PI } from "@thi.ng/math";
import { IDENT23 } from "@thi.ng/matrices";
import { describe, expect, test } from "bun:test";
import {
	asCubic,
	asPolygon,
	asPolyline,
	circle,
	ellipse,
	pathFromCubics,
	polygon,
	polyline,
	rotate,
	scale,
	transform,
	translate,
	vertices,
} from "../src/index.js";

describe("circle", () => {
	test("ctor", () => {
		expect(circle()).toEqual(circle([0, 0], 1));
		expect(circle(100)).toEqual(circle([0, 0], 100));
		expect(circle([100, 200], 300)).toEqual(circle([100, 200], 300));
	});

	test("asPolygon", () => {
		expect(asPolygon(circle(100), 4)).toEqual([
			polygon(vertices(circle(100), 4)),
		]);
	});

	test("asPolyline", () => {
		const pts = vertices(circle(100), 4);
		pts.push(pts[0]);
		expect(asPolyline(circle(100), 4)).toEqual([polyline(pts)]);
	});

	test("rotate", () => {
		expect(rotate(circle([100, 0], 1), PI / 2)).toEqual(
			circle([6.123233995736766e-15, 100], 1)
		);
	});

	test("scale (uniform)", () => {
		expect(scale(circle([100, 200], 1), 2)).toEqual(circle([200, 400], 2));
	});

	test("scale (non-uniform)", () => {
		expect(scale(circle([100, 200], 10), [2, 3])).toEqual(
			ellipse([200, 600], [20, 30])
		);
	});

	test("translate", () => {
		expect(translate(circle([100, 200], 1), [10, 20])).toEqual(
			circle([110, 220], 1)
		);
	});

	test("transform", () => {
		expect(transform(circle([100, 200], 1), IDENT23)).toEqual(
			pathFromCubics(asCubic(circle([100, 200], 1)))
		);
	});
});
