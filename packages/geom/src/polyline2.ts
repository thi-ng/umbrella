import { ICopy, IToHiccup } from "@thi.ng/api/api";
import { isPlainObject } from "@thi.ng/checks/is-plain-object";
import { map } from "@thi.ng/transducers/xform/map";
import { partition } from "@thi.ng/transducers/xform/partition";
import { ReadonlyVec, Vec } from "@thi.ng/vectors/api";
import { Vec2 } from "@thi.ng/vectors/vec2";
import {
    Attribs,
    IArcLength,
    IArea,
    IEdges,
    IToCubic,
    IVertices,
    SamplingOpts,
    SubdivKernel
} from "./api";
import { Cubic2 } from "./bezier2";
import { PointContainer2 } from "./container2";
import { arcLength } from "./internal/arc-length";
import { argsN } from "./internal/args";
import { closestPointPolyline } from "./internal/closest-point";
import { edges } from "./internal/edges";
import { Sampler } from "./sampler";
import { subdivideCurve } from "./subdiv-curve";

export class Polyline2 extends PointContainer2 implements
    IArcLength,
    IArea,
    ICopy<Polyline2>,
    IEdges<Vec2[]>,
    IVertices<Vec2, void | number | Partial<SamplingOpts>>,
    IToCubic,
    IToHiccup {

    copy() {
        return new Polyline2(this._copy(), { ...this.attribs });
    }

    edges() {
        return edges(this.points);
    }

    area() {
        return 0;
    }

    arcLength() {
        return arcLength(this.points);
    }

    closestPoint(p: Readonly<Vec2>) {
        return closestPointPolyline(p, this.points, false);
    }

    subdivide(kernel: SubdivKernel<Vec2>, iter = 1) {
        return new Polyline2(subdivideCurve(kernel, this.points, iter, false), { ...this.attribs });
    }

    vertices(opts?: number | Partial<SamplingOpts>) {
        const sampler = new Sampler(this.points);
        if (opts !== undefined) {
            if (isPlainObject(opts)) {
                return opts.dist ?
                    sampler.sampleUniform(opts.dist, opts.last !== false) :
                    sampler.sampleFixedNum(opts.num, opts.last !== false);
            }
            return sampler.sampleFixedNum(opts, true);
        } else {
            return this.points;
        }
    }

    toCubic() {
        return map(
            ([a, b]) => Cubic2.fromLine(a, b, { ...this.attribs }),
            partition(2, 1, this.points)
        );
    }

    toHiccup() {
        return this._toHiccup("polyline");
    }

    toHiccupPathSegments() {
        const res: any[] = [];
        for (let pts = this.points, n = pts.length, i = 1; i < n; i++) {
            res.push(["L", pts[i]]);
        }
        return res;
    }

    toJSON() {
        return this._toJSON("polyline2");
    }
}

export function polyline2(points: Vec, num?: number, start?: number, cstride?: number, estride?: number, attribs?: Attribs): Polyline2;
export function polyline2(points: ReadonlyVec[], attribs?: Attribs): Polyline2;
export function polyline2(...args: any[]) {
    const [points, attribs] = argsN(args);
    return new Polyline2(points, attribs);
}
