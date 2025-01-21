// SPDX-License-Identifier: Apache-2.0
import {
	asSvg,
	bounds,
	complexPolygon,
	fitIntoBounds2,
	normalizedPath,
	pathFromSvg,
	rectWithCentroid,
	svgDoc,
} from "@thi.ng/geom";
import { asPolygons, asSDF, sample2d } from "@thi.ng/geom-sdf";
import { dist2, rotate } from "@thi.ng/vectors";

// parse SVG into a path with holes, normalize it (i.e. convert all segments to
// cubics), then rescale & translate it to fit within given bounding rect
const src = fitIntoBounds2(
	normalizedPath(
		pathFromSvg(
			// https://www.svgrepo.com/svg/451605/face-smile-big
			"M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM6 5c.558 0 1.031.473 1.031 1.031V7c0 .558-.473 1-1.031 1-.558 0-1-.442-1-1v-.969C5 5.473 5.442 5 6 5zm4 0c.558 0 1 .473 1 1.031V7c0 .558-.442 1-1 1s-1-.442-1-1v-.969C9 5.473 9.442 5 10 5zM3 9.031c2 1.304 7.987 1.304 10.031 0l-.03.531c-.037.43-1 3.376-5 3.407-4 .031-5-2.78-5-3.313z"
		)
	),
	rectWithCentroid([0, 0], 400)
)!;

// compute bounding rect with some extra margin
const contourBounds = bounds(src, 20)!;

// convert the path/shape into an SDF (Signed Distance Field). this function is
// polymorphic and accepts a variety of shape types (incl. nested groups of
// shapes). the resulting SDF is a function which takes a point and returns the
// (signed) distance to the boundary of the path/shape... See thi.ng/geom-sdf
// readme for more details
const sdf = asSDF(src);

// grid resolution to sample the SDF (in order to re-convert it back to SVG)
const resolution = [100, 100];

const update = (t: number) => {
	t *= 0.001;
	// animated center point for the twirl effect (in next step)
	const origin = [Math.sin(t / 3) * 200, 0];

	// evaluate & cache the SDF as an "image"/grid. the SDF is only sampled in
	// the given bounding box region, at specified resolution and here uses a
	// custom domain function to distort the space (via a timebased twirl
	// effect). this spatial transformation is done by transforming each
	// original grid point (sample positions) prior to evaluating the SDF. The
	// geom-sdf pkg also includes a number of preset domain functions...
	const image = sample2d(sdf, contourBounds, resolution, (p) =>
		rotate([], p, dist2(origin, p) * Math.sin(t) * 0.04)
	);

	// helper function to extract contour lines (at distance `d`) from the
	// pre-sampled SDF image and arrange those contours into a complex polygon
	// (aka a polygon with holes)
	const contours = (d: number, fill: string) => {
		const polys = asPolygons(image, contourBounds, resolution, [d], 0.1);
		return complexPolygon(polys[0], polys.slice(1), { fill });
	};

	// combine everything: sample the SDF at 3 different threshold distances,
	// put the results into a SVG doc (all thi.ng/geom shapes and hiccup format)
	// and finally serialize to an SVG string
	document.getElementById("app")!.innerHTML = asSvg(
		svgDoc(
			{ stroke: "none" },
			contours(10, "#000"),
			contours(0, "#f60"),
			contours(-10, "#fc0")
		)
	);

	requestAnimationFrame(update);
};

requestAnimationFrame(update);
