import type { IBoidAccel } from "./api.js";
import type { Boid } from "./boid.js";

/**
 * Dummy {@link IBoidAccel} implementation (i.e does no spatial indexing and
 * always processes _all_ boids).
 *
 * @remarks
 * Due to no incurred overhead for (re)constructing the acceleration structure,
 * for low numbers of boids this can actually be more efficient than using a
 * `HashGrid` (from thi.ng/geom-accel package).
 */
export const noAccel = (): IBoidAccel => {
	let boids: Boid[];
	return {
		build($boids) {
			boids = $boids;
		},
		queryNeighborhood(neighborhood) {
			for (let b of boids) neighborhood.consider(b.pos.curr, b);
			return neighborhood;
		},
	};
};
