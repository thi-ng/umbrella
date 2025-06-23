// SPDX-License-Identifier: Apache-2.0
import { expect, test } from "bun:test";
import { hueRangeIntensityHsv } from "../src/index.js";
import { ARGB8888, FLOAT_HSVA, intBuffer, RGB888 } from "@thi.ng/pixel";

test("hueRangeIntensityHsv", () => {
	const img = intBuffer(
		8,
		1,
		RGB888,
		new Uint32Array([
			0xff0000, 0xff7f00, 0xffff00, 0x00ff00, 0x00ffff, 0x0000ff,
			0x7f00ff, 0xff007f,
		])
	);
	const hsv = img.as(FLOAT_HSVA).data;
	expect(hueRangeIntensityHsv(img, [[330 / 360, 60 / 360]])).toBe(
		(hsv[1] * hsv[2] +
			hsv[5] * hsv[6] +
			hsv[9] * hsv[10] +
			hsv[29] * hsv[30]) /
			img.width
	);
	expect(hueRangeIntensityHsv(img, [[110 / 360, 130 / 360]])).toBe(
		(hsv[13] * hsv[14]) / img.width
	);
	expect(hueRangeIntensityHsv(img, [[150 / 360, 300 / 360]])).toBe(
		(hsv[17] * hsv[18] + hsv[21] * hsv[22] + hsv[25] * hsv[26]) / img.width
	);
});
