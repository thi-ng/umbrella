import { IObjectOf } from "@thi.ng/api/api";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { Vec } from "@thi.ng/vectors/api";
import { transformVectors1 } from "@thi.ng/vectors/common";
import { Mat23, mulV23 } from "@thi.ng/vectors/mat23";
import {
    add2,
    max2,
    min2,
    mul2,
    set2,
    swap2,
    Vec2
} from "@thi.ng/vectors/vec2";

export class PointContainer2 {

    buf: Vec;
    length: number;
    offset: number;
    stride: number;
    attribs: IObjectOf<any>;

    constructor(buf: Vec, num?: number, attribs?: IObjectOf<any>, offset = 0, stride = 2) {
        this.buf = buf;
        this.length = num != null ? num : buf.length / 2;
        this.attribs = attribs;
        this.offset = offset;
        this.stride = stride;
    }

    *[Symbol.iterator]() {
        yield* this.vertices();
    }

    vertices() {
        return Vec2.mapBuffer(this.buf, this.length, this.offset, 1, this.stride);
    }

    get(i: number, safe = true) {
        safe && this.ensureIndex(i);
        return new Vec2(this.buf, this.offset + i * this.stride);
    }

    set(i: number, v: Readonly<Vec2>, safe = true) {
        safe && this.ensureIndex(i);
        set2(this.buf, v.buf, this.offset + i * this.stride, v.i, 1, v.s);
    }

    bounds() {
        const s = this.stride;
        const pts = this.buf;
        const min = Vec2.MAX.copy();
        const max = Vec2.MIN.copy();
        for (let n = this.length, i = this.offset; n > 0; n-- , i += s) {
            min2(min.buf, pts, 0, i, 1, 1);
            max2(max.buf, pts, 0, i, 1, 1);
        }
        return [min, max];
    }

    centroid(c?: Vec2): Vec2 {
        !this.length && illegalArgs("no points available");
        !c && (c = Vec2.ZERO.copy());
        const s = this.stride;
        const pts = this.buf;
        for (let n = this.length, i = this.offset; n > 0; n-- , i += s) {
            add2(c.buf, pts, c.i, i, c.s, 1);
        }
        return c.divN(this.length);
    }

    center(origin?: Readonly<Vec2>) {
        const d = this.centroid().neg();
        return this.translate(origin ? d.add(origin) : d);
    }

    flip() {
        const s = this.stride;
        for (let i = 0, j = (this.length - 1) * s; i < j; i += s, j -= s) {
            swap2(this.buf, this.buf, i, j);
        }
    }

    scale(v: Readonly<Vec2>) {
        transformVectors1(
            mul2,
            this.buf,
            v.buf,
            this.length,
            this.offset,
            v.i,
            1,
            v.s,
            this.stride
        );
        return this;
    }

    translate(v: Readonly<Vec2>) {
        transformVectors1(
            add2,
            this.buf,
            v.buf,
            this.length,
            this.offset,
            v.i,
            1,
            v.s,
            this.stride
        );
        return this;
    }

    transform(mat: Readonly<Mat23>) {
        transformVectors1(
            mulV23,
            this.buf,
            mat.buf,
            this.length,
            this.offset,
            mat.i,
            1,
            1,
            this.stride
        );
        return this;
    }

    protected ensureIndex(i: number) {
        (i < 0 && i >= this.length) && illegalArgs(`index out of bounds: ${i}`);
    }
}
