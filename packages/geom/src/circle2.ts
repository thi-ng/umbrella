import { IObjectOf } from "@thi.ng/api/api";
import { normRange } from "@thi.ng/transducers/iter/norm-range";
import { Vec } from "@thi.ng/vectors/api";
import { mix1, PI, TAU } from "@thi.ng/vectors/math";
import { setS2, toCartesian2, Vec2 } from "@thi.ng/vectors/vec2";
import { Polygon2 } from "./poly2";

export class Circle2 {

    pos: Vec2;
    r: number;
    attribs: IObjectOf<any>;

    constructor(pos: Vec2, r = 1, attribs?: IObjectOf<any>) {
        this.pos = pos;
        this.r = r;
        this.attribs = attribs;
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

    vertices(res = 20) {
        return Vec2.mapBuffer(this.verticesRaw(0, TAU, res, false), res);
    }

    area() {
        return PI * this.r * this.r;
    }

    circumference() {
        return TAU * this.r;
    }

    bounds() {
        return [
            Vec2.subN(this.pos, this.r),
            Vec2.addN(this.pos, this.r)
        ];
    }

    toPolygon(res = 20) {
        return new Polygon2(this.vertices(res));
    }

    toHiccup() {
        return ["circle", this.attribs, this.pos, this.r];
    }
}

export const circle2 = (pos: Vec2, r = 1, attribs?: IObjectOf<any>) =>
    new Circle2(pos, r, attribs);
