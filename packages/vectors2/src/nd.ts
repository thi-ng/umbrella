import { isArrayLike } from "@thi.ng/checks/is-arraylike";
import { isNumber } from "@thi.ng/checks/is-number";
import { equiv } from "@thi.ng/equiv";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { unsupported } from "@thi.ng/errors/unsupported";
import { EPS } from "@thi.ng/math/api";
import { floatFixedWidth } from "@thi.ng/strings/float";
import { padLeft } from "@thi.ng/strings/pad-left";
import { truncate } from "@thi.ng/strings/truncate";
import { INDArray, NDVec } from "./api";
import { declareIndices } from "./internal/accessors";
import { eqDelta as _eqDelta } from "./internal/equiv";

export class NDArray1<T> implements
    INDArray<T> {

    buf: NDVec<T>;
    i: number;
    s: number;
    readonly length: number;

    x: number;
    y: number;
    z: number;
    w: number;
    [id: number]: number;

    constructor(buf: NDVec<T>, shape: number[], strides: number[], offset = 0) {
        this.buf = buf;
        this.i = offset;
        this.s = strides[0];
        this.length = shape[0];
    }

    *[Symbol.iterator]() {
        for (let i = this.i, y = this.length, s = this.s, buf = this.buf; --y >= 0; i += s) {
            yield buf[i];
        }
    }

    get dim() {
        return 1;
    }

    get offset() {
        return this.i;
    }

    get order() {
        return [0];
    }

    get shape() {
        return [this.length];
    }

    get stride() {
        return [this.s];
    }

    copy() {
        return new NDArray1<T>(
            [...this],
            [this.shape[0]],
            [1],
            this.i
        );
    }

    equiv(o: any) {
        return this === o ||
            (isArrayLike(o) &&
                this.length === o.length &&
                equiv([...this], o));
    }

    eqDelta(o: NDArray1<T>, eps = EPS) {
        return this === o ||
            _eqDelta(<any>[...this], <any>[...o], this.length, eps);
    }

    index(x: number) {
        return this.i + x * this.s;
    }

    get(x: number) {
        return this.buf[this.i + x * this.s];
    }

    set(x: number, v: T) {
        this.buf[this.i + x * this.s] = v;
        return this;
    }

    hi(x: number) {
        return new NDArray1<T>(
            this.buf,
            [x != null && x >= 0 ? x : this.shape[0]],
            this.stride,
            this.i
        );
    }

    lo(x: number) {
        const s = this.shape;
        const t = this.stride;
        let o = this.i;
        return new NDArray1(
            this.buf,
            [x != null && x >= 0 ? (o += t[0] * x, s[0] - x) : s[0]],
            t, o
        );
    }

    step(x: number) {
        const s = this.shape.slice();
        const t = this.stride.slice();
        return new NDArray1(this.buf, s, t, step(x, 0, s, t, this.i));
    }

    pick(x: number) {
        return x != null && x >= 0 ?
            new NDArray1(this.buf, [1], [1], this.i + x * this.s) :
            undefined
    }

    transpose() {
        return this.copy()
    }

    toJSON() {
        return {
            buf: [...this],
            shape: this.shape,
            stride: [1],
        };
    }

    toString() {
        const res = [];
        for (let x of this) {
            res.push(format(x));
        }
        return res.join(" ");
    }
}

declareIndices(NDArray1.prototype, ["x", "y", "z", "w"]);

