import { identity } from "@thi.ng/api";
import { timedResult } from "@thi.ng/bench";
import { knearest2 } from "@thi.ng/distance";
import { HashGrid2 } from "@thi.ng/geom-accel";
import { canvas } from "@thi.ng/hdom-canvas";
import { stratifiedGrid2 } from "@thi.ng/poisson";
import { XsAdd } from "@thi.ng/random";
import { CloseMode, StreamSync, sync, trigger } from "@thi.ng/rstream";
import { gestureStream } from "@thi.ng/rstream-gestures";
import { map, mapcat } from "@thi.ng/transducers";
import { updateDOM } from "@thi.ng/transducers-hdom";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const HASH_CELL_SIZE = 10;
const STRAT_CELL_SIZE = 8;
const K = 4;

// generate uniformly spaced points (see thi.ng/poisson)
const PTS = [
	...stratifiedGrid2({
		dim: [(WIDTH / STRAT_CELL_SIZE) | 0, (HEIGHT / STRAT_CELL_SIZE) | 0],
		scale: STRAT_CELL_SIZE,
		rnd: new XsAdd(0xdecafbad),
	}),
];

const app = (main: StreamSync<any, any>) => {
	// this example is just a derivation of the `geom-knn` example project
	// please see that exanple for more comments (which have been omitted here for brevity)
	const _canvas = {
		...canvas,
		init: (el: HTMLCanvasElement) =>
			main.add(gestureStream(el).transform(map((g) => g.pos)), "mpos"),
	};
	// initialize 1st point & store in tree for fast KNN searches
	const tree = new HashGrid2<ReadonlyVec>(identity, HASH_CELL_SIZE, 1e5);

	// return root component function, triggered by each new mouse / touch event
	return ({ mpos }: { mpos: Vec }) => {
		mpos = mpos || [WIDTH / 2, HEIGHT / 2];

		let [_, tbuild] = timedResult(() => tree.build(PTS));
		let [selected, t1] = timedResult(() =>
			tree
				.queryNeighborhood(knearest2<ReadonlyVec>(mpos, 2048, 256))
				.values()
		);
		// for each selected neighbor, perform another KNN search and
		// create line segments to each of these secondary matches
		// use `mapcat` to yield a flat array of lines
		let [neighbors, t2] = timedResult(() => [
			...mapcat(
				(p) =>
					tree
						.queryNeighborhood(
							knearest2<ReadonlyVec>(p, K, HASH_CELL_SIZE * 2)
						)
						.values()
						.map((q) => ["line", {}, p, q]),
				selected
			),
		]);
		return [
			"div.overflow-hidden.code.f7",
			[
				"div",
				`Build: ${tbuild | 0}ms `,
				`Points: ${PTS.length}, `,
				`Sel: ${selected.length}/${
					selected.length + neighbors.length
				}, `,
				`Neighbors: ${neighbors.length}, `,
				`Q1: ${t1 | 0}ms, Q2: ${t2 | 0}ms, `,
			],
			[
				_canvas,
				{
					width: WIDTH,
					height: HEIGHT,
					__diff: false,
					__normalize: false,
					id: "main",
				},
				// point cloud
				["points", { fill: "black", size: 2 }, PTS],
				// selected points
				["points", { fill: "rgba(0,192,255,0.5)", size: 5 }, selected],
				// secondary neighbor connection lines
				["g", { stroke: "rgba(0,0,0,0.25)" }, ...neighbors],
			],
		];
	};
};

const main = sync<any, any>({
	src: { _: trigger() },
	closeIn: CloseMode.NEVER,
});

main.transform(map(app(main)), updateDOM());
