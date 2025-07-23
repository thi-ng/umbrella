// SPDX-License-Identifier: Apache-2.0
import { FLOAT_HSVA, intBuffer, RGB888 } from "@thi.ng/pixel";
import { expect, test } from "bun:test";
import {
	hueRangeAreaIntensity,
	temperature,
	temperatureIntensity,
} from "../src/index.js";

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

test("temperature", () => {
	expect(temperature(img)).toEqual(0.5);
	expect(
		temperature([
			[0, 1, 1],
			[0.3, 1, 1],
			[0.5, 1, 1],
			[0.6, 1, 1],
		])
	).toEqual(0.25);
});

test("temperatureIntensity", () => {
	expect(temperatureIntensity(img)).toBeCloseTo(0.5);
	expect(
		temperatureIntensity([
			[0, 0.5, 1],
			[0.3, 1, 1],
			[0.5, 1, 1],
			[0.6, 1, 1],
		])
	).toBeCloseTo(0.125);
});
