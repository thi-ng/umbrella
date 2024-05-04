import { eqDeltaArray } from "@thi.ng/vectors";
import { describe, expect, test } from "bun:test";
import {
	Path,
	asPolyline,
	asSvg,
	line,
	pathFromSvg,
	polyline,
	simplify,
	vertices,
} from "../src/index.js";

const A = pathFromSvg("M0,0h100v100h-100zM10,10v80h80v-80z");

describe("path", () => {
	test("fromSvg", () => {
		expect(A).toEqual(
			new Path(
				[
					{ type: "m", point: [0, 0] },
					{ type: "l", geo: line([0, 0], [100, 0]) },
					{ type: "l", geo: line([100, 0], [100, 100]) },
					{ type: "l", geo: line([100, 100], [0, 100]) },
					{ type: "l", geo: line([0, 100], [0, 0]) },
					{ type: "z" },
				],
				[
					[
						{ type: "m", point: [10, 10] },
						{ type: "l", geo: line([10, 10], [10, 90]) },
						{ type: "l", geo: line([10, 90], [90, 90]) },
						{ type: "l", geo: line([90, 90], [90, 10]) },
						{ type: "l", geo: line([90, 10], [10, 10]) },
						{ type: "z" },
					],
				]
			)
		);
	});

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
