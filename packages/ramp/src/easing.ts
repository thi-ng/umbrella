import type { FnN } from "@thi.ng/api";
import { easeInOut5 } from "@thi.ng/math/easing";
import { norm } from "@thi.ng/math/fit";
import { mix } from "@thi.ng/math/mix";
import type { Vec } from "@thi.ng/vectors";
import type { Frame, RampImpl, RampOpts, VecAPI } from "./api.js";
import { Ramp } from "./ramp.js";

/**
 * Syntax sugar for creating a numeric {@link Ramp} using the {@link EASING_N}
 * ramp interpolation impl (supporting arbitrary easing functions), given
 * `stops` (aka keyframes, minimum 2 required) and options.
 *
 * @remarks
 * Easing functions remap time values in the [0,1] range. By default uses
 * [`easeInOut5()`](https://docs.thi.ng/umbrella/math/functions/easeInOut5.html).
 *
 * For vector-valued ramps, use {@link ramp} with {@link EASING_V}.
 *
 * @param stops
 * @param opts
 */
export const easing = (
	stops: Frame<number>[],
	opts?: Partial<RampOpts & { easing: FnN }>
) => new Ramp(EASING_N(opts?.easing), stops, opts);

/**
 * Higher-order ramp interpolation implementation supporting arbitrary `easing`
 * function to control keyframe interpolation.
 *
 * @remarks
 * Easing functions remap time values in the [0,1] range. By default uses
 * [`easeInOut5()`](https://docs.thi.ng/umbrella/math/functions/easeInOut5.html).
 *
 * @param easing
 */
export const EASING_N = (easing: FnN = easeInOut5): RampImpl<number> => {
	return {
		min: (acc, x) => Math.min(acc ?? Infinity, x),
		max: (acc, x) => Math.max(acc ?? -Infinity, x),
		at: (stops, i, t) => {
			const a = stops[i];
			const b = stops[i + 1];
			return mix(a[1], b[1], easing(norm(t, a[0], b[0])));
		},
	};
};

/**
 * Vector version of {@link EASING_N}. Use with any of the supplied vector APIs:
 * {@link VEC} (arbitrary size), {@link VEC2}, {@link VEC3} or {@link VEC4}.
 *
 * @remarks
 * Easing functions remap time values in the [0,1] range. By default uses
 * [`easeInOut5()`](https://docs.thi.ng/umbrella/math/functions/easeInOut5.html).
 *
 * @param vec
 * @param easing
 */
export const EASING_V = <T extends Vec>(
	vec: VecAPI,
	easing: FnN = easeInOut5
): RampImpl<T> => ({
	min: (acc, x) => <T>vec.min(acc, acc || vec.vecOf(Infinity), x),
	max: (acc, x) => <T>vec.max(acc, acc || vec.vecOf(-Infinity), x),
	at: (stops, i, t) => {
		const a = stops[i];
		const b = stops[i + 1];
		return <T>vec.mixN([], a[1], b[1], easing(norm(t, a[0], b[0])));
	},
});
