// SPDX-License-Identifier: Apache-2.0
import type { Range1_24 } from "@thi.ng/api";
import type { ITensor, ITensor1 } from "./api.js";
import { cdf } from "./cdf.js";
import { defOpT } from "./defopt.js";
import { ensureShape } from "./errors.js";
import { findIndex } from "./find.js";
import { mulN } from "./muln.js";
import { tensor } from "./tensor.js";

/**
 * Computes the histogram of given uint-based tensor. Returns histogram as a 1D
 * tensor of `u32` values. The `depth` param defines the value range (as number
 * of bits) of the input values (max. 24 bits). The optional `mask` and `shift`
 * params are used to transform input values like so: `(x >>> shift) & mask`.
 * This allows extracting sub-ranges from a packed integer representation (e.g.
 * indidivual color channels from a pixel buffer).
 *
 * @remarks
 * Also see {@link equalizeHistogram} and {@link applyLUT}.
 *
 * @example
 * ```ts tangle:../export/histogram-uint.ts
 * import { histogramUint, tensor } from "@thi.ng/tensors";
 *
 * const src = tensor("u8", [3,3], { data: [12,4,4, 16,16,32, 64,48,4] });
 *
 * // compute histogram with input value range = 8 bits
 * const hist = histogramUint(src, 8);
 *
 * console.log(hist.data);
 * // Uint8Array(256) [
 * //   0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
 * //   2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
 * //   1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
 * //   1, 0, 0, 0, 0, 0, 0 ...
 * // ]
 * ```
 *
 * @param src
 * @param depth
 * @param mask
 * @param shift
 */
export const histogramUint = (
	src: ITensor,
	depth: Range1_24,
	mask = (1 << depth) - 1,
	shift = 0
) => {
	const histType =
		src.length < 0x100 ? "u8" : src.length < 0x10000 ? "u16" : "u32";
	const histogram = tensor(histType, [1 << depth]);
	if (src.dim > 1) src = src.reshape([src.length]);
	const {
		offset: oa,
		shape: [sa],
		stride: [ta],
		data: adata,
	} = src;
	for (let i = 0; i < sa; i++)
		histogram.data[(adata[oa + i * ta] >>> shift) & mask]++;
	return histogram;
};

/**
 * Takes a 1D tensor containing a histogram (e.g. obtained via
 * {@link histogramUint}) and applies histogram equalization by first
 * normalizing the histogram, computing its cumulative distribution (via
 * {@link cdf}), determining the used min/max input value range and then
 * rescaling values to produce a lookup table (LUT) for remapping input values
 * via {@link applyLUT}.
 *
 * @remarks
 * References:
 *
 * - https://en.wikipedia.org/wiki/Histogram_equalization
 *
 * @param out
 * @param src
 * @param depth
 * @param numSamples
 * @param threshold
 */
export const equalizeHistogram = (
	out: ITensor1 | null,
	src: ITensor1,
	depth: number,
	numSamples: number,
	threshold = 0
) => {
	!out && (out = src);
	ensureShape(out, src.shape);
	const norm = mulN(tensor("f64", [src.length]), src, 1 / numSamples);
	const $cdf = cdf(null, norm);
	const lo = findIndex($cdf, (x) => x > threshold);
	if (lo < 0) return out.fill(0);
	const {
		offset: oc,
		shape: [sc],
		stride: [tc],
		data: cdata,
	} = $cdf;
	const {
		offset: oo,
		stride: [to],
		data: odata,
	} = out;
	const base = cdata[oc + lo * tc];
	const scale = (2 ** depth - 1) / (cdata[oc + (sc - 1) * tc] - base);
	for (let i = 0; i < sc; i++) {
		odata[oo + i * to] = Math.max(0, scale * (cdata[oc + i * tc] - base));
	}
	return out;
};

/**
 * Applies given lookup table to `a` and writes results to `out`. I.e. `out[i] =
 * lut[a[i]]`. This is intended as last step of a histogram equalization process
 * to transform `a` via applying the histogram obtained via
 * {@link equalizeHistogram}.
 *
 * @param out
 * @param a
 * @param lut
 */
export const applyLUT = (out: ITensor | null, a: ITensor, lut: ITensor1) => {
	!out && (out = a);
	ensureShape(out, a.shape);
	const {
		offset: ol,
		stride: [tl],
		data: ldata,
	} = lut;
	return defOpT((x) => ldata[ol + x * tl])(<any>out, <any>a);
};
