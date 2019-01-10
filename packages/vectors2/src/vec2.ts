import { Comparator } from "@thi.ng/api";
import {
    EPS,
    eqDelta as _eqDelta,
    HALF_PI,
    max2id,
    min2id,
    mixBilinear,
    PI
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
    polar,
    mag,
    cartesian,
    distSq,
    distManhattan,
    distChebyshev,
    headingXY,
    angleBetween,
    angleRatio,
    eqDelta,
    Vec2Coord,
    VecOpRoVV,
    VecOpVVN,
    VecOpV,
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

export class Vec2 extends AVec implements
    IVector<Vec2> {

    /**
     * Returns array of memory mapped `Vec2` instances using given
     * backing array and stride settings: The `cstride` is the step size
     * between individual XY vector components. `estride` is the step
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
    static mapBuffer(buf: Vec, n: number = buf.length >> 1, start = 0, cstride = 1, estride = 2) {
        const res: Vec2[] = [];
        while (--n >= 0) {
            res.push(new Vec2(buf, start, cstride));
            start += estride;
        }
        return res;
    }

    /**
     * Merges given `src` iterable of `Vec2`s into single array `buf`.
     * Vectors will be arranged according to given component and element
     * strides, starting at `start` index. It's the user's
     * responsibility to ensure the target buffer has sufficient
     * capacity to hold the input vectors. See `Vec2.mapBuffer` for the
     * inverse operation. Returns `buf`.
     *
     * @param buf
     * @param src
     * @param start
     * @param cstride
     * @param estride
     */
    static intoBuffer(buf: Vec, src: Iterable<Readonly<Vec2>>, start = 0, cstride = 1, estride = 2) {
        for (let v of src) {
            buf[start] = v[0];
            buf[start + cstride] = v[1];
            start += estride;
        }
        return buf;
    }

    static readonly X_AXIS = new Vec2(X4);
    static readonly Y_AXIS = new Vec2(Y4);
    static readonly Z_AXIS = new Vec2(Z4);
    static readonly MIN = new Vec2(MIN4);
    static readonly MAX = new Vec2(MAX4);
    static readonly ZERO = new Vec2(ZERO4);
    static readonly ONE = new Vec2(ONE4);

    x: number;
    y: number;
    [id: number]: number;

    constructor(buf?: Vec, i = 0, s = 1) {
        super(buf || [0, 0], i, s);
    }

    *[Symbol.iterator]() {
        yield this.x;
        yield this.y;
    }

    get length() {
        return 2;
    }

    copy() {
        return new Vec2([this.x, this.y]);
    }

    empty() {
        return new Vec2();
    }

    eqDelta(v: ReadonlyVec, eps = EPS) {
        return eqDelta(this, v, eps);
    }

    toJSON() {
        return [this.x, this.y];
    }

    toString() {
        return `[${this.x}, ${this.y}]`;
    }
}

declareIndices(Vec2.prototype, ["x", "y"]);

export const [
    set2,
    setN2,
    setS2,
    rand2_01,
    rand2_11,
    rand2,
    add2,
    sub2,
    mul2,
    div2,
    addNew2,
    subNew2,
    mulNew2,
    divNew2,
    addN2,
    subN2,
    mulN2,
    divN2,
    addNewN2,
    subNewN2,
    mulNewN2,
    divNewN2,
    madd2,
    maddN2,
    maddNew2,
    maddNewN2,
    abs2,
    sign2,
    sin2,
    cos2,
    tan2,
    asin2,
    acos2,
    atan2,
    floor2,
    ceil2,
    trunc2,
    fract2,
    sqrt2,
    log2,
    exp2,
    pow2,
    powN2,
    min2,
    max2,
    clamp2,
    step2,
    smoothStep2,
    mix2,
    mixN2,
    mixNew2,
    mixNewN2,
] = genCommon(2);

const abs = Math.abs;
const pow = Math.pow;
const sqrt = Math.sqrt;

eqDelta.add(2, (a, b, eps = EPS) =>
    b.length === 2 &&
    _eqDelta(a[0], b[0], eps) &&
    _eqDelta(a[1], b[1], eps)
);

dot.add(2, (a, b) => a[0] * b[0] + a[1] * b[1]);
magSq.add(2, (a) => a[0] * a[0] + a[1] * a[1]);

const distsq2 =
    (a: ReadonlyVec, b: ReadonlyVec) =>
        pow(a[0] - b[0], 2) +
        pow(a[1] - b[1], 2);

distSq.add(2, distsq2);
dist.add(2, (a, b) => sqrt(distsq2(a, b)));

distManhattan.add(2, (a, b) => abs(a[0] - b[0]) + abs(a[1] - b[1]));
distChebyshev.add(2, (a, b) => Math.max(abs(a[0] - b[0]), abs(a[1] - b[1])));

minor.add(2, (a) => min2id(abs(a[0]), abs(a[1])));
major.add(2, (a) => max2id(abs(a[0]), abs(a[1])));

polar.add(2, (a) => {
    const x = a[0];
    a[0] = mag(a);
    a[1] = Math.atan2(a[1], x);
    return a;
});

cartesian.add(2, (a, b = Vec2.ZERO) => {
    const r = a[0];
    const t = a[1];
    a[0] = r * Math.cos(t) + b[0];
    a[1] = r * Math.sin(t) + b[1];
    return a;
});

angleBetween.add(2, (a, b, normalize) =>
    normalize ?
        (a[0] * b[1] < a[1] * b[0] ? -1 : 1) *
        Math.acos(angleRatio(a, b)) :
        Math.acos(dot(a, b))
);

export const vec2 =
    (x = 0, y = 0) => new Vec2([x, y]);

export const vec2n =
    (n: number) => new Vec2([n, n]);

export const asVec2 =
    (x: Vec) =>
        x instanceof Vec2 ?
            x :
            new Vec2(x.length === 2 ? x : [x[0] || 0, x[1] || 0]);

export const swizzle2 = (a: Vec, b: ReadonlyVec, x: number, y: number) =>
    (a[0] = b[x] || 0, a[1] = b[y] || 0, a);

export const comparator2 =
    (o1: Vec2Coord, o2: Vec2Coord): Comparator<ReadonlyVec> =>
        (a, b): number => {
            const ax = a[o1];
            const ay = a[o2];
            const bx = b[o1];
            const by = b[o2];
            return ax === bx ?
                ay === by ?
                    0 :
                    ay < by ? -2 : 2 :
                ax < bx ? -1 : 1;
        };

export const perpendicularLeft2: VecOpV<Vec> = (a) => {
    const x = a[0];
    a[0] = -a[1];
    a[1] = x;
    return a;
};

export const perpendicularRight2: VecOpV<Vec> = (a) => {
    const x = -a[0];
    a[0] = a[1];
    a[1] = x;
    return a;
};

export const rotateAroundPoint2: VecOpVVN<Vec> = (a, b, theta) => {
    const x = a[0] - b[0];
    const y = a[1] - b[1];
    const s = Math.sin(theta);
    const c = Math.cos(theta);
    a[0] = x * c - y * s + b[0];
    a[1] = x * s + y * c + b[1];
    return a;
};

export const cross2: VecOpRoVV<number> =
    (a, b) => a[0] * b[1] - a[1] * b[0];

export const bisect2: VecOpRoVV<number> = (a, b) => {
    const theta = (headingXY(a) + headingXY(b)) / 2;
    return theta <= HALF_PI ? theta : PI - theta;
};

export const mixBilinear2 = (
    a: ReadonlyVec,
    b: ReadonlyVec,
    c: ReadonlyVec,
    d: ReadonlyVec,
    u: number, v: number,
    out: Vec = []) => (
        out[0] = mixBilinear(a[0], b[0], c[0], d[0], u, v),
        out[1] = mixBilinear(a[1], b[1], c[1], d[1], u, v),
        out
    );
