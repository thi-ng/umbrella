import { Comparator } from "@thi.ng/api";
import {
    EPS,
    eqDelta as _eqDelta,
    max4id,
    min4id,
    mixBilinear
} from "@thi.ng/math";
import { AVec } from "./avec";
import { declareIndices } from "./internal/accessors";
import { genCommon } from "./internal/codegen";
import {
    magSq,
    dot,
    Vec,
    IVector,
    minor,
    major,
    distSq,
    distManhattan,
    distChebyshev,
    eqDelta,
    Vec4Coord,
    X4,
    Y4,
    Z4,
    MIN4,
    MAX4,
    ZERO4,
    ONE4,
    ReadonlyVec,
    dist,
} from "./api";

export class Vec4 extends AVec implements
    IVector<Vec4> {

    /**
     * Returns array of memory mapped `Vec4` instances using given
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
    static mapBuffer(buf: Vec, n: number = buf.length >> 2, start = 0, cstride = 1, estride = 4) {
        const res: Vec4[] = [];
        while (--n >= 0) {
            res.push(new Vec4(buf, start, cstride));
            start += estride;
        }
        return res;
    }

    /**
     * Merges given `src` iterable of `Vec4`s into single array `buf`.
     * Vectors will be arranged according to given component and element
     * strides, starting at `start` index. It's the user's
     * responsibility to ensure the target buffer has sufficient
     * capacity to hold the input vectors. See `Vec4.mapBuffer` for the
     * inverse operation. Returns `buf`.
     *
     * @param buf
     * @param src
     * @param start
     * @param cstride
     * @param estride
     */
    static intoBuffer(buf: Vec, src: Iterable<Readonly<Vec4>>, start = 0, cstride = 1, estride = 3) {
        for (let v of src) {
            buf[start] = v[0];
            buf[start + cstride] = v[1];
            buf[start + 2 * cstride] = v[2];
            buf[start + 3 * cstride] = v[3];
            start += estride;
        }
        return buf;
    }

    static readonly X_AXIS = new Vec4(X4);
    static readonly Y_AXIS = new Vec4(Y4);
    static readonly Z_AXIS = new Vec4(Z4);
    static readonly MIN = new Vec4(MIN4);
    static readonly MAX = new Vec4(MAX4);
    static readonly ZERO = new Vec4(ZERO4);
    static readonly ONE = new Vec4(ONE4);

    x: number;
    y: number;
    z: number;
    w: number;
    [id: number]: number;

    constructor(buf?: Vec, i = 0, s = 1) {
        super(buf || [0, 0, 0, 0], i, s);
    }

    *[Symbol.iterator]() {
        yield this.x;
        yield this.y;
        yield this.z;
        yield this.w;
    }

    get length() {
        return 4;
    }

    copy() {
        return new Vec4([this.x, this.y, this.z, this.w]);
    }

    empty() {
        return new Vec4();
    }

    eqDelta(v: ReadonlyVec, eps = EPS) {
        return eqDelta(this, v, eps);
    }

    toJSON() {
        return [this.x, this.y, this.z, this.w];
    }

    toString() {
        return `[${this.x}, ${this.y}, ${this.z}, ${this.w}]`;
    }
}

declareIndices(Vec4.prototype, ["x", "y", "z", "w"]);

export const [
    set4,
    setN4,
    setS4,
    rand4_01,
    rand4_11,
    rand4,
    add4,
    sub4,
    mul4,
    div4,
    addNew4,
    subNew4,
    mulNew4,
    divNew4,
    addN4,
    subN4,
    mulN4,
    divN4,
    addNewN4,
    subNewN4,
    mulNewN4,
    divNewN4,
    madd4,
    maddN4,
    maddNew4,
    maddNewN4,
    abs4,
    sign4,
    sin4,
    cos4,
    tan4,
    asin4,
    acos4,
    atan4,
    floor4,
    ceil4,
    trunc4,
    fract4,
    sqrt4,
    log4,
    exp4,
    pow4,
    powN4,
    min4,
    max4,
    clamp4,
    step4,
    smoothStep4,
    mix4,
    mixN4,
    mixNew4,
    mixNewN4,
] = genCommon(4);

