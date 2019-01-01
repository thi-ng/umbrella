import {
    ICopy,
    IEquiv,
    IObjectOf,
    IToHiccup
} from "@thi.ng/api";
import {
    DEFAULT,
    defmulti,
    MultiFn1,
    MultiFn1O,
    MultiFn2O
} from "@thi.ng/defmulti";
import { equiv } from "@thi.ng/equiv";
import { cossin } from "@thi.ng/math/angle";
import { ReadonlyMat } from "@thi.ng/matrices/api";
import { add } from "@thi.ng/vectors3/add";
import { ReadonlyVec, Vec } from "@thi.ng/vectors3/api";
import { copy } from "@thi.ng/vectors3/copy";
import { max } from "@thi.ng/vectors3/max";
import { min } from "@thi.ng/vectors3/min";
import { mixN } from "@thi.ng/vectors3/mixn";
import { mul } from "@thi.ng/vectors3/mul";
import { neg } from "@thi.ng/vectors3/neg";
import { perpendicularLeft2 } from "@thi.ng/vectors3/perpendicular";
import { rotateZ } from "@thi.ng/vectors3/rotate";
import { sub } from "@thi.ng/vectors3/sub";
import { subdivKernel3 } from "./internal/subdiv-curve";
import { warpPoints } from "./internal/warp";

export const enum Type {
    ARC2 = "arc",
    CIRCLE2 = "circle",
    CUBIC2 = "cubic",
    ELLIPSE2 = "ellipse",
    GROUP = "g",
    LINE2 = "line",
    PATH2 = "path",
    POINTS2 = "points",
    POLYGON2 = "polygon",
    POLYLINE2 = "polyline",
    QUAD2 = "quad",
    QUADRATIC2 = "quadratic",
    RECT2 = "rect",
    TRIANGLE2 = "triangle",
    RAY = "ray"
}

export const enum ClipMode {
    /**
     * Shape union (A | B)
     */
    UNION = 0,
    /**
     * Shape difference (B - A)
     */
    DIFF_B = 1,
    /**
     * Shape difference (A - B)
     */
    DIFF_A = 2,
    /**
     * Shape intersection (A & B)
     */
    INTERSECTION = 3,
}

export enum Convexity {
    COLINEAR = 0,
    CONVEX,
    CONCAVE,
}

export const enum LineIntersectionType {
    PARALLEL = 1,
    COINCIDENT,
    COINCIDENT_NO_INTERSECT,
    INTERSECT,
    INTERSECT_OUTSIDE,
}

export const enum SegmentType {
    MOVE,
    LINE,
    POLYLINE,
    ARC,
    CUBIC,
    QUADRATIC,
    CLOSE,
}

export const DEFAULT_SAMPLES = 20;

const CHAIKIN_FIRST = subdivKernel3([1 / 2, 1 / 2, 0], [0, 3 / 4, 1 / 4]);
const CHAIKIN_MAIN = subdivKernel3([1 / 4, 3 / 4, 0], [0, 3 / 4, 1 / 4]);
const CHAIKIN_LAST = subdivKernel3([1 / 4, 3 / 4, 0], [0, 1 / 2, 1 / 2]);
const CUBIC_MAIN = subdivKernel3([1 / 8, 3 / 4, 1 / 8], [0, 1 / 2, 1 / 2]);

export const CHAIKIN_CLOSED: SubdivKernel = {
    fn: CHAIKIN_MAIN,
    size: 3
};

export const CHAIKIN_OPEN: SubdivKernel = {
    fn: (pts, i, n) =>
        i == 0 ?
            [pts[0], ...CHAIKIN_FIRST(pts)] :
            i === n - 3 ?
                [...CHAIKIN_LAST(pts), pts[2]] :
                CHAIKIN_MAIN(pts),
    size: 3
};

export const CUBIC_CLOSED: SubdivKernel = {
    fn: CUBIC_MAIN,
    size: 3
};

export interface IShape extends
    ICopy<IShape>,
    IEquiv,
    IToHiccup {

    readonly type: string;
    attribs?: IObjectOf<any>;
}

export interface IHiccupPathSegment {
    toHiccupPathSegments(): any[];
}

export interface AABBLike extends IShape {
    pos: Vec;
    size: Vec;
}

export interface LineIntersection {
    type: LineIntersectionType;
    isec?: Vec;
    det?: number;
    alpha?: number;
    beta?: number;
}

export interface PathSegment {
    type: SegmentType;
    point?: Vec;
    geo?: IShape & IHiccupPathSegment;
}

