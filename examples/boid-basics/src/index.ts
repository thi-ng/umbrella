import type { Nullable } from "@thi.ng/api";
import { defBoid2, type Boid, type BoidOpts } from "@thi.ng/boids";
import { multiCosineGradient } from "@thi.ng/color";
import { circle, group } from "@thi.ng/geom";
import { HashGrid2 } from "@thi.ng/geom-accel/hash-grid";
import { fitClamped } from "@thi.ng/math";
import { $canvas } from "@thi.ng/rdom-canvas";
import { fromRAF } from "@thi.ng/rstream";
import { defTimeStep } from "@thi.ng/timestep";
import { repeatedly } from "@thi.ng/transducers";
import { clamp2, distSq2, randMinMax2, randNorm2 } from "@thi.ng/vectors";

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const PAD = 10;
// screen bounds min/max
const BMIN = [PAD, PAD];
const BMAX = [WIDTH - PAD, HEIGHT - PAD];

// boid behavior options
const BEHAVIOR: Partial<BoidOpts> = {
	// min distance to enforce to neighbors
	minDist: 30,
	// max distance to consider for neighbors
	maxDist: 80,
	// force multiplier
	maxForce: 2,
	// max speed (per second)
	maxSpeed: 50,
	// sub-behavior weights/importance
	// change to prioritize/de-emphasize
	alignment: 1,
	cohesion: 0.1,
	separation: 2,
	// optional constraint (here to keep boids within screen bounds)
	constrain: (p) => clamp2(p, p, BMIN, BMAX),
};

// derive number of boids from screen resolution
const NUM = fitClamped(WIDTH * HEIGHT, 640 * 480, 1440 * 810, 500, 1000) | 0;
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
// setup spatial indexing structure. this is needed by the boid sim (and here
// also for our rendering) to efficiently find neighbors.
const grid = new HashGrid2<Boid>((x) => x.pos.curr, 32, NUM);
// setup time-based simulation (with defaults)
const sim = defTimeStep();
// initialize the array of boids (also available for 3D)
const boids = [
	...repeatedly(
		// spawn each boid at a random pos & direction inside the screen bounds
		// in this example all boids share the same behavior (but don't have to...)
		() =>
			defBoid2(
				grid,
				randMinMax2([], BMIN, BMAX),
				randNorm2([]),
				BEHAVIOR
			),
		NUM
	),
];

// requestAnimationFrame based animation/simulation
const scene = fromRAF({ timestamp: true }).map((t) => {
	// rebuild the spatial index (using current boid positions)
	grid.build(boids);
	// update all boids for the required number of timesteps
	// (see https://thi.ng/timestep for details of the sim approach)
	sim.update(t, boids);
	// return a shape representations of the boids as a group of circles, with
	// each circle's color based on the above multi-color gradient and the
	// distance to the nearest neighbor.
	return group(
		{ __background: "#112" },
		// transform the boids into shapes...
		boids.map((x) => {
			const pos = x.pos.value;
			let radius = MAX_RADIUS;
			// find neighbors with the query radius around current pos
			const neighbors = x.neighbors(radius, pos);
			if (neighbors.length > 1) {
				// find distance to closest neighbor
				let closest: Nullable<Boid>;
				let minD = Infinity;
				for (let n of neighbors) {
					if (n === x) continue;
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
			return circle(x.pos.value, radius / 2, {
				fill: gradient[Math.min(radius | 0, MAX_RADIUS)],
			});
		})
	);
});

// create reactive canvas component, subscribed to above scene stream
$canvas(scene, [WIDTH, HEIGHT]).mount(document.getElementById("app")!);
