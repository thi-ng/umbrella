import type { IHash, NumericArray } from "@thi.ng/api";
import { EPS } from "@thi.ng/math/api";
import { declareIndices } from "./compile/accessors";
import {
    IVector,
    MAX3,
    MIN3,
    ONE3,
    ReadonlyVec,
    Vec,
    X3,
    Y3,
    Z3,
    ZERO3,
} from "./api";
import { AVec } from "./avec";
import { intoStridedBuffer, mapStridedBuffer } from "./buffer";
import { eqDelta3 } from "./eqdelta";
import { hash } from "./hash";
import { stridedValues, vecIterator } from "./iterator";
import { setS3 } from "./sets";

export class Vec3 extends AVec implements IHash<number>, IVector<Vec3> {
    /**
     * Returns array of memory mapped {@link Vec3} instances using given
     * backing array and stride settings: The `cstride` is the step size
     * between individual XYZ vector components. `estride` is the step
     * size between successive vectors. This arrangement allows for
     * different storage approaches, incl. SOA, AOS, striped /
     * interleaved etc.
     *
     * @param buf - backing array
     * @param num - num vectors
     * @param start -  start index
     * @param cstride - component stride
     * @param estride - element stride
     */
    static mapBuffer(
        buf: NumericArray,
        num: number = (buf.length / 3) | 0,
        start = 0,
        cstride = 1,
        estride = 3
    ) {
        return mapStridedBuffer(Vec3, buf, num, start, cstride, estride);
    }

    /**
     * Merges given `src` iterable of {@link Vec3}s into single array `buf`.
     * Vectors will be arranged according to given component and element
     * strides, starting at `start` index. It's the user's
     * responsibility to ensure the target buffer has sufficient
     * capacity to hold the input vectors. See `Vec3.mapBuffer` for the
     * inverse operation. Returns `buf`.
     *
     * @param buf -
     * @param src -
     * @param start -
     * @param cstride -
     * @param estride -
     */
    static intoBuffer(
        buf: NumericArray,
        src: Iterable<Vec3>,
        start = 0,
        cstride = 1,
        estride = 3
    ) {
        return intoStridedBuffer(setS3, buf, src, start, cstride, estride);
    }

    static iterator(
        buf: NumericArray,
        num: number,
        start = 0,
        cstride = 1,
        estride = 3
    ) {
        return vecIterator(Vec3, buf, num, start, cstride, estride);
    }

    static readonly X_AXIS = new Vec3(<NumericArray>X3);
    static readonly Y_AXIS = new Vec3(<NumericArray>Y3);
    static readonly Z_AXIS = new Vec3(<NumericArray>Z3);
    static readonly MIN = new Vec3(<NumericArray>MIN3);
    static readonly MAX = new Vec3(<NumericArray>MAX3);
    static readonly ZERO = new Vec3(<NumericArray>ZERO3);
    static readonly ONE = new Vec3(<NumericArray>ONE3);

    x!: number;
    y!: number;
    z!: number;
    [id: number]: number;

    constructor(buf?: NumericArray, offset = 0, stride = 1) {
        super(buf || [0, 0, 0], offset, stride);
    }

    [Symbol.iterator]() {
        return stridedValues(this.buf, 3, this.offset, this.stride);
    }

    get length() {
        return 3;
    }

    copy() {
        return new Vec3([this.x, this.y, this.z]);
    }

    copyView() {
        return new Vec3(this.buf, this.offset, this.stride);
    }

    empty() {
        return new Vec3();
    }

    eqDelta(v: ReadonlyVec, eps = EPS) {
        return eqDelta3(this, v, eps);
    }

    hash() {
        return hash(this);
    }

    toJSON() {
        return [this.x, this.y, this.z];
    }
}

declareIndices(Vec3.prototype, ["x", "y", "z"]);

export const vec3 = (x = 0, y = 0, z = 0) => new Vec3([x, y, z]);

export const vec3n = (n: number) => new Vec3([n, n, n]);

export const asVec3 = (x: Vec) =>
    x instanceof Vec3
        ? x
        : new Vec3(
              x.length >= 3
                  ? <NumericArray>x
                  : [x[0] || 0, x[1] || 0, x[2] || 0]
          );
