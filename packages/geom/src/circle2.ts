import { IObjectOf, IToHiccup } from "@thi.ng/api/api";
import { isNumber } from "@thi.ng/checks/is-number";
import { normRange } from "@thi.ng/transducers/iter/norm-range";
import { Vec } from "@thi.ng/vectors/api";
import { mix1, PI, TAU } from "@thi.ng/vectors/math";
import { setS2, toCartesian2, Vec2 } from "@thi.ng/vectors/vec2";
import {
    ArcSamplingOpts,
    IArcLength,
    IBounds,
    ICentroid,
    IToPolygon2,
    IVertices
} from "./api";
import { circumCenter } from "./func/circumcenter";
import { edges } from "./func/edges";
import { Polygon2 } from "./poly2";

export class Circle2 implements
    IArcLength,
    IBounds<Vec2[]>,
    ICentroid<Vec2>,
    IToHiccup,
    IToPolygon2,
    IVertices<Vec2, number | Partial<ArcSamplingOpts>> {

    static from3Points(a: Readonly<Vec2>, b: Readonly<Vec2>, c: Readonly<Vec2>) {
        const o = circumCenter(a, b, c);
        if (o) {
            return new Circle2(o, a.dist(o));
        }
    }

    static DEFAULT_RES = 20;

    pos: Vec2;
    r: number;
    attribs: IObjectOf<any>;

    constructor(pos: Vec2, r = 1, attribs?: IObjectOf<any>) {
        this.pos = pos;
        this.r = r;
        this.attribs = attribs;
    }

    copy() {
        return new Circle2(this.pos.copy(), this.r, { ...this.attribs });
    }

    edges(opts?: Partial<ArcSamplingOpts>) {
        return edges(this.vertices(opts));
    }

    verticesRaw(
        from: number,
        to: number,
        num: number,
        inclLast: boolean,
        dest: Vec = [],
        destOffset = 0,
        cstride = 1,
        estride = 2
    ) {

        const pos = this.pos.buf;
        const po = this.pos.i;
        const ps = this.pos.s;
        const r = this.r;
        for (let t of normRange(inclLast ? num - 1 : num, inclLast)) {
            toCartesian2(
                setS2(dest, r, mix1(from, to, t), destOffset, cstride),
                pos, destOffset, po, cstride, ps
            );
            destOffset += estride;
        }
        return dest;
    }

    vertices(opts?: number | Partial<ArcSamplingOpts>) {
        const [num, last] = isNumber(opts) ?
            [opts, true] :
            [
                opts.theta ?
                    Math.max(Math.ceil(1 + TAU / opts.theta), 2) :
                    opts.num,
                opts.includeLast === true
            ];
        return Vec2.mapBuffer(this.verticesRaw(0, TAU, num, last), num);
    }

    area() {
        return PI * this.r * this.r;
    }

    arcLength() {
        return TAU * this.r;
    }

    bounds() {
        return [
            Vec2.subN(this.pos, this.r),
            Vec2.addN(this.pos, this.r)
        ];
    }

    width() {
        return this.r * 2;
    }

    height() {
        return this.width();
    }

    depth() {
        return 0;
    }

    centroid(c?: Vec2) {
        return c ? c.set(this.pos) : this.pos;
    }

    toPolygon2(opts?: Partial<ArcSamplingOpts>) {
        return new Polygon2(this.vertices(opts));
    }

    toHiccup() {
        return ["circle", this.attribs, this.pos, this.r];
    }

    toJSON() {
        return {
            type: "circle2",
            pos: this.pos.toJSON(),
            r: this.r,
        };
    }
}

export const circle2 = (pos: Vec2, r = 1, attribs?: IObjectOf<any>) =>
    new Circle2(pos, r, attribs);
