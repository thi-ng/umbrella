import { eqDelta as $eq } from "@thi.ng/math/eqdelta";
import { expect, test } from "bun:test";
import {
	center,
	eqDelta,
	sd,
	standardize,
	variance,
	vmean,
	vmedian,
} from "../src/index.js";

const SAMPLES = [7, 4, 9, 4, 5, 4, 5, 2];

test("vmean", () => {
	expect(vmean(SAMPLES)).toBe(5);
});

test("vmedian", () => {
	expect(vmedian(SAMPLES)).toBe(5);
});

test("center", () => {
	expect(center([], SAMPLES)).toEqual([2, -1, 4, -1, 0, -1, 0, -3]);
});

test("variance", () => {
	expect(variance(SAMPLES)).toBe(4);
});

test("sd", () => {
	expect($eq(sd(SAMPLES), 2.138, 0.001)).toBeTrue();
});

test("standardize", () => {
	expect(
		eqDelta(
			standardize([], SAMPLES),
			[0.9354, -0.4677, 1.8708, -0.4677, 0, -0.4677, 0, -1.4031],
			0.001
		)
	).toBeTrue();
});
