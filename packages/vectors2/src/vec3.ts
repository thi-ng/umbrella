import { Comparator } from "@thi.ng/api";
import { EPS } from "@thi.ng/math/api";
import { eqDelta as _eqDelta } from "@thi.ng/math/eqdelta";
import { max3id, min3id } from "@thi.ng/math/interval";
import { declareIndices } from "./internal/accessors";
import { AVec } from "./avec";
import { genCommon } from "./internal/codegen";
import {
    magSq,
    dot,
    Vec,
    IVector,
    minor,
    major,
    polar,
    cartesian,
    distSq,
    distManhattan,
    distChebyshev,
    angleBetween,
    angleRatio,
    eqDelta,
    VecOpVVN,
    subNew,
    VecOpRoVVV,
    VecOpVV,
    Vec3Coord,
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
        return eqDelta(this, v, eps);
    }

    toJSON() {
        return [this.x, this.y, this.z];
    }

    toString() {
        return `[${this.x}, ${this.y}, ${this.z}]`;
    }
}

declareIndices(Vec3.prototype, ["x", "y", "z"]);

export const [
    set3,
    setN3,
    setS3,
    rand3_01,
    rand3_11,
    rand3,
    add3,
    sub3,
    mul3,
    div3,
    addNew3,
    subNew3,
    mulNew3,
    divNew3,
    addN3,
    subN3,
    mulN3,
    divN3,
    addNewN3,
    subNewN3,
    mulNewN3,
    divNewN3,
    madd3,
    maddN3,
    maddNew3,
    maddNewN3,
    abs3,
    sign3,
    sin3,
    cos3,
    tan3,
    asin3,
    acos3,
    atan3,
    floor3,
    ceil3,
    trunc3,
    fract3,
    sqrt3,
    log3,
    exp3,
    pow3,
    powN3,
    min3,
    max3,
    clamp3,
    step3,
    smoothStep3,
    mix3,
    mixN3,
    mixNew3,
    mixNewN3,
] = genCommon(3);

const abs = Math.abs;
const pow = Math.pow;
const sqrt = Math.sqrt;

eqDelta.add(3, (a, b, eps = EPS) =>
    b.length == 3 &&
    _eqDelta(a[0], b[0], eps) &&
    _eqDelta(a[1], b[1], eps) &&
    _eqDelta(a[2], b[2], eps)
);

dot.add(3, (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2]);

magSq.add(3, (a) => a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);

const distsq3 =
    (a: ReadonlyVec, b: ReadonlyVec) =>
        pow(a[0] - b[0], 2) +
        pow(a[1] - b[1], 2) +
        pow(a[2] - b[2], 2);

distSq.add(3, distsq3);
dist.add(3, (a, b) => sqrt(distsq3(a, b)));

distManhattan.add(3, (a, b) =>
    abs(a[0] - b[0]) +
    abs(a[1] - b[1]) +
    abs(a[2] - b[2])
);

distChebyshev.add(3, (a, b) =>
    Math.max(
        abs(a[0] - b[0]),
        abs(a[1] - b[1]),
        abs(a[2] - b[2])
    )
);

minor.add(3, (a) => min3id(abs(a[0]), abs(a[1]), abs(a[2])));

major.add(3, (a) => max3id(abs(a[0]), abs(a[1]), abs(a[2])));

polar.add(3, (a) => {
    const x = a[0];
    const y = a[1];
    const z = a[2];
    const r = sqrt(x * x + y * y + z * z);
    a[0] = r;
    a[1] = Math.asin(z / r);
    a[2] = Math.atan2(y, x);
    return a;
});

cartesian.add(3, (a, b = Vec3.ZERO) => {
    const r = a[0];
    const theta = a[1];
    const phi = a[2];
    const ct = Math.cos(theta);

    a[0] = r * ct * Math.cos(phi) + b[0];
    a[1] = r * ct * Math.sin(phi) + b[1];
    a[2] = r * Math.sin(theta) + b[2];
    return a;
});

angleBetween.add(3, (a, b, normalize) =>
    normalize ?
        (a[0] * b[1] < a[1] * b[0] ? -1 : 1) *
        Math.acos(angleRatio(a, b)) :
        Math.acos(dot(a, b))
);

export const vec3 =
    (x = 0, y = 0, z = 0) => new Vec3([x, y, z]);

export const vec3n =
    (n: number) => new Vec3([n, n, n]);

export const asVec3 =
    (x: Vec) =>
        x instanceof Vec3 ?
            x :
            new Vec3(x.length === 3 ? x : [x[0] || 0, x[1] || 0, x[2] || 0]);

export const swizzle3 =
    (a: Vec, b: ReadonlyVec, x: number, y: number, z: number) =>
        (a[0] = b[x] || 0, a[1] = b[y] || 0, a[2] = b[z] || 0, a);

export const comparator3 =
    (o1: Vec3Coord, o2: Vec3Coord, o3: Vec3Coord): Comparator<ReadonlyVec> =>
        (a, b): number => {
            const ax = a[o1];
            const ay = a[o2];
            const az = a[o3];
            const bx = b[o1];
            const by = b[o2];
            const bz = b[o3];
            return ax === bx ?
                ay === by ?
                    az === bz ?
                        0 :
                        az < bz ? -3 : 3 :
                    ay < by ? -2 : 2 :
                ax < bx ? -1 : 1;
        };

export const rotateAroundAxis3: VecOpVVN<Vec> =
    (v, axis, theta) => {
        const x = v[0];
        const y = v[1];
        const z = v[2];
        const ax = axis[0];
        const ay = axis[1];
        const az = axis[2];
        const ux = ax * x;
        const uy = ax * y;
        const uz = ax * z;
        const vx = ay * x;
        const vy = ay * y;
        const vz = ay * z;
        const wx = az * x;
        const wy = az * y;
        const wz = az * z;
        const uvw = ux + vy + wz;
        const s = Math.sin(theta);
        const c = Math.cos(theta);

        v[0] = (ax * uvw + (x * (ay * ay + az * az) - ax * (vy + wz)) * c + (-wy + vz) * s);
        v[1] = (ay * uvw + (y * (ax * ax + az * az) - ay * (ux + wz)) * c + (wx - uz) * s);
        v[2] = (az * uvw + (z * (ax * ax + ay * ay) - az * (ux + vy)) * c + (-vx + uy) * s);
        return v;
    };

export const cross3: VecOpVV<Vec> =
    (a, b) => {
        const x = a[1] * b[2] - a[2] * b[1];
        const y = a[2] * b[0] - a[0] * b[2];
        a[2] = a[0] * b[1] - a[1] * b[0];
        a[1] = y;
        a[0] = x;
        return a;
    };

export const orthoNormal3: VecOpRoVVV<Vec> = (a: Vec, b: Vec, c: Vec) =>
    cross3(subNew(c, a), subNew(b, a));
