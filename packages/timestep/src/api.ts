/**
 * Interface for participating in the {@link TimeStep.update} logic.
 */
export interface IUpdatable {
	/**
	 * Main update function for this simulation state. Receives timestep and
	 * current time (both in seconds). 1st phase of the update cycle.
	 *
	 * @remarks
	 * Implementations must perform the following tasks:
	 *
	 * - backup current state (e.g copy to a `previous` field/var)
	 * - compute new state based on current state (using `dt`)
	 * - set current state to newly computed state
	 *
	 * @remarks
	 * The current time `t` is only provided for information. Most update logic
	 * will (and should) only require the timestep arg `dt`.
	 *
	 * @param dt
	 * @param t
	 */
	integrate(dt: number, t: number): void;
	/**
	 * Final stage of the update cycle. The `alpha` arg is the tween factor to
	 * use for interpolating between the backed up `previous` state and the
	 * current state.
	 *
	 * @remarks
	 * The aforementioned `previous` / `current` state values are never to be
	 * used directly. Only the interpolated value(s) computed by this function
	 * should be used for rendering (or other external) purposes.
	 *
	 * @param alpha
	 * @param t
	 */
	interpolate(alpha: number, t: number): void;
}

export interface TimeStepOpts {
	/**
	 * Timestep (in seconds)
	 *
	 * @defaultValue 1/60
	 */
	dt: number;
	/**
	 * Start time (see {@link TimeStepOpts.scale}).
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
	/**
	 * Scale factor used to convert timestamp values to seconds, i.e. those
	 * timestamps passed via {@link TimeStepOpts.startTime} and those as
	 * argument given to {@link TimeStep.update}. The default assumes these
	 * value are in milliseconds.
	 *
	 * @defaultValue 0.001
	 */
	scale: number;
}

export type StateUpdate<T> = (curr: T, dt: number, now: number) => T;

export type StateInterpolation<T> = (
	prev: T,
	curr: T,
	alpha: number,
	now: number
) => T;
