import {
    DEFAULT,
    defmulti,
    Implementation1O,
    MultiFn1O,
} from "@thi.ng/defmulti";
import { IShape, Type } from "@thi.ng/geom-api";
import { polyArea2 } from "@thi.ng/geom-poly-utils";
import { PI } from "@thi.ng/math";
import { signedArea2, Vec } from "@thi.ng/vectors";
import { AABB } from "../api/aabb";
import { Arc } from "../api/arc";
import { Circle } from "../api/circle";
import { Ellipse } from "../api/ellipse";
import { Group } from "../api/group";
import { Polygon } from "../api/polygon";
import { Rect } from "../api/rect";
import { Sphere } from "../api/sphere";
import { Triangle } from "../api/triangle";
import { dispatch } from "../internal/dispatch";
import type { IObjectOf } from "@thi.ng/api";

/**
 * Returns the possibly signed (unsigned by default) surface area of given
 * `shape`. For groups calls {@link area} for each child and returns sum of
 * unsigned areas.
 *
 * In general, for polygons and triangles, the sign of the result can be
 * used as indication of the shapes orientation (clockwise /
 * counterclockwise).
 *
 * For curves, lines, point clouds and rays the function returns 0.
 *
 * Implemented for:
 *
 * - AABB
 * - Circle
 * - Cubic
 * - Ellipse
 * - Group
 * - Line
 * - Plane
 * - Points
 * - Polygon
 * - Polyline
 * - Quad
 * - Quadratic
 * - Ray
 * - Rect
 * - Sphere
 * - Triangle
 *
 * @param shape - shape to operate on
 * @param signed - true, if signed area
 */
export const area: MultiFn1O<IShape, boolean, number> = defmulti(dispatch);
area.add(DEFAULT, () => 0);

area.addAll(<IObjectOf<Implementation1O<unknown, boolean, number>>>{
    [Type.AABB]: ({ size: [w, h, d] }: AABB) => 2 * (w * h + w * d + h * d),

    [Type.ARC]:
        // http://cut-the-knot.org/Generalization/Cavalieri2.shtml
        ($: Arc) => 0.5 * Math.abs($.start - $.end) * $.r[0] * $.r[1],

    [Type.CIRCLE]: ($: Circle) => PI * $.r ** 2,

    [Type.ELLIPSE]: ($: Ellipse) => PI * $.r[0] * $.r[1],

    [Type.GROUP]: ({ children }: Group) =>
        children.reduce((sum, $) => sum + area($, false), 0),

    [Type.PLANE]: () => Infinity,

    [Type.POLYGON]: ($: Polygon, signed?) => {
        const area = polyArea2($.points);
        return signed ? area : Math.abs(area);
    },

    [Type.RECT]: ($: Rect) => $.size[0] * $.size[1],

    [Type.SPHERE]: ($: Sphere) => 4 * PI * $.r ** 2,

    [Type.TRIANGLE]: ($: Triangle, signed?) => {
        const area = 0.5 * signedArea2(...(<[Vec, Vec, Vec]>$.points));
        return signed ? area : Math.abs(area);
    },
});

area.isa(Type.QUAD, Type.POLYGON);
