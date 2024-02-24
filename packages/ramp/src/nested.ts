import type { RampImpl } from "./api.js";

export type NestedImpl<T extends Record<string, any>> = {
	[P in keyof T]: RampImpl<T[P]>;
};

/**
 * Higher order ramp implementation for nested (object based) values. The given
 * `children` object must specify a {@link RampImpl} for each key in the object.
 *
 * @remarks
 * Since this is only a {@link RampImpl}, all keys in the to-be-interpolated
 * objects will share the same keyframe times (specified in the parent
 * {@link ramp}). If a nested ramp is desired where each child can have its own
 * set of keyframes, please use {@link group} instead. Both of these concepts
 * are somewhat similar but satisfy different use cases.
 *
 * @example
 * ```ts
 * import { ramp, nested, LINEAR_N, HERMITE_N } from "@thi.ng/ramp";
 *
 * const example = ramp(
 *   // nested ramp spec w/ interpolation modes for each key
 *   nested({a: LINEAR_N, b: HERMITE_N }),
 *   // keyframes
 *   [
 *     [0, { a: 0, b: 1000 }],
 *     [100, { a: -10, b: 2000 }],
 *   ]
 * )
 *
 * example.at(25)
 * // { a: -2.5, b: 1156.25 }
 * ```
 *
 * @param children
 */
export const nested = <T extends Record<string, any>>(
	children: NestedImpl<T>
): RampImpl<T> => {
	const pairs = <[keyof T, RampImpl<any>][]>Object.entries(children);
	return {
		min: (acc, x) =>
			pairs.reduce((acc, [id, impl]) => {
				acc[id] = impl.min(acc[id], x[id]);
				return acc;
			}, acc || <T>{}),
		max: (acc, x) =>
			pairs.reduce((acc, [id, impl]) => {
				acc[id] = impl.max(acc[id], x[id]);
				return acc;
			}, acc || <T>{}),
		at: (stops, index, t) =>
			pairs.reduce((acc, [id, impl]) => {
				acc[id] = impl.at(
					stops.map((x) => [x[0], x[1][id]]),
					index,
					t
				);
				return acc;
			}, <T>{}),
	};
};