export class NDArray2<T> implements
    INDArray<T> {

    buf: NDVec<T>;
    i: number;
    shape: number[];
    stride: number[];

    protected _n: number;

    constructor(buf: NDVec<T>, shape: number[], stride: number[], offset = 0) {
        this.buf = buf;
        this.i = offset;
        this.shape = shape;
        this.stride = stride;
    }

    *[Symbol.iterator]() {
        const buf = this.buf;
        const [sx, sy] = this.shape;
        const [tx, ty] = this.stride;
        for (let i = this.i, x = 0; x < sx; x++ , i += tx) {
            for (let y = 0; y < sy; y++) {
                yield buf[i + y * ty];
            }
        }
    }

    get length() {
        return this._n || (this._n = this.shape.reduce((acc, x) => acc * x, 1));
    }

    get dim() {
        return 2;
    }

    get offset() {
        return this.i;
    }

    get order() {
        return Math.abs(this.stride[1]) > Math.abs(this.stride[0]) ?
            [1, 0] :
            [0, 1];
    }

    copy() {
        return new NDArray2<T>(
            [...this.buf],
            [...this.shape],
            shapeToStride(this.shape),
            this.i
        );
    }

    equiv(o: any) {
        return this === o ||
            (o instanceof NDArray2 &&
                equiv(this.shape, o.shape) &&
                equiv([...this], [...<any>o]));
    }

    eqDelta(o: NDArray2<T>, eps = EPS) {
        return this === o ||
            (equiv(this.shape, o.shape) &&
                _eqDelta(<any>[...this], <any>[...o], this.length, eps));
    }

    index(x: number, y: number) {
        const t = this.stride;
        return this.i + x * t[0] + y * t[1];
    }

    get(x: number, y: number) {
        const t = this.stride;
        return this.buf[this.i + x * t[0] + y * t[1]];
    }

    set(x: number, y: number, v: T) {
        const t = this.stride;
        this.buf[this.i + x * t[0] + y * t[1]] = v;
        return this;
    }

    hi(x?: number, y?: number) {
        const s = this.shape;
        return new NDArray2<T>(
            this.buf,
            [
                x != null && x >= 0 ? x : s[0],
                y != null && y >= 0 ? y : s[1],
            ],
            this.stride,
            this.i
        );
    }

    lo(x?: number, y?: number) {
        const s = this.shape;
        const t = this.stride;
        let o = this.i;
        return new NDArray2(
            this.buf,
            [
                x != null && x >= 0 ? (o += t[0] * x, s[0] - x) : s[0],
                y != null && y >= 0 ? (o += t[1] * y, s[1] - y) : s[1]
            ],
            t, o
        );
    }

    step(x?: number, y?: number) {
        const s = this.shape.slice();
        const t = this.stride.slice();
        return new NDArray2(
            this.buf, s, t,
            step(y, 1, s, t, step(x, 0, s, t, this.i))
        );
    }

    pick(x?: number, y?: number) {
        const s = [];
        const t = [];
        return ndarray(this.buf, s, t,
            pick(y, 1, s, t, this.shape, this.stride,
                pick(x, 0, s, t, this.shape, this.stride, this.i))
        );
    }

    transpose(x: number, y: number) {
        const s = this.shape;
        const t = this.stride;
        return new NDArray2(this.buf, [s[x], s[y]], [t[x], t[y]], this.i);
    }

    toJSON() {
        return {
            buf: [...this],
            shape: this.shape,
            stride: shapeToStride(this.shape),
        };
    }

    toString() {
        const res = [];
        for (let i = 0; i < this.shape[0]; i++) {
            res.push(this.pick(i).toString());
        }
        return res.join("\n");
    }
}

