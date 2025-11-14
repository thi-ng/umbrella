// SPDX-License-Identifier: Apache-2.0
import type { Fn } from "@thi.ng/api";
import { computeCutWith } from "@thi.ng/k-means/mean-cut";
import type { FloatBuffer } from "@thi.ng/pixel/float";
import type { ReadonlyVec } from "@thi.ng/vectors";
import { mean, vmean } from "@thi.ng/vectors/mean";
import { vmedian } from "@thi.ng/vectors/median";
import type { DominantColor, DominantColorOpts } from "./api.js";
import { filterSamples } from "./utils.js";

export const dominantColorsMeanCut = (
	img: FloatBuffer | ReadonlyVec[],
	num: number,
	opts?: Partial<DominantColorOpts>
) => __dominantColors(vmean, img, num, opts);

export const dominantColorsMedianCut = (
	img: FloatBuffer | ReadonlyVec[],
	num: number,
	opts?: Partial<DominantColorOpts>
) => __dominantColors(vmedian, img, num, opts);

/** @internal */
const __dominantColors = (
	cut: Fn<ReadonlyVec, number>,
	img: FloatBuffer | ReadonlyVec[],
	num: number,
	opts?: Partial<DominantColorOpts>
) => {
	const samples = opts?.filter ? filterSamples(opts.filter, img) : [...img];
	return samples.length
		? computeCutWith(cut, samples, samples[0].length, num)
				.sort((a, b) => b.length - a.length)
				.map(
					(bin) =>
						<DominantColor>{
							color: mean([], bin),
							area: bin.length / samples.length,
						}
				)
		: [];
};
