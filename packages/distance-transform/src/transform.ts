import type { IGrid2D, NumericArray } from "@thi.ng/api";
import type { DTMetric } from "./api.js";
import { EUCLEDIAN } from "./metric.js";

/**
 * Takes an {@link IGrid2D} and transforms it into a distance field using the
 * provided distance metric (default: {@link EUCLEDIAN}). Any non-zero values in
 * the input grid are used as seed locations for the distance field. Returns a
 * plain `Float32Array` of distance values. If `normalize` is > 0 (default: 1),
 * the result values will be normalized to the [0,normalize] interval.
 *
 * @remarks
 * The returned array will always be tightly packed, regardless of strides given
 * in input grid.
 *
 * Based on: "A general algorithm for computing Distance Transforms in linear
 * time", A. Meijster, J.B.T.M. Roerdink and W.H. Hesselink,
 *
 * Reference: http://www.cs.rug.nl/~roe/publications/dt.pdf
 *
 * @example
 * ```ts
 * // this example uses functionality from these packages:
 * // - thi.ng/pixel
 * // - thi.ng/random
 *
 * // create image with 100 random pixels set
 * const img = intBuffer(256, 256, GRAY8);
 * for(let i = 0; i < 100; i++) {
 *   img.setAt(SYSTEM.int() % img.width, SYSTEM.int() % img.height, 255);
 * }
 *
 * // compute distance field (aka voronoi)
 * const dt = distanceTransform(img, EUCLEDIAN);
 * // wrap as float pixel buffer
 * const dtImg = floatBuffer(img.width, img.height, FLOAT_GRAY, dt);
 * // ...and display
 * dtImg.blitCanvas(canvas2d(img.width, img.height, document.body).canvas);
 * ```
 *
 * @param grid -
 * @param metric -
 * @param normalize -
 */
export const distanceTransform = (
	{
		data: spix,
		size: [width, height],
		stride: [sx, sy],
		offset,
	}: IGrid2D<NumericArray, number>,
	{ dist, sep, post }: DTMetric = EUCLEDIAN,
	normalize = 1
) => {
	post = post || ((x) => x);
	const dest = new Float32Array(width * height);
	const g = new Uint32Array(width * height);
	const s = new Uint32Array(width);
	const t = new Uint32Array(width);
	const MAX = 0xffffffff;

	for (let x = 0; x < width; x++) {
		g[x] = spix[offset + x * sx] === 0 ? MAX : 0;
		for (let y = 1; y < height; y++) {
			const i = y * width + x;
			g[i] =
				spix[offset + y * sy + x * sx] === 0
					? Math.min(MAX, 1 + g[i - width])
					: 0;
		}
		for (let y = height - 1; y-- > 0; ) {
			const i = x + y * width;
			const q = g[i + width];
			q < g[i] && (g[i] = Math.min(MAX, 1 + q));
		}
	}

	let maxD = -Infinity;
	for (let y = 0; y < height; y++) {
		const I = y * width;
		let q = 0;
		s[0] = t[0] = 0;
		for (let u = 1; u < width; u++) {
			while (
				q >= 0 &&
				dist(t[q], s[q], g[I + s[q]]) > dist(t[q], u, g[I + u])
			)
				q--;
			if (q < 0) {
				q = 0;
				s[0] = u;
			} else {
				const w = 1 + sep(s[q], u, g[I + s[q]], g[I + u]);
				if (w < width) {
					q++;
					s[q] = u;
					t[q] = w;
				}
			}
		}
		for (let u = width; u-- > 0; ) {
			let d = (dest[u + I] = post(dist(u, s[q], g[I + s[q]])));
			d > maxD && (maxD = d);
			u === t[q] && q--;
		}
	}

	if (normalize > 0 && maxD > 1e-6) {
		maxD = normalize / maxD;
		for (let i = dest.length; i-- > 0; ) dest[i] *= maxD;
	}

	return dest;
};
