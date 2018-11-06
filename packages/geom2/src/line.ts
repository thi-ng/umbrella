import { implementations } from "@thi.ng/defmulti";
import {
    dist,
    mixNewN,
    ReadonlyVec,
    subNew,
    Vec
} from "@thi.ng/vectors2/api";
import { Mat23 } from "@thi.ng/vectors2/mat23";
import { intersectLines2 } from "./internal/line-intersection";
import { offsetLine } from "./internal/offset";
import { transformPoints } from "./internal/transform";
import "./polygon";
import {
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
    Polygon2,
    Polyline2,
    Rect2,
    tangentAt,
    transform,
    Type,
    VecPair,
    vertices,
    resample,
} from "./api";
import { direction } from "./internal/direction";

export function line(a: Vec, b: Vec, attribs?: Attribs) {
    return new Line2([a, b], attribs);
}

export const lineNormal = (a: ReadonlyVec, b: ReadonlyVec, out?: Vec) =>
    subNew(b, a, out);

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
        mixNewN(line.a, line.b, 0.5, c),

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

    tangentAt,
    (line: Line2, _, n = 1) =>
        direction(line.a, line.b, n),

    transform,
    (line: Line2, mat: Mat23) =>
        new Line2(
            transformPoints(line.points, mat),
            { ...line.attribs }
        ),
);
