import type { IObjectOf } from "@thi.ng/api";
import { defmulti, Implementation2O, MultiFn2O } from "@thi.ng/defmulti";
import type { IShape, PCLike } from "@thi.ng/geom-api";
import { closestPoint as closestPointArc } from "@thi.ng/geom-arc";
import {
    closestPointAABB,
    closestPointArray,
    closestPointCircle,
    closestPointPlane,
    closestPointPolyline,
    closestPointRect,
    closestPointSegment,
} from "@thi.ng/geom-closest-point";
import { closestPointCubic, closestPointQuadratic } from "@thi.ng/geom-splines";
import { add2, add3, ReadonlyVec, Vec } from "@thi.ng/vectors";
import type { AABB } from "../api/aabb";
import type { Arc } from "../api/arc";
import type { Circle } from "../api/circle";
import type { Cubic } from "../api/cubic";
import type { Line } from "../api/line";
import type { Plane } from "../api/plane";
import type { Quadratic } from "../api/quadratic";
import type { Rect } from "../api/rect";
import { dispatch } from "../internal/dispatch";

export const closestPoint: MultiFn2O<
    IShape,
    ReadonlyVec,
    Vec,
    Vec | undefined
> = defmulti(<any>dispatch);

closestPoint.addAll(<
    IObjectOf<Implementation2O<unknown, ReadonlyVec, Vec, Vec>>
>{
    aabb: ($: AABB, p, out) =>
        closestPointAABB(p, $.pos, add3([], $.pos, $.size), out),

    arc: ($: Arc, p, out) =>
        closestPointArc(p, $.pos, $.r, $.axis, $.start, $.end, out),

    circle: ($: Circle, p, out) => closestPointCircle(p, $.pos, $.r, out),

    cubic: ({ points }: Cubic, p, out) =>
        closestPointCubic(p, points[0], points[1], points[2], points[3], out),

    line: ({ points }: Line, p, out) =>
        closestPointSegment(p, points[0], points[1], out),

    plane: ($: Plane, p, out) => closestPointPlane(p, $.normal, $.w, out),

    points: ($: PCLike, p, out) => closestPointArray(p, $.points, out),

    poly: ($: PCLike, p, out) => closestPointPolyline(p, $.points, true, out),

    polyline: ($: PCLike, p, out) =>
        closestPointPolyline(p, $.points, false, out),

    quadratic: ({ points }: Quadratic, p, out) =>
        closestPointQuadratic(p, points[0], points[1], points[2], out),

    rect: ($: Rect, p, out) =>
        closestPointRect(p, $.pos, add2([], $.pos, $.size), out),
});

closestPoint.isa("quad", "poly");
closestPoint.isa("sphere", "circle");
closestPoint.isa("tri", "poly");
