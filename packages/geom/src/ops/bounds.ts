import type { IObjectOf } from "@thi.ng/api";
import { defmulti, Implementation1 } from "@thi.ng/defmulti";
import { AABBLike, IShape, PathSegment, PCLike, Type } from "@thi.ng/geom-api";
import { bounds as arcBounds } from "@thi.ng/geom-arc";
import { bounds as _bounds } from "@thi.ng/geom-poly-utils";
import { cubicBounds, quadraticBounds } from "@thi.ng/geom-splines";
import { comp, filter, iterator1, map } from "@thi.ng/transducers";
import {
    max,
    MAX2,
    MAX3,
    min,
    MIN2,
    MIN3,
    mul2,
    mulN2,
    set2,
    set3,
    sub2,
    subN2,
} from "@thi.ng/vectors";
import { Arc } from "../api/arc";
import { Circle } from "../api/circle";
import { Cubic } from "../api/cubic";
import { Ellipse } from "../api/ellipse";
import { Group } from "../api/group";
import { Line } from "../api/line";
import { Path } from "../api/path";
import { Quadratic } from "../api/quadratic";
import { Rect } from "../api/rect";
import { Text } from "../api/text";
import { aabbFromMinMax } from "../ctors/aabb";
import { rectFromMinMax } from "../ctors/rect";
import { collBounds } from "../internal/coll-bounds";
import { dispatch } from "../internal/dispatch";

export const bounds = defmulti<IShape, AABBLike | undefined>(dispatch);

bounds.addAll(<IObjectOf<Implementation1<unknown, AABBLike>>>{
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

    [Type.GROUP]: ($: Group) => {
        const res = collBounds($.children, bounds);
        return res ? new Rect(...res) : undefined;
    },

    [Type.LINE]: ({ points: [a, b] }: Line) =>
        rectFromMinMax(min([], a, b), max([], a, b)),

    [Type.PATH]: (path: Path) => {
        const b = collBounds(
            [
                ...iterator1(
                    comp(
                        map((s: PathSegment) => s.geo!),
                        filter((s) => !!s)
                    ),
                    path.segments
                ),
            ],
            bounds
        );
        return b ? new Rect(...b) : undefined;
    },

    [Type.POINTS]: ($: PCLike) =>
        rectFromMinMax(..._bounds($.points, set2([], MAX2), set2([], MIN2))),

    [Type.POINTS3]: ($: PCLike) =>
        aabbFromMinMax(..._bounds($.points, set3([], MAX3), set3([], MIN3))),

    [Type.QUADRATIC]: ({ points }: Quadratic) =>
        rectFromMinMax(...quadraticBounds(points[0], points[1], points[2])),

    [Type.RECT]: ($: IShape) => <AABBLike>$.copy(),

    [Type.TEXT]: ($: Text) => new Rect(set2([], $.pos), [0, 0]),
});

bounds.isa(Type.AABB, Type.RECT);
bounds.isa(Type.POLYGON, Type.POINTS);
bounds.isa(Type.POLYLINE, Type.POINTS);
bounds.isa(Type.QUAD, Type.POINTS);
bounds.isa(Type.TRIANGLE, Type.POINTS);