export interface SamplingOpts {
    /**
     * Number of points to sample & return. Defaults to the implementing
     * type's `DEFAULT_RES` if neither this nor `theta` option is given
     * (see `ArcSamplingOpts`).
     */
    num: number;
    /**
     * Approximate desired distance between sampled result points. If
     * given, takes priority over the `num` option, but the latter MIGHT
     * be used as part of the sampling process (implementation
     * specific). Note: For circles this value is interpreted as arc
     * length, not cartesian distance (error will be proportional to the
     * given value relative to the circle's radius).
     */
    dist: number;
    /**
     * Currently only used by these types:
     *
     * - Arc2
     * - Circle2
     *
     * Defines the target angle between sampled points. If greater than
     * the actual range of the arc, only the two end points will be
     * returned at most. This option is used to derive a `num` value and
     * takes priority if `num` is given as well.
     *
     * This option is useful to adapt the sampling based on angular
     * resolution, rather than a fixed number of samples.
     */
    theta: number;
    /**
     * If `true`, the shape's end point will be included in the result
     * array. The default setting for open geometries is `true`, for
     * closed ones `false`. This option has no influence on any internal
     * resolution calculation.
     *
     * For open geometry this option is useful to when re-sampling paths
     * of consecutive segments, where the end points of each segment
     * coincide with the start points of the next segment. For all but
     * the last segment, this option should be `false` and so can be
     * used to avoid duplicate vertices in the concatenated result.
     *
     * When sampling closed shapes, enabling this option will include an
     * extra point (start), i.e. if the `num` option was given, results
     * in `num+1` points.
     */
    last: boolean;
}

export interface SubdivKernel {
    fn: (pts: ReadonlyVec[], i: number, nump: number) => Vec[];
    size: number;
}

export type Attribs = IObjectOf<any>;

export type Tessellator = (points: Vec[]) => Vec[][];

export type VecPair = [Vec, Vec];

const dispatch = (x: IShape) => x.type;
const dispatch2 = (a: IShape, b: IShape) => a.type + "-" + b.type;

export const arcLength: MultiFn1<IShape, number> = defmulti(dispatch);

export const area: MultiFn1O<IShape, boolean, number> = defmulti(dispatch);
area.add(DEFAULT, () => 0);

export const asCubic = defmulti<IShape, Iterable<Cubic2>>(dispatch);

export const asPolygon: MultiFn1O<IShape, number | SamplingOpts, Polygon2> = defmulti(dispatch);
asPolygon.add(DEFAULT, (x, opts) =>
    new Polygon2(vertices(x, opts), { ...x.attribs })
);

export const asPolyline: MultiFn1O<IShape, number | SamplingOpts, Polygon2> = defmulti(dispatch);
asPolyline.add(DEFAULT, (x, opts) =>
    new Polyline2(vertices(x, opts), { ...x.attribs })
);

export const bounds = defmulti<IShape, AABBLike>(dispatch);

export const center: MultiFn1O<IShape, ReadonlyVec, IShape> = defmulti(dispatch);
center.add(DEFAULT, (x, origin?) => {
    const delta = neg(null, centroid(x));
    return translate(x, origin ? add(null, delta, origin) : delta);
});

export const centroid: MultiFn1O<IShape, Vec, Vec> = defmulti(dispatch);

export const classifyPoint: MultiFn2O<IShape, Vec, number, Vec> = defmulti(dispatch);

export const closestPoint = defmulti<IShape, Vec, Vec>(dispatch);

export const clipConvex = defmulti<IShape, IShape, IShape>(dispatch);

export const convexHull = defmulti<IShape, Vec[]>(dispatch);

export const depth = defmulti<IShape, number>(dispatch);
depth.add(DEFAULT, (x) => bounds(x).size[2] || 0);

export const difference = defmulti<IShape, IShape, IShape[]>(dispatch);

export const edges: MultiFn1O<IShape, number | Partial<SamplingOpts>, Iterable<VecPair>> = defmulti(dispatch);

export const extrude = defmulti<IShape, IShape>(dispatch);

export const flip = defmulti<IShape, IShape>(dispatch);

export const height = defmulti<IShape, number>(dispatch);
height.add(DEFAULT, (x) => bounds(x).size[1]);

export const intersection = defmulti<IShape, IShape, IShape[]>(dispatch);

// TODO define isec result
export const intersectShape = defmulti<IShape, IShape, any>(dispatch2);

export const intersectLine = defmulti<IShape, Line2, LineIntersection>(dispatch);

