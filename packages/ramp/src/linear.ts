import { fit, norm } from "@thi.ng/math/fit";
import type { Vec } from "@thi.ng/vectors";
import type { Frame, RampImpl, RampOpts, VecAPI } from "./api.js";
import { Ramp } from "./ramp.js";

/**
 * Syntax sugar for creating a numeric {@link Ramp} using the {@link LINEAR_N}
 * ramp linear interpolation impl and given stops (aka keyframes, minimum 2
 * required).
 *
 * @remarks
 * For vector-valued linear ramps, use {@link ramp} with {@link LINEAR_V}.
 *
 * @param stops
 * @param opts
 */
export const linear = (stops: Frame<number>[], opts?: Partial<RampOpts>) =>
	new Ramp(LINEAR_N, stops, opts);

export const LINEAR_N: RampImpl<number> = {
	min: (acc, x) => Math.min(acc ?? Infinity, x),
	max: (acc, x) => Math.max(acc ?? -Infinity, x),
	at: (stops, i, t) => {
		const a = stops[i];
		const b = stops[i + 1];
		return fit(t, a[0], b[0], a[1], b[1]);
	},
};

/**
 * Vector version of {@link LINEAR_N}. Use with any of the supplied vector APIs:
 * {@link VEC} (arbitrary size), {@link VEC2}, {@link VEC3} or {@link VEC4}.
 *
 * @param vec
 */
export const LINEAR_V = <T extends Vec>(vec: VecAPI): RampImpl<T> => ({
	min: (acc, x) => <T>vec.min(acc, acc || vec.vecOf(Infinity), x),
	max: (acc, x) => <T>vec.max(acc, acc || vec.vecOf(-Infinity), x),
	at: (stops, i, t) => {
		const a = stops[i];
		const b = stops[i + 1];
		return <T>vec.mixN([], a[1], b[1], norm(t, a[0], b[0]));
	},
});
