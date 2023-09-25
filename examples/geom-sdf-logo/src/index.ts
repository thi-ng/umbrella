import { asCSS } from "@thi.ng/color-palettes";
import {
	Polygon,
	asSvg,
	bounds,
	circle,
	group,
	rect,
	svgDoc,
	transform,
} from "@thi.ng/geom";
import { asPolygons, asSDF, sample2d } from "@thi.ng/geom-sdf";
import { rad } from "@thi.ng/math";
import { mulV23, skewX23 } from "@thi.ng/matrices";
import type { ReadonlyVec } from "@thi.ng/vectors";

// bar/rect width (base unit)
const W = 64;
// gap between rects
const GAP = 16;
// total grid cell size
const GRIDW = W + GAP;
// radius size (incl. optical compensation)
const R = W * 0.55;
// skew matrix for italics
const SKEW = skewX23([], Math.tan(rad(-21)));
// grid resolution for sampling SDF and extracting polygons
const RES = [320, 320];

// obtain colors of a preset color palette in CSS format and reversed order
// see: https://thi.ng/color-palettes for ~220 more palettes
const THEME = asCSS(43, true);

// prettier-ignore
// definition of the bar/rect shapes in the thi.ng logo (grid x, y & height)
const BARS = [[0, 0, 6], [1, 0, 6], [2, 0, 4], [3, 0, 4], [5, 0, 4], [6, 0, 4], [7, 0, 4], [8, 2, 6]];
// prettier-ignore
// definition of the circle shapes in the thi.ng logo (grid x/y coords)
const DOTS = [[-1, -4.125], [3, -4.125], [4, 0], [7, 2]];

// function to create a single skewed rect shape for the logo
// (transforming a rect with a matrix turns it into a polygon)
const logoBar = ([x, y, h]: number[]) =>
	<Polygon>(
		transform(
			rect([x * GRIDW, -h * GRIDW + y * GRIDW], [W, h * GRIDW]),
			SKEW
		)
	);

// function to create a single circle shape (here we're using the skew matrix
// only to compute the transformed center point, but we're not interested in
// skewing the circle shape itself)
const logoDot = ([x, y]: number[]) =>
	circle(mulV23(null, SKEW, [x * GRIDW + R, y * GRIDW - R]), R);

// create all shapes and combine them into a single group
export const logo = group({}, [...BARS.map(logoBar), ...DOTS.map(logoDot)]);

// compute logo's bounding rect with some additional margin
const logoBounds = bounds(logo, W * 1.5)!;

// higher-order spatial transformation function to modulate a 2D point with sine
// waves (used for the next processing step below)
const sineWarp =
	(freq: number, amp: number) =>
	([x, y]: ReadonlyVec) =>
		[x + amp * Math.sin(y * freq), y + amp * Math.sin(x * freq)];

// convert geometry hierarchy to a 2D SDF and sample it within the given
// bounding rect & resolution. we also use the above `sineWarp()` function to
// transform the sample positions and so create a spatial warping of the SDF.
// comment out that last arg to compare results without this transform...
const image = sample2d(asSDF(logo), logoBounds, RES, sineWarp(0.02, 25));

// now the reverse op: convert SDF back into geometries...
// extract multiple groups of contour polygons from the pre-sampled SDF.
// in this case the contours extracted are at distances in the [0..W) interval
// the `asPolygons()` function also simplifies the resulting polygons using the
// Douglas-Peucker algorithm with the given threshold...
// see: https://en.wikipedia.org/wiki/Ramer%E2%80%93Douglas%E2%80%93Peucker_algorithm
const contours = THEME.map((fill, i) =>
	group({ fill }, asPolygons(image, logoBounds, RES, [(i / 5) * W], 0.25))
);

// convert everything to SVG:
// 1. unless given by the user, the`svgDoc()` function auto-computes the
//    `viewBox` of the given geometry.
// 2. the`__bleed` control attrib adds some additional page bleed/margin.
// 3. we reverse the contours array to ensure the largest shapes (i.e. those
//    with the greatest SDF sample distance) are drawn first
document.body.innerHTML = asSvg(
	svgDoc({ __bleed: 10, stroke: "#000" }, ...contours.reverse())
);
