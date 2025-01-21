// SPDX-License-Identifier: Apache-2.0
import { timed } from "@thi.ng/bench";
import { KdTreeSet } from "@thi.ng/geom-accel";
import {
	canvasFromPixelBuffer,
	FLOAT_GRAY,
	floatBufferFromImage,
	GRAY8,
	imageFromURL,
	intBuffer,
} from "@thi.ng/pixel";
import { samplePoisson } from "@thi.ng/poisson";
import IMG from "./beethoven.avif";

// load image and convert to normalized grayscale image
const { data, width } = floatBufferFromImage(
	await imageFromURL(IMG),
	FLOAT_GRAY
);
// pre-compute distances (and basic gamma correction)
for (let i = 0; i < data.length; i++) data[i] = 1 + data[i] ** 2 * 10;

// create result image & fill with white
const res = intBuffer(width, width, GRAY8);
res.fill(255);

// compute poisson-disk samples
const points = timed(() =>
	samplePoisson({
		// spatial index for neighborhood queries
		index: new KdTreeSet(2),
		// random point generator
		points: (rnd) => [rnd.float(width), rnd.float(width)],
		// use image data as density function
		density: (p) => data[(p[0] | 0) + (p[1] | 0) * width],
		// max points to generate
		max: 50000,
		// give up after N failed attempts to place a new sample
		// the higher this number, the better the resulting distribution
		quality: 500,
	})
);

// set pixels in result image
for (let p of points) res.setAtUnsafe(p[0], p[1], 0);

// create canvas from pixel buffer and attach to DOM
canvasFromPixelBuffer(res, document.body);

console.log(points.length);
