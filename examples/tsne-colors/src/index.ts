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

(async () => {
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
			rnd: RND,
			perplexity: 10,
			rate: 100,
			searchIter: 200,
			maxIter: 5000,
			gradientScale: {
				start: 1,
				end: 1,
				iter: 100,
			},
		}
	);

	const sim = fromInterval(16, { num: 5000 }).map(() => {
		// update solver
		tsne.update();
		// extract 2D coords from each 4D point and fit to canvas size
		const pts = <Points>(
			fitIntoBounds2(
				points(tsne.points.map((p) => [p[0], p[1]])),
				rect([10, 10], SIZE - 20)
			)
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
})();
