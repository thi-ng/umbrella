// SPDX-License-Identifier: Apache-2.0
import type { Fn2 } from "@thi.ng/api";
import type { HSV, Oklch, SRGB } from "@thi.ng/color";
import type { FloatBuffer } from "@thi.ng/pixel";
import type { DominantColor } from "@thi.ng/pixel-dominant-colors";
import type { DEFAULT_TEMPERATURE_COEFFS } from "./hues.js";

/**
 * 2-tuple representing a closed [min,max] value range/interval
 */
export type Range = [number, number];

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

/**
 * Result data structure returned by {@link analyzeColors}.
 */
export interface ColorAnalysisResult {
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
	hue: {
		/**
		 * Normalized mean hue (using circular mean).
		 */
		mean: number;
		/**
		 * Min/max HSV hue range of dominant colors. IMPORTANT: In case of
		 * circular overflow (360 => 0 degrees), the min hue WILL be greater
		 * than the max hue (e.g. a hue range of `[0.8, 0.2]` indicates the hue
		 * range from magenta -> orange). Also see {@link ColorAnalysisResult.hue.mean}.
		 */
		range: Range;
		/**
		 * Circular standard deviation of normalized hues.
		 */
		sd: number;
	};
	sat: {
		/**
		 * Mean saturation
		 */
		mean: number;
		/**
		 * Min/max HSV saturation range of dominant colors
		 */
		range: Range;
		/**
		 * Standard deviation of normalized saturation.
		 */
		sd: number;
	};
	luma: {
		/**
		 * Mean luminance
		 */
		mean: number;
		/**
		 * Min/max luminance range of dominant colors (obtained from SRGB)
		 */
		range: Range;
		/**
		 * Standard deviation of normalized luminance.
		 */
		sd: number;
	};
	/**
	 * Min/max luminance range of entire grayscale image (obtained from SRGB)
	 */
	lumaRangeImg: Range;
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
	 * Luminance contrast of entire grayscale image (i.e. delta of
	 * {@link ColorAnalysisResult.lumaRangeImg}).
	 */
	contrastImg: number;
	/**
	 * Max. normalized WCAG color contrast of dominant colors. The original WCAG
	 * result range [1,21] is rescaled to [0,1].
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
