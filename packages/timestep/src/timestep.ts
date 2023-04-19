import type { IUpdatable, TimeStepOpts } from "./api.js";

export class TimeStep {
	current = 0;
	start: number;
	dt: number;
	maxFrameTime: number;
	scale: number;

	accumulator = 0;
	frame = 0;
	updates = 0;

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
	}

	/**
	 * Updates internal time to given new time `now` (in seconds) and performs
	 * the required number of fixed timesteps to integrate and interpolate the
	 * given `state` values.
	 *
	 * @remarks
	 * If `interpolate` is false, the {@link IUpdatable.interpolate} phase of
	 * the update cycle is skipped. This is useful when using this setup to
	 * simulate sub-steps (e.g. in XPBD) and only requiring the interpolation
	 * stage for the last step.
	 *
	 * @param now
	 * @param items
	 * @param interpolate
	 */
	update(now: number, items: IUpdatable[], interpolate = true) {
		now = now * this.scale - this.start;
		if (this.current < 0) this.current = now;
		this.accumulator += Math.min(now - this.current, this.maxFrameTime);
		this.current = now;
		const n = items.length;
		const dt = this.dt;
		while (this.accumulator >= dt) {
			for (let i = 0; i < n; i++) items[i].integrate(dt, now);
			this.accumulator -= dt;
			this.updates++;
		}
		if (interpolate) {
			const alpha = this.accumulator / dt;
			for (let i = 0; i < n; i++) items[i].interpolate(alpha, now);
		}
		this.frame++;
	}
}

export const defTimeStep = (opts?: Partial<TimeStepOpts>) => new TimeStep(opts);
