export interface IUpdatable {
	integrate(dt: number, t: number): void;
	interpolate(alpha: number, t: number): void;
}

export interface TimestepOpts {
	/**
	 * Timestep (in seconds)
	 *
	 * @defaultValue 1/60
	 */
	dt: number;
	/**
	 * Start time (in seconds)
	 *
	 * @defaultValue 0
	 */
	startTime: number;
	/**
	 * Max. frame duration (in seconds)
	 *
	 * @defaultValue 1/4
	 */
	maxFrameTime: number;
}

export type StateUpdate<T> = (curr: T, dt: number, now: number) => T;

export type StateInterpolation<T> = (
	prev: T,
	curr: T,
	alpha: number,
	now: number
) => T;
