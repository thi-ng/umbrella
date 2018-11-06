import { isPlainObject } from "@thi.ng/checks/is-plain-object";
import { implementations } from "@thi.ng/defmulti";
import { TAU } from "@thi.ng/math/api";
import { Reducer } from "@thi.ng/transducers/api";
import { cycle } from "@thi.ng/transducers/iter/cycle";
import { normRange } from "@thi.ng/transducers/iter/norm-range";
import { tuples } from "@thi.ng/transducers/iter/tuples";
import { wrap } from "@thi.ng/transducers/iter/wrap";
import { reduced } from "@thi.ng/transducers/reduced";
import { push } from "@thi.ng/transducers/rfn/push";
import { transduce } from "@thi.ng/transducers/transduce";
import { map } from "@thi.ng/transducers/xform/map";
import { partition } from "@thi.ng/transducers/xform/partition";
import {
    addNew,
    cartesian,
    ReadonlyVec,
    Vec
} from "@thi.ng/vectors2/api";
import { Mat23 } from "@thi.ng/vectors2/mat23";
import "./container2";
import { centerOfWeight2 } from "./internal/centroid";
import { signedArea } from "./internal/corner";
import { edges as _edges } from "./internal/edges";
import { booleanOp } from "./internal/greiner-hormann";
import { offset as _offset } from "./internal/offset";
import { perimeter as _perimeter } from "./internal/perimeter";
import { pointInside as _pointInside, polygonArea } from "./internal/polygon";
import { Sampler } from "./internal/sampler";
import { subdivideCurve } from "./internal/subdiv-curve";
import { sutherlandHodgeman } from "./internal/sutherland-hodgeman";
import { transformPoints } from "./internal/transform";
import { tessellatePoints } from "./tessellate";
import {
    area,
    Attribs,
    bounds,
    centroid,
    clipConvex,
    ClipMode,
    convexHull,
    Convexity,
    difference,
    edges,
    flip,
    intersection,
    IShape,
    offset,
    perimeter,
    pointAt,
    pointInside,
    Polygon2,
    resample,
    SamplingOpts,
    simplify,
    subdivide,
    SubdivKernel,
    tangentAt,
    tessellate,
    Tessellator,
    transform,
    translate,
    Type,
    union,
    vertices,
    asPolygon,
} from "./api";
import { douglasPeucker2 } from "./internal/douglas–peucker";

export function polygon(points: Vec[], attribs?: Attribs): Polygon2 {
    return new Polygon2(points, attribs);
}

export const star = (r: number, n: number, profile: number[]) => {
    const total = n * profile.length;
    const pts = transduce(
        map(([i, p]) => cartesian([r * p, i * TAU])),
        push(),
        tuples(normRange(total, false), cycle(profile))
    );
    return new Polygon2(pts);
};

const convexityReducer: Reducer<number, ReadonlyVec[]> = [
    () => 0,
    (x) => x,
    (type, [a, b, c]) => {
        const t = signedArea(a, b, c);
        if (t < 0) {
            type |= 1;
        } else if (t > 0) {
            type |= 2;
        }
        return t === 3 ? reduced(3) : type;
    }
];

export const convexity = (poly: Polygon2) => {
    if (poly.points.length < 3) {
        return Convexity.COLINEAR;
    }
    const type = transduce(
        partition(3, 1),
        convexityReducer,
        wrap(poly.points, 1)
    );
    return type === 3 ?
        Convexity.CONCAVE :
        type !== 0 ? Convexity.CONVEX : Convexity.COLINEAR;
};

implementations(
    Type.POLYGON2,

    {
        [Type.POINTS2]: [
            bounds,
            convexHull,
            flip,
            vertices
        ]
    },

    area,
    (poly: Polygon2, signed = true) => {
        const area = polygonArea(poly.points);
        return signed ? area : Math.abs(area);
    },

    asPolygon,
    (poly: Polygon2) => poly,

    centroid,
    (poly: Polygon2, c: Vec) =>
        centerOfWeight2(poly.points, c),

    clipConvex,
    (poly: Polygon2, boundary: IShape) =>
        new Polygon2(
            sutherlandHodgeman(poly.points, vertices(boundary), centroid(boundary)),
            { ...poly.attribs }
        ),

    difference,
    (poly: Polygon2, other: IShape) =>
        booleanOp([poly.points], vertices(other), ClipMode.DIFF_A)
            .map((pts) => new Polygon2(pts, { ...poly.attribs })),

    edges,
    (poly: Polygon2, opts?: number | Partial<SamplingOpts>) =>
        _edges(vertices(poly, opts), true),

    intersection,
    (poly: Polygon2, other: IShape) =>
        booleanOp([poly.points], vertices(other), ClipMode.INTERSECTION)
            .map((pts) => new Polygon2(pts)),

    offset,
    (poly: Polygon2, dist: number, res = 8) => {
        const pts = _offset(poly.points, dist, res, true);
        return pts ?
            new Polygon2(pts, { ...poly.attribs }) :
            undefined;
    },

    perimeter,
    (poly: Polygon2) =>
        _perimeter(poly.points, true),

    pointAt,
    (poly: Polygon2, t: number) =>
        new Sampler(poly.points, true).pointAt(t),

    pointInside,
    (poly: Polygon2, [x, y]: ReadonlyVec) => {
        const pts = poly.points;
        let inside = 0;
        for (let n = pts.length - 1, i = n, j = 0; j <= n; i = j, j++) {
            inside = _pointInside(pts[i], pts[j], x, y, inside);
        }
        return inside;
    },

    resample,
    (poly: Polygon2, opts?: number | Partial<SamplingOpts>) =>
        new Polygon2(vertices(poly, opts), { ...poly.attribs }),

    simplify,
    (poly: Polygon2, eps = 0.1) =>
        new Polygon2(
            douglasPeucker2(poly.points, eps, true),
            { ...poly.attribs }
        ),

    subdivide,
    (poly: Polygon2, kernel: SubdivKernel, iter = 1) =>
        new Polygon2(
            subdivideCurve(kernel, poly.points, iter, true),
            { ...poly.attribs }
        ),

    tangentAt,
    (poly: Polygon2, t: number, n = 1) =>
        new Sampler(poly.points, true).tangentAt(t, n),

    tessellate,
    (poly: Polygon2, tessel: Iterable<Tessellator>) =>
        tessellatePoints(poly.points, tessel),

    transform,
    (poly: Polygon2, mat: Mat23) =>
        new Polygon2(
            transformPoints(poly.points, mat),
            { ...poly.attribs }
        ),

    translate,
    (poly: Polygon2, delta: ReadonlyVec) =>
        new Polygon2(
            poly.points.map((p) => addNew(p, delta)),
            { ...poly.attribs }
        ),

    union,
    (poly: Polygon2, other: IShape) =>
        booleanOp([poly.points], vertices(other), ClipMode.UNION)
            .map((pts) => new Polygon2(pts)),

    vertices,
    (poly: Polygon2, opts?: number | Partial<SamplingOpts>) => {
        if (opts !== undefined) {
            const sampler = new Sampler(poly.points, true);
            return isPlainObject(opts) ?
                opts.dist ?
                    sampler.sampleUniform(opts.dist, opts.last) :
                    sampler.sampleFixedNum(opts.num, opts.last) :
                sampler.sampleFixedNum(opts, false);
        }
        return poly.points;
    },

);
