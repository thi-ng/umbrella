import { canvas2d } from "@thi.ng/canvas";
import { downloadCanvas } from "@thi.ng/dl-asset";
import { fiber, timeSlice } from "@thi.ng/fibers";
import { mix } from "@thi.ng/math";
import { mulV23 } from "@thi.ng/matrices";
import { FLOAT_GRAY, floatBuffer } from "@thi.ng/pixel";
import { weightedRandom } from "@thi.ng/random";

// render config
const W = 720;
const H = 1280;
const SCALE = 120;
const EXPOSURE = 1e-3;
const OX = W * 0.45;
const OY = H * 0.025;

// construct a function which when called, each time returns a
// randomly selected (with weights) 2x3 2D transformation matrix
const pickTransform = weightedRandom(
	// matrices & weights for classic Barnsley fern fractal (column order):
	// https://en.wikipedia.org/wiki/Barnsley_fern
	[
		[0, 0, 0, 0.16, 0, 0],
		[0.85, -0.04, 0.04, 0.85, 0, 1.6, 0.85],
		[0.2, 0.23, -0.26, 0.22, 0, 1.6],
		[-0.15, 0.26, 0.28, 0.24, 0, 0.44],
	],
	// matrix probabilities/weights (don't need to sum up to 1.0)
	[0.01, 0.85, 0.07, 0.07]
);

// create & attach canvas DOM element
const { canvas } = canvas2d(W, H, document.body);

// create single channel floating point pixel buffer
// (using floats results in a much more detailed result image)
const img = floatBuffer(W, H, FLOAT_GRAY);

// infinite IFS fractal generator
function* ifs() {
	let pos = [0, 0];
	while (true) {
		// compute next point by transforming current point
		// with a randomly selected matrix:
		// - the `mulV()` function performs matrix-vector multiplication
		// - the `null` arg means mutate point/vector arg in place
		mulV23(null, pickTransform(), pos);
		// compute index in pixel buffer
		const idx = img.indexAt(pos[0] * SCALE + OX, pos[1] * SCALE + OY);
		// expose pixel if not out-of-bounds
		if (idx >= 0) img.data[idx] = mix(img.data[idx], 1, EXPOSURE);
		// wait for next iteration
		yield;
	}
}

// converts & copies pixels to canvas
function* render() {
	while (true) {
		img.blitCanvas(canvas);
		// wait for next frame
		yield;
	}
}

// wrap & launch processes as fibers:
// - timeSlice() wraps the IFS process such that it executes as many times
//   as possible within the ~16ms per fiber update cycle
// - the render function is only executed once per frame...
fiber().run().forkAll(timeSlice(ifs, 16), render);

// download current frame on keypress
window.addEventListener("keydown", (e) => {
	if (e.key === "x") downloadCanvas(canvas, "ifs-" + Date.now());
});
