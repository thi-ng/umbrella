import { defmulti, MultiFn2O } from "@thi.ng/defmulti";
import { IShape, PCLike, Type } from "@thi.ng/geom-api";
import { closestPoint as closestPointArc } from "@thi.ng/geom-arc";
import {
    closestPointArray,
    closestPointPolyline,
    closestPointSegment
} from "@thi.ng/geom-closest-point";
import { closestPointCubic, closestPointQuadratic } from "@thi.ng/geom-splines";
import { add, normalize, ReadonlyVec, set, sub, Vec } from "@thi.ng/vectors";
import { dispatch } from "../internal/dispatch";
import { vertices } from "./vertices";
import { Arc, Circle, Cubic, Line, Quadratic } from "../api";

export const closestPoint: MultiFn2O<IShape, ReadonlyVec, Vec, Vec> = defmulti(
    dispatch
);

closestPoint.addAll({
    [Type.ARC]: ($: Arc, p, out = []) =>
        closestPointArc(p, $.pos, $.r, $.axis, $.start, $.end, out),

    [Type.CIRCLE]: ($: Circle, p, out = []) =>
        add(null, normalize(null, sub(out, p, $.pos), $.r), $.pos),

    [Type.CUBIC]: ({ points }: Cubic, p, out = []) =>
        closestPointCubic(p, points[0], points[1], points[2], points[3], out),

    [Type.LINE]: ({ points }: Line, p, out = []) =>
        closestPointSegment(p, points[0], points[1], out),

    [Type.POINTS]: ($: PCLike, p, out) =>
        set(out, closestPointArray(p, $.points)),

    [Type.POLYGON]: ($: PCLike, p, out = []) =>
        closestPointPolyline(p, $.points, true, out),

    [Type.POLYLINE]: ($: PCLike, p, out = []) =>
        closestPointPolyline(p, $.points, false, out),

    [Type.QUADRATIC]: ({ points }: Quadratic, p, out = []) =>
        closestPointQuadratic(p, points[0], points[1], points[2], out),

    [Type.RECT]: ($, p, out = []) =>
        closestPointPolyline(p, vertices($), true, out)
});

closestPoint.isa(Type.QUAD, Type.POLYGON);
closestPoint.isa(Type.SPHERE, Type.CIRCLE);
closestPoint.isa(Type.TRIANGLE, Type.POLYGON);
