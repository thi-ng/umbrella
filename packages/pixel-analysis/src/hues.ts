// SPDX-License-Identifier: Apache-2.0
import { ensureArray } from "@thi.ng/arrays/ensure-array";
import { compareByKey } from "@thi.ng/compare";
import { roundTo, smoothStep, TAU } from "@thi.ng/math";
import { normFrequenciesAuto, repeat, transduce } from "@thi.ng/transducers";
import { map } from "@thi.ng/transducers/map";
import { mapcat } from "@thi.ng/transducers/mapcat";
import { mean } from "@thi.ng/transducers/mean";
import type { ReadonlyVec } from "@thi.ng/vectors";
import { circularMean } from "@thi.ng/vectors/circular";
import type { TemperatureResult } from "./api.js";

/**
 * Iterator consuming HSV colors and only yielding those matching given hue
 * range and minimum saturation (all normalized in [0,1] range).
 *
 * @remarks
 * If given a pixel buffer as input, it MUST be in `FLOAT_HSVA` format.
 *
 * If `minHue` is greater than `maxHue`, the range will be interpreted to wrap
 * around at 1. E.g. the range `[0.8, 0.2]` selects hues >= 0.8 and hues
 * < 0.2.
 *
 * @param colors
 * @param minHue
 * @param maxHue
 * @param minSat
 */
export function* selectHueRange(
	colors: Iterable<ReadonlyVec>,
	minHue: number,
	maxHue: number,
	minSat: number
) {
	const pred = __hueSelector(minHue, maxHue);
	for (let col of colors) {
		if (col[1] >= minSat && pred(col[0])) yield col;
	}
}

/**
 * Similar to {@link selectHueRange}, but only yields indices/IDs of matching
 * colors.
 *
 * @remarks
 * See {@link selectHueRange} for details about hue ranges.
 *
 * @param colors
 * @param minHue
 * @param maxHue
 * @param minSat
 */
export function* selectHueRangeIDs(
	colors: Iterable<ReadonlyVec>,
	minHue: number,
	maxHue: number,
	minSat: number
) {
	const pred = __hueSelector(minHue, maxHue);
	let id = 0;
	for (let col of colors) {
		if (col[1] >= minSat && pred(col[0])) yield id;
		id++;
	}
}

/**
 * Similar to {@link selectHueRange}, but only returns a count of inputs
 * matching given hue range and minimum saturation (all normalized in [0,1]
 * range).
 *
 * @remarks
 * See {@link selectHueRange} for details about hue ranges.
 *
 * @param colors
 * @param minHue
 * @param maxHue
 * @param minSat
 */
export const countHueRange = (
	colors: Iterable<ReadonlyVec>,
	minHue: number,
	maxHue: number,
	minSat: number
) => {
	const pred = __hueSelector(minHue, maxHue);
	let count = 0;
	for (let col of colors) {
		if (col[1] >= minSat && pred(col[0])) count++;
	}
	return count;
};

/** @internal */
const __hueSelector = (min: number, max: number) =>
	min <= max
		? (h: number) => h >= min && h < max
		: (h: number) => h >= min || h < max;

/**
 * Takes a list of HSV colors, a list of min/max hue ranges and a min saturation
 * (all normalized in [0,1] range). Computes the normalized area of all matching
 * colors.
 *
 * @remarks
 * If given a pixel buffer as input, it MUST be in `FLOAT_HSVA` format. Also see
 * {@link temperature}.
 *
 * See {@link selectHueRange} for details about hue ranges.
 *
 * @param colors
 * @param hueRanges
 * @param minSat
 */
export const hueRangeArea = (
	colors: Iterable<ReadonlyVec>,
	hueRanges: [number, number][],
	minSat = 0.2
) => {
	const $img = ensureArray(colors);
	// select colors matching hue ranges
	const selected = new Set(
		mapcat((range) => selectHueRangeIDs($img, ...range, minSat), hueRanges)
	);
	return selected.size / $img.length;
};

