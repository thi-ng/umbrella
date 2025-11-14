// SPDX-License-Identifier: Apache-2.0
import type { Fn2 } from "@thi.ng/api";
import type { HSV, Oklch, SRGB } from "@thi.ng/color";
import type { Metric, WeightedMetric } from "@thi.ng/metrics";
import type { FloatBuffer } from "@thi.ng/pixel";
import type { DominantColor } from "@thi.ng/pixel-dominant-colors";
import type { DEFAULT_TEMPERATURE_COEFFS } from "./hues.js";

export interface ColorAnalysisOpts {
	/**
	 * Max. number of dominant colors.
	 */
	numColors: number;
	/**
	 * Dominant color extraction function. By default uses
	 * [`dominantColorsKmeans()`](https://docs.thi.ng/umbrella/pixel-dominant-colors/functions/dominantColorsKmeans.html)
	 */
	dominantFn: Fn2<FloatBuffer, number, DominantColor[]>;
	/**
	 * Max. image size (longest side)
	 */
	size: number;
	/**
	 * Min. saturation to consider for computing {@link temperature}.
	 */
	minSat: number;
	/**
	 * Temperature curve hues/coefficients for computing {@link temparature}.
	 * See {@link DEFAULT_TEMPERATURE_COEFFS} for details.
	 */
	tempCoeffs: typeof DEFAULT_TEMPERATURE_COEFFS;
	/**
	 * Channel precision for dominant colors.
	 *
	 * @defaultValue 0.001
	 */
	prec: number;
}

export interface BaseColorAnalysisResult {
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
	 * HSV hue metrics of dominant colors.
	 *
	 * @remarks
	 * The mean and standard deviation are computed using circular versions. In
	 * case of circular overflow (1.0 => 0, aka 360 => 0 degrees), the min hue
	 * WILL be greater than the max hue (e.g. a hue range of `[0.8, 0.2]`
	 * indicates the hue range from magenta -> orange).
	 */
	hue: Metric;
	/**
	 * HSV saturation metrics of dominant colors.
	 */
	sat: WeightedMetric;
	/**
	 * Oklch chroma metrics of dominant colors.
	 */
	chroma: WeightedMetric;
	/**
	 * sRGB-based luminance metrics of dominant colors.
	 */
	lum: WeightedMetric;
	/**
	 * Normalized areas of dominant colors
	 */
	areas: number[];
	/**
	 * Comprehensive {@link TemperatureResult} as produced by
	 * {@link temperature}. Also see {@link ColorAnalysisOpts.minSat} and
	 * {@link ColorAnalysisOpts.tempCoeffs}.
	 */
	temperature: TemperatureResult;
	/**
	 * Luminance contrast of dominant colors (i.e. delta of
	 * {@link ColorAnalysisResult.lumaRange}).
	 */
	contrast: number;
	/**
	 * Max. normalized WCAG color contrast of dominant colors. The original WCAG
	 * result range [1,21] is rescaled to [0,1].
	 */
	colorContrast: number;
}

/**
 * Result data structure returned by {@link analyzeColors}.
 */
export interface ColorAnalysisResult extends BaseColorAnalysisResult {
	/**
	 * Input image, possibly converted to float RGBA & resized.
	 */
	img: FloatBuffer;
	/**
	 * Float grayscale version of {@link ColorAnalysisResult.img}.
	 */
	imgGray: FloatBuffer;
	/**
	 * Float HSV version of {@link ColorAnalysisResult.img}.
	 */
	imgHsv: FloatBuffer;
	/**
	 * Min/max luminance range of entire grayscale image (obtained from SRGB)
	 */
	lumImg: Metric;
	/**
	 * Luminance contrast of entire grayscale image (i.e. delta of
	 * {@link ColorAnalysisResult.lumaRangeImg}).
	 */
	contrastImg: number;
}

/**
 * Aggregated version of {@link BaseColorAnalysisResult}. Return type of
 * {@link aggregateColorResults}.
 */
export interface AggregatedColorAnalysisResult {
	css: string[];
	srgb: SRGB[];
	hsv: HSV[];
	oklch: Oklch[];
	hue: Metric;
	sat: WeightedMetric;
	chroma: WeightedMetric;
	lum: WeightedMetric;
	lumImg: Metric;
	contrast: Metric;
	contrastImg: Metric;
	colorContrast: Metric;
	temperature: {
		meanHue: Metric;
		temp: Metric;
		areaTemp: Metric;
	};
}

/**
 * Result type for {@link temparature}.
 */
export interface TemperatureResult {
	/**
	 * Hue-based histogram (up to 12 bins), each item: `[hue, count]` (all
	 * normalized).
	 */
	hues: [number, number][];
	/**
	 * Normalized weighted mean hue, based on histogram distribution.
	 */
	meanHue: number;
	/**
	 * Normalized abstract color temperature (see {@link hueTemperature}) based
	 * on weighted {@link TemperatureResult.meanHue}. Red/orange/yellow hues
	 * produce results close to 1.0, cyan/blue/purple hues produce results
	 * closer to -1.0.
	 */
	temp: number;
	/**
	 * {@link TemperatureResult.temp} weighted by {@link TemperatureResult.area}
	 */
	areaTemp: number;
	/**
	 * Normalized area (percentage) of the filtered (sufficiently) saturated
	 * colors which were used to compute the histogram & temperature.
	 */
	area: number;
}

export interface FeatureAnalysisResult {
	imgEdge: FloatBuffer;
	imgSobelX: FloatBuffer;
	imgSobelY: FloatBuffer;

	edge: number;
	sobel: number;
	sobelX: number;
	sobelY: number;
}
