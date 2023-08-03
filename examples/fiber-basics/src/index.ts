import { colorFromRange, setAlpha, srgb } from "@thi.ng/color";
import { downloadCanvas } from "@thi.ng/dl-asset";
import { curve } from "@thi.ng/dsp";
import { Fiber, fiber, wait } from "@thi.ng/fibers";
import { Group, group, rect } from "@thi.ng/geom";
import { draw } from "@thi.ng/hiccup-canvas";
import { button, canvas, div } from "@thi.ng/hiccup-html";
import { roundTo } from "@thi.ng/math";
import { SYSTEM } from "@thi.ng/random";
import { $compile } from "@thi.ng/rdom";
import { concat, range, reverse, zip } from "@thi.ng/transducers";

const SIZE = 640;

// main animation co-routine, repeatedly spawing new toplevel column cells
const cellAnim = (scene: Group, delay = 500) =>
	function* main(ctx: Fiber) {
		const w = SIZE / 5;
		ctx.fork(function* () {
			for (let x = 0; ; x = (x + 1) % 5) {
				// each cell as its own child process
				ctx.fork(
					cell(scene, x * w, 0, w, SIZE, SYSTEM.float() < 0.5, 0.05)
				);
				yield* wait(delay);
			}
		});
		yield* wait();
	};

const cell = (
	scene: Group,
	x: number,
	y: number,
	w: number,
	h: number,
	isHoriz: boolean,
	ad: number
) =>
	function* (ctx: Fiber) {
		// random color
		const col = srgb(colorFromRange("warm"));
		// opacity fade
		const alpha = [...range(1, 0, -ad)];
		// growth curve
		const height = curve(
			0.5 * h,
			h,
			0.5 / ad,
			SYSTEM.float(),
			false,
			true
		).take(alpha.length / 2);
		// fade out loop
		for (let [a, hh] of zip(alpha, concat(height, reverse(height)))) {
			// add cell rect to scene
			scene.children.push(
				isHoriz
					? rect([y, x], [hh, w], {
							fill: setAlpha(col, col, a),
					  })
					: rect([x, y], [w, hh], {
							fill: setAlpha(col, col, a),
					  })
			);
			// recursively spawn smaller box w/ 20% chance
			if (h >= 100 && w > 10 && SYSTEM.float() < 0.2) {
				// half width
				const w2 = w >> 1;
				// spawn as child process of cell's parent process (aka main anim)
				ctx.parent!.fork(
					cell(
						scene,
						x + (SYSTEM.int() % Math.floor(128 / w2)) * w2,
						roundTo(SYSTEM.float(SIZE), 16),
						w2,
						roundTo(SYSTEM.minmax(0.1, 0.5) * h, 16),
						isHoriz,
						SYSTEM.minmax(0.5, 1) * ad
					)
				);
			}
			yield;
		}
	};

// fiber to clear given geometry group on each iteration
function* beginFrame(scene: Group) {
	while (true) {
		scene.children.length = 0;
		yield;
	}
}

// fiber repeatedly draw given scene group to canvas
function* endFrame(canvas: HTMLCanvasElement, scene: Group) {
	const ctx = canvas.getContext("2d")!;
	while (true) {
		draw(ctx, scene);
		yield;
	}
}

(async () => {
	// DOM creation
	await $compile(
		div(
			{},
			canvas({ id: "main", class: "db mv3", width: SIZE, height: SIZE }),
			button(
				{
					onclick: () => downloadCanvas(main, `scene-${Date.now()}`),
				},
				"export"
			)
		)
	).mount(document.getElementById("app")!);

	const main = <HTMLCanvasElement>document.getElementById("main");

	// geometry group/container
	const scene = group({ __background: "#dcc" });

	// create main fiber and attach sub-processes
	const app = fiber();
	// init child processes to create & draw animation
	app.forkAll(beginFrame(scene), cellAnim(scene, 400), endFrame(main, scene));
	// kick-off
	app.run();
})();
