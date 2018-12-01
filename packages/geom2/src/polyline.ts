import { isPlainObject } from "@thi.ng/checks/is-plain-object";
import { implementations } from "@thi.ng/defmulti";
import { Mat } from "@thi.ng/matrices/api";
import { map } from "@thi.ng/transducers/xform/map";
import { add2 } from "@thi.ng/vectors3/add";
import { ReadonlyVec, Vec } from "@thi.ng/vectors3/api";
import {
    arcLength,
    asCubic,
    Attribs,
    bounds,
    centroid,
    convexHull,
    Cubic2,
    DEFAULT_SAMPLES,
    edges,
    flip,
    offset,
    perimeter,
    Polygon2,
    Polyline2,
    resample,
    SamplingOpts,
    simplify,
    subdivide,
    SubdivKernel,
    tangentAt,
    transform,
    translate,
    Type,
    vertices
} from "./api";
import "./container2";
import { arcLength as _arcLength } from "./internal/arc-length";
import { centroid as _centroid } from "./internal/centroid";
import { edges as _edges } from "./internal/edges";
import { offset as _offset } from "./internal/offset";
import { perimeter as _perimeter } from "./internal/perimeter";
import { Sampler } from "./internal/sampler";
import { subdivideCurve } from "./internal/subdiv-curve";
import { transformPoints } from "./internal/transform";
import { douglasPeucker2 } from "./internal/douglas–peucker";

export function polyline(points: Vec[], attribs?: Attribs): Polyline2 {
    return new Polyline2(points, attribs);
}

implementations(
    Type.POLYLINE2,

    {
        [Type.POINTS2]: [
            bounds,
            centroid,
            convexHull,
            flip
        ],
    },

    arcLength,
    (poly: Polygon2) =>
        _arcLength(poly.points),

    asCubic,
    (line: Polyline2) =>
        map((e) => Cubic2.fromLine(...e), _edges(line.points)),

    edges,
    (line: Polyline2, opts: number | SamplingOpts) =>
        _edges(vertices(line, opts), true),

    offset,
    (line: Polyline2, dist: number, res = 8) => {
        const pts = _offset(line.points, dist, res, false);
        return pts ?
            new Polygon2(pts, { ...line.attribs }) :
            undefined;
    },

    perimeter,
    (line: Polyline2) => _perimeter(line.points, false),

    resample,
    (line: Polyline2, opts?: number | Partial<SamplingOpts>) =>
        new Polyline2(vertices(line, opts), { ...line.attribs }),

    simplify,
    (line: Polyline2, eps = 0.1) =>
        new Polyline2(
            douglasPeucker2(line.points, eps, true),
            { ...line.attribs }
        ),

    subdivide,
    (line: Polyline2, kernel: SubdivKernel, iter = 1) =>
        new Polyline2(
            subdivideCurve(kernel, line.points, iter, false),
            { ...line.attribs }
        ),

    tangentAt,
    (line: Polyline2, t: number, n = 1) =>
        new Sampler(line.points, false).tangentAt(t, n),

    transform,
    (line: Polyline2, mat: Mat) =>
        new Polyline2(
            transformPoints(line.points, mat),
            { ...line.attribs }
        ),

    translate,
    (line: Polyline2, delta: ReadonlyVec) =>
        new Polyline2(
            line.points.map((p) => add2([], p, delta)),
            { ...line.attribs }
        ),

    vertices,
    (line: Polyline2, opts?: number | Partial<SamplingOpts>) => {
        if (opts !== undefined) {
            const sampler = new Sampler(line.points, false);
            return isPlainObject(opts) ?
                opts.dist ?
                    sampler.sampleUniform(opts.dist, opts.last !== false) :
                    sampler.sampleFixedNum(opts.num, opts.last !== false) :
                sampler.sampleFixedNum(opts || DEFAULT_SAMPLES, true);
        }
        return line.points;
    },

);
