import { canvas2d } from "@thi.ng/canvas";
import {
	area,
	asPath,
	centroid,
	clipConvex,
	convexHull,
	group,
	points,
	polygon,
	rectFromMinMaxWithMargin,
	scatter,
	text,
	vertices,
	withAttribs,
	type IShape2,
} from "@thi.ng/geom";
import { draw } from "@thi.ng/hiccup-canvas";

// refactored version of an example by Pete Cory
// http://www.petecorey.com/blog/2019/07/29/clipping-convex-hulls-with-thing/

const width = 600;
const height = 600;

const bounds = rectFromMinMaxWithMargin([0, 0], [width, height], -50);

const generateShapes = () => {
	// repeat until we get an actual result/overlap shape
	while (true) {
		// generate random points, compute convex hull and convert to path
		const hull1 = asPath(convexHull(polygon(scatter(bounds, 5)!)), {
			mode: "hobby",
		});
		// this hull will be used as clipping polygon and MUST be convex
		// (blue shape in the visualization)
		const hull2 = convexHull(points(scatter(bounds, 5)!));

		// apply Sutherland-Hodgman clipping
		const clip = clipConvex(hull1, hull2);
		if (clip?.[0]) return { hull1, hull2, clip: clip[0] };
	}
};

const { hull1, hull2, clip } = generateShapes();

// sample boundaries at uniform distance
const pts1 = vertices(hull1, { dist: 50 });
const pts2 = vertices(hull2, { dist: 50 });

const COL1 = (a = 1) => `rgba(245,93,62,${a})`;
const COL2 = (a = 1) => `rgba(118,190,208,${a})`;
const COL3 = (a = 1) => `rgba(102,102,102,${a})`;

// render shapes with thi.ng/hiccup-canvas
const { ctx } = canvas2d(width, height, document.getElementById("app")!);
draw(
	ctx,
	group({ __background: "#f0f0f0" }, [
		points(pts1, { shape: "circle", fill: COL1(), size: 4 }),
		points(pts2, { shape: "circle", fill: COL2(), size: 4 }),
		withAttribs(hull1, { fill: COL1(0.5) }),
		withAttribs(hull2, { fill: COL2(0.5) }),
		withAttribs(clip, {
			fill: COL3(0.5),
			stroke: COL3(),
			weight: 3,
		}),
		// text labels (shape areas)
		...(<[IShape2, string][]>[
			[hull2, COL2()],
			[clip, COL3()],
		]).map(([shape, col]) =>
			text(centroid(shape)!, area(shape) | 0, { fill: col })
		),
	])
);
