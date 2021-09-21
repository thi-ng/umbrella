import type { IObjectOf } from "@thi.ng/api";
import type { Implementation1 } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { IShape } from "@thi.ng/geom-api";
import { perimeter } from "@thi.ng/geom-poly-utils/perimeter";
import { PI, TAU } from "@thi.ng/math/api";
import { dist } from "@thi.ng/vectors/dist";
import type { Circle } from "../api/circle";
import type { Ellipse } from "../api/ellipse";
import type { Group } from "../api/group";
import type { Line } from "../api/line";
import type { Polygon } from "../api/polygon";
import type { Rect } from "../api/rect";
import type { Triangle } from "../api/triangle";
import { dispatch } from "../internal/dispatch";

/**
 * Returns the arc length / perimeter / circumference of the given
 * shape. For groups calls {@link arcLength} for each child and returns the
 * sum of results.
 *
 * Implemented for:
 *
 * - Circle
 * - Ellipse
 * - Group
 * - Line
 * - Polygon
 * - Polyline
 * - Quad
 * - Rect
 * - Triangle
 *
 */
export const arcLength = defmulti<IShape, number>(dispatch);

arcLength.addAll(<IObjectOf<Implementation1<unknown, number>>>{
    circle: ($: Circle) => TAU * $.r,

    ellipse: ({ r: [a, b] }: Ellipse) =>
        // Ramanujan approximation
        // https://www.mathsisfun.com/geometry/ellipse-perimeter.html
        PI * (3 * (a + b) - Math.sqrt((3 * a + b) * (3 * b + a))),

    group: ({ children }: Group) =>
        children.reduce((sum, $) => sum + arcLength($), 0),

    line: ({ points }: Line) => dist(points[0], points[1]),

    poly: ({ points }: Polygon) => perimeter(points, points.length, true),

    polyline: ({ points }: Polygon) => perimeter(points, points.length),

    rect: ({ size }: Rect) => 2 * (size[0] + size[1]),

    tri: ({ points }: Triangle) =>
        dist(points[0], points[1]) +
        dist(points[1], points[2]) +
        dist(points[2], points[0]),
});

arcLength.isa("quad", "poly");
arcLength.isa("tri", "poly");
