import { kmeans, KMeansOpts } from "@thi.ng/k-means";
import type { FloatBuffer } from "./float";

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
    opts?: Partial<KMeansOpts>
) => {
    const n = img.width * img.height;
    const mapped: Float32Array[] = [];
    for (let i = 0, j = 0, s = img.stride; i < n; i++, j += s) {
        mapped.push(img.pixels.subarray(j, j + s));
    }
    return kmeans(num, mapped, opts)
        .sort((a, b) => b.items.length - a.items.length)
        .map((c) => ({ color: [...c.centroid], area: c.items.length / n }));
};
