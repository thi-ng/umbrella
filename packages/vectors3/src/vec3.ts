import { EPS } from "@thi.ng/math/api";
import {
    IVector,
    MAX4,
    MIN4,
    ONE4,
    ReadonlyVec,
    Vec,
    X4,
    Y4,
    Z4,
    ZERO4
} from "./api";
import { eqDelta3 } from "./eqdelta";
import { declareIndices } from "./internal/accessors";
import { AVec } from "./internal/avec";

export class Vec3 extends AVec implements
    IVector<Vec3> {

    /**
     * Returns array of memory mapped `Vec3` instances using given
     * backing array and stride settings: The `cstride` is the step size
     * between individual XYZ vector components. `estride` is the step
     * size between successive vectors. This arrangement allows for
     * different storage approaches, incl. SOA, AOS, striped /
     * interleaved etc.
     *
     * @param buf backing array
     * @param n num vectors
     * @param start  start index
     * @param cstride component stride
     * @param estride element stride
     */
    static mapBuffer(buf: Vec, n: number = (buf.length / 3) | 0, start = 0, cstride = 1, estride = 3) {
        const res: Vec3[] = [];
        while (--n >= 0) {
            res.push(new Vec3(buf, start, cstride));
            start += estride;
        }
        return res;
    }

    /**
     * Merges given `src` iterable of `Vec3`s into single array `buf`.
     * Vectors will be arranged according to given component and element
     * strides, starting at `start` index. It's the user's
     * responsibility to ensure the target buffer has sufficient
     * capacity to hold the input vectors. See `Vec3.mapBuffer` for the
     * inverse operation. Returns `buf`.
     *
     * @param buf
     * @param src
     * @param start
     * @param cstride
     * @param estride
     */
    static intoBuffer(buf: Vec, src: Iterable<Readonly<Vec3>>, start = 0, cstride = 1, estride = 3) {
        for (let v of src) {
            buf[start] = v[0];
            buf[start + cstride] = v[1];
            buf[start + 2 * cstride] = v[2];
            start += estride;
        }
        return buf;
    }

    static *iterator(buf: Vec, num: number, start = 0, cstride = 1, estride = 3) {
        while (num-- > 0) {
            yield new Vec3(buf, start, cstride);
            start += estride;
        }
    }

    static readonly X_AXIS = new Vec3(X4);
    static readonly Y_AXIS = new Vec3(Y4);
    static readonly Z_AXIS = new Vec3(Z4);
    static readonly MIN = new Vec3(MIN4);
    static readonly MAX = new Vec3(MAX4);
    static readonly ZERO = new Vec3(ZERO4);
    static readonly ONE = new Vec3(ONE4);

    x: number;
    y: number;
    z: number;
    [id: number]: number;

    constructor(buf?: Vec, i = 0, s = 1) {
        super(buf || [0, 0, 0], i, s);
    }

    *[Symbol.iterator]() {
        yield this.x;
        yield this.y;
        yield this.z;
    }

    get length() {
        return 3;
    }

    copy() {
        return new Vec3([this.x, this.y, this.z]);
    }

    empty() {
        return new Vec3();
    }

    eqDelta(v: ReadonlyVec, eps = EPS) {
        return eqDelta3(this, v, eps);
    }

    toJSON() {
        return [this.x, this.y, this.z];
    }

    toString() {
        return `[${this.x}, ${this.y}, ${this.z}]`;
    }
}

declareIndices(Vec3.prototype, ["x", "y", "z"]);

export const vec3 =
    (x = 0, y = 0, z = 0) => new Vec3([x, y, z]);

export const vec3n =
    (n: number) => new Vec3([n, n, n]);

export const asVec3 =
    (x: Vec) =>
        x instanceof Vec3 ?
            x :
            new Vec3(x.length >= 3 ? x : [x[0] || 0, x[1] || 0, x[2] || 0]);