const abs = Math.abs;
const pow = Math.pow;
const sqrt = Math.sqrt;

eqDelta.add(4, (a, b, eps = EPS) =>
    b.length == 4 &&
    _eqDelta(a[0], b[0], eps) &&
    _eqDelta(a[1], b[1], eps) &&
    _eqDelta(a[2], b[2], eps) &&
    _eqDelta(a[3], b[3], eps)
);

dot.add(4, (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3]);

magSq.add(4, (a) => a[0] * a[0] + a[1] * a[1] + a[2] * a[2] + a[3] * a[3]);

const distsq4 =
    (a: ReadonlyVec, b: ReadonlyVec) =>
        pow(a[0] - b[0], 2) +
        pow(a[1] - b[1], 2) +
        pow(a[2] - b[2], 2) +
        pow(a[3] - b[3], 2);

distSq.add(4, distsq4);
dist.add(4, (a, b) => sqrt(distsq4(a, b)));

distManhattan.add(4, (a, b) =>
    abs(a[0] - b[0]) +
    abs(a[1] - b[1]) +
    abs(a[2] - b[2]) +
    abs(a[3] - b[3])
);

distChebyshev.add(4, (a, b) =>
    Math.max(
        abs(a[0] - b[0]),
        abs(a[1] - b[1]),
        abs(a[2] - b[2]),
        abs(a[3] - b[3])
    )
);

minor.add(4, (a) => min4id(abs(a[0]), abs(a[1]), abs(a[2]), abs(a[3])));

major.add(4, (a) => max4id(abs(a[0]), abs(a[1]), abs(a[2]), abs(a[3])));

export const vec4 =
    (x = 0, y = 0, z = 0, w = 0) => new Vec4([x, y, z, w]);

export const vec4n =
    (n: number) => new Vec4([n, n, n, n]);

export const asVec4 =
    (x: Vec) =>
        x instanceof Vec4 ?
            x :
            new Vec4(x.length !== 4 ?
                [x[0] || 0, x[1] || 0, x[2] || 0, x[3] || 0] :
                x);

export const swizzle4 =
    (a: Vec, b: ReadonlyVec, x: number, y: number, z: number, w: number) =>
        (a[0] = b[x] || 0, a[1] = b[y] || 0, a[2] = b[z] || 0, a[3] = b[w] || 0, a);

export const comparator4 =
    (o1: Vec4Coord, o2: Vec4Coord, o3: Vec4Coord, o4: Vec4Coord): Comparator<ReadonlyVec> =>
        (a, b): number => {

            const ax = a[o1];
            const ay = a[o2];
            const az = a[o3];
            const aw = b[o4];
            const bx = b[o1];
            const by = b[o2];
            const bz = b[o3];
            const bw = b[o4];
            return ax === bx ?
                ay === by ?
                    az === bz ?
                        aw === bw ?
                            0 :
                            aw < bw ? -4 : 4 :
                        az < bz ? -3 : 3 :
                    ay < by ? -2 : 2 :
                ax < bx ? -1 : 1;
        };

export const mixBilinear4 = (
    a: ReadonlyVec,
    b: ReadonlyVec,
    c: ReadonlyVec,
    d: ReadonlyVec,
    u: number, v: number,
    out: Vec = []) => (
        out[0] = mixBilinear(a[0], b[0], c[0], d[0], u, v),
        out[1] = mixBilinear(a[1], b[1], c[1], d[1], u, v),
        out[2] = mixBilinear(a[2], b[2], c[2], d[2], u, v),
        out[3] = mixBilinear(a[3], b[3], c[3], d[3], u, v),
        out
    );