export const isEmpty = defmulti<IShape, boolean>(dispatch);

export const mapPoint: MultiFn2O<IShape, ReadonlyVec, Vec, Vec> = defmulti(dispatch);

export const normalAt: MultiFn2O<IShape, number, number, Vec> = defmulti(dispatch);
normalAt.add(DEFAULT, (shape, t, n = 1) => perpendicularLeft2(null, tangentAt(shape, t, n)));

export const offset: MultiFn2O<IShape, number, number, IShape> = defmulti(dispatch);

export const perimeter = defmulti<IShape, number>(dispatch);

export const pointAt = defmulti<IShape, number, IShape>(dispatch);

export const pointInside = defmulti<IShape, ReadonlyVec, boolean>(dispatch);

export const resample: MultiFn1O<IShape, number | Partial<SamplingOpts>, IShape> = defmulti(dispatch);

/**
 * Returns new shape of same type with a shallow copy of the original
 * geometry (vertex list) simplified using Douglas-Peucker algorithm.
 *
 * @param shape
 * @param eps simplification threshold (default: 0.1)
 */
export const simplify: MultiFn1O<IShape, number, IShape> = defmulti(dispatch);

export const splitAt = defmulti<IShape, number, [IShape, IShape]>(dispatch);

export const subdivide: MultiFn2O<IShape, SubdivKernel, number, IShape> = defmulti(dispatch);

export const tangentAt: MultiFn2O<IShape, number, number, Vec> = defmulti(dispatch);

export const tessellate = defmulti<IShape, Iterable<Tessellator>, Vec[][]>(dispatch);

export const transform = defmulti<IShape, ReadonlyMat, IShape>(dispatch);

export const translate = defmulti<IShape, ReadonlyVec, IShape>(dispatch);

export const union = defmulti<IShape, IShape[]>(dispatch);

export const unmapPoint: MultiFn2O<IShape, ReadonlyVec, Vec, Vec> = defmulti(dispatch);

export const vertices: MultiFn1O<IShape, number | Partial<SamplingOpts>, Vec[]> = defmulti(dispatch);

export const warp = defmulti<IShape, IShape, IShape>(dispatch);
warp.add(DEFAULT, (src: IShape, dest: IShape) =>
    new Polygon2(
        warpPoints(vertices(src), bounds(src), dest),
        { ...src.attribs }
    )
);

export const width = defmulti<IShape, number>(dispatch);
width.add(DEFAULT, (x) => bounds(x).size[0]);

export const withAttribs = defmulti<IShape, Attribs, IShape>(dispatch);
withAttribs.add(DEFAULT, (x, attribs) => {
    x = x.copy();
    Object.assign(x.attribs, attribs);
    return x;
});

export class PointContainer implements
    IShape {

    readonly type: string;
    points: Vec[];
    attribs: Attribs;

    constructor(type: string, points: Vec[], attribs?: Attribs) {
        this.type = type;
        this.points = points;
        this.attribs = attribs;
    }

    *[Symbol.iterator]() {
        yield* this.points;
    }

    copy() {
        return new PointContainer(this.type, this._copy(), this.attribs);
    }

    equiv(o: any) {
        return o instanceof PointContainer &&
            this.type === o.type &&
            equiv(this.points, o.points);
    }

    flip() {
        this.points.reverse();
        return this;
    }

    toHiccup() {
        return [this.type, this.attribs, this.points];
    }

    protected _copy() {
        return this.points.map((p) => copy(p));
    }
}

export class Arc2 implements
    IHiccupPathSegment,
    IShape {

    pos: Vec;
    r: Vec;
    axis: number;
    start: number;
    end: number;
    xl: boolean;
    clockwise: boolean;
    attribs: Attribs;

    constructor(
        pos: Vec,
        r: Vec,
        axis: number,
        start: number,
        end: number,
        xl = false,
        clockwise = false,
        attribs?: Attribs) {

        this.pos = pos;
        this.r = r;
        this.axis = axis;
        this.start = start;
        this.end = end;
        this.xl = xl;
        this.clockwise = clockwise;
        this.attribs = attribs;
    }

    get type() {
        return Type.ARC2;
    }

    copy() {
        return new Arc2(
            copy(this.pos),
            copy(this.r),
            this.axis,
            this.start,
            this.end,
            this.xl,
            this.clockwise,
            { ...this.attribs }
        );
    }

    equiv(o: any) {
        return o instanceof Arc2 &&
            equiv(this.pos, o.pos) &&
            equiv(this.r, o.r) &&
            this.start === o.start &&
            this.end === o.end &&
            this.axis === o.axis &&
            this.xl === o.xl &&
            this.clockwise && o.clockwise;
    }

    pointAtTheta(theta: number, pos: Vec = []) {
        return add(null, rotateZ(null, mul(pos, cossin(theta), this.r), this.axis), this.pos);
    }

    toHiccup() {
        return ["path", this.attribs, [
            ["M", this.pointAtTheta(this.start)],
            ...this.toHiccupPathSegments()
        ]];
    }

    toHiccupPathSegments() {
        return [["A",
            this.r[0],
            this.r[1],
            this.axis,
            this.xl,
            this.clockwise,
            this.pointAtTheta(this.end)
        ]];
    }
}

