import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { Mat44 } from "@thi.ng/vectors/mat44";
import { Vec3, vec3 } from "@thi.ng/vectors/vec3";
import {
    Attribs,
    CollateOpts,
    IBounds,
    IBoundsRaw,
    ICenter,
    ICentroid,
    ICollate,
    IVertices
} from "./api";
import { bounds } from "./internal/bounds";
import { collateWith } from "./internal/collate";

export class PointContainer3 implements
    IBoundsRaw<Vec3>,
    IBounds<Vec3[]>, // TODO
    ICentroid<Vec3>,
    ICenter<Vec3>,
    ICollate,
    IVertices<Vec3, void> {

    points: Vec3[];
    attribs: Attribs;

    constructor(pts: Vec3[], attribs?: Attribs) {
        this.points = pts;
        this.attribs = attribs;
    }

    *[Symbol.iterator]() {
        yield* this.vertices();
    }

    collate(opts?: Partial<CollateOpts>) {
        return collateWith(Vec3.intoBuffer, this.points, opts, 3);
    }

    vertices() {
        return this.points;
    }

    boundsRaw() {
        return bounds(this.points, Vec3.MAX.copy(), Vec3.MIN.copy());
    }

    bounds() {
        return this.boundsRaw();
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
        return this;
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

    protected _toJSON(type: string) {
        return {
            type,
            attribs: this.attribs,
            points: this.points.map((p) => p.toJSON())
        };
    }
}
