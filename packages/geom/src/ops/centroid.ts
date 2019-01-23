import { defmulti, MultiFn1O } from "@thi.ng/defmulti";
import { centerOfWeight2, centroid as _centroid } from "@thi.ng/geom-poly-utils";
import {
    add,
    divN,
    maddN,
    mixN,
    set,
    Vec
} from "@thi.ng/vectors";
import {
    AABBLike,
    Circle,
    Group,
    IShape,
    Line,
    PCLike,
    Polygon,
    Triangle,
    Type
} from "../api";
import { dispatch } from "../internal/dispatch";
import { bounds } from "./bounds";

export const centroid: MultiFn1O<IShape, Vec, Vec> = defmulti(dispatch);

centroid.addAll({

    [Type.CIRCLE]:
        ($: Circle, out?) =>
            set(out || [], $.pos),

    [Type.GROUP]:
        ($: Group) =>
            centroid(bounds($)),

    [Type.LINE]:
        ({ points }: Line, out?) =>
            mixN(out || [], points[0], points[1], 0.5),

    [Type.POINTS]:
        ($: PCLike, out?) =>
            _centroid($.points, out),

    [Type.POLYGON]:
        ($: Polygon, out?) => centerOfWeight2($.points, out),

    [Type.RECT]:
        ($: AABBLike, out?) => maddN(out || [], $.pos, $.size, 0.5),

    [Type.TRIANGLE]:
        ({ points }: Triangle, out?) =>
            divN(null, add(null, add(out || [], points[0], points[1]), points[2]), 3)

});

centroid.isa(Type.ARC, Type.CIRCLE);
centroid.isa(Type.AABB, Type.RECT);
centroid.isa(Type.ELLIPSE, Type.CIRCLE);
centroid.isa(Type.LINE3, Type.LINE);
centroid.isa(Type.POLYLINE, Type.POINTS);
centroid.isa(Type.QUAD, Type.POLYGON);
centroid.isa(Type.SPHERE, Type.CIRCLE);
centroid.isa(Type.TRIANGLE3, Type.TRIANGLE);
