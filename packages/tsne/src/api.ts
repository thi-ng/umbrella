import type { IRandom } from "@thi.ng/random";
import type { DistanceFn } from "@thi.ng/vectors";

/**
 * {@link TSNE} configurations options. Also see {@link DEFAULT_OPTS} for
 * defaults.
 */
export interface TSNEOpts {
	rnd: IRandom;
	dist: DistanceFn;
	perplexity: number;
	rate: number;
	eps: number;
	maxIter: number;
	searchIter: number;
	minGain: number;
	momentum: TweenParam;
	gradientScale: TweenParam;
	gainDecay: number;
	gainBias: number;
}

/**
 * Time-based param with `start` and `end` values
 */
export interface TweenParam {
	start: number;
	end: number;
	iter: number;
}
