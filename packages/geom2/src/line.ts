import { implementations } from "@thi.ng/defmulti";
import { Mat } from "@thi.ng/matrices/api";
import { ReadonlyVec, Vec } from "@thi.ng/vectors3/api";
import { dist } from "@thi.ng/vectors3/dist";
import { mixN } from "@thi.ng/vectors3/mixn";
import { sub } from "@thi.ng/vectors3/sub";
import {
    arcLength,
    asCubic,
    asPolyline,
    Attribs,
    bounds,
    centroid,
    Cubic2,
    flip,
    intersectLine,
    Line2,
    offset,
    perimeter,
    pointAt,
    Polygon2,
    Polyline2,
    Rect2,
    resample,
    tangentAt,
    transform,
    Type,
    VecPair,
    vertices
} from "./api";
import { direction } from "./internal/direction";
import { intersectLines2 } from "./internal/line-intersection";
import { offsetLine } from "./internal/offset";
import { transformPoints } from "./internal/transform";
import "./polygon";

export function line(a: Vec, b: Vec, attribs?: Attribs) {
    return new Line2([a, b], attribs);
}

export const lineNormal = (a: ReadonlyVec, b: ReadonlyVec, out?: Vec) =>
    sub(out, b, a);

implementations(
    Type.LINE2,

    {
        [Type.POINTS2]: [
            flip,
        ],
        [Type.POLYLINE2]: [
            resample,
            vertices,
        ],
    },

    arcLength,
    (line: Line2) =>
        dist(line.a, line.b),

    asCubic,
    (line: Line2) =>
        [Cubic2.fromLine(line.a, line.b, { ...line.attribs })],

    asPolyline,
    (line: Line2) =>
        new Polyline2([...line.points], { ...line.attribs }),

    bounds,
    (line: Line2) =>
        Rect2.fromMinMax(...<VecPair>line.points),

    centroid,
    (line: Line2, c: Vec = []) =>
        mixN(c, line.a, line.b, 0.5),

    intersectLine,
    (l1: Line2, l2: Line2) =>
        intersectLines2(l1.a, l1.b, l2.a, l2.b),

    offset,
    (line: Line2, dist: number, res = 8) =>
        new Polygon2(
            offsetLine(<VecPair>line.points, dist, res),
            { ...line.attribs }
        ),

    perimeter,
    (line: Line2) =>
        dist(...<VecPair>line.points),

    pointAt,
    (line: Line2, t: number) =>
        mixN([], line.a, line.b, t),

    tangentAt,
    (line: Line2, _, n = 1) =>
        direction(line.a, line.b, n),

    transform,
    (line: Line2, mat: Mat) =>
        new Line2(
            transformPoints(line.points, mat),
            { ...line.attribs }
        ),
);
