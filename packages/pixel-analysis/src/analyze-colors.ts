// SPDX-License-Identifier: Apache-2.0
import { contrast as contrastWCAG } from "@thi.ng/color/contrast";
import { css } from "@thi.ng/color/css/css";
import { hsv } from "@thi.ng/color/hsv/hsv";
import { luminanceSrgb } from "@thi.ng/color/luminance-rgb";
import { oklch } from "@thi.ng/color/oklch/oklch";
import { srgb } from "@thi.ng/color/srgb/srgb";
import { compareByKey } from "@thi.ng/compare/keys";
import { compareNumDesc } from "@thi.ng/compare/numeric";
import { TAU } from "@thi.ng/math/api";
import { fit } from "@thi.ng/math/fit";
import { dominantColorsKmeans } from "@thi.ng/pixel-dominant-colors/kmeans";
import { FloatBuffer } from "@thi.ng/pixel/float";
import { FLOAT_GRAY } from "@thi.ng/pixel/format/float-gray";
import { FLOAT_HSVA } from "@thi.ng/pixel/format/float-hsva";
import { FLOAT_RGBA } from "@thi.ng/pixel/format/float-rgba";
import { IntBuffer } from "@thi.ng/pixel/int";
import { map } from "@thi.ng/transducers/map";
import { max } from "@thi.ng/transducers/max";
import { minMax } from "@thi.ng/transducers/min-max";
import { permutations } from "@thi.ng/transducers/permutations";
import { reduce } from "@thi.ng/transducers/reduce";
import { transduce } from "@thi.ng/transducers/transduce";
import { circularMean, circularSD } from "@thi.ng/vectors/circular";
import { dot } from "@thi.ng/vectors/dot";
import { vmean } from "@thi.ng/vectors/mean";
import { mulN } from "@thi.ng/vectors/muln";
import { roundN } from "@thi.ng/vectors/roundn";
import { sd } from "@thi.ng/vectors/variance";
import type { ColorAnalysisOpts, ColorAnalysisResult } from "./api.js";
import {
	computeHueRange,
	temperature,
	type DEFAULT_TEMPERATURE_COEFFS,
} from "./hues.js";

/**
 * Performs a set of image/color analyses on provided pixel buffer.
 *
 * @param img
 * @param opts
 */
export const analyzeColors = (
	img: FloatBuffer | IntBuffer,
	opts?: Partial<ColorAnalysisOpts>
): ColorAnalysisResult => {
	let $img =
		img.format !== FLOAT_RGBA ? img.as(FLOAT_RGBA) : <FloatBuffer>img;
	if (opts?.size) $img = __resize($img, opts.size);
	const imgGray = $img.as(FLOAT_GRAY);
	const imgHsv = $img.as(FLOAT_HSVA);
	const colors = __dominantColors($img, opts);
	const colorAreas = colors.map((x) => x.area);
	const derived = derivedColorResults(
		colors.map((x) => x.color),
		opts?.minSat,
		opts?.tempCoeffs
	);
	const lumaRangeImg = reduce(minMax(), imgGray.data);
	const weightedLuma = dot(derived.luma.range, colorAreas);
	const weightedChroma = dot(
		derived.oklch.map((x) => x[1]),
		colorAreas
	);
	const weightedSat = dot(
		derived.hsv.map((x) => x[1]),
		colorAreas
	);
	return {
		img: $img,
		imgGray,
		imgHsv,
		...derived,
		area: colorAreas,
		temperature: temperature(imgHsv, opts?.minSat, opts?.tempCoeffs),
		contrastImg: lumaRangeImg[1] - lumaRangeImg[0],
		lumaRangeImg,
		weightedSat,
		weightedLuma,
		weightedChroma,
	};
};

/**
 * Computes a number of metrics (partial {@link ColorAnalysisResult}) derived from
 * given raw SRGB colors. Helper function for {@link analyzeColors}.
 *
 * @param colors
 * @param minSat
 * @param tempCoeffs
 */
export const derivedColorResults = (
	colors: number[][],
	minSat?: number,
	tempCoeffs?: typeof DEFAULT_TEMPERATURE_COEFFS
): Pick<
	ColorAnalysisResult,
	| "css"
	| "srgb"
	| "hsv"
	| "oklch"
	| "hue"
	| "sat"
	| "luma"
	| "contrast"
	| "colorContrast"
	| "temperature"
> => {
	const dominantLuma = colors.map((x) => luminanceSrgb(x));
	const dominantSrgb = colors.map((x) => srgb(x));
	const dominantHsv = dominantSrgb.map((x) => hsv(x));
	const dominantOklch = dominantSrgb.map((x) => oklch(x));
	const dominantCss = dominantSrgb.map((x) => css(x));
	const hues = dominantHsv.map((x) => x[0]);
	const huesRad = mulN([], hues, TAU);
	const sats = dominantHsv.map((x) => x[1]);
	const meanHue = circularMean(huesRad) / TAU;
	const hueRange = computeHueRange(hues, meanHue);
	const lumaRange = reduce(minMax(), dominantLuma);
	return {
		css: dominantCss,
		srgb: dominantSrgb,
		hsv: dominantHsv,
		oklch: dominantOklch,
		hue: {
			mean: meanHue,
			range: hueRange,
			sd: circularSD(huesRad) / TAU,
		},
		sat: {
			mean: vmean(sats),
			range: reduce(minMax(), sats),
			sd: sd(sats),
		},
		luma: {
			mean: vmean(dominantLuma),
			range: lumaRange,
			sd: sd(dominantLuma),
		},
		contrast: lumaRange[1] - lumaRange[0],
		colorContrast: fit(
			transduce(
				map((pair) => contrastWCAG(...pair)),
				max(),
				permutations(dominantSrgb, dominantSrgb)
			),
			1,
			21,
			0,
			1
		),
		temperature: temperature(dominantHsv, minSat, tempCoeffs),
	};
};

/** @internal */
const __dominantColors = (
	img: FloatBuffer,
	{
		dominantFn = dominantColorsKmeans,
		numColors = 4,
		prec = 1e-3,
	}: Partial<
		Pick<ColorAnalysisOpts, "dominantFn" | "numColors" | "prec">
	> = {}
) =>
	dominantFn(img, numColors)
		.sort(compareByKey("area", compareNumDesc))
		.map((x) => (roundN(null, x.color, prec), x));

/** @internal */
const __resize = ($img: FloatBuffer, size: number) => {
	size = ~~size;
	let w = $img.width;
	let h = $img.height;
	[w, h] =
		w > h
			? [size, ~~Math.max(1, (h / w) * size)]
			: [~~Math.max(1, (w / h) * size), size];
	return $img.resize(w, h);
};
