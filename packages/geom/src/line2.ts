import { isNumber } from "@thi.ng/checks/is-number";
import { isPlainObject } from "@thi.ng/checks/is-plain-object";
import { Vec } from "@thi.ng/vectors/api";
import { Vec2 } from "@thi.ng/vectors/vec2";
import { Attribs, HiccupLine2, SamplingOpts } from "./api";
import { PointContainer2 } from "./container2";
import { liangBarsky2 } from "./internal/liang-barsky";
import { intersectLines2 } from "./internal/line-intersection";
import { Rect2 } from "./rect2";
import { Sampler } from "./sampler";

export class Line2 extends PointContainer2 {

    constructor(points: Vec2[], attribs?: Attribs) {
        if (points.length > 2) {
            points = points.slice(0, 2);
        }
        super(points, attribs);
    }

    copy() {
        return new Line2(this._copy(), { ...this.attribs });
    }

    edges() {
        return this.points.slice(0, 2);
    }

    area() {
        return 0;
    }

    arcLength() {
        const pts = this.points;
        return pts[0].dist(pts[1]);
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

    intersectLine(l: Line2) {
        return intersectLines2(this.points[0], this.points[1], l.points[0], l.points[1]);
    }

    clipRect(bounds: [Vec2, Vec2] | Rect2) {
        const res = bounds instanceof Rect2 ?
            liangBarsky2(this.points[0], this.points[1], bounds.pos, bounds.pos.addNew(bounds.size)) :
            liangBarsky2(this.points[0], this.points[1], bounds[0], bounds[1]);
        if (res) {
            return new Line2([res[0], res[1]], { ...this.attribs });
        }
    }

    toHiccup(): HiccupLine2 {
        return ["line", this.attribs || {}, this.points[0], this.points[1]];
    }

    toHiccupPathSegments() {
        return [["L", this.points[1]]];
    }

    toJSON() {
        return this._toJSON("line2");
    }
}

export function line2(points: Vec, start?: number, cstride?: number, estride?: number, attribs?: Attribs): Line2;
export function line2(x1: number, y1: number, x2: number, y2: number, attribs?: Attribs): Line2;
export function line2(a: Vec2, b: Vec2, attribs?: Attribs): Line2;
export function line2(...args: any[]) {
    let attribs;
    let n = args.length - 1;
    if (isPlainObject(args[n]) || args[n] == null) {
        attribs = args[n];
        n--;
    }
    if (isNumber(args[0])) {
        return new Line2(Vec2.mapBuffer(args.slice(0, 4), 2), attribs);
    }
    if (args[0] instanceof Vec2) {
        return new Line2([args[0], args[1]], attribs);
    }
    return new Line2(Vec2.mapBuffer(args[0], 2, args[1] || 0, args[2] || 1, args[3] || 2), attribs);
}
