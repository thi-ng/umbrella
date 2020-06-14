import { defmulti, Implementation1 } from "@thi.ng/defmulti";
import { IShape, Type } from "@thi.ng/geom-api";
import { perimeter } from "@thi.ng/geom-poly-utils";
import { PI, TAU } from "@thi.ng/math";
import { dist } from "@thi.ng/vectors";
import { Circle } from "../api/circle";
import { Ellipse } from "../api/ellipse";
import { Group } from "../api/group";
import { Line } from "../api/line";
import { Polygon } from "../api/polygon";
import { Rect } from "../api/rect";
import { Triangle } from "../api/triangle";
import { dispatch } from "../internal/dispatch";
import type { IObjectOf } from "@thi.ng/api";

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
    [Type.CIRCLE]: ($: Circle) => TAU * $.r,

    [Type.ELLIPSE]: ({ r: [a, b] }: Ellipse) =>
        // Ramanujan approximation
        // https://www.mathsisfun.com/geometry/ellipse-perimeter.html
        PI * (3 * (a + b) - Math.sqrt((3 * a + b) * (3 * b + a))),

    [Type.GROUP]: ({ children }: Group) =>
        children.reduce((sum, $) => sum + arcLength($), 0),

    [Type.LINE]: ({ points }: Line) => dist(points[0], points[1]),

    [Type.POLYGON]: ({ points }: Polygon) =>
        perimeter(points, points.length, true),

    [Type.POLYLINE]: ({ points }: Polygon) => perimeter(points, points.length),

    [Type.RECT]: ({ size }: Rect) => 2 * (size[0] + size[1]),

    [Type.TRIANGLE]: ({ points }: Triangle) =>
        dist(points[0], points[1]) +
        dist(points[1], points[2]) +
        dist(points[2], points[0]),
});

arcLength.isa(Type.QUAD, Type.POLYGON);
arcLength.isa(Type.TRIANGLE, Type.POLYGON);
