import {
	INotifyMixin,
	type Event,
	type INotify,
	type Listener,
} from "@thi.ng/api";
import {
	EVENT_FRAME,
	EVENT_INTEGRATE,
	type ITimeStep,
	type ReadonlyTimeStep,
	type TimeStepOpts,
} from "./api.js";

@INotifyMixin
export class TimeStep implements INotify {
	start: number;
	dt: number;
	maxFrameTime: number;
	scale: number;

	t = 0;
	current = 0;
	accumulator = 0;
	frame = 0;
	updates = 0;

	protected __eventIntegrate: Event;
	protected __eventFrame: Event;

	constructor(opts?: Partial<TimeStepOpts>) {
		const $opts = {
			dt: 1 / 60,
			maxFrameTime: 1 / 4,
			startTime: 0,
			scale: 1e-3,
			...opts,
		};
		this.dt = $opts.dt;
		this.maxFrameTime = $opts.maxFrameTime;
		this.scale = $opts.scale;
		this.start = $opts.startTime * this.scale;
		this.__eventIntegrate = Object.freeze({
			id: EVENT_INTEGRATE,
			target: this,
		});
		this.__eventFrame = Object.freeze({ id: EVENT_FRAME, target: this });
	}

	// @ts-ignore mixin
	addListener(id: string, fn: Listener, scope?: any): boolean {}
	// @ts-ignore mixin
	removeListener(id: string, fn: Listener, scope?: any): boolean {}
	// @ts-ignore mixin
	notify(event: Event): boolean {}

	/**
	 * Updates internal time to given new time `now` (given value will be scaled
	 * via {@link TimeStepOpts.scale}) and performs the required number of fixed
	 * timesteps to integrate and interpolate the given `state` values.
	 *
	 * @remarks
	 * If the scaled time difference since the last step is greater than
	 * {@link TimeStepOpts.maxFrameTime}, it will be limited to the latter.
	 *
	 * If `interpolate` is false, the {@link ITimeStep.interpolate} phase of the
	 * update cycle is skipped. This is useful when using this setup to simulate
	 * sub-steps (e.g. in XPBD) and only requiring the interpolation stage for
	 * the last step.
	 *
	 * @param now
	 * @param items
	 * @param interpolate
	 */
	update(now: number, items: ITimeStep[], interpolate = true) {
		now = now * this.scale - this.start;
		this.accumulator += Math.min(now - this.current, this.maxFrameTime);
		this.current = now;
		const n = items.length;
		const dt = this.dt;
		while (this.accumulator >= dt) {
			for (let i = 0; i < n; i++) items[i].integrate(dt, this);
			this.t += dt;
			this.accumulator -= dt;
			this.updates++;
			this.notify(this.__eventIntegrate);
		}
		if (interpolate) {
			const alpha = this.accumulator / dt;
			for (let i = 0; i < n; i++) items[i].interpolate(alpha, this);
		}
		this.frame++;
		this.notify(this.__eventFrame);
	}
}

export const defTimeStep = (opts?: Partial<TimeStepOpts>) => new TimeStep(opts);

/**
 * Calls {@link ITimeStep.integrate} for all given items (in given order).
 *
 * @param dt
 * @param ctx
 * @param items
 */
export const integrateAll = (
	dt: number,
	ctx: ReadonlyTimeStep,
	...items: ITimeStep[]
) => {
	for (let i = 0, n = items.length; i < n; i++) items[i].integrate(dt, ctx);
};

/**
 * Calls {@link ITimeStep.interpolate} for all given items (in given order).
 *
 * @param dt
 * @param ctx
 * @param items
 */
export const interpolateAll = (
	alpha: number,
	ctx: ReadonlyTimeStep,
	...items: ITimeStep[]
) => {
	for (let i = 0, n = items.length; i < n; i++)
		items[i].interpolate(alpha, ctx);
};
