import { IObjectOf } from "@thi.ng/api/api";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { Vec } from "@thi.ng/vectors/api";
import { Mat44 } from "@thi.ng/vectors/mat44";
import { Vec3, vec3 } from "@thi.ng/vectors/vec3";
import {
    IBounds,
    ICentroid,
    ICollate,
    IVertices
} from "./api";
import { bounds } from "./func/bounds";

export class PointContainer3 implements
    IBounds<Vec3[]>,
    ICentroid<Vec3>,
    ICollate,
    IVertices<Vec3> {

    points: Vec3[];
    attribs: IObjectOf<any>;

    constructor(pts: Vec3[], attribs?: IObjectOf<any>) {
        this.points = pts;
        this.attribs = attribs;
    }

    *[Symbol.iterator]() {
        yield* this.vertices();
    }

    collate(remap = true, buf: Vec, start = 0, cstride = 1, estride = 3) {
        if (!remap) {
            this.points = this._copy();
        } else {
            const pts = this.points;
            const n = pts.length;
            buf = Vec3.intoBuffer(buf || new Array(start + n * estride).fill(0), pts, start, cstride, estride);
            for (let i = 0; i < n; i++) {
                const p = pts[i];
                p.buf = buf;
                p.i = start + i * estride;
                p.s = cstride;
            }
        }
        return this;
    }

    vertices() {
        return this.points;
    }

    bounds() {
        return bounds(this.points, Vec3.MAX.copy(), Vec3.MIN.copy());
    }

    width() {
        const b = this.bounds();
        return b[1].x - b[0].x;
    }

    height() {
        const b = this.bounds();
        return b[1].y - b[0].y;
    }

    depth() {
        const b = this.bounds();
        return b[1].z - b[0].z;
    }

    centroid(c?: Vec3): Vec3 {
        const pts = this.points;
        const num = pts.length;
        !num && illegalArgs("no points available");
        !c && (c = vec3());
        for (let i = num; --i >= 0;) {
            c.add(pts[i]);
        }
        return c.divN(num);
    }

    center(p?: Readonly<Vec3>) {
        const d = this.centroid().neg();
        return this.translate(p ? d.add(p) : d);
    }

    flip() {
        this.points.reverse();
    }

    scale(v: Readonly<Vec3>) {
        const pts = this.points;
        for (let i = pts.length; --i >= 0;) {
            pts[i].mul(v);
        }
        return this;
    }

    translate(v: Readonly<Vec3>) {
        const pts = this.points;
        for (let i = pts.length; --i >= 0;) {
            pts[i].add(v);
        }
        return this;
    }

    transform(mat: Readonly<Mat44>) {
        const pts = this.points;
        for (let i = pts.length; --i >= 0;) {
            mat.mulV3(pts[i]);
        }
        return this;
    }

    protected _copy() {
        return Vec3.mapBuffer(Vec3.intoBuffer([], this.points), this.points.length);
    }
}
