import { eqDeltaArray } from "@thi.ng/vectors";
import { describe, expect, test } from "bun:test";
import {
	asPolyline,
	asSvg,
	pathFromSvg,
	polyline,
	simplify,
	vertices,
} from "../src/index.js";

const A = pathFromSvg("M0,0h100v100h-100zM10,10v80h80v-80z");

describe.only("path", () => {
	test("asSvg", () => {
		expect(asSvg(A)).toBe(
			'<path d="M0,0H100V100H0V0zM10,10V90H90V10H10z"/>'
		);
	});

	test("asPolyline", () => {
		expect(
			asPolyline(A, { dist: 20 }).map((x) => simplify(x, 1e-3))
		).toEqual([
			polyline([
				[0, 0],
				[100, 0],
				[100, 100],
				[0, 100],
				[0, 0],
			]),
			polyline([
				[10, 10],
				[10, 90],
				[90, 90],
				[90, 10],
				[10, 10],
			]),
		]);
	});

	test("vertices", () => {
		expect(
			eqDeltaArray(vertices(A, { dist: 20 }), [
				[0, 0],
				[20, 0],
				[40, 0],
				[60, 0],
				[80, 0],
				[100, 0],
				[100, 20],
				[100, 40],
				[100, 60],
				[100, 80],
				[100, 100],
				[80, 100],
				[60, 100],
				[40, 100],
				[20, 100],
				[0, 100],
				[0, 80],
				[0, 60],
				[0, 40],
				[0, 20],
				[10, 10],
				[10, 30],
				[10, 50],
				[10, 70],
				[10, 90],
				[30, 90],
				[50, 90],
				[70, 90],
				[90, 90],
				[90, 70],
				[90, 50],
				[90, 30],
				[90, 10],
				[70, 10],
				[50, 10],
				[30, 10],
			])
		).toBe(true);
	});
});
