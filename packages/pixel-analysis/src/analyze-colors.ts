// SPDX-License-Identifier: Apache-2.0
import { contrast } from "@thi.ng/color/contrast";
import { css } from "@thi.ng/color/css/css";
import { hsv } from "@thi.ng/color/hsv/hsv";
import { luminanceSrgb } from "@thi.ng/color/luminance-rgb";
import { oklch } from "@thi.ng/color/oklch/oklch";
import { srgb } from "@thi.ng/color/srgb/srgb";
import { compareByKey } from "@thi.ng/compare/keys";
import { compareNumDesc } from "@thi.ng/compare/numeric";
import { fit } from "@thi.ng/math/fit";
import { dominantColors } from "@thi.ng/pixel-dominant-colors";
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
	const colors = dominantColors($img, opts?.numColors ?? 4).sort(
		compareByKey("area", compareNumDesc)
	);
	const colorAreas = colors.map((x) => x.area);
	const dominantLuma = colors.map((x) => luminanceSrgb(x.color));
	const dominantSrgb = colors.map((x) => srgb(x.color));
	const dominantHsv = dominantSrgb.map((x) => hsv(x));
	const dominantOklch = dominantSrgb.map((x) => oklch(x));
	const dominantCss = dominantSrgb.map((x) => css(x));
	const hueRange = transduce(pluck(0), minMax(), dominantHsv);
	const satRange = transduce(pluck(1), minMax(), dominantHsv);
	const chromaRange = transduce(pluck(1), minMax(), dominantOklch);
	const lumaRange = reduce(minMax(), dominantLuma);
	const lumaRangeImg = reduce(minMax(), imgGray.data);
	const weightedLuma = dot(dominantLuma, colorAreas);
	const weightedChroma = dot(
		dominantOklch.map((x) => x[1]),
		colorAreas
	);
	const weightedSat = dot(
		dominantHsv.map((x) => x[1]),
		colorAreas
	);
	const colorContrast = fit(
		transduce(
			map((pair) => contrast(...pair)),
			max(),
			permutations(dominantSrgb, dominantSrgb)
		),
		1,
		21,
		0,
		1
	);
	return {
		img: $img,
		imgGray,
		imgHsv,
		css: dominantCss,
		srgb: dominantSrgb,
		hsv: dominantHsv,
		oklch: dominantOklch,
		area: colorAreas,
		hueRange,
		satRange,
		chromaRange,
		lumaRange,
		lumaRangeImg,
		warmth: warmIntensityHsv(imgHsv, opts?.minSat),
		contrast: lumaRange[1] - lumaRange[0],
		contrastImg: lumaRangeImg[1] - lumaRangeImg[0],
		colorContrast,
		weightedSat,
		weightedLuma,
		weightedChroma,
	};
};
