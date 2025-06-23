// SPDX-License-Identifier: Apache-2.0
import type { FloatBuffer } from "@thi.ng/pixel/float";
import { FLOAT_HSVA } from "@thi.ng/pixel/format/float-hsva";
import type { IntBuffer } from "@thi.ng/pixel/int";
import { map } from "@thi.ng/transducers/map";
import { mapcat } from "@thi.ng/transducers/mapcat";
import { mean } from "@thi.ng/transducers/mean";
import { transduce } from "@thi.ng/transducers/transduce";

/**
 * Iterator yielding HSV pixel values/colors matching given hue range and
 * minimum saturation.
 *
 * @param img
 * @param minHue
 * @param maxHue
 * @param minSat
 */
export function* selectHueRangeHsv(
	img: IntBuffer | FloatBuffer,
	minHue: number,
	maxHue: number,
	minSat: number
) {
	if (img.format !== FLOAT_HSVA) img = img.as(FLOAT_HSVA);
	const {
		data,
		stride: [stride],
	} = img;
	const pred =
		minHue <= maxHue
			? (i: number) => data[i] >= minHue && data[i] < maxHue
			: (i: number) => data[i] >= minHue || data[i] < maxHue;
	for (let i = 0, n = data.length; i < n; i += stride) {
		if (data[i + 1] >= minSat && pred(i)) yield data.subarray(i, i + 4);
	}
}

/**
 * Similar to {@link selectHueRangeHsv}, but only returns a count of HSV pixel
 * values/colors matching given hue range and minimum saturation (all
 * normalized).
 *
 * @param img
 * @param minHue
 * @param maxHue
 * @param minSat
 */
export const countHueRangeHsv = (
	img: IntBuffer | FloatBuffer,
	minHue: number,
	maxHue: number,
	minSat: number
) => {
	if (img.format !== FLOAT_HSVA) img = img.as(FLOAT_HSVA);
	const {
		data,
		stride: [stride],
	} = img;
	const pred =
		minHue <= maxHue
			? (i: number) => data[i] >= minHue && data[i] < maxHue
			: (i: number) => data[i] >= minHue || data[i] < maxHue;
	let count = 0;
	for (let i = 0, n = data.length; i < n; i += stride) {
		if (data[i + 1] >= minSat && pred(i)) count++;
	}
	return count;
};

/**
 * Takes a list of hue ranges and computes the area-weighted mean intensity of
 * matching pixels in the given image. Also see {@link warmIntensityHsv}.
 *
 * @remarks
 * Intensity here means the product of HSV `saturation * brightness`.
 *
 * @param img
 * @param hues
 * @param minSat
 */
export const hueRangeIntensityHsv = (
	img: IntBuffer | FloatBuffer,
	hues: [number, number][],
	minSat = 0.2
) => {
	if (img.format !== FLOAT_HSVA) img = img.as(FLOAT_HSVA);
	// select colors matching hue ranges
	const selected = [
		...mapcat((range) => selectHueRangeHsv(img, ...range, minSat), hues),
	];
	const area = selected.length / (img.data.length / 4);
	// average intensity of selection
	const intensity = transduce(
		map((x) => x[1] * x[2]),
		mean(),
		selected
	);
	return intensity * area;
};

/**
 * Syntax sugar for {@link hueRangeIntensityHsv} to compute the area-weighted mean
 * intensity of pixels in the yellow/orange/red hue ranges.
 *
 * @param img
 * @param minSat
 */
export const warmIntensityHsv = (
	img: IntBuffer | FloatBuffer,
	minSat?: number
) =>
	hueRangeIntensityHsv(
		img,
		[
			[345 / 360, 55 / 360], // red, orange, yellow
		],
		minSat
	);
