import { IObjectOf } from "@thi.ng/api/api";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { Mat44 } from "@thi.ng/vectors/mat44";
import { Vec3, vec3 } from "@thi.ng/vectors/vec3";
import { IBounds, ICentroid, IVertices } from "./api";
import { bounds } from "./func/bounds";

export class PointContainer3 implements
    IBounds<Vec3[]>,
    ICentroid<Vec3>,
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
}
