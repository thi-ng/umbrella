import { ICopy, IToHiccup } from "@thi.ng/api/api";
import { isNumber } from "@thi.ng/checks/is-number";
import { isPlainObject } from "@thi.ng/checks/is-plain-object";
import { cycle } from "@thi.ng/transducers/iter/cycle";
import { normRange } from "@thi.ng/transducers/iter/norm-range";
import { tuples } from "@thi.ng/transducers/iter/tuples";
import { push } from "@thi.ng/transducers/rfn/push";
import { transduce } from "@thi.ng/transducers/transduce";
import { map } from "@thi.ng/transducers/xform/map";
import { Vec } from "@thi.ng/vectors/api";
import { TAU } from "@thi.ng/vectors/math";
import { asVec2, toCartesian2, Vec2 } from "@thi.ng/vectors/vec2";
import {
    Attribs,
    HiccupPolygon2,
    IArcLength,
    IArea,
    IEdges,
    IPointInside,
    SamplingOpts,
    SubdivKernel
} from "./api";
import { PointContainer2 } from "./container2";
import { arcLength } from "./internal/arc-length";
import { polygonArea } from "./internal/area";
import { centerOfWeight, centroid } from "./internal/centroid";
import { closestPointPolyline } from "./internal/closest-point";
import { edges } from "./internal/edges";
import { containsDelta } from "./internal/eq-delta";
import { clipConvex } from "./internal/sutherland-hodgeman";
import { Sampler } from "./sampler";
import { subdivideCurve } from "./subdiv-curve";
import { simplifyPolyline } from "./internal/douglas–peucker";

export class Polygon2 extends PointContainer2 implements
    IArcLength,
    IArea,
    ICopy<Polygon2>,
    IEdges<Vec2[]>,
    IPointInside<Vec2>,
    IToHiccup {

    static fromHiccup([_, attribs, pts]: HiccupPolygon2) {
        return new Polygon2(
            isNumber(pts[0]) ?
                Vec2.mapBuffer(<number[]>pts) :
                (<number[][]>pts).map(asVec2),
            attribs
        );
    }

    static star(r: number, n: number, profile: number[]) {
        const total = n * profile.length;
        const pts = transduce(
            map(([i, p]) => new Vec2(toCartesian2([r * p, i * TAU]))),
            push(),
            tuples(normRange(total, false), cycle(profile))
        );
        return new Polygon2(pts);
    }

    copy() {
        return new Polygon2(this._copy(), { ...this.attribs });
    }

    edges() {
        return edges(this.points, true);
    }

    area(signed = true) {
        const area = polygonArea(this.points);
        return signed ? area : Math.abs(area);
    }

    arcLength() {
        return arcLength(this.points, true);
    }

    centroid(c?: Vec2): Vec2 {
        return centerOfWeight(this.points, c);
    }

    closestPoint(p: Readonly<Vec2>) {
        return closestPointPolyline(p, this.points, true);
    }

    pointInside(p: Readonly<Vec2>) {
        const pts = this.points;
        if (containsDelta(pts, p)) return true;
        const px = p.x;
        const py = p.y;
        let inside = false;
        for (let n = pts.length - 1, i = n, j = 0; j < n; i = j, j++) {
            const [ax, ay] = pts[i];
            const [bx, by] = pts[j];
            (((by < py && ay >= py) || (ay < py && by >= py)) &&
                ((py - by) / (ay - by) * (ax - bx) + bx) < px) &&
                (inside = !inside);
        }
        return inside;
    }

    simplify(eps: number) {
        return new Polygon2(simplifyPolyline(this.points, eps, true), { ...this.attribs });
    }

    vertices(opts?: number | Partial<SamplingOpts>) {
        const sampler = new Sampler(this.points, true);
        if (opts !== undefined) {
            return isPlainObject(opts) ?
                opts.dist ?
                    sampler.sampleUniform(opts.dist, opts.last) :
                    sampler.sampleFixedNum(opts.num, opts.last) :
                sampler.sampleFixedNum(opts, false);
        } else {
            return this.points;
        }
    }

    clipConvex(boundary: Polygon2 | Vec2[]) {
        let bpts, bc;
        if (boundary instanceof Polygon2) {
            bpts = boundary.points;
            bc = boundary.centroid();
        } else {
            bpts = boundary;
            bc = centroid(bpts, new Vec2());
        }
        return new Polygon2(clipConvex(this.points, bpts, bc), { ...this.attribs });
    }

    subdivide(kernel: SubdivKernel<Vec2>, iter = 1) {
        return new Polygon2(subdivideCurve(kernel, this.points, iter, true), { ...this.attribs });
    }

    toHiccup() {
        return this._toHiccup("polygon");
    }

    toJSON() {
        return this._toJSON("polygon2");
    }
}

export function polygon2(points: Vec, num?: number, start?: number, cstride?: number, estride?: number, attribs?: Attribs): Polygon2;
export function polygon2(points: Vec2[], attribs?: Attribs): Polygon2;
export function polygon2(points, ...args: any[]) {
    let attribs;
    if (isNumber(points[0])) {
        points = Vec2.mapBuffer(
            points,
            args[0] || points.length / 2,
            args[1] || 0,
            args[2] || 1,
            args[3] || 2
        );
        attribs = args[4];
    } else {
        attribs = args[0];
    }
    return new Polygon2(points, attribs);
}
