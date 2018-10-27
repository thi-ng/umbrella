import { isPlainObject } from "@thi.ng/checks/is-plain-object";
import { implementations } from "@thi.ng/defmulti";
import { Vec } from "@thi.ng/vectors2/api";
import {
    arcLength,
    Attribs,
    bounds,
    centroid,
    convexHull,
    DEFAULT_SAMPLES,
    Polyline2,
    resample,
    SamplingOpts,
    simplify,
    Type,
    vertices
} from "./api";
import { arcLength as _arcLength } from "./internal/arc-length";
import { centroid as _centroid } from "./internal/centroid";
import { grahamScan2 } from "./internal/graham-scan";
import { Sampler } from "./internal/sampler";
import { douglasPeucker2 } from "./internal/douglas–peucker";

export function polyline(points: Vec[], attribs?: Attribs): Polyline2 {
    return new Polyline2(points, attribs);
}

const type = Type.POLYLINE2;

bounds.isa(type, Type.POINTS2);
vertices.isa(type, Type.POINTS2);

implementations(
    type,

    arcLength,
    (x: Polyline2) => _arcLength(x.points, false),

    centroid,
    (x: Polyline2, c: Vec) => _centroid(x.points, c),

    convexHull,
    (poly: Polyline2) => grahamScan2(poly.points),

    resample,
    (x: Polyline2, opts?: number | SamplingOpts) =>
        new Polyline2(vertices(x, opts), { ...this.attribs }),

    simplify,
    (x: Polyline2, eps = 0.1) =>
        new Polyline2(
            douglasPeucker2(x.points, eps, true),
            { ...this.attribs }
        ),

    vertices,
    (x: Polyline2, opts?: number | SamplingOpts) => {
        if (opts !== undefined) {
            const sampler = new Sampler(x.points, false);
            return isPlainObject(opts) ?
                opts.dist ?
                    sampler.sampleUniform(opts.dist, opts.last !== false) :
                    sampler.sampleFixedNum(opts.num, opts.last !== false) :
                sampler.sampleFixedNum(opts || DEFAULT_SAMPLES, true);
        }
        return x.points;
    },
);
