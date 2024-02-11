import { norm } from "@thi.ng/math/fit";
import { mix, mixCubicHermite, tangentCardinal } from "@thi.ng/math/mix";
import { map } from "@thi.ng/transducers/map";
import { normRange } from "@thi.ng/transducers/norm-range";
import type { Vec, VecAPI } from "@thi.ng/vectors";
import { mixHermiteCardinal } from "@thi.ng/vectors/mix-hermite";
import type { Frame, RampImpl } from "./api.js";
import { Ramp } from "./ramp.js";

/**
 * Syntax sugar for creating a numeric {@link Ramp} using the {@link HERMITE_N}
 * ramp hermite spline interpolation impl and given stops (aka keyframes,
 * minimum 2 required).
 *
 * @remarks
 * For vector-valued hermite ramps, use {@link ramp} with {@link HERMITE_V}.
 *
 * References:
 * - https://en.wikipedia.org/wiki/Cubic_Hermite_spline
 *
 * Also see:
 * - https://docs.thi.ng/umbrella/math/functions/mixCubicHermite.html
 * - https://docs.thi.ng/umbrella/math/functions/tangentCardinal.html
 *
 * @param stops
 */
export const hermite = (stops: Frame<number>[]) => new Ramp(HERMITE_N, stops);

export const HERMITE_N: RampImpl<number> = {
	min: (acc, x) => Math.min(acc ?? Infinity, x),
	max: (acc, x) => Math.max(acc ?? -Infinity, x),
	at: (stops, i, t) => {
		const n = stops.length - 1;
		const a = stops[Math.max(i - 1, 0)];
		const [bx, by] = stops[Math.max(i, 0)];
		const [cx, cy] = stops[Math.min(i + 1, n)];
		const d = stops[Math.min(i + 2, n)];
		const t1 = tangentCardinal(a[1], cy, 0, a[0], cx);
		const t2 = tangentCardinal(by, d[1], 0, bx, d[0]);
		return mixCubicHermite(by, t1, cy, t2, norm(t, bx, cx));
	},
	interpolate: {
		size: 4,
		left: 1,
		right: 1,
		fn: ([a, [bx, by], [cx, cy], d], res) => {
			const t1 = tangentCardinal(a[1], cy, 0, a[0], cx);
			const t2 = tangentCardinal(by, d[1], 0, bx, d[0]);
			return map(
				(t) => [mix(bx, cx, t), mixCubicHermite(by, t1, cy, t2, t)],
				normRange(res, false)
			);
		},
	},
};

export const HERMITE_V = <T extends Vec>(vec: VecAPI): RampImpl<T> => ({
	min: (acc, x) => <T>vec.min(acc, acc || vec.setN([], Infinity), x),
	max: (acc, x) => <T>vec.max(acc, acc || vec.setN([], -Infinity), x),
	at: (stops, i, t) => {
		const n = stops.length - 1;
		const [, a] = stops[Math.max(i - 1, 0)];
		const [bt, b] = stops[Math.max(i, 0)];
		const [ct, c] = stops[Math.min(i + 1, n)];
		const [, d] = stops[Math.min(i + 2, n)];
		return <T>mixHermiteCardinal([], a, b, c, d, norm(t, bt, ct), 0);
	},
	interpolate: {
		size: 4,
		left: 1,
		right: 1,
		fn: ([[, a], [bt, b], [ct, c], [, d]], res) =>
			map(
				(t) =>
					<Frame<T>>[
						mix(bt, ct, t),
						mixHermiteCardinal([], a, b, c, d, t, 0),
					],
				normRange(res, false)
			),
	},
});
