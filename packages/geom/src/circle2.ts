import { IObjectOf } from "@thi.ng/api/api";
import { normRange } from "@thi.ng/transducers/iter/norm-range";
import { Vec } from "@thi.ng/vectors/api";
import { mix1, PI, TAU } from "@thi.ng/vectors/math";
import {
    addN2o,
    set2,
    setS2,
    subN2o,
    toCartesian2,
    Vec2
} from "@thi.ng/vectors/vec2";

import { Polygon2 } from "./poly2";

export class Circle2 {

    buf: Vec;
    offset: number;
    attribs: any;

    constructor(buf: Vec, attribs?: IObjectOf<any>, offset = 0) {
        this.buf = buf;
        this.attribs = attribs;
        this.offset = offset;
    }

    get pos() {
        return new Vec2(this.buf, this.offset);
    }

    set pos(v: Readonly<Vec2>) {
        set2(this.buf, v.buf, this.offset, v.i, 1, v.s);
    }

    get r() {
        return this.buf[this.offset + 2];
    }

    set r(r: number) {
        this.buf[this.offset + 2] = r;
    }

    verticesRaw(from: number,
        to: number,
        res: number,
        inclLast: boolean,
        dest: Vec = [],
        destOffset = 0,
        cstride = 1,
        estride = 2) {

        const buf = this.buf;
        const o = this.offset;
        const r = buf[o + 2];
        for (let t of normRange(inclLast ? res - 1 : res, inclLast)) {
            toCartesian2(setS2(dest, r, mix1(from, to, t), destOffset, cstride), buf, destOffset, o, cstride, 1);
            destOffset += estride;
        }
        return dest;
    }

    vertices(res = 20) {
        return Vec2.mapBuffer(this.verticesRaw(0, TAU, res, false), res);
    }

    area() {
        return PI * Math.pow(this.r, 2);
    }

    circumference() {
        return TAU * this.r;
    }

    bounds() {
        const buf = this.buf;
        return [
            new Vec2(subN2o([], buf, buf[2], 0, this.offset)),
            new Vec2(addN2o([], buf, buf[2], 0, this.offset))
        ];
    }

    toPolygon(res = 20) {
        return new Polygon2(this.verticesRaw(0, TAU, res, false), res);
    }

    toHiccup() {
        return ["circle", this.attribs, this.pos, this.r];
    }
}

export const circle2m = (buf: Vec, attribs?: IObjectOf<any>, offset?: number) =>
    new Circle2(buf, attribs, offset);

export const circle2 = (pos: Readonly<Vec2>, r = 1, attribs?: IObjectOf<any>) =>
    new Circle2([pos.x, pos.y, r], attribs, 0);
