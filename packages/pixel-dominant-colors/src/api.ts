// SPDX-License-Identifier: Apache-2.0
import type { Fn2, NumericArray } from "@thi.ng/api";

/**
 * Options for {@link dominantColors}, an extension of
 * [KMeansOpts](https://docs.thi.ng/umbrella/k-means/interfaces/KMeansOpts.html).
 */
export interface DominantColorOpts {
	/**
	 * Predicate used to only include pixels in the analysis for which the
	 * filter returns truthy result. E.g. to pre-exclude weakly saturated or
	 * dark colors etc. The second arg is the index of the pixel in the image's
	 * pixel buffer.
	 *
	 * If omitted, all pixels will be included (default).
	 */
	filter: Fn2<NumericArray, number, boolean>;
}

/**
 * Result type for dominant color extraction functions
 */
export interface DominantColor {
	/**
	 * RGB tuple
	 */
	color: number[];
	/**
	 * Normalized area (based on number of samples)
	 */
	area: number;
	/**
	 * Sample IDs (indices) belonging to this cluster.
	 */
	items?: number[];
}
