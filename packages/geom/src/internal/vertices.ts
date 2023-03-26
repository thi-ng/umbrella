// thing:export
import { isNumber } from "@thi.ng/checks/is-number";
import type { Attribs } from "@thi.ng/geom-api";
import { DEFAULT_SAMPLES, type SamplingOpts } from "@thi.ng/geom-api/sample";
import { TAU } from "@thi.ng/math/api";

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
): number | Partial<SamplingOpts> | undefined => {
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
