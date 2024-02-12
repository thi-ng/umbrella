import { clamp as $clamp, wrap as $wrap } from "@thi.ng/math/interval";
import type { RampDomain } from "./api.js";

/**
 * Identity time domain function. Default for {@link RampOpts.domain}.
 * Passthrough, no-op.
 *
 * @param t
 */
export const unconstrained: RampDomain = (t) => t;

/**
 * Time domain function. Clamps given lookup time `t` to the parent
 * ramp's first & last keyframe times.
 */
export const clamp: RampDomain = $clamp;

/**
 * Time domain function. Wraps given lookup time `t` into the interval defined
 * by parent ramp's first & last keyframe times, thereby creating a looping
 * effect.
 */
export const wrap: RampDomain = $wrap;

/**
 * Higher-order time domain function and version of {@link wrap} to create a
 * looping effect using the given `min` & `max` keyframe times (instead of the
 * parent ramp's first/last keyframe times).
 */
export const wrapInterval =
	(min: number, max: number): RampDomain =>
	(t) =>
		$wrap(t, min, max);
