// SPDX-License-Identifier: Apache-2.0
import type { HSV, Oklch, SRGB } from "@thi.ng/color";
import type { FloatBuffer } from "@thi.ng/pixel";

export interface AnalysisOpts {
	/**
	 * Max. number of dominant colors.
	 */
	numColors: number;
	/**
	 * Max. image size (longest side)
	 */
	size: number;
	/**
	 * Min. saturation to consider for computing {@link warmIntensity}.
	 */
	minSat: number;
}

export interface AnalyzedImage {
	/**
	 * Input image, possibly converted to float RGBA & resized.
	 */
	img: FloatBuffer;
	/**
	 * Float grayscale version of {@link AnalyzedImage.img}.
	 */
	imgGray: FloatBuffer;
	/**
	 * Float HSV version of {@link AnalyzedImage.img}.
	 */
	imgHsv: FloatBuffer;
	/**
	 * Dominant colors as CSS (hex) strings
	 */
	css: string[];
	/**
	 * Dominant colors as SRGB
	 */
	srgb: SRGB[];
	/**
	 * Dominant colors as HSV
	 */
	hsv: HSV[];
	/**
	 * Dominant colors as Oklch
	 */
	oklch: Oklch[];
	/**
	 * Normalized areas of dominant color clusters
	 */
	area: number[];
	/**
	 * Min/max HSV hue range of dominant colors
	 */
	hueRange: [number, number];
	/**
	 * Min/max HSV saturation range of dominant colors
	 */
	satRange: [number, number];
	/**
	 * Min/max Oklch chroma range of dominant colors
	 */
	chromaRange: [number, number];
	/**
	 * Min/max luminance range of dominant colors (obtained from SRGB)
	 */
	lumaRange: [number, number];
	/**
	 * Min/max luminance range of entire grayscale image (obtained from SRGB)
	 */
	lumaRangeImg: [number, number];
	/**
	 * Normalized warmth, i.e. the area-weighted intensity of "warm" colors in
	 * the image (see {@link warmIntensity} and {@link AnalysisOpts.minSat}).
	 */
	warmth: number;
	/**
	 * Luminance contrast of dominant colors (i.e. delta of
	 * {@link AnalyzedImage.lumaRange}).
	 */
	contrast: number;
	/**
	 * Luminance contrast of entire grayscale image (i.e. delta of
	 * {@link AnalyzedImage.lumaRangeImg}).
	 */
	contrastImg: number;
	/**
	 * Max. normalized WCAG color contrast of dominant colors.
	 */
	colorContrast: number;
	/**
	 * Average luminance of dominant colors, weighted by area.
	 */
	weightedLuma: number;
	/**
	 * Average HSV saturation of dominant colors, weighted by area.
	 */
	weightedSat: number;
	/**
	 * Average Oklch chroma of dominant colors, weighted by area.
	 */
	weightedChroma: number;
}
