// SPDX-License-Identifier: Apache-2.0
import type { NumericArray } from "@thi.ng/api";
import type { KMeansOpts } from "@thi.ng/k-means";
import { kmeans } from "@thi.ng/k-means/kmeans";
import type { FloatBuffer } from "@thi.ng/pixel/float";
import type { DominantColor, DominantColorOpts } from "./api.js";
import { filterSamples } from "./utils.js";

/**
 * Takes a {@link FloatBuffer} and applies k-means clustering to extract the
 * `num` dominant colors from the given image. The clustering can be configured
 * via optionally provided `opts`. Returns array of `{ color, area }` objects
 * (sorted by descending area), where `color` is a cluster's dominant color and
 * `area` the normalized cluster size.
 *
 * @remarks
 * See thi.ng/k-means for details about clustering implementation & options.
 *
 * @param img -
 * @param num -
 * @param opts -
 */
export const dominantColorsKmeans = (
	img: FloatBuffer | NumericArray[],
	num: number,
	opts?: Partial<DominantColorOpts & KMeansOpts>
) => {
	const samples = opts?.filter
		? filterSamples(opts.filter, img)
		: Array.isArray(img)
		? img
		: [...img];
	return samples.length
		? kmeans(Math.min(num, samples.length), samples, opts)
				.sort((a, b) => b.items.length - a.items.length)
				.map(
					(c) =>
						<DominantColor>{
							color: [...c.centroid],
							area: c.items.length / samples.length,
							ids: c.items,
						}
				)
		: [];
};
