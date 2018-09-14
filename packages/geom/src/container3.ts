import { IObjectOf } from "@thi.ng/api/api";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { Vec } from "@thi.ng/vectors/api";
import { transformVectors1 } from "@thi.ng/vectors/common";
import { Mat44, mulV344 } from "@thi.ng/vectors/mat44";
import {
    add3,
    max3,
    min3,
    mul3,
    set3,
    swap3,
    Vec3
} from "@thi.ng/vectors/vec3";

export class PointContainer3 {

    buf: Vec;
    length: number;
    offset: number;
    stride: number;
    attribs: IObjectOf<any>;

    constructor(buf: Vec, num: number, offset = 0, stride = 2) {
        this.buf = buf;
        this.length = num;
        this.offset = offset;
        this.stride = stride;
    }

    *[Symbol.iterator]() {
        yield* this.vertices();
    }

    vertices() {
        return Vec3.mapBuffer(this.buf, this.length, this.offset, 1, this.stride);
    }

    get(i: number, safe = true) {
        safe && this.ensureIndex(i);
        return new Vec3(this.buf, this.offset + i * this.stride);
    }

    set(i: number, v: Readonly<Vec3>, safe = false) {
        safe && this.ensureIndex(i);
        set3(this.buf, v.buf, this.offset + i * this.stride, v.i, 1, v.s);
    }

    bounds() {
        const s = this.stride;
        const pts = this.buf;
        const min = Vec3.MAX.copy();
        const max = Vec3.MIN.copy();
        for (let n = this.length, i = this.offset; n > 0; n-- , i += s) {
            min3(min.buf, pts, 0, i, 1, 1);
            max3(max.buf, pts, 0, i, 1, 1);
        }
        return [min, max];
    }

    centroid(c?: Vec3): Vec3 {
        !this.length && illegalArgs("no points available");
        !c && (c = Vec3.ZERO.copy());
        const s = this.stride;
        const pts = this.buf;
        for (let n = this.length, i = this.offset; n > 0; n-- , i += s) {
            add3(c.buf, pts, c.i, i, c.s, 1);
        }
        return c.divN(this.length);
    }

    center(p?: Readonly<Vec3>) {
        const d = this.centroid().neg();
        return this.translate(p ? d.add(p) : d);
    }

    flip() {
        const s = this.stride;
        for (let i = 0, j = (this.length - 1) * s; i < j; i += s, j -= s) {
            swap3(this.buf, this.buf, i, j);
        }
    }

    scale(v: Readonly<Vec3>) {
        transformVectors1(
            mul3,
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

    translate(t: Readonly<Vec3>) {
        transformVectors1(
            add3,
            this.buf,
            t.buf,
            this.length,
            this.offset,
            t.i,
            1,
            t.s,
            this.stride
        );
        return this;
    }

    transform(mat: Readonly<Mat44>) {
        const s = this.stride;
        for (let n = this.length, i = this.offset; n > 0; n-- , i += s) {
            mulV344(mat.buf, this.buf, mat.i, i, 1);
        }
        return this;
    }

    protected ensureIndex(i: number) {
        (i < 0 && i >= this.length) && illegalArgs(`index out of bounds: ${i}`);
    }
}
