import { IObjectOf, IToHiccup } from "@thi.ng/api/api";
import { IToPolygon2, IVertices, IBounds, ICentroid, IArcLength } from "@thi.ng/geom/src/api";
import { normRange } from "@thi.ng/transducers/iter/norm-range";
import { Vec } from "@thi.ng/vectors/api";
import { mix1, PI, TAU } from "@thi.ng/vectors/math";
import { setS2, toCartesian2, Vec2 } from "@thi.ng/vectors/vec2";
import { circumCenter } from "./func/circumcenter";
import { Polygon2 } from "./poly2";

export class Circle2 implements
    IArcLength,
    IBounds<Vec2[]>,
    ICentroid<Vec2>,
    IToHiccup,
    IToPolygon2,
    IVertices<Vec2> {

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

    verticesRaw(
        from: number,
        to: number,
        res: number,
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
        for (let t of normRange(inclLast ? res - 1 : res, inclLast)) {
            toCartesian2(
                setS2(dest, r, mix1(from, to, t), destOffset, cstride),
                pos, destOffset, po, cstride, ps
            );
            destOffset += estride;
        }
        return dest;
    }

    vertices(res = Circle2.DEFAULT_RES) {
        return Vec2.mapBuffer(this.verticesRaw(0, TAU, res, false), res);
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

    toPolygon2(res = Circle2.DEFAULT_RES) {
        return new Polygon2(this.vertices(res));
    }

    toHiccup() {
        return ["circle", this.attribs, this.pos, this.r];
    }
}

export const circle2 = (pos: Vec2, r = 1, attribs?: IObjectOf<any>) =>
    new Circle2(pos, r, attribs);
