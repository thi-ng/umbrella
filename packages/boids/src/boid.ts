import { identity } from "@thi.ng/api";
import type { IDistance } from "@thi.ng/distance";
import { DIST_SQ2, DIST_SQ3 } from "@thi.ng/distance/squared";
import type { ITimeStep, ReadonlyTimeStep } from "@thi.ng/timestep";
import { VectorState, defVector } from "@thi.ng/timestep/state";
import { integrateAll, interpolateAll } from "@thi.ng/timestep/timestep";
import type { ReadonlyVec, Vec, VecAPI } from "@thi.ng/vectors";
import { VEC2 } from "@thi.ng/vectors/vec2-api";
import { VEC3 } from "@thi.ng/vectors/vec3-api";
import type { BoidOpts, IBoidAccel, IBoidBehavior } from "./api.js";
import { blendedBehaviorUpdate } from "./behaviors/update.js";
import { Radial } from "./region.js";

export class Boid implements ITimeStep {
	pos: VectorState;
	vel: VectorState;

	api: VecAPI;
	accel: IBoidAccel;
	behaviors: IBoidBehavior[];
	region: Radial<Boid>;
	opts: BoidOpts;

	constructor(
		opts: BoidOpts,
		api: VecAPI,
		distance: IDistance<ReadonlyVec>,
		pos: Vec,
		vel: Vec
	) {
		this.api = api;
		this.opts = { maxForce: 1, ...opts };
		this.accel = this.opts.accel;
		this.behaviors = this.opts.behaviors;
		const update = this.opts.update || blendedBehaviorUpdate;
		const constrain = this.opts.constrain || identity;
		const { add, limit, maddN } = api;
		this.vel = defVector(api, vel, (vel) =>
			limit(vel, add(vel, vel, update(this)), this.opts.maxSpeed)
		);
		this.pos = defVector(api, pos, (pos, dt) =>
			constrain(maddN(pos, this.vel.curr, dt, pos), this)
		);
		this.region = new Radial<Boid>(distance, pos, 1);
	}

	/**
	 * Integration step of the thi.ng/timestep update cycle. See
	 * [`ITimeStep`](https://docs.thi.ng/umbrella/timestep/interfaces/ITimeStep.html)
	 *
	 * @param dt
	 * @param ctx
	 */
	integrate(dt: number, ctx: ReadonlyTimeStep): void {
		integrateAll(dt, ctx, this.vel, this.pos);
	}

	/**
	 * Interplation step of the thi.ng/timestep update cycle. See
	 * [`ITimeStep`](https://docs.thi.ng/umbrella/timestep/interfaces/ITimeStep.html)
	 *
	 * @param alpha
	 * @param ctx
	 */
	interpolate(alpha: number, ctx: ReadonlyTimeStep): void {
		interpolateAll(alpha, ctx, this.vel, this.pos);
	}

	/**
	 * Queries the spatial index for other boids in the current region, or if
	 * `pos` is given also moves the search region to new position before
	 * querying.
	 *
	 * @remarks
	 * IMPORTANT: The returned array will always contain the current boid itself
	 * too. Filtering has been left out here for performance reasons and is left
	 * to downstream code.
	 *
	 * @param r
	 * @param pos
	 */
	neighbors(r: number, pos?: Vec) {
		const region = this.region;
		if (pos) region.target = pos;
		region.setRadius(r);
		return this.accel.queryNeighborhood(region).deref();
	}

	steerTowards(target: ReadonlyVec, out: Vec = target) {
		return this.limitSteer(this.api.sub(out, target, this.pos.curr));
	}

	computeSteer(steer: Vec, num: number) {
		return this.limitSteer(
			num > 0 ? this.api.mulN(steer, steer, 1 / num) : steer
		);
	}

	limitSteer(steer: Vec) {
		const { limit, magSq, msubN } = this.api;
		const m = magSq(steer);
		return m > 0
			? limit(
					steer,
					msubN(
						steer,
						steer,
						this.opts.maxSpeed / Math.sqrt(m),
						this.vel.curr
					),
					this.opts.maxForce!
			  )
			: steer;
	}
}

/**
 * Returns a new {@link Boid} instance configured to use optimized 2D vector
 * operations.
 *
 * @param accel
 * @param pos
 * @param vel
 * @param opts
 */
export const defBoid2 = (pos: Vec, vel: Vec, opts: BoidOpts) =>
	new Boid(opts, VEC2, DIST_SQ2, pos, vel);

/**
 * Returns a new {@link Boid} instance configured to use optimized 3D vector
 * operations.
 *
 * @param accel
 * @param pos
 * @param vel
 * @param opts
 */
export const defBoid3 = (pos: Vec, vel: Vec, opts: BoidOpts) =>
	new Boid(opts, VEC3, DIST_SQ3, pos, vel);
