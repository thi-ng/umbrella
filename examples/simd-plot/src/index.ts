import { align } from "@thi.ng/binary";
import { COSINE_GRADIENTS, cosineColor } from "@thi.ng/color";
import { violet } from "@thi.ng/colored-noise";
import { rect } from "@thi.ng/geom";
import { MemPool } from "@thi.ng/malloc";
import { fit23 } from "@thi.ng/matrices";
import { $canvas } from "@thi.ng/rdom-canvas";
import { fromRAF } from "@thi.ng/rstream";
import { init } from "@thi.ng/simd";
import { benchmark, map, movingAverage, normRange } from "@thi.ng/transducers";
import { Vec2, subN2 } from "@thi.ng/vectors";

// number of data points (must be a multiple of 4, explained further below)
const NUM_POINTS = align(10000, 4);

// cosmetics
const CANVAS_SIZE = [1280, 720];
const MARGIN = 100;
// color gradient preset to use
const GRAD = COSINE_GRADIENTS["heat1"];

// bounding box for data points
// (here only partially defined, will be updated each frame)
const dataBounds = rect([NUM_POINTS - 1, 0]);

// target screenspace bounding box for the plot
const screenBounds = rect([MARGIN, MARGIN], subN2([], CANVAS_SIZE, 2 * MARGIN));

// initialize SIMD WASM module with provided memory
const simd = init(
	new WebAssembly.Memory({
		// compute memory requirements as number of 64KB pages
		// (incl. some small extra scratch space for other data)
		initial: Math.ceil((NUM_POINTS * 2 * 4 + 32) / 0x10000),
	})
)!;

// use memory allocator/manager to avoid having to deal with manual address juggling
// for SIMD data buffers (a little overkill here, but good to know this exists...)
const pool = new MemPool({
	// use the WASM memory as backing buffer
	buf: simd.memory.buffer,
	// all blocks should be aligned to 16 bytes for SIMD purposes (vec4 = 16 bytes)
	align: 16,
});

// our fake infinite data source: a colored noise generator
// see: https://thi.ng/colored-noise for alternatives & details
const data = violet({ bins: 128 });

// allocate buffers via managed mem pool
const vertexBuffer = pool.mallocAs("f32", NUM_POINTS * 2)!;
// 2x3 2D transformation matrix
const viewMat = pool.mallocAs("f32", 6)!;

// pre-create geometry container (in thi.ng/hiccup format)
// the `$grad` is a reference to a gradient, defined later below
const line = [
	"polyline",
	{ stroke: "$grad", weight: 2 },
	// create memory mapped 2D vector views of underlying flat buffer
	// (many different striding options available, but not used here...)
	// https://docs.thi.ng/umbrella/vectors/classes/Vec2.html#mapBuffer
	Vec2.mapBuffer(vertexBuffer),
];

// alternative approach (only usable for canvas drawing, but NOT for shape
// processing with thi.ng/geom ops): here we pass the flat vertex buffer
// directly. see https://thi.ng/hiccup-canvas readme for details
const packedLine = [
	"packedPolyline",
	{ stroke: "$grad", weight: 2 },
	vertexBuffer,
];

// text label for FPS counter
const stats = ["text", { fill: "#fff" }, [10, 20], "sampling..."];

// linear gradient definition element
// again, see https://thi.ng/hiccup-canvas readme for details
const gradient = [
	"linearGradient",
	{
		id: "grad",
		from: [0, screenBounds.pos[1]],
		to: [0, screenBounds.max()[1]],
	},
	[...map((t) => [t, cosineColor(GRAD, 1 - t)], normRange(10))],
];

// main shape group containing all other elements
const scene: any[] = [
	"g",
	{ __background: "#112" },
	[
		gradient,
		// here you can choose/compare which of the two line containers to use
		// (only use one at a time though, they should look identical)
		// line,
		packedLine,
		stats,
	],
];

// consume values from (infinite) data source, update vertex buffer and compute
// new min/max value range
const updateVertices = (vertices: Float32Array, src: Iterator<number>) => {
	let min = Infinity;
	let max = -Infinity;
	for (let i = 0; i < NUM_POINTS; i++) {
		const value = src.next().value!;
		vertices[i << 1] = i;
		vertices[(i << 1) + 1] = value;
		min = Math.min(min, value);
		max = Math.max(max, value);
	}
	return [min, max];
};

// create stream of plot visualizations in hiccup format (see shape types above)
// the main aspect illustrated here is how we're essentially only dealing with
// the flat vertexBuffer array to animate/replace the plot data each frame...
const plot = fromRAF().map(() => {
	// update vertices
	const [min, max] = updateVertices(vertexBuffer, data);
	// updata data bounding rect
	dataBounds.pos[1] = min;
	dataBounds.size[1] = max - min;
	// compute transformation matrix to fit raw points into target screen region
	// store result in viewMat
	// (fit23() maps coordinates from a source rect to a destination rect)
	fit23(
		viewMat,
		// src rect pos & size
		dataBounds.pos,
		dataBounds.size,
		// dest rect pos & size
		screenBounds.pos,
		screenBounds.size
	);

	// perform SIMD matrix-vector batch multiplication, on the entire vertex
	// buffer (all NUM_POINTS at once), configured to update the data in-place
	// (on MBA M1 this transforms 10,000,000 2D points in 9ms)
	// this SIMD function operates on 2x 2D vectors (4 floats) in parallel
	// see: https://thi.ng/simd for many more similar batch operations

	// also worth noting here that SIMD *only* makes any sense on large data
	// batches and also that for this use case here the main bottleneck is the
	// actual drawing, but we're illustrating usage in principle here... :)
	simd.mul_m23v2_aos(
		vertexBuffer.byteOffset,
		viewMat.byteOffset,
		vertexBuffer.byteOffset,
		NUM_POINTS
	);

	// return scene group as result (for drawing)
	return scene;
});

// attach a subscription with transducers to compute a running average FPS & update label
plot.transform(benchmark(), movingAverage(100)).subscribe({
	next(x) {
		stats[3] = `${(1000 / x) | 0} fps (${NUM_POINTS} points)`;
	},
});

// reactive canvas component which also is subscribed to the plot and will redraw on-demand
$canvas(plot, CANVAS_SIZE, { id: "main" }).mount(document.body);

// btw. if you're using the MemPool to only allocate buffers only temporarily,
// you'll need to do house keeping: ALWAYS free allocated memory after use and
// don't use after freeing (just like in C)!
// see https://thi.ng/malloc readme for details

// pool.free(vertexBuffer);
// pool.free(viewMat);
