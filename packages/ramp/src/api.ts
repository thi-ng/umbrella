import type { Fn2 } from "@thi.ng/api";

export type Frame<T> = [number, T];

export interface RampImpl<T> {
	min: Fn2<T | null, T, T>;
	max: Fn2<T | null, T, T>;
	at: (stops: Frame<T>[], index: number, t: number) => T;
}

export interface IReadonlyRamp<T> {
	/**
	 * Computes interpolated value at time `t`. Depending on implementation, `t`
	 * might first be processed using the ramp's time domain function.
	 *
	 * @remarks
	 * Also see {@link RampOpts.domain}.
	 *
	 * @param t
	 */
	at(t: number): T;
	/**
	 * Returns an iterator of `n` uniformly spaced samples of the time domain
	 * between the first and last keyframe. Each returned sample is a tuple of
	 * `[time, interpolatedValue]`.
	 *
	 * @param n
	 * @param start
	 * @param end
	 */
	samples(n?: number, start?: number, end?: number): Iterable<Frame<T>>;
	/**
	 * Computes the ramp's min/max time domain and value bounds.
	 *
	 * @remarks
	 * Also see {@link IReadonlyRamp.timeBounds}.
	 */
	bounds(): RampBounds<T>;
	/**
	 * Computes the ramp's min/max time bounds (i.e. the positions of the first
	 * & last keyframes/stops).
	 *
	 * @remarks
	 * Also see {@link IReadonlyRamp.bounds}.
	 */
	timeBounds(): [number, number];
}

export interface IRamp<T> extends IReadonlyRamp<T> {
	impl: RampImpl<T>;
	stops: Frame<T>[];

	setStopAt(t: number, y: T, eps?: number): boolean;
	removeStopAt(t: number, eps?: number): boolean;
	closestIndex(t: number, eps?: number): number;
	clampedIndexTime(i: number, t: number, eps?: number): number;
}

export interface RampOpts {
	/**
	 * Time domain mapping function, e.g. to achieve looping. See {@link clamp},
	 * {@link wrap}, {@link wrapInterval}.
	 *
	 * @remarks
	 * The domain function can be changed dynamically by setting the
	 * {@link Ramp.domain} property.
	 *
	 * @defaultValue {@link unconstrained}
	 */
	domain: RampDomain;
}

export interface RampBounds<T> {
	min: T;
	max: T;
	minT: number;
	maxT: number;
}

export type RampDomain = (t: number, min: number, max: number) => number;
