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
import { pluck } from "@thi.ng/transducers/pluck";
import { reduce } from "@thi.ng/transducers/reduce";
import { transduce } from "@thi.ng/transducers/transduce";
import { dot } from "@thi.ng/vectors/dot";
import { roundN } from "@thi.ng/vectors/roundn";
import type { AnalysisOpts, AnalyzedImage } from "./api.js";
import { warmIntensityHsv } from "./hues.js";

/**
 * Performs a set of image/color analyses on provided pixel buffer.
 *
 * @param img
 * @param opts
 */
export const analyzeColors = (
	img: FloatBuffer | IntBuffer,
	opts?: Partial<AnalysisOpts>
): AnalyzedImage => {
	let $img =
		img.format !== FLOAT_RGBA ? img.as(FLOAT_RGBA) : <FloatBuffer>img;
	if (opts?.size) {
		const size = ~~opts.size;
		let w = $img.width;
		let h = $img.height;
		[w, h] =
			w > h
				? [size, ~~Math.max(1, (h / w) * size)]
				: [~~Math.max(1, (w / h) * size), size];
		$img = $img.resize(w, h);
	}
	const imgGray = $img.as(FLOAT_GRAY);
	const imgHsv = $img.as(FLOAT_HSVA);
	const dominantColors = opts?.dominantFn ?? dominantColorsKmeans;
	const prec = opts?.prec ?? 1e-3;
	const colors = dominantColors($img, opts?.numColors ?? 4)
		.sort(compareByKey("area", compareNumDesc))
		.map((x) => {
			roundN(null, x.color, prec);
			return x;
		});
	const colorAreas = colors.map((x) => x.area);
	const derived = derivedColorsResults(colors.map((x) => x.color));
	const lumaRangeImg = reduce(minMax(), imgGray.data);
	const weightedLuma = dot(derived.lumaRange, colorAreas);
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
		warmth: warmIntensityHsv(imgHsv, opts?.minSat),
		contrastImg: lumaRangeImg[1] - lumaRangeImg[0],
		lumaRangeImg,
		weightedSat,
		weightedLuma,
		weightedChroma,
	};
};

/**
 * Computes a number of metrics (partial {@link AnalyzedImage}) derived from
 * given raw SRGB colors. Helper function for {@link analyzeColors}.
 *
 * @param colors
 */
export const derivedColorsResults = (
	colors: number[][]
): Pick<
	AnalyzedImage,
	| "css"
	| "srgb"
	| "hsv"
	| "oklch"
	| "hueRange"
	| "satRange"
	| "chromaRange"
	| "lumaRange"
	| "contrast"
	| "colorContrast"
> => {
	const dominantLuma = colors.map((x) => luminanceSrgb(x));
	const dominantSrgb = colors.map((x) => srgb(x));
	const dominantHsv = dominantSrgb.map((x) => hsv(x));
	const dominantOklch = dominantSrgb.map((x) => oklch(x));
	const dominantCss = dominantSrgb.map((x) => css(x));
	const hueRange = transduce(pluck(0), minMax(), dominantHsv);
	const satRange = transduce(pluck(1), minMax(), dominantHsv);
	const chromaRange = transduce(pluck(1), minMax(), dominantOklch);
	const lumaRange = reduce(minMax(), dominantLuma);
	const contrast = lumaRange[1] - lumaRange[0];
	const colorContrast = fit(
		transduce(
			map((pair) => contrastWCAG(...pair)),
			max(),
			permutations(dominantSrgb, dominantSrgb)
		),
		1,
		21,
		0,
		1
	);
	return {
		css: dominantCss,
		srgb: dominantSrgb,
		hsv: dominantHsv,
		oklch: dominantOklch,
		hueRange,
		satRange,
		chromaRange,
		lumaRange,
		contrast,
		colorContrast,
	};
};
