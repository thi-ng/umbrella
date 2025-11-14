// SPDX-License-Identifier: Apache-2.0
import { css, srgb } from "@thi.ng/color";
import {
	circle,
	fitIntoBounds2,
	group,
	points,
	Points,
	rect,
} from "@thi.ng/geom";
import { mix } from "@thi.ng/math";
import { SYSTEM, XsAdd } from "@thi.ng/random";
import { $compile } from "@thi.ng/rdom";
import { $canvas } from "@thi.ng/rdom-canvas";
import { fromInterval } from "@thi.ng/rstream";
import { repeatedly } from "@thi.ng/transducers";
import { TSNE } from "@thi.ng/tsne";

const SIZE = Math.min(window.innerWidth, window.innerHeight);
const NUM = 1000;

// const SEED = SYSTEM.int();
const SEED = 1214937047;
console.log(SEED);

// deterministic PRNG instance
const RND = new XsAdd(SEED);

// create array of random RGB colors and radii
const colors = [
	...repeatedly(() => {
		const col = srgb.random(RND);
		return <any[]>[css(col), col, RND.float()];
	}, NUM),
];
// initialize t-SNE solver
const tsne = new TSNE(
	// convert each color entry into a 4D point (r,g,b,radius)
	colors.map((row) => [...row[1], row[2]]),
	{
		// use our seeded PRNG for deterministic results
		// (uncomment or use `SYSTEM` to use `Math.random()`-based impl)
		rnd: RND,
		// primary clustering param, but highly dependent on dataset
		// usual values in [5,50] range - experiment!
		perplexity: 10,
		// point adjustment rate (lower values = smoother changes)
		rate: 100,
		// t-SNE is a 2-stage process, this param controls the number of
		// iterations for the first pass
		searchIter: 200,
		// stop solver after N iterations
		maxIter: 5000,
		// initial gradient scale (a tweened, time-based param)
		gradientScale: {
			start: 1,
			end: 1,
			iter: 100,
		},
	}
);

// reactive stream which stops after configured number of frames.
// the initial `fromInterval()` stream is just a counter used to update the
// t-SNE solver and generate new geometry for visualization. further down, the
// reactive canvas component will then subscribe to this transformed stream and
// draw the received geometry...
const sim = fromInterval(16, { num: tsne.opts.maxIter }).map(() => {
	// update solver
	tsne.update();
	// extract 2D coords from each 4D point and fit to canvas size
	const pts = <Points>fitIntoBounds2(
		// create point cloud of extracted 2D coords
		points(tsne.points.map((p) => [p[0], p[1]])),
		// target bounding rect (i.e. canvas size minus padding)
		rect([10, 10], SIZE - 20)
	);
	// create a group of circles, each using current t-SNE position and
	// pre-configured color & size
	return group(
		{ __background: "#fff" },
		pts.points.map((p, i) =>
			circle(p, mix(3, 10, colors[i][2]), { fill: colors[i][0] })
		)
	);
});

// create reactive canvas subscribed to our `sim`
// (will automatically redraw when new geometry is received...)
$compile($canvas(sim, [SIZE, SIZE])).mount(document.getElementById("app")!);