/**
 * Takes a list of hue ranges and computes the area-weighted mean intensity of
 * matching pixels in the given image. Also see {@link temperatureIntensity}.
 *
 * @remarks
 * If given a pixel buffer as input, it MUST be in `FLOAT_HSVA` format.
 *
 * Intensity here means the product of HSV `saturation * brightness`.
 *
 * See {@link selectHueRange} for details about hue ranges.
 *
 * @param colors
 * @param hueRanges
 * @param minSat
 */
export const hueRangeAreaIntensity = (
	colors: Iterable<ReadonlyVec>,
	hueRanges: [number, number][],
	minSat = 0.2
) => {
	const $colors = ensureArray(colors);
	const selected = new Set(
		mapcat(
			(range) => selectHueRangeIDs($colors, ...range, minSat),
			hueRanges
		)
	);
	const area = selected.size / $colors.length;
	const intensity = transduce(
		map((id) => {
			const color = $colors[id];
			return color[1] * color[2];
		}),
		mean(),
		selected
	);
	return intensity * area;
};

/**
 * Computes the average intensity of given HSV colors. Intensity here means the
 * product of `saturation * value` (ignoring hues).
 *
 * @remarks
 * If given a pixel buffer as input, it MUST be in `FLOAT_HSVA` format.
 *
 * @param colors
 */
export const meanIntensity = (colors: Iterable<ReadonlyVec>) =>
	transduce(
		map((x) => x[1] * x[2]),
		mean(),
		colors
	);

/**
 * Computes an abstract measure of a normalized "color temperature" of the given
 * HSV `colors` (also normalized in [0,1] range). Results closer to 1.0 indicate
 * a prevalence of warmer colors, results closer to -1.0 mean more
 * colder/blue-ish colors present.
 *
 * @remarks
 * Computation is as follows:
 * - Discard colors with lower saturation than given `minSat`
 * - Compute normalized area (percentage) of qualifying saturated colors
 * - Compute the histogram for 12 evenly spread hues
 * - Produce a weighted list of hue angles, based on histogram
 * - Compute circular mean of hue angles
 * - Use {@link hueTemperature} to compute normalized temperature in [-1,1] range
 * - Scale temparature by normlized area
 * - Return object of the various result metrics
 *
 * If given a pixel buffer as input, it MUST be in `FLOAT_HSVA` format.
 *
 * Also see {@link temperatureIntensity}.
 *
 * @param colors
 * @param minSat
 */
export const temperature = (
	colors: Iterable<ReadonlyVec>,
	minSat = 0.2
): TemperatureResult => {
	const $colors = ensureArray(colors);
	const filtered = $colors.filter((x) => x[1] >= minSat);
	const area = filtered.length / $colors.length;
	const hues = [
		...transduce(
			map((x) => roundTo(x[0], 1 / 12) % 1),
			normFrequenciesAuto<number>(),
			filtered
		),
	].sort(compareByKey(0));
	const angles = [
		...mapcat(([hue, num]) => {
			num *= 50;
			return num >= 1 ? repeat(hue * TAU, num) : null;
		}, hues),
	];
	if (!angles.length) {
		return { hues, meanHue: 0, temp: 0, areaTemp: 0, area: 0 };
	}
	const meanHue = circularMean(angles) / TAU;
	const temp = hueTemperature(meanHue);
	const areaTemp = temp * area;
	return { hues, meanHue, temp, areaTemp, area };
};

/**
 * Computes an abstract measure of a normalized "color temperature" ([-1,1]
 * range) for the given `hue` (in [0,1] range). Red/orange/yellow hues produce
 * results close to 1.0, cyan/blue/purple-ish hues produce results closer to
 * -1.0.
 *
 * @remarks
 * Uses one of two smoothstep curves for non-linear interpolation, depending on
 * input hue.
 *
 * @param hue
 */
export const hueTemperature = (hue: number) =>
	2 *
		(hue < 2 / 3
			? smoothStep(0.6, 0.1, hue)
			: smoothStep(0.72, 0.92, hue)) -
	1;
