import { IObjectOf, IToHiccup } from "@thi.ng/api/api";
import { isPlainObject } from "@thi.ng/checks/is-plain-object";
import { Vec2 } from "@thi.ng/vectors/vec2";
import {
    IArcLength,
    IArea,
    IEdges,
    IVertices,
    SamplingOpts,
    SubdivKernel
} from "./api";
import { PointContainer2 } from "./container2";
import { arcLength } from "./internal/arc-length";
import { edges } from "./internal/edges";
import { Sampler } from "./sampler";
import { subdivideCurve } from "./subdiv-curve";

export class Polyline2 extends PointContainer2 implements
    IArcLength,
    IArea,
    IEdges<Vec2[]>,
    IVertices<Vec2, void | number | Partial<SamplingOpts>>,
    IToHiccup {

    copy() {
        return new Polyline2(this._copy(), { ...this.attribs });
    }

    edges() {
        return edges(this.vertices());
    }

    area() {
        return 0;
    }

    arcLength() {
        return arcLength(this.points);
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

    toHiccup() {
        return this._toHiccup("polyline");
    }

    toJSON() {
        return this._toJSON("polyline2");
    }
}

export const polyline2 = (points: Vec2[], attribs?: IObjectOf<any>) =>
    new Polyline2(points, attribs);
