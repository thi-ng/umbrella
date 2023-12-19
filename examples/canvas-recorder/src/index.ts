import { adaptDPI } from "@thi.ng/canvas";
import { canvasRecorder } from "@thi.ng/dl-asset";
import { group, text } from "@thi.ng/geom";
import { draw } from "@thi.ng/hiccup-canvas";
import { button, canvas, div } from "@thi.ng/hiccup-html";
import { SYSTEM, pickRandom } from "@thi.ng/random";
import { $compile } from "@thi.ng/rdom";
import { reactive } from "@thi.ng/rstream";
import { consume, repeatedly2d } from "@thi.ng/transducers";
import { addN2, divNI2, maddN2, setN2 } from "@thi.ng/vectors";
import type { AlterDefinition, State } from "./api";
import { PALETTES } from "./palettes";
import { SENTENCES } from "./sentences";
import { SYMBOLS } from "./symbols";

// random number generator to use
const RND = SYSTEM;
// const RND = new XsAdd(0xdecafbad);

// FPS for recording
const FPS = 12;

// global state (see api.ts for details)
let state: State;

// Initializes state and stops any possibly active recording. Kind of like p5
// setup(), setting constants and launching the first frame
const init = () => {
	if (state) {
		stopRecording();
		cancelAnimationFrame(state.timer);
	}

	// obtain canvas DOM element and adjust size based on current devicePixelRatio
	const canvas = <HTMLCanvasElement>document.getElementById("main");
	adaptDPI(canvas, window.innerWidth, window.innerHeight - 50);

	// define all grid params:
	// see https://thi.ng/vectors readme for info about various vector functions used here

	const cellSize = RND.minmaxInt(24, 72);
	// margin as uniform 2d vector
	const margin = setN2([], RND.minmaxInt(20, 100));
	// usable bounds (canvas size minus 2x margin)
	// (madd is multiply-add = a * b + c)
	const bounds = maddN2([], margin, -2, [canvas.width, canvas.height]);
	// grid resolution (2d integer division)
	const gridRes = divNI2([], bounds, cellSize);
	const [cols, rows] = gridRes;
	// remaining pixels to distribute: bounds - gridRes * cellSize
	const remainder = maddN2([], gridRes, -cellSize, bounds);
	// offset position of 1st grid cell: margin + remainder/2 + cellSize/2
	const offset = addN2([], maddN2([], remainder, 0.5, margin), cellSize / 2);

	// Choose a random sentence
	const sentence = pickRandom(SENTENCES, RND);
	// Same thing for symbols
	const symbols = pickRandom(SYMBOLS, RND);
	// Again but for color
	const palette = pickRandom(PALETTES, RND);

	// Initialize grid (aka array of thi.ng/geom text elements)
	// each item's actual position will be (re)computed during update()
	const grid = [
		...repeatedly2d(
			(x, y) =>
				text([0, 0], sentence[(x * rows * y) % sentence.length], {
					fill: "white",
				}),
			cols,
			rows
		),
	];

	// initial grid modification spec (will be randomized later)
	const alterDef: AlterDefinition = {
		dir: true,
		sel: "x",
		x: 1,
		y: -1,
		char: "|",
		color: "white",
	};

	// Let's define the entire state for future reference
	state = {
		alterDef,
		bounds,
		cellSize,
		cols,
		ctx: canvas.getContext("2d")!,
		frame: 0,
		grid,
		offset,
		palette,
		rows,
		sentence,
		symbols,
		timer: -1,
	};
	// draw first frame
	update();
};

