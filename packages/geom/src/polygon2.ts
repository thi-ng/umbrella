import { IToHiccup } from "@thi.ng/api/api";
import { isNumber } from "@thi.ng/checks/is-number";
import { isPlainObject } from "@thi.ng/checks/is-plain-object";
import { Vec } from "@thi.ng/vectors/api";
import { asVec2, Vec2 } from "@thi.ng/vectors/vec2";
import {
    Attribs,
    HiccupPolygon2,
    IArcLength,
    IArea,
    IEdges,
    SamplingOpts,
    SubdivKernel
} from "./api";
import { PointContainer2 } from "./container2";
import { arcLength } from "./internal/arc-length";
import { centerOfWeight, centroid } from "./internal/centroid";
import { edges } from "./internal/edges";
import { clipConvex } from "./internal/sutherland-hodgeman";
import { Sampler } from "./sampler";
import { subdivideCurve } from "./subdiv-curve";
import { simplify } from "./internal/douglas–peucker";

export class Polygon2 extends PointContainer2 implements
    IArcLength,
    IArea,
    IEdges<Vec2[]>,
    IToHiccup {

    static fromHiccup([_, attribs, pts]: HiccupPolygon2) {
        return new Polygon2(
            isNumber(pts[0]) ?
                Vec2.mapBuffer(<number[]>pts) :
                (<number[][]>pts).map(asVec2),
            attribs
        );
    }

    copy() {
        return new Polygon2(this._copy(), { ...this.attribs });
    }

    edges() {
        return edges(this.vertices(), true);
    }

    area(unsigned = true) {
        const pts = this.points;
        let res = 0;
        for (let n = pts.length - 1, i = n, j = 0; n >= 0; i = j, j++ , n--) {
            res += pts[i].cross(pts[j]);
        }
        res /= 2;
        return unsigned ? res : Math.abs(res);
    }

    arcLength() {
        return arcLength(this.points, true);
    }

    centroid(c?: Vec2): Vec2 {
        return centerOfWeight(this.points, c);
    }

    simplify(eps: number) {
        return new Polygon2(simplify(this.points, eps, true), { ...this.attribs });
    }

    vertices(opts?: number | Partial<SamplingOpts>) {
        const sampler = new Sampler(this.points, true);
        if (opts !== undefined) {
            if (isPlainObject(opts)) {
                return opts.dist ?
                    sampler.sampleUniform(opts.dist, opts.last) :
                    sampler.sampleFixedNum(opts.num, opts.last);
            }
            return sampler.sampleFixedNum(opts, false);
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
            args[1] || points.length / 2,
            args[2] || 0,
            args[3] || 1,
            args[4] || 2
        );
        attribs = args[5];
    } else {
        attribs = args[1];
    }
    return new Polygon2(points, attribs);
}
