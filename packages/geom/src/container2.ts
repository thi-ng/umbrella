import { Mat23 } from "@thi.ng/vectors/mat23";
import { Vec2 } from "@thi.ng/vectors/vec2";
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
import { fitIntoBounds2 } from "./fit";
import { bounds } from "./internal/bounds";
import { centroid } from "./internal/centroid";
import { collateWith } from "./internal/collate";
import { convexHull } from "./internal/graham-scan";
import { Rect2 } from "./rect2";

export class PointContainer2 implements
    IBoundsRaw<Vec2>,
    IBounds<Rect2>,
    ICentroid<Vec2>,
    ICenter<Vec2>,
    ICollate,
    IVertices<Vec2, void> {

    points: Vec2[];
    attribs: Attribs;

    constructor(pts: Vec2[], attribs?: Attribs) {
        this.points = pts;
        this.attribs = attribs;
    }

    *[Symbol.iterator]() {
        yield* this.vertices();
    }

    collate(opts?: Partial<CollateOpts>) {
        return collateWith(Vec2.intoBuffer, this.points, opts, 2);
    }

    vertices() {
        return this.points;
    }

    boundsRaw() {
        return bounds<Vec2>(this.points, Vec2.MAX.copy(), Vec2.MIN.copy());
    }

    bounds(): Rect2 {
        return Rect2.fromMinMax(...this.boundsRaw());
    }

    convextHull() {
        return convexHull(this.points);
    }

    centroid(c?: Vec2) {
        return centroid(this.points, c || new Vec2());
    }

    center(origin?: Readonly<Vec2>) {
        const d = this.centroid().neg();
        return this.translate(origin ? d.add(origin) : d);
    }

    flip() {
        this.points.reverse();
        return this;
    }

    fit(bounds: Rect2) {
        fitIntoBounds2(this, bounds);
        return this;
    }

    rotate(theta: number) {
        const pts = this.points;
        for (let i = pts.length; --i >= 0;) {
            pts[i].rotate(theta);
        }
        return this;
    }

    scale(v: Readonly<Vec2>) {
        const pts = this.points;
        for (let i = pts.length; --i >= 0;) {
            pts[i].mul(v);
        }
        return this;
    }

    scaleN(n: number) {
        const pts = this.points;
        for (let i = pts.length; --i >= 0;) {
            pts[i].mulN(n);
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

    protected _copy(pts = this.points) {
        return Vec2.mapBuffer(Vec2.intoBuffer([], pts), pts.length);
    }

    protected _toJSON(type: string) {
        return {
            type,
            attribs: this.attribs,
            points: this.points.map((p) => p.toJSON())
        };
    }

    protected _toHiccup(type: string) {
        return [type, this.attribs, this.points];
    }
}
