import { IObjectOf } from "@thi.ng/api/api";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { Mat23 } from "@thi.ng/vectors/mat23";
import { Vec2, vec2 } from "@thi.ng/vectors/vec2";
import { IBounds, ICentroid, IVertices } from "./api";
import { bounds } from "./func/bounds";

export class PointContainer2 implements
    IBounds<Vec2[]>,
    ICentroid<Vec2>,
    IVertices<Vec2> {

    points: Vec2[];
    attribs: IObjectOf<any>;

    constructor(pts: Vec2[], attribs?: IObjectOf<any>) {
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
        return bounds(this.points, Vec2.MAX.copy(), Vec2.MIN.copy());
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
        return 0;
    }

    centroid(c?: Vec2): Vec2 {
        const pts = this.points;
        const num = pts.length;
        !num && illegalArgs("no points available");
        !c && (c = vec2());
        for (let i = num; --i >= 0;) {
            c.add(pts[i]);
        }
        return c.divN(num);
    }

    center(origin?: Readonly<Vec2>) {
        const d = this.centroid().neg();
        return this.translate(origin ? d.add(origin) : d);
    }

    flip() {
        this.points.reverse();
    }

    scale(v: Readonly<Vec2>) {
        const pts = this.points;
        for (let i = pts.length; --i >= 0;) {
            pts[i].mul(v);
        }
        return this;
    }

    translate(v: Readonly<Vec2>) {
        const pts = this.points;
        for (let i = pts.length; --i >= 0;) {
            pts[i].add(v);
        }
        return this;
    }

    transform(mat: Readonly<Mat23>) {
        const pts = this.points;
        for (let i = pts.length; --i >= 0;) {
            mat.mulV(pts[i]);
        }
        return this;
    }
}
