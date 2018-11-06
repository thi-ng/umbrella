import { isPlainObject } from "@thi.ng/checks/is-plain-object";
import { implementations, relations } from "@thi.ng/defmulti";
import {
    addNew,
    ReadonlyVec,
    Vec
} from "@thi.ng/vectors2/api";
import { Mat23 } from "@thi.ng/vectors2/mat23";
import {
    Attribs,
    bounds,
    centroid,
    convexHull,
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
    vertices,
    asCubic,
    Cubic2
} from "./api";
import "./container2";
import { centroid as _centroid } from "./internal/centroid";
import { edges as _edges } from "./internal/edges";
import { offset as _offset } from "./internal/offset";
import { perimeter as _perimeter } from "./internal/perimeter";
import { Sampler } from "./internal/sampler";
import { subdivideCurve } from "./internal/subdiv-curve";
import { transformPoints } from "./internal/transform";
import { douglasPeucker2 } from "./internal/douglas–peucker";
import { map } from "@thi.ng/transducers/xform/map";

export function polyline(points: Vec[], attribs?: Attribs): Polyline2 {
    return new Polyline2(points, attribs);
}

const type = Type.POLYLINE2;

relations(
    type,
    {
        [Type.POINTS2]: [
            bounds,
            centroid,
            convexHull,
            flip
        ],
    }
);

implementations(
    type,

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
    (line: Polyline2, mat: Mat23) =>
        new Polyline2(
            transformPoints(line.points, mat),
            { ...line.attribs }
        ),

    translate,
    (line: Polyline2, delta: ReadonlyVec) =>
        new Polyline2(
            line.points.map((p) => addNew(p, delta)),
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
