import type { Fn2, NumericArray } from "@thi.ng/api";
import type { KMeansOpts } from "@thi.ng/k-means";
import { kmeans } from "@thi.ng/k-means/kmeans";
import type { FloatBuffer } from "@thi.ng/pixel/float";

/**
 * Options for {@link dominantColors}, an extension of
 * [KMeansOpts](https://docs.thi.ng/umbrella/k-means/interfaces/KMeansOpts.html).
 */
export interface DominantColorOpts extends KMeansOpts {
	/**
	 * Predicate used to only include pixels in the analysis for which the
	 * filter returns truthy result. E.g. to pre-exclude weakly saturated or
	 * dark colors etc. The second arg is the index of the pixel in the image's
	 * pixel buffer.
	 *
	 * If omitted, all pixels will be included (default).
	 */
	filter: Fn2<Float32Array, number, boolean>;
}

/**
 * Takes a {@link FloatBuffer} and applies k-means clustering to extract the
 * `num` dominant colors from the given image. The clustering can be configured
 * via optionally provided `opts`. Returns array of `{ color, area }` objects
 * (sorted by descending area), where `color` is a cluster's dominant color and
 * `area` the normalized cluster size.
 *
 * @remarks
 * This function is syntax sugar for {@link dominantColorsArray}.
 *
 * See thi.ng/k-means for details about clustering implementation & options.
 *
 * @param img -
 * @param num -
 * @param opts -
 */
export const dominantColors = (
	img: FloatBuffer,
	num: number,
	opts?: Partial<DominantColorOpts>
) => {
	const samples: Float32Array[] = [];
	const filter = opts?.filter || (() => true);
	let i = 0;
	for (let p of img) {
		if (filter(p, i)) samples.push(p);
		i++;
	}
	return samples.length ? dominantColorsArray(num, samples, opts) : [];
};

/**
 * Similar to {@link dominantColors}, but accepting an array of color samples
 * instead of a `FloatBuffer` image.
 *
 * @param num
 * @param samples
 * @param opts
 */
export const dominantColorsArray = (
	num: number,
	samples: NumericArray[],
	opts?: Partial<KMeansOpts>
) =>
	kmeans(Math.min(num, samples.length), samples, opts)
		.sort((a, b) => b.items.length - a.items.length)
		.map((c) => ({
			color: [...c.centroid],
			area: c.items.length / samples.length,
			ids: c.items,
		}));
