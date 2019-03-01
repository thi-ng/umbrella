import { defmulti } from "@thi.ng/defmulti";
import { AABBLike, IShape, PathSegment, PCLike, Type } from "@thi.ng/geom-api";
import { bounds as arcBounds } from "@thi.ng/geom-arc";
import { bounds as _bounds } from "@thi.ng/geom-poly-utils";
import { cubicBounds, quadraticBounds } from "@thi.ng/geom-splines";
import { comp, filter, iterator1, map } from "@thi.ng/transducers";
import {
    max,
    MAX2,
    min,
    MIN2,
    mul2,
    mulN2,
    set2,
    sub2,
    subN2
} from "@thi.ng/vectors";
import { rectFromMinMax } from "../ctors/rect";
import { collBounds } from "../internal/coll-bounds";
import { dispatch } from "../internal/dispatch";
import {
    Arc,
    Circle,
    Cubic,
    Ellipse,
    Group,
    Line,
    Path,
    Quadratic,
    Rect
} from "../api";

export const bounds = defmulti<IShape, AABBLike>(dispatch);

bounds.addAll({
    [Type.ARC]: ($: Arc) =>
        rectFromMinMax(...arcBounds($.pos, $.r, $.axis, $.start, $.end)),

    [Type.CIRCLE]: ($: Circle) =>
        new Rect(subN2([], $.pos, $.r), mulN2(null, [2, 2], $.r)),

    [Type.CUBIC]: ({ points }: Cubic) =>
        rectFromMinMax(
            ...cubicBounds(points[0], points[1], points[2], points[3])
        ),

    [Type.ELLIPSE]: ($: Ellipse) =>
        new Rect(sub2([], $.pos, $.r), mul2(null, [2, 2], $.r)),

    [Type.GROUP]: ($: Group) => new Rect(...collBounds($.children, bounds)),

    [Type.LINE]: ({ points: [a, b] }: Line) =>
        rectFromMinMax(min([], a, b), max([], a, b)),

    [Type.PATH]: (path: Path) =>
        new Rect(
            ...collBounds(
                [
                    ...iterator1(
                        comp(
                            map((s: PathSegment) => s.geo),
                            filter((s) => !!s)
                        ),
                        path.segments
                    )
                ],
                bounds
            )
        ),

    [Type.POINTS]: ($: PCLike) =>
        rectFromMinMax(..._bounds($.points, set2([], MAX2), set2([], MIN2))),

    [Type.QUADRATIC]: ({ points }: Quadratic) =>
        rectFromMinMax(...quadraticBounds(points[0], points[1], points[2])),

    [Type.RECT]: ($: IShape) => <AABBLike>$.copy()
});

bounds.isa(Type.AABB, Type.RECT);
bounds.isa(Type.POLYGON, Type.POINTS);
bounds.isa(Type.POLYLINE, Type.POINTS);
bounds.isa(Type.QUAD, Type.POINTS);
bounds.isa(Type.TRIANGLE, Type.POINTS);
