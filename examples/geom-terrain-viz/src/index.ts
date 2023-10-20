import type { Nullable } from "@thi.ng/api";
import { download, downloadCanvas } from "@thi.ng/dl-asset";
import { asSvg, group, polyline, svgDoc } from "@thi.ng/geom";
import { fit } from "@thi.ng/math";
import {
	FLOAT_GRAY,
	GAUSSIAN,
	convolveImage,
	defSampler,
	floatBufferFromImage,
	imagePromise,
	type FloatSampler,
} from "@thi.ng/pixel";
import { $canvas } from "@thi.ng/rdom-canvas";
import { fromIterable, reactive } from "@thi.ng/rstream";
import { map, range } from "@thi.ng/transducers";
import { madd2, type ReadonlyVec } from "@thi.ng/vectors";

// Image sourced from USGS (https://earthexplorer.usgs.gov/)
import IMG from "./n46_w123_1arc_v3-crop2.jpg";

// canvas size
const WIDTH = 1280;
const HEIGHT = 720;
// elevation scale
const ELEVATION = 250;
// Y tilt/stretch
const YTILT = ELEVATION / 4;
// sample every N pixel cols/rows (fractional step sizes supported!)
const XSTEP = 1;
const YSTEP = 1;
// flip view flag (flip coordinates, for DEMs this means view from north)
const FLIP = true;
// gaussian blur radius
const BLUR = 2;
// terrain color
const STROKE = "#557";

// function to sample a pixel row from the image and transform into a polyline.
// the pixel values are read via given sampler (which we'll later configure to
// use bicubic interpolation) and therefore can use fractional positions (in
// both X & Y directions)
const polylineFromPixels = (
	sampler: FloatSampler,
	width: number,
	y: number,
	screenPos: ReadonlyVec,
	screenScale: ReadonlyVec,
	stepX = 1
) =>
	polyline(
		map(
			(x) =>
				// sample image to obtain Y position, then scale & translate to
				// configure screenspace
				madd2(
					null,
					[x, sampler(x, y)[0] - 0.5],
					screenScale,
					screenPos
				),
			range(0, width, stepX)
		)
	);

// function to clip/segment given polyline vertices against an existing horizon
// line we will use screenspace coordinates (with -Y as the up axis). the
// polyline will be split into segments whenever it crosses the horizon and only
// segments above the horizon are kept. the function also computes & returns the
// new horizon for future (re)use.
const hiddenPolyline = (pts: ReadonlyVec[], horizon: ReadonlyVec[]) => {
	const res: ReadonlyVec[][] = [];
	const newHorizon: ReadonlyVec[] = [];
	let newSeg = true;
	for (let i = 0, n = pts.length; i < n; i++) {
		const p = pts[i];
		const h = horizon[i];
		// check if P is above horizon (-Y up)
		if (p[1] <= h[1]) {
			if (newSeg) {
				res.push(i > 0 ? [horizon[i - 1]] : []);
				newSeg = false;
			}
			res[res.length - 1].push(p);
			// update horizon using P's position
			newHorizon.push(p);
		} else {
			// P is below horizon...
			// if still an active above-horizon segment, close it
			if (!newSeg) {
				res[res.length - 1].push(h);
				newSeg = true;
			}
			// keep current horizon position
			newHorizon.push(h);
		}
	}
	return { segments: res, newHorizon };
};

// main function is only async to simplify image loading via promises
(async () => {
	// create an empty group to store geometry (the bg color attrib is only used
	// for canvas drawing)
	const scene = group({ __background: "#fdc" });
	// create a reactive wrapper for the scene
	const geo = reactive(scene);
	// create a reactive canvas to subscribe to `geo` and handle automatic re-drawing
	const canvas = <HTMLCanvasElement>(
		await $canvas(geo, [WIDTH, HEIGHT]).mount(
			document.getElementById("app")!
		)
	);
	// load image, convert to grayscale floating point image buffer
	let img = floatBufferFromImage(await imagePromise(IMG), FLOAT_GRAY);
	// optionally blur the image with a bit of gaussian blur to reduce noise/jitter
	// see https://thi.ng/pixel readme for alternatives
	img = convolveImage(img, { kernel: GAUSSIAN(BLUR) });
	// create a bicubic image sampler (to allow sampling at fractional positions)
	const sampler = defSampler(img, "cubic", "repeat");
	// precompute scaling vector from image space to screen space
	const SCALE = [(WIDTH / img.width) * (FLIP ? -1 : 1), -ELEVATION];
	// variable to hold the evolving horizon line (vertices only)
	let horizon: Nullable<ReadonlyVec[]>;
	// create a timesliced stream of Y positions to sample the image we also add
	// a subscription to process this stream of values, each time processing a
	// single pixel row and adding the resulting geometry to the scene (and
	// updating the canvas)
	fromIterable(range(1, img.height, YSTEP), { delay: 16 }).subscribe({
		// subscription handler which is called for each new value
		next(y) {
			// compute Y position in screen space
			const screenY = fit(y, img.height, 0, -YTILT, HEIGHT + YTILT);
			// sample pixel row and create polyline
			// (taking FLIP config into account to adjust params)
			const line = polylineFromPixels(
				sampler,
				img.width,
				FLIP ? y : img.height - y,
				[FLIP ? WIDTH : 0, screenY],
				SCALE,
				XSTEP
			);
			// if we've got already a horizon (i.e. not 1st frame),
			// clip the new line and update the horizon...
			if (horizon) {
				const { segments, newHorizon } = hiddenPolyline(
					line.points,
					horizon
				);
				horizon = newHorizon;
				// create polylines for each resulting segment and wrap into a
				// group node
				const row = group(
					{ stroke: STROKE },
					segments.map((pts) => polyline(pts))
				);
				// add to main group
				scene.add(row);
				// send to canvas (which is subscribed to the `geo` stream)
				geo.next(row);
			} else {
				// in first frame merely record the sampled points as initial horizon
				horizon = line.points;
			}
		},
		// subscription handler which is called when the stream is exhausted/done
		// (i.e. in this case when the range() iterator is finished)
		done() {
			const baseName = `terrain-${Date.now()}`;
			// convert geometry to SVG & download
			download(baseName + `.svg`, asSvg(svgDoc({}, scene)));
			// also download canvas (by default as PNG)
			downloadCanvas(canvas, baseName);
		},
	});
})();
