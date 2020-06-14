import { defmulti, Implementation2O, MultiFn2O } from "@thi.ng/defmulti";
import { IShape, PCLike, Type } from "@thi.ng/geom-api";
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
import { AABB } from "../api/aabb";
import { Arc } from "../api/arc";
import { Circle } from "../api/circle";
import { Cubic } from "../api/cubic";
import { Line } from "../api/line";
import { Plane } from "../api/plane";
import { Quadratic } from "../api/quadratic";
import { Rect } from "../api/rect";
import { dispatch } from "../internal/dispatch";
import type { IObjectOf } from "@thi.ng/api";

export const closestPoint: MultiFn2O<
    IShape,
    ReadonlyVec,
    Vec,
    Vec | undefined
> = defmulti(<any>dispatch);

closestPoint.addAll(<
    IObjectOf<Implementation2O<unknown, ReadonlyVec, Vec, Vec>>
>{
    [Type.AABB]: ($: AABB, p, out) =>
        closestPointAABB(p, $.pos, add3([], $.pos, $.size), out),

    [Type.ARC]: ($: Arc, p, out) =>
        closestPointArc(p, $.pos, $.r, $.axis, $.start, $.end, out),

    [Type.CIRCLE]: ($: Circle, p, out) =>
        closestPointCircle(p, $.pos, $.r, out),

    [Type.CUBIC]: ({ points }: Cubic, p, out) =>
        closestPointCubic(p, points[0], points[1], points[2], points[3], out),

    [Type.LINE]: ({ points }: Line, p, out) =>
        closestPointSegment(p, points[0], points[1], out),

    [Type.PLANE]: ($: Plane, p, out) =>
        closestPointPlane(p, $.normal, $.w, out),

    [Type.POINTS]: ($: PCLike, p, out) => closestPointArray(p, $.points, out),

    [Type.POLYGON]: ($: PCLike, p, out) =>
        closestPointPolyline(p, $.points, true, out),

    [Type.POLYLINE]: ($: PCLike, p, out) =>
        closestPointPolyline(p, $.points, false, out),

    [Type.QUADRATIC]: ({ points }: Quadratic, p, out) =>
        closestPointQuadratic(p, points[0], points[1], points[2], out),

    [Type.RECT]: ($: Rect, p, out) =>
        closestPointRect(p, $.pos, add2([], $.pos, $.size), out),
});

closestPoint.isa(Type.QUAD, Type.POLYGON);
closestPoint.isa(Type.SPHERE, Type.CIRCLE);
closestPoint.isa(Type.TRIANGLE, Type.POLYGON);
