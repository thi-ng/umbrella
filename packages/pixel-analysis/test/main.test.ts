// SPDX-License-Identifier: Apache-2.0
import { TAU } from "@thi.ng/math";
import { FLOAT_HSVA, intBuffer, RGB888 } from "@thi.ng/pixel";
import { circularMean, mulN } from "@thi.ng/vectors";
import { expect, test } from "bun:test";
import { computeHueRange, hueRangeAreaIntensity } from "../src/index.js";

const img = intBuffer(
	8,
	1,
	RGB888,
	new Uint32Array([
		0xff0000, 0xff7f00, 0xffff00, 0x00ff00, 0x00ffff, 0x0000ff, 0x7f00ff,
		0xff007f,
	])
).as(FLOAT_HSVA);

test("hueRangeIntensityHsv", () => {
	const hsv = img.data;
	expect(hueRangeAreaIntensity(img, [[330 / 360, 60 / 360]])).toBe(
		(hsv[1] * hsv[2] +
			hsv[5] * hsv[6] +
			hsv[9] * hsv[10] +
			hsv[29] * hsv[30]) /
			img.width
	);
	expect(hueRangeAreaIntensity(img, [[110 / 360, 130 / 360]])).toBe(
		(hsv[13] * hsv[14]) / img.width
	);
	expect(hueRangeAreaIntensity(img, [[150 / 360, 300 / 360]])).toBe(
		(hsv[17] * hsv[18] + hsv[21] * hsv[22] + hsv[25] * hsv[26]) / img.width
	);
});

test("computeHueRange (w/ wrap around)", () => {
	// mean < min hue
	const hues = [0.99, 0.89, 0.15, 0.08];
	const mean = circularMean(mulN([], hues, TAU)) / TAU;
	expect(mean).toBeCloseTo(0.03, 2);
	expect(computeHueRange(hues, mean)).toEqual([0.89, 0.15]);

	// mean > max hue
	const hues2 = [0.81, 0.55, 0.12, 0.03];
	const mean2 = circularMean(mulN([], hues2, TAU)) / TAU;
	expect(mean2).toBeCloseTo(0.95, 2);
	expect(computeHueRange(hues2, mean2)).toEqual([0.55, 0.12]);
});