export class Circle2 implements
    IShape {

    pos: Vec;
    r: number;
    attribs: Attribs;

    constructor(pos: Vec, r: number, attribs?: Attribs) {
        this.pos = pos;
        this.r = r;
        this.attribs = attribs;
    }

    get type() {
        return Type.CIRCLE2;
    }

    copy() {
        return new Circle2(copy(this.pos), this.r, { ...this.attribs });
    }

    equiv(o: any) {
        return o instanceof Circle2 &&
            equiv(this.pos, o.pos) &&
            this.r === o.r;
    }

    toHiccup() {
        return [this.type, this.attribs, this.pos, this.r];
    }
}

export class Cubic2 extends PointContainer implements
    IHiccupPathSegment {

    static fromLine(a: Vec, b: Vec, attribs?: Attribs) {
        return new Cubic2([a, mixN([], a, b, 1 / 3), mixN([], b, a, 1 / 3), b], attribs);
    }

    constructor(points: Vec[], attribs?: Attribs) {
        super(Type.CUBIC2, points, attribs);
    }

    copy() {
        return new Cubic2(this._copy(), { ...this.attribs });
    }

    toHiccup() {
        return ["path", this.attribs,
            [
                ["M", this.points[0]],
                ...this.toHiccupPathSegments()
            ]
        ];
    }

    toHiccupPathSegments() {
        const pts = this.points;
        return [["C", pts[1], pts[2], pts[3]]];
    }
}

export class Ellipse2 implements
    IShape {

    pos: Vec;
    r: Vec;
    attribs: Attribs;

    constructor(pos: Vec, r: Vec, attribs?: Attribs) {
        this.pos = pos;
        this.r = r;
        this.attribs = attribs;
    }

    get type() {
        return Type.ELLIPSE2;
    }

    copy() {
        return new Ellipse2(copy(this.pos), copy(this.r), { ...this.attribs });
    }

    equiv(o: any) {
        return o instanceof Ellipse2 &&
            equiv(this.pos, o.pos) &&
            equiv(this.r, o.r);
    }

    toHiccup() {
        return [this.type, this.attribs, this.pos, this.r];
    }
}

export class Group2 implements
    IShape {

    children: IShape[];
    attribs: Attribs;

    constructor(attribs?: Attribs, ...children: IShape[]) {
        this.attribs = attribs;
        this.children = children;
    }

    get type() {
        return Type.GROUP;
    }

    *[Symbol.iterator]() {
        yield* this.children;
    }

    copy() {
        return new Group2(
            { ...this.attribs },
            ...<IShape[]>this.children.map((c) => c.copy())
        );
    }

    equiv(o: any) {
        return o instanceof Group2 &&
            equiv(this.children, o.children);
    }

    toHiccup() {
        return [
            this.type,
            this.attribs,
            ...this.children.map((x) => x.toHiccup())
        ];
    }
}

export class Line2 extends PointContainer implements
    IHiccupPathSegment {

    constructor(points: Vec[], attribs?: Attribs) {
        super(Type.LINE2, points, attribs);
    }

    copy() {
        return new Line2(this._copy(), { ...this.attribs });
    }

    toHiccupPathSegments() {
        const [a, b] = this.points;
        return [
            a[0] === b[0] ?
                ["V", b[1]] :
                a[1] === b[1] ?
                    ["H", b[0]] :
                    ["L", this.points[1]]
        ];
    }

    get a() {
        return this.points[0];
    }

    get b() {
        return this.points[1];
    }
}

export class Path2 implements IShape {

    segments: PathSegment[];
    closed: boolean;
    attribs: Attribs;

    constructor(segments?: PathSegment[], attribs?: Attribs) {
        this.segments = segments || [];
        this.attribs = attribs;
        this.closed = false;
    }

