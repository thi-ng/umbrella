import type { IShape } from "@thi.ng/geom-api";
import { area } from "@thi.ng/geom/area";
import { centroid } from "@thi.ng/geom/centroid";
import { clipConvex } from "@thi.ng/geom/clip-convex";
import { convexHull } from "@thi.ng/geom/convex-hull";
import { points } from "@thi.ng/geom/points";
import { polygon } from "@thi.ng/geom/polygon";
import { rect } from "@thi.ng/geom/rect";
import { scatter } from "@thi.ng/geom/scatter";
import { withAttribs } from "@thi.ng/geom/with-attribs";
import { canvas } from "@thi.ng/hdom-canvas";
import { renderOnce } from "@thi.ng/hdom/render-once";

// refactored version of an example by Pete Cory
// http://www.petecorey.com/blog/2019/07/29/clipping-convex-hulls-with-thing/

const width = 600;
const height = 600;

const bounds = rect([width, height]);

// generate random points within given shape
const pts1 = scatter(bounds, 5)!;
const pts2 = scatter(bounds, 5)!;

// complex hull for shape
const hull1 = convexHull(polygon(pts1));
const hull2 = convexHull(polygon(pts2));

// Sutherland-Hodgman
const clip = clipConvex(hull1, hull2)!;

const COL1 = (a: number) => `rgba(245,93,62,${a})`;
const COL2 = (a: number) => `rgba(118,190,208,${a})`;
const COL3 = (a: number) => `rgba(102,102,102,${a})`;

// render shapes with thi.ng/hdom & thi.ng/hdom-canvas
renderOnce([
    canvas,
    { width, height },
    points(pts1, { shape: "circle", fill: COL1(1), size: 5 }),
    points(pts2, { shape: "circle", fill: COL2(1), size: 5 }),
    withAttribs(hull1, { fill: COL1(0.5) }),
    withAttribs(hull2, { fill: COL2(0.5) }),
    withAttribs(clip, {
        fill: COL3(0.5),
        stroke: COL3(1),
        weight: 3,
    }),
    ...(<[IShape, string][]>[
        [hull1, COL1(1)],
        [hull2, COL2(1)],
        [clip, COL3(1)],
    ]).map(([shape, col]) => [
        "text",
        { fill: col },
        centroid(shape),
        area(shape).toFixed(2),
    ]),
]);
