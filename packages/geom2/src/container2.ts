import { implementations } from "@thi.ng/defmulti";
import { Mat } from "@thi.ng/matrices/api";
import { MAX2, MIN2, Vec } from "@thi.ng/vectors3/api";
import {
    Attribs,
    bounds,
    centroid,
    convexHull,
    flip,
    PointContainer,
    Polygon2,
    Rect2,
    transform,
    Type,
    vertices
} from "./api";
import { bounds as _bounds } from "./internal/bounds";
import { centroid as _centroid } from "./internal/centroid";
import { grahamScan2 } from "./internal/graham-scan";
import { transformPoints } from "./internal/transform";

export function points(points: Vec[], attribs?: Attribs) {
    return new PointContainer(Type.POINTS2, points, attribs);
}

implementations(
    Type.POINTS2,

    null,

    bounds,
    (pc: PointContainer) =>
        Rect2.fromMinMax(..._bounds(pc.points, [...MAX2], [...MIN2])),

    centroid,
    (pc: PointContainer) =>
        _centroid(pc.points),

    convexHull,
    (pc: PointContainer) =>
        new Polygon2(grahamScan2(pc.points), { ...pc.attribs }),

    flip,
    (pc: PointContainer) =>
        pc.flip(),

    transform,
    (pc: PointContainer, mat: Mat) =>
        new PointContainer(
            pc.type,
            transformPoints(pc.points, mat),
            { ...pc.attribs }
        ),

    vertices,
    (pc: PointContainer) =>
        pc.points
);