export class NDArray3<T> implements
    INDArray<T> {

    buf: NDVec<T>;
    i: number;
    shape: number[];
    stride: number[];

    protected _n: number;

    constructor(buf: NDVec<T>, shape: number[], stride: number[], offset = 0) {
        this.buf = buf;
        this.shape = shape;
        this.stride = stride;
        this.i = offset;
    }

    *[Symbol.iterator]() {
        const buf = this.buf;
        const [sx, sy, sz] = this.shape;
        const [tx, ty, tz] = this.stride;
        for (let i = this.i, x = sx; --x >= 0; i += tx) {
            for (let j = i, y = sy; --y >= 0; j += ty) {
                for (let z = 0; z < sz; z++) {
                    yield buf[j + z * tz];
                }
            }
        }
    }

    get length() {
        return this._n || (this._n = this.shape.reduce((acc, x) => acc * x, 1));
    }

    get dim() {
        return 3;
    }

    get offset() {
        return this.i;
    }

    get order() {
        return strideOrder(this.stride);
    }

    index(x: number, y: number, z: number) {
        const t = this.stride;
        return this.i + x * t[0] + y * t[1] + z * t[2];
    }

    get(x: number, y: number, z: number) {
        const t = this.stride;
        return this.buf[this.i + x * t[0] + y * t[1] + z * t[2]];
    }

    set(x: number, y: number, z: number, v: T) {
        const t = this.stride;
        this.buf[this.i + x * t[0] + y * t[1] + z * t[2]] = v;
    }

    copy() {
        return new NDArray2<T>(
            [...this.buf],
            [...this.shape],
            shapeToStride(this.shape),
            this.i
        );
    }

    equiv(o: any) {
        return this === o ||
            (o instanceof NDArray3 &&
                equiv(this.shape, o.shape) &&
                equiv([...this], [...<any>o]));
    }

    eqDelta(o: NDArray3<T>, eps = EPS) {
        return this === o ||
            (equiv(this.shape, o.shape) &&
                _eqDelta(<any>[...this], <any>[...o], this.length, eps));
    }

    hi(x?: number, y?: number, z?: number) {
        const s = this.shape;
        return new NDArray3<T>(
            this.buf,
            [
                x != null && x >= 0 ? x : s[0],
                y != null && y >= 0 ? y : s[1],
                z != null && z >= 0 ? z : s[2],
            ],
            this.stride,
            this.i
        );
    }

    lo(x?: number, y?: number, z?: number) {
        const s = this.shape;
        const t = this.stride;
        let o = this.i;
        return new NDArray3(
            this.buf,
            [
                x != null && x >= 0 ? (o += t[0] * x, s[0] - x) : s[0],
                y != null && y >= 0 ? (o += t[1] * y, s[1] - y) : s[1],
                z != null && z >= 0 ? (o += t[2] * z, s[2] - y) : s[2],
            ],
            t, o
        );
    }

    step(x?: number, y?: number, z?: number) {
        const s = this.shape.slice();
        const t = this.stride.slice();
        return new NDArray3(
            this.buf, s, t,
            step(z, 2, s, t,
                step(y, 1, s, t,
                    step(x, 0, s, t, this.i)))
        );
    }

    pick(x?: number, y?: number, z?: number) {
        const s = [];
        const t = [];
        const ss = this.shape;
        const st = this.stride;
        return ndarray(
            this.buf, s, t,
            pick(z, 2, s, t, ss, st,
                pick(y, 1, s, t, ss, st,
                    pick(x, 0, s, t, ss, st, this.i)))
        );
    }

    transpose(x: number, y: number, z: number) {
        const s = this.shape;
        const t = this.stride;
        return new NDArray3(this.buf, [s[x], s[y], s[z]], [t[x], t[y], t[z]], this.i);
    }

    toJSON() {
        return {
            buf: [...this],
            shape: this.shape,
            stride: shapeToStride(this.shape),
        };
    }

    toString() {
        const res = [];
        for (let i = 0; i < this.shape[0]; i++) {
            res.push(`--- ${i}: ---`, this.pick(i).toString());
        }
        return res.join("\n");
    }
}

export const ndarray = <T>(
    buf?: NDVec<T>,
    shape?: number[],
    strides?: number[],
    offset?: number): INDArray<T> => {

    if (!(buf || shape)) {
        illegalArgs("data or shape must be provided");
    }
    buf = buf || new Array(shape.reduce((a, b) => a * b, 1)).fill(0);
    !shape && (shape = [buf.length]);
    !strides && (strides = shapeToStride(shape));
    if (offset === undefined) {
        offset = 0;
        for (let i = 0; i < shape.length; i++) {
            if (strides[i] < 0) {
                offset -= (shape[i] - 1) * strides[i];
            }
        }
    }
    switch (shape.length) {
        case 0:
            return new NDArray1(buf, [1], [1], offset);
        case 1:
            return new NDArray1(buf, shape, strides, offset);
        case 2:
            return new NDArray2(buf, shape, strides, offset);
        case 3:
            return new NDArray3(buf, shape, strides, offset);
        default:
            unsupported(`unsupported dimension: ${shape.length}`);
    }
}

const shapeToStride =
    (shape: number[]) => {
        const n = shape.length;
        const stride = new Array(n);
        for (let i = n, s = 1; --i >= 0; s *= shape[i]) {
            stride[i] = s;
        }
        return stride;
    };

const strideOrder =
    (strides: number[]) =>
        strides
            .map((x, i) => [x, i])
            .sort((a, b) => Math.abs(b[0]) - Math.abs(a[0]))
            .map((x) => x[1]);

const step = (
    x: number,
    i: number,
    shape: number[],
    strides: number[],
    o: number) => {

    if (x) {
        if (x < 0) {
            o += strides[i] * (shape[i] - 1);
            shape[i] = Math.ceil(-shape[i] / x);
        } else {
            shape[i] = Math.ceil(shape[i] / x);
        }
        strides[i] *= x;
    }
    return o;
};

const pick = (
    x: number,
    i: number,
    ds: number[],
    dt: number[],
    ss: number[],
    st: number[],
    o: number) => {

    if (x != null && x >= 0) {
        o += st[i] * x;
    } else {
        ds.push(ss[i]);
        dt.push(st[i]);
    }
    return o;
};

const ff = floatFixedWidth(9, 4);
const pad = padLeft(9);
const trunc = truncate(9);

const format =
    (x: any) => isNumber(x) ? ff(x) : trunc(pad(x.toString()));