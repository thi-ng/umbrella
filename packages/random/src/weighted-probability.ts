import type { FnN } from "@thi.ng/api";
import type { IRandom } from "./api.js";
import { SYSTEM } from "./system.js";

/**
 * Takes a `weight` function and optional {@link IRandom} instance (default:
 * {@link SYSTEM}). The weight function accepts a number in [0,1) interval and
 * returns a number in [0,1]. Draws two random numbers `a` and `b` via
 * {@link IRandom.float} and returns a tuple of `[a, b < weight(a)]`.
 *
 * @example
 * ```ts tangle:../export/weighted-probability.ts
 * import { weightedProbability } from "@thi.ng/random";
 *
 * const [param, success] = weightedProbability((x) => x** 2);
 *
 * console.log(success ? "SUCCESS" : "FAIL", param);
 * ```
 *
 * @example
 * ```ts tangle:../export/weighted-probability-viz.ts
 * import { weightedProbability } from "@thi.ng/random";
 * import { barChartVStr } from "@thi.ng/text-canvas";
 * import {
 *     comp, filter, frequencies, map, repeatedly, transduce
 * } from "@thi.ng/transducers";
 *
 * // custom weighting function
 * const weight = (x: number) => Math.sin(x * Math.PI);
 *
 * // draw N samples (`[number, boolean]` tuples)
 * const samples = repeatedly(
 *     () => weightedProbability(weight),
 *     // number of samples
 *     1e6
 * );
 *
 * // binning helper for histogram
 * const bin = (x: number, n: number) => Math.floor(x * n) / n;
 *
 * // compute histogram, i.e. a Map of `bin => numSuccess` pairs
 * const histogram = transduce(
 *     // filter out failures, apply binning
 *     comp(filter(x => x[1]), map(x => bin(x[0], 40))),
 *     // collect histogram
 *     frequencies(),
 *     // input samples
 *     samples
 * );
 *
 * // visualize as ASCII art bar chart
 * console.log(
 *     barChartVStr(10, [...histogram].sort().map(x => x[1]))
 * );
 *
 * //               ▃▅▇████▇▅▃
 * //            ▂▆████████████▅▁
 * //          ▂▇████████████████▆▂
 * //         ▅████████████████████▆
 * //       ▃████████████████████████▃
 * //      ▆██████████████████████████▆
 * //    ▁██████████████████████████████▁
 * //   ▃████████████████████████████████▃
 * //  ▅██████████████████████████████████▅
 * // ▇████████████████████████████████████▇
 * ```
 *
 * @param weight
 * @param rnd
 */
export const weightedProbability = (
	weight: FnN,
	rnd: IRandom = SYSTEM
): [number, boolean] => {
	const a = rnd.float();
	const b = rnd.float();
	return [a, b < weight(a)];
};
