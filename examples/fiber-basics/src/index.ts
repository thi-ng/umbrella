import { colorFromRange, setAlpha, srgb } from "@thi.ng/color";
import { downloadCanvas } from "@thi.ng/dl-asset";
import { curve } from "@thi.ng/dsp";
import { Fiber, fiber, untilPromise, wait } from "@thi.ng/fibers";
import { Group, group, rect, text } from "@thi.ng/geom";
import { draw } from "@thi.ng/hiccup-canvas";
import { button, canvas, div } from "@thi.ng/hiccup-html";
import { roundTo } from "@thi.ng/math";
import { SYSTEM } from "@thi.ng/random";
import { $compile } from "@thi.ng/rdom";
import { cycle, range, symmetric, zip } from "@thi.ng/transducers";

const SIZE = 640;
const NUM = 5;
const W = SIZE / NUM;
const SNAP = 16;

// main animation co-routine, repeatedly spawing new toplevel column cells
const cellAnim = (scene: Group, delay: number) =>
	function* main(ctx: Fiber) {
		// infinite loop over [0..5) interval
		for (let x of cycle(range(NUM))) {
			// each cell as its own child process
			ctx.fork(
				cell(scene, x * W, 0, W, SIZE, SYSTEM.float() < 0.5, 0.05)
			);
			yield* wait(delay);
		}
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
		).take(alpha.length >> 1);
		// loop to grow/shrink and fade out rect
		for (let [a, hh] of zip(alpha, symmetric(height))) {
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
			if (h >= 100 && w > SNAP && SYSTEM.float() < 0.2) {
				// half width
				const w2 = w / 2;
				// spawn as child process of cell's parent process (aka main anim)
				ctx.parent!.fork(
					cell(
						scene,
						x + (SYSTEM.int() % Math.floor(W / w2)) * w2,
						roundTo(SYSTEM.float(SIZE), SNAP),
						w2,
						roundTo(SYSTEM.minmax(0.1, 0.5) * h, SNAP),
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

// fiber to repeatedly draw given scene group to canvas
function* endFrame(canvas: HTMLCanvasElement, scene: Group) {
	const ctx = canvas.getContext("2d")!;
	while (true) {
		draw(ctx, scene);
		draw(
			ctx,
			text([10, 20], `${scene.children.length + 4} fibers`, {
				font: "12px sans-serif",
				fill: "#000",
			})
		);
		yield;
	}
}

// create main fiber and later attach sub-processes
const app = fiber(function* (ctx) {
	// wait for DOM creation
	yield* untilPromise(
		$compile(
			div(
				{},
				canvas("#main.db.mv3", { width: SIZE, height: SIZE }),
				button(
					{
						onclick: () =>
							downloadCanvas(main, `scene-${Date.now()}`),
					},
					"export"
				)
			)
		).mount(document.getElementById("app")!)
	);

	// get canvas ref
	const main = <HTMLCanvasElement>document.getElementById("main");
	// geometry group/container
	const scene = group({ __background: "#dcc" });

	// init child processes to create & draw animation
	ctx.forkAll(beginFrame(scene), cellAnim(scene, 400), endFrame(main, scene));

	// wait for children to complete (here: infinite)
	yield* ctx.join();
});

// kick-off
app.run();
