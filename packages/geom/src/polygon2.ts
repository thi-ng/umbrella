import { ICopy, IToHiccup } from "@thi.ng/api/api";
import { isNumber } from "@thi.ng/checks/is-number";
import { isPlainObject } from "@thi.ng/checks/is-plain-object";
import { TAU } from "@thi.ng/math/api";
import { cycle } from "@thi.ng/transducers/iter/cycle";
import { normRange } from "@thi.ng/transducers/iter/norm-range";
import { tuples } from "@thi.ng/transducers/iter/tuples";
import { push } from "@thi.ng/transducers/rfn/push";
import { transduce } from "@thi.ng/transducers/transduce";
import { map } from "@thi.ng/transducers/xform/map";
import { ReadonlyVec, Vec } from "@thi.ng/vectors/api";
import { asVec2, toCartesian2, Vec2 } from "@thi.ng/vectors/vec2";
import {
    Attribs,
    HiccupPolygon2,
    IArcLength,
    IArea,
    IEdges,
    IPointInside,
    ITessellateable,
    SamplingOpts,
    SubdivKernel,
    Tessellator
} from "./api";
import { PointContainer2 } from "./container2";
import { arcLength } from "./internal/arc-length";
import { polygonArea } from "./internal/area";
import { argsN } from "./internal/args";
import { centerOfWeight, centroid } from "./internal/centroid";
import { closestPointPolyline } from "./internal/closest-point";
import { edges } from "./internal/edges";
import { containsDelta } from "./internal/eq-delta";
import { clipConvex } from "./internal/sutherland-hodgeman";
import { Sampler } from "./sampler";
import { subdivideCurve } from "./subdiv-curve";
import { tessellate } from "./tessellate";
import { simplifyPolyline } from "./internal/douglas–peucker";

export class Polygon2 extends PointContainer2 implements
    IArcLength,
    IArea,
    ICopy<Polygon2>,
    IEdges<Vec2[]>,
    IPointInside<Vec2>,
    ITessellateable<Vec2>,
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

    tessellate(tessel: Tessellator<Vec2>, iter?: number): Vec2[][];
    tessellate(tessel: Iterable<Tessellator<Vec2>>): Vec2[][];
    tessellate(...args: any[]) {
        return tessellate.apply(null, [this.points, ...args]);
    }

    toHiccup() {
        return this._toHiccup("polygon");
    }

    toJSON() {
        return this._toJSON("polygon2");
    }
}

export function polygon2(points: Vec, num?: number, start?: number, cstride?: number, estride?: number, attribs?: Attribs): Polygon2;
export function polygon2(points: ReadonlyVec[], attribs?: Attribs): Polygon2;
export function polygon2(...args: any[]) {
    const [points, attribs] = argsN(args);
    return new Polygon2(points, attribs);
}
