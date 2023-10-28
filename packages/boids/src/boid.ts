import { identity } from "@thi.ng/api";
import type { IDistance } from "@thi.ng/distance";
import { DIST_SQ2, DIST_SQ3 } from "@thi.ng/distance/squared";
import type {
	AHashGrid,
	HashGrid2,
	HashGrid3,
} from "@thi.ng/geom-accel/hash-grid";
import type { ITimeStep, ReadonlyTimeStep } from "@thi.ng/timestep";
import { VectorState, defVector } from "@thi.ng/timestep/state";
import { integrateAll, interpolateAll } from "@thi.ng/timestep/timestep";
import type { ReadonlyVec, Vec, VecAPI } from "@thi.ng/vectors";
import { addW4 } from "@thi.ng/vectors/addw";
import { VEC2 } from "@thi.ng/vectors/vec2-api";
import { VEC3 } from "@thi.ng/vectors/vec3-api";
import type { BoidOpts } from "./api.js";
import { Radial } from "./region.js";

export class Boid implements ITimeStep {
	pos: VectorState;
	vel: VectorState;
	opts: BoidOpts;
	region: Radial<Boid>;

	protected cachedNeighbors!: Boid[];

	protected tmpSep: Vec = [];
	protected tmpAlign: Vec = [];
	protected tmpCoh: Vec = [];

	constructor(
		public readonly accel: AHashGrid<Boid>,
		public readonly api: VecAPI,
		distance: IDistance<ReadonlyVec>,
		pos: Vec,
		vel: Vec,
		opts: Partial<BoidOpts>
	) {
		this.opts = {
			constrain: identity,
			maxSpeed: 10,
			maxForce: 1,
			minDist: 20,
			maxDist: 50,
			separation: 2,
			alignment: 1,
			cohesion: 1,
			...opts,
		};
		this.vel = defVector(api, vel, (vel) =>
			api.limit(
				vel,
				addW4(
					vel,
					vel,
					this.separate(),
					this.align(),
					this.cohesion(),
					1,
					this.opts.separation,
					this.opts.alignment,
					this.opts.cohesion
				),
				this.opts.maxSpeed
			)
		);
		this.pos = defVector(api, pos, (pos, dt) =>
			this.opts.constrain(api.maddN(pos, this.vel.curr, dt, pos))
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
		this.cachedNeighbors = this.neighbors(
			this.opts.maxDist,
			this.pos.value
		);
		integrateAll(dt, ctx, this.vel, this.pos);
	}

	/**
	 * Interplation step of the thi.ng/timestep update cycle. See
	 * [`ITimeStep`](https://docs.thi.ng/umbrella/timestep/interfaces/ITimeStep.html)
	 *
	 * @param dt
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

	protected separate() {
		const { maddN, magSq, setN, sub } = this.api;
		const pos = this.pos.value;
		const neighbors = this.neighbors(this.opts.minDist);
		const num = neighbors.length;
		const delta: Vec = [];
		const steer = setN(this.tmpSep, 0);
		let n: Boid;
		for (let i = 0; i < num; i++) {
			n = neighbors[i];
			if (n !== this) {
				sub(delta, pos, n.pos.curr);
				maddN(steer, delta, 1 / (magSq(delta) + 1e-6), steer);
			}
		}
		return this.computeSteer(steer, num);
	}

	protected align() {
		const { add, setN } = this.api;
		const neighbors = this.cachedNeighbors;
		const num = neighbors.length;
		const sum = setN(this.tmpAlign, 0);
		let n: Boid;
		for (let i = 0; i < num; i++) {
			n = neighbors[i];
			if (n !== this) add(sum, sum, n.vel.curr);
		}
		return this.computeSteer(sum, num);
	}

	protected cohesion() {
		const { add, mulN, setN } = this.api;
		const neighbors = this.cachedNeighbors;
		const num = neighbors.length;
		const sum = setN(this.tmpCoh, 0);
		let n: Boid;
		for (let i = 0; i < num; i++) {
			n = neighbors[i];
			if (n !== this) add(sum, sum, n.pos.curr);
		}
		return num > 0 ? this.steerTowards(mulN(sum, sum, 1 / num)) : sum;
	}

	protected steerTowards(target: ReadonlyVec, out: Vec = target) {
		return this.limitSteer(this.api.sub(out, target, this.pos.curr));
	}

	protected computeSteer(steer: Vec, num: number) {
		return this.limitSteer(
			num > 0 ? this.api.mulN(steer, steer, 1 / num) : steer
		);
	}

	protected limitSteer(steer: Vec) {
		const { limit, magSq, msubN } = this.api;
		const m = magSq(steer);
		return m > 0
			? limit(
					steer,
					msubN(
						steer,
						steer,
						this.opts.maxSpeed ** 2 / m,
						this.vel.curr
					),
					this.opts.maxForce
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
export const defBoid2 = (
	accel: HashGrid2<Boid>,
	pos: Vec,
	vel: Vec,
	opts: Partial<BoidOpts>
) => new Boid(accel, VEC2, DIST_SQ2, pos, vel, opts);

/**
 * Returns a new {@link Boid} instance configured to use optimized 3D vector
 * operations.
 *
 * @param accel
 * @param pos
 * @param vel
 * @param opts
 */
export const defBoid3 = (
	accel: HashGrid3<Boid>,
	pos: Vec,
	vel: Vec,
	opts: Partial<BoidOpts>
) => new Boid(accel, VEC3, DIST_SQ3, pos, vel, opts);