// draw loop
const update = () => {
	// destructure state (convenience only)
	const {
		alterDef,
		cellSize,
		cols,
		ctx,
		frame,
		grid,
		offset,
		palette,
		rows,
		sentence,
		symbols,
	} = state;

	// You can also record the sketch programatically, when a specific number of
	// frame is reached stop the recorder You have to add `startRecording()`
	// after init() (near the end of this file) AND uncomment the line below:
	// if (frame === fps * 120) stopRecording();

	// trigger change at each interval
	if (frame % 600 === 0) {
		alterDef.char = sentence;
		alterDef.color = "white";
	}

	if (frame % 250 === 0) {
		alterDef.sel = alterDef.sel === "x" ? "y" : "x";
		alterDef.color = pickRandom(palette, RND);
	}

	if (frame % 400 === 0) {
		if (RND.probability(0.5)) {
			alterDef.char = pickRandom(symbols, RND);
			alterDef.color = pickRandom(palette, RND);
		} else {
			if (symbols.includes(alterDef.char) || sentence === alterDef.char) {
				alterDef.char = RND.probability(0.5) ? "_" : "|";
			} else {
				alterDef.char = alterDef.char === "_" ? "|" : "_";
			}
		}
	}

	if (frame % 450 === 0 && RND.probability(0.5)) {
		alterDef.dir = !alterDef.dir;
		alterDef.color = pickRandom(palette, RND);
	}

	// randomly modify grid
	state.frame++;
	alterDef.x = alterDef.sel === "x" ? RND.minmaxInt(0, cols) : -1;
	alterDef.y = alterDef.sel === "y" ? RND.minmaxInt(0, rows) : -1;
	alterGrid(alterDef);

	// re-compute positions of all text elements: this code structure is
	// essentially a nested 2D loop over all grid cells and assigns updated
	// positions to each grid item. the use of `consume()` is needed, since
	// `repeatedly2d()` itself is lazy...
	consume(
		repeatedly2d(
			(x, y) => maddN2(grid[x * rows + y].pos, [x, y], cellSize, offset),
			cols,
			rows
		)
	);

	// Draw all characters
	draw(
		ctx,
		group(
			{
				__background: "#111",
				font: `${cellSize}px monospace`,
				align: "center",
				baseline: "middle",
			},
			grid
		)
	);

	state.timer = requestAnimationFrame(update);
};

// A function for updating the grid, pushing in new elements and removing excess
// ones (the grid must always have the same number of characters)
const alterGrid = (def: AlterDefinition) => {
	const { dir, x, y, char, color } = def;
	const { cols, rows, frame, grid } = state;
	const newItem = text([0, 0], char[frame % char.length], {
		fill: color,
	});
	if (x >= 0) {
		if (dir) {
			// push top
			grid.splice(x * rows, 0, newItem);
			grid.splice((x + 1) * rows, 1);
		} else {
			// push bottom
			grid.splice((x + 1) * rows, 0, newItem);
			grid.splice(x * rows, 1);
		}
	} else if (y >= 0) {
		if (dir) {
			// push left
			for (let x = cols; x >= 0; x--) {
				grid[x * rows + y] = grid[(x - 1) * rows + y];
			}
			grid[y] = newItem;
		} else {
			// push right
			for (let x = 0; x < cols; x++) {
				grid[x * rows + y] = grid[(x + 1) * rows + y];
			}
			grid[rows * (cols - 1) + y] = newItem;
		}
	}
	// truncate grid array if needed
	if (grid.length > cols * rows) grid.length = cols * rows;
};

// Reactive state flag to indicate if recording is currently enabled (some UI
// components will subscribe to this value)
let isRecording = reactive(false);

// function to trigger canvas recording (if not yet active)
const startRecording = () => {
	if (isRecording.deref()) return;
	state.recorder = canvasRecorder(
		state.ctx.canvas,
		"undetermined-type-grid",
		{
			mimeType: "video/webm;codecs=vp8",
			fps: FPS,
		}
	);
	state.recorder.start();
	isRecording.next(true);
	console.log("%c Record started ", "background: tomato; color: white");
};

// function to stop canvas recording (if active)
const stopRecording = () => {
	if (!isRecording.deref()) return;
	state.recorder!.stop();
	isRecording.next(false);
	console.log("%c Record stopped ", "background: limegreen; color: black");
};

// compile & mount UI/DOM
$compile(
	div(
		{},
		// canvas element will be resized via init() function
		canvas("#main"),
		// buttons to control canvas recording
		div(
			{},
			button(
				{
					// reactive attribute to toggle disabled state of this button
					disabled: isRecording,
					onclick: startRecording,
					title: "Record",
				},
				"⏺️ Record"
			),
			button(
				{
					// reactive attribute to toggle disabled state of this button
					disabled: isRecording.map((x) => !x),
					onclick: stopRecording,
					title: "Stop",
				},
				"⏹️ Stop and download"
			)
		)
	)
).mount(document.getElementById("app")!);

// kick off
init();

// if you want to start recording the sketch from the beginning
// uncommment the line below:
// startRecording();

// reset state/config when window resizes
window.onresize = init;
