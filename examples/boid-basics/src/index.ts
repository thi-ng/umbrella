import type { Nullable } from "@thi.ng/api";
import {
	alignment,
	cohesion,
	defBoid2,
	defFlock,
	separation,
	wrap2,
	type Boid,
	type BoidOpts,
} from "@thi.ng/boids";
import { isMobile } from "@thi.ng/checks";
import { multiCosineGradient } from "@thi.ng/color";
import { circle, group } from "@thi.ng/geom";
import { HashGrid2 } from "@thi.ng/geom-accel/hash-grid";
import { weightedRandom } from "@thi.ng/random";
import { $canvas } from "@thi.ng/rdom-canvas";
import { fromRAF } from "@thi.ng/rstream";
import { defTimeStep } from "@thi.ng/timestep";
import { repeatedly } from "@thi.ng/transducers";
import { distSq2, randMinMax2, randNorm2 } from "@thi.ng/vectors";

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const PAD = -40;
// screen bounds min/max
const BMIN = [PAD, PAD];
const BMAX = [WIDTH - PAD, HEIGHT - PAD];

// derive number of boids from screen resolution
const NUM = isMobile() ? 500 : 800;

// setup spatial indexing structure. this should be used for the boid sim (and
// here also for our rendering) to efficiently find neighbors.
const ACCEL = new HashGrid2<Boid>((x) => x.pos.prev, 64, NUM);

// alternatively we can use a dummy acceleration impl
// const ACCEL = noAccel();

// boid behavior options
const OPTS: BoidOpts = {
	accel: ACCEL,
	behaviors: [separation(40, 1.2), alignment(80, 0.5), cohesion(80, 0.8)],
	// max speed (per second)
	maxSpeed: 50,
	// optional constraint (here to keep boids within screen bounds)
	constrain: wrap2(BMIN, BMAX),
};

// max radius for neighbor queries
const MAX_RADIUS = 50;

// pre-compute color gradient
const gradient = multiCosineGradient({
	num: MAX_RADIUS + 1,
	stops: [
		[0.2, [0.8, 1, 1]],
		[0.4, [0.8, 1, 0.7]],
		[0.6, [1, 0.7, 0.1]],
		[1, [0.6, 0, 0.6]],
	],
});

// setup time-based simulation (with defaults)
const sim = defTimeStep();

// initialize the flock of boids (also available for 3D)
// see: https://docs.thi.ng/umbrella/boids/classes/Flock.html
const flock = defFlock(ACCEL, [
	...repeatedly(
		// spawn each boid at a random pos & direction inside the screen bounds
		// in this example all boids share the same behavior (but don't have to...)
		// also pick random max speed for each boid
		() =>
			defBoid2(
				randMinMax2([], BMIN, BMAX),
				randNorm2([], OPTS.maxSpeed),
				{
					...OPTS,
					maxSpeed: weightedRandom([20, 50, 100], [1, 4, 2])(),
				}
			),
		NUM
	),
]);

// requestAnimationFrame based animation/simulation
const scene = fromRAF({ timestamp: true }).map((t) => {
	// update all boids for the required number of time steps
	// (see https://thi.ng/timestep for details of the sim approach)
	sim.update(t, [flock]);
	// return a shape representations of the boids as a group of circles, with
	// each circle's color based on the above multi-color gradient and the
	// distance to the nearest neighbor.
	return group({ __background: "#112", stroke: "none", fill: "none" }, [
		...flock.boids.map((boid) => {
			const pos = boid.pos.value;
			// let radius = 4;
			let radius = MAX_RADIUS;
			// find neighbors with the query radius around current pos
			const neighbors = boid.neighbors(radius, pos);
			if (neighbors.length > 1) {
				// find distance to closest neighbor
				let closest: Nullable<Boid>;
				let minD = MAX_RADIUS ** 2;
				for (let n of neighbors) {
					if (n === boid) continue;
					const d = distSq2(pos, n.pos.value);
					if (d < minD) {
						closest = n;
						minD = d;
					}
				}
				if (closest) radius = Math.sqrt(minD);
			}
			// create a circle with its color based on current radius
			// (which itself is constantly changing based on neighbor distances)
			return circle(boid.pos.value, radius / 2, {
				fill: gradient[Math.min(radius | 0, MAX_RADIUS)],
			});
		}),
	]);
});

// create reactive canvas component, subscribed to above scene stream
$canvas(scene, [WIDTH, HEIGHT], { id: "main" }).mount(
	document.getElementById("app")!
);
