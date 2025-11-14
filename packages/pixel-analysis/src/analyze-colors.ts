// SPDX-License-Identifier: Apache-2.0
import { contrast as contrastWCAG } from "@thi.ng/color/contrast";
import { css } from "@thi.ng/color/css/css";
import { hsv } from "@thi.ng/color/hsv/hsv";
import { luminanceSrgb } from "@thi.ng/color/luminance-rgb";
import { oklch } from "@thi.ng/color/oklch/oklch";
import { srgb } from "@thi.ng/color/srgb/srgb";
import { compareByKey } from "@thi.ng/compare/keys";
import { compareNumDesc } from "@thi.ng/compare/numeric";
import { fit } from "@thi.ng/math/fit";
import {
	aggregateCircularMetrics,
	aggregateMetrics,
	aggregateWeightedMetrics,
	defCircularMetric,
	defMetric,
	defWeightedMetric,
} from "@thi.ng/metrics/metrics";
import { dominantColorsMeanCut } from "@thi.ng/pixel-dominant-colors";
import { dominantColorsKmeans } from "@thi.ng/pixel-dominant-colors/kmeans";
import { FloatBuffer } from "@thi.ng/pixel/float";
import { FLOAT_GRAY } from "@thi.ng/pixel/format/float-gray";
import { FLOAT_HSVA } from "@thi.ng/pixel/format/float-hsva";
import { FLOAT_RGBA } from "@thi.ng/pixel/format/float-rgba";
import { IntBuffer } from "@thi.ng/pixel/int";
import { map } from "@thi.ng/transducers/map";
import { max } from "@thi.ng/transducers/max";
import { permutations } from "@thi.ng/transducers/permutations";
import { transduce } from "@thi.ng/transducers/transduce";
import { roundN } from "@thi.ng/vectors/roundn";
import { ones } from "@thi.ng/vectors/setn";
import type {
	AggregatedColorAnalysisResult,
	BaseColorAnalysisResult,
	ColorAnalysisOpts,
	ColorAnalysisResult,
} from "./api.js";
import { temperature, type DEFAULT_TEMPERATURE_COEFFS } from "./hues.js";

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
	const derived = deriveColorResults(
		colors.map((x) => x.color),
		colorAreas,
		opts?.minSat,
		opts?.tempCoeffs
	);
	const lumImg = defMetric(imgGray.data);
	return {
		...derived,
		img: $img,
		imgGray,
		imgHsv,
		lumImg,
		temperature: temperature(imgHsv, opts?.minSat, opts?.tempCoeffs),
		contrastImg: lumImg.max - lumImg.min,
	};
};

/**
 * Computes a number of metrics (partial {@link ColorAnalysisResult}) derived
 * from given raw SRGB colors and their (normalized) areas. Helper function for
 * {@link analyzeColors}.
 *
 * @param colors
 * @param areas
 * @param minSat
 * @param tempCoeffs
 */
export const deriveColorResults = (
	colors: number[][],
	areas = <number[]>ones(colors.length),
	minSat?: number,
	tempCoeffs?: typeof DEFAULT_TEMPERATURE_COEFFS
): BaseColorAnalysisResult => {
	const dominantLuma = colors.map((x) => luminanceSrgb(x));
	const dominantSrgb = colors.map((x) => srgb(x));
	const dominantHsv = dominantSrgb.map((x) => hsv(x));
	const dominantOklch = dominantSrgb.map((x) => oklch(x));
	const dominantCss = dominantSrgb.map((x) => css(x));
	const hues = dominantHsv.map((x) => x[0]);
	const sats = dominantHsv.map((x) => x[1]);
	const lum = defWeightedMetric(dominantLuma, areas);
	return {
		css: dominantCss,
		srgb: dominantSrgb,
		hsv: dominantHsv,
		oklch: dominantOklch,
		hue: defCircularMetric(hues),
		sat: defWeightedMetric(sats, areas),
		chroma: defWeightedMetric(
			dominantOklch.map((x) => x[1]),
			areas
		),
		lum,
		areas,
		contrast: lum.max - lum.min,
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

export const aggregateColorResults = (
	results: Omit<ColorAnalysisResult, "img" | "imgGray" | "imgHsv">[],
	numColors = 4
): AggregatedColorAnalysisResult => {
	// compute mean dominant colors of all results
	const dominant = dominantColorsMeanCut(
		results.flatMap((res) => res.srgb),
		numColors
	).map((x) => srgb(x.color));
	return {
		srgb: dominant,
		css: dominant.map((x) => css(x)),
		hsv: dominant.map((x) => hsv(x)),
		oklch: dominant.map((x) => oklch(x)),
		hue: aggregateCircularMetrics(results.map((x) => x.hue)),
		sat: aggregateWeightedMetrics(results.map((x) => x.sat)),
		chroma: aggregateWeightedMetrics(results.map((x) => x.chroma)),
		lum: aggregateWeightedMetrics(results.map((x) => x.lum)),
		lumImg: aggregateMetrics(results.map((x) => x.lumImg)),
		contrast: defMetric(results.map((x) => x.contrast)),
		contrastImg: defMetric(results.map((x) => x.contrastImg)),
		colorContrast: defMetric(results.map((x) => x.colorContrast)),
		temperature: {
			meanHue: defCircularMetric(
				results.map((x) => x.temperature.meanHue)
			),
			temp: defMetric(results.map((x) => x.temperature.temp)),
			areaTemp: defMetric(results.map((x) => x.temperature.areaTemp)),
		},
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