    get type() {
        return Type.PATH2;
    }

    *[Symbol.iterator]() {
        yield* this.segments;
    }

    copy() {
        const p = new Path2([...this.segments], { ...this.attribs });
        p.closed = this.closed;
        return p;
    }

    equiv(o: any) {
        return o instanceof Path2 &&
            equiv(this.segments, o.segments);
    }

    add(s: PathSegment) {
        this.segments.push(s);
    }

    toHiccup() {
        const dest: any[] = [];
        const res: any[] = ["path", this.attribs || {}, dest];
        const src = this.segments;
        const n = src.length;
        if (n > 1) {
            dest.push(["M", src[0].point]);
            for (let i = 1; i < n; i++) {
                dest.push(...src[i].geo.toHiccupPathSegments());
            }
            if (this.closed) {
                dest.push(["Z"]);
            }
        }
        return res;
    }
}

export class Polygon2 extends PointContainer {

    constructor(points: Vec[], attribs?: Attribs) {
        super(Type.POLYGON2, points, attribs);
    }

    copy() {
        return new Polygon2(this._copy(), { ...this.attribs });
    }
}

export class Polyline2 extends PointContainer implements
    IHiccupPathSegment {

    constructor(points: Vec[], attribs?: Attribs) {
        super(Type.POLYLINE2, points, attribs);
    }

    copy() {
        return new Polyline2(this._copy(), { ...this.attribs });
    }

    toHiccupPathSegments() {
        const res: any[] = [];
        for (let pts = this.points, n = pts.length, i = 1; i < n; i++) {
            res.push(["L", pts[i]]);
        }
        return res;
    }
}

export class Quad2 extends PointContainer {

    constructor(points: Vec[], attribs?: Attribs) {
        super(Type.QUAD2, points, attribs);
    }

    copy() {
        return new Quad2(this._copy(), { ...this.attribs });
    }

    toHiccup() {
        return [Type.POLYGON2, this.attribs, this.points];
    }
}

export class Quadratic2 extends PointContainer implements
    IHiccupPathSegment {

    static fromLine(a: Vec, b: Vec, attribs?: Attribs) {
        return new Quadratic2([a, mixN([], a, b, 0.5), b], attribs);
    }

    constructor(points: Vec[], attribs?: Attribs) {
        super(Type.QUADRATIC2, points, attribs);
    }

    copy() {
        return new Quadratic2(this._copy(), { ...this.attribs });
    }

    toHiccup() {
        return ["path", this.attribs,
            [
                ["M", this.points[0]],
                ...this.toHiccupPathSegments()
            ]
        ];
    }

    toHiccupPathSegments() {
        const pts = this.points;
        return [["Q", pts[1], pts[2]]];
    }
}

export class Ray implements IShape {

    pos: Vec;
    dir: Vec;

    constructor(pos: Vec, dir: Vec) {
        this.pos = pos;
        this.dir = dir;
    }

    get type() {
        return Type.RAY;
    }

    copy() {
        return new Ray(copy(this.pos), copy(this.dir));
    }

    equiv(o: any) {
        return o instanceof Ray &&
            equiv(this.pos, o.pos) &&
            equiv(this.dir, o.dir);
    }

    toHiccup() {
        return "";
    }
}

export class Rect2 implements
    AABBLike,
    IShape {

    static fromMinMax(mi: Vec, mx: Vec, attribs?: Attribs) {
        const _mi = min([], mi, mx);
        const _mx = max([], mx, mi);
        return new Rect2(_mi, sub(null, _mx, _mi), attribs);
    }

    pos: Vec;
    size: Vec;
    attribs: Attribs;

    constructor(pos: Vec, size: Vec, attribs?: Attribs) {
        this.pos = pos;
        this.size = size;
        this.attribs = attribs;
    }

    get type() {
        return Type.RECT2;
    }

    copy() {
        return new Rect2(copy(this.pos), copy(this.size), { ...this.attribs });
    }

    equiv(o: any) {
        return o instanceof Rect2 &&
            equiv(this.pos, o.pos) &&
            equiv(this.size, o.size);
    }

    toHiccup() {
        return [this.type, this.attribs, this.pos, this.size];
    }
}

export class Triangle2 extends PointContainer {

    constructor(points: Vec[], attribs?: Attribs) {
        super(Type.TRIANGLE2, points, attribs);
    }

    copy() {
        return new Triangle2(this._copy(), { ...this.attribs });
    }

    toHiccup() {
        return [Type.POLYGON2, this.attribs, this.points];
    }
}
