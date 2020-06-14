import { defmulti, Implementation1O, MultiFn1O } from "@thi.ng/defmulti";
import { AABBLike, IShape, PCLike, Type } from "@thi.ng/geom-api";
import {
    centerOfWeight2,
    centroid as _centroid,
} from "@thi.ng/geom-poly-utils";
import { add, divN, maddN, mixN, mulN, set, Vec } from "@thi.ng/vectors";
import { Circle } from "../api/circle";
import { Group } from "../api/group";
import { Line } from "../api/line";
import { Plane } from "../api/plane";
import { Polygon } from "../api/polygon";
import { Triangle } from "../api/triangle";
import { dispatch } from "../internal/dispatch";
import { bounds } from "./bounds";
import type { IObjectOf } from "@thi.ng/api";

export const centroid: MultiFn1O<IShape, Vec, Vec | undefined> = defmulti(
    dispatch
);

centroid.addAll(<IObjectOf<Implementation1O<unknown, Vec, Vec>>>{
    [Type.CIRCLE]: ($: Circle, out?) => set(out || [], $.pos),

    [Type.GROUP]: ($: Group) => {
        const b = bounds($);
        return b ? centroid(b) : undefined;
    },

    [Type.LINE]: ({ points }: Line, out?) =>
        mixN(out || [], points[0], points[1], 0.5),

    [Type.POINTS]: ($: PCLike, out?) => _centroid($.points, out),

    [Type.PLANE]: ($: Plane, out?) => mulN(out || [], $.normal, $.w),

    [Type.POLYGON]: ($: Polygon, out?) => centerOfWeight2($.points, out),

    [Type.RECT]: ($: AABBLike, out?) => maddN(out || [], $.size, 0.5, $.pos),

    [Type.TRIANGLE]: ({ points }: Triangle, out?) =>
        divN(
            null,
            add(null, add(out || [], points[0], points[1]), points[2]),
            3
        ),
});

centroid.isa(Type.ARC, Type.CIRCLE);
centroid.isa(Type.AABB, Type.RECT);
centroid.isa(Type.ELLIPSE, Type.CIRCLE);
centroid.isa(Type.LINE3, Type.LINE);
centroid.isa(Type.POINTS3, Type.POINTS);
centroid.isa(Type.POLYLINE, Type.POINTS);
centroid.isa(Type.QUAD, Type.POLYGON);
centroid.isa(Type.SPHERE, Type.CIRCLE);
centroid.isa(Type.TRIANGLE3, Type.TRIANGLE);
