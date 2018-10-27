import { isPlainObject } from "@thi.ng/checks/is-plain-object";
import { implementations } from "@thi.ng/defmulti";
import { Vec } from "@thi.ng/vectors2/api";
import {
    arcLength,
    area,
    Attribs,
    bounds,
    centroid,
    convexHull,
    Polygon2,
    resample,
    SamplingOpts,
    Shape,
    simplify,
    tessellate,
    Tessellator,
    Type,
    vertices
} from "./api";
import { arcLength as _arcLength } from "./internal/arc-length";
import { polygonArea } from "./internal/area";
import { centerOfWeight2 } from "./internal/centroid";
import { grahamScan2 } from "./internal/graham-scan";
import { Sampler } from "./internal/sampler";
import { sutherlandHodgeman } from "./internal/sutherland-hodgeman";
import { tessellatePoints } from "./tessellate";
import { douglasPeucker2 } from "./internal/douglas–peucker";

export function polygon(points: Vec[], attribs?: Attribs): Polygon2 {
    return new Polygon2(points, attribs);
}

const type = Type.POLYGON2;

bounds.isa(type, Type.POINTS2);
vertices.isa(type, Type.POINTS2);

implementations(
    type,

    arcLength,
    (x: Polygon2) => _arcLength(x.points, true),

    area,
    (x: Polygon2, signed = true) => {
        const area = polygonArea(x.points);
        return signed ? area : Math.abs(area);
    },

    centroid,
    (x: Polygon2, c: Vec) => centerOfWeight2(x.points, c),

    convexHull,
    (poly: Polygon2) => grahamScan2(poly.points),

    resample,
    (x: Polygon2, opts?: number | SamplingOpts) =>
        new Polygon2(vertices(x, opts), { ...this.attribs }),

    simplify,
    (x: Polygon2, eps = 0.1) =>
        new Polygon2(
            douglasPeucker2(x.points, eps, true),
            { ...this.attribs }
        ),

    tessellate,
    (x: Polygon2, tessel: Iterable<Tessellator>) =>
        tessellatePoints(x.points, tessel),

    vertices,
    (x: Polygon2, opts?: number | SamplingOpts) => {
        if (opts !== undefined) {
            const sampler = new Sampler(x.points, true);
            return isPlainObject(opts) ?
                opts.dist ?
                    sampler.sampleUniform(opts.dist, opts.last) :
                    sampler.sampleFixedNum(opts.num, opts.last) :
                sampler.sampleFixedNum(opts, false);
        }
        return x.points;
    },
);

export const clipConvex = (poly: Polygon2, boundary: Shape) =>
    sutherlandHodgeman(poly.points, vertices(boundary), centroid(boundary));
