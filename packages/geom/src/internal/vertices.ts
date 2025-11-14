// SPDX-License-Identifier: Apache-2.0
// thing:export
import type { Maybe } from "@thi.ng/api";
import { isNumber } from "@thi.ng/checks/is-number";
import { DEFAULT_SAMPLES } from "@thi.ng/geom-resample/api";
import { TAU } from "@thi.ng/math/api";
import type { ReadonlyVec } from "@thi.ng/vectors";
import type { Attribs, HiccupPathSegment, SamplingOpts } from "../api.js";

/** @internal */
export const __circleOpts = (
	opts: number | Partial<SamplingOpts>,
	r: number
): [number, number, boolean] =>
	isNumber(opts)
		? [opts, 0, false]
		: [
				opts.theta
					? Math.floor(TAU / opts.theta)
					: opts.dist
					? Math.floor(TAU / (opts.dist / r))
					: opts.num || DEFAULT_SAMPLES,
				(opts.start || 0) * TAU,
				opts.last === true,
		  ];

/**
 * @param opts
 * @param attribs
 *
 * @internal
 */
export const __sampleAttribs = (
	opts?: number | Partial<SamplingOpts>,
	attribs?: Attribs
): Maybe<number | Partial<SamplingOpts>> => {
	if (attribs) {
		const val = attribs.__samples;
		return isNumber(opts)
			? isNumber(val)
				? val
				: { num: opts, ...val }
			: isNumber(val)
			? { ...opts, num: val }
			: { ...opts, ...val };
	}
	return opts;
};

export const __hiccupLineSegment = (
	a: ReadonlyVec,
	b: ReadonlyVec
): HiccupPathSegment =>
	a[0] === b[0] ? ["V", b[1]] : a[1] === b[1] ? ["H", b[0]] : ["L", b];
