import type { Fn2 } from "@thi.ng/api";
import type { KMeansOpts } from "@thi.ng/k-means";
import { kmeans } from "@thi.ng/k-means/kmeans";
import type { FloatBuffer } from "./float";

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
 * See thi.ng/k-means for details about clustering implementation & options.
 *
 * @param img
 * @param num
 * @param opts
 */
export const dominantColors = (
    img: FloatBuffer,
    num: number,
    opts: Partial<DominantColorOpts> = {}
) => {
    const n = img.width * img.height;
    const mapped: Float32Array[] = [];
    const filter = opts.filter || (() => true);
    for (let i = 0, j = 0, s = img.stride; i < n; i++, j += s) {
        const p = img.pixels.subarray(j, j + s);
        if (filter(p, i)) mapped.push(p);
    }
    if (!mapped.length) return [];
    return kmeans(Math.min(num, mapped.length), mapped, opts)
        .sort((a, b) => b.items.length - a.items.length)
        .map((c) => ({ color: [...c.centroid], area: c.items.length / n }));
};
