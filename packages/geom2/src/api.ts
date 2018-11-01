import {
    ICopy,
    IEquiv,
    IObjectOf,
    IToHiccup
} from "@thi.ng/api";
import { DEFAULT, defmulti, MultiFn1O } from "@thi.ng/defmulti";
import { equiv } from "@thi.ng/equiv";
import { cossin } from "@thi.ng/math/angle";
import {
    add,
    copy,
    mixNewN,
    mul,
    rotateZ,
    subNew,
    Vec
} from "@thi.ng/vectors2/api";
import { set2 } from "@thi.ng/vectors2/vec2";

export enum Type {
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
}

export const enum LineIntersectionType {
    PARALLEL,
    COINCIDENT,
    COINCIDENT_NO_INTERSECT,
    INTERSECT,
    INTERSECT_OUTSIDE,
}

export const DEFAULT_SAMPLES = 20;

export interface IShape extends
    ICopy<IShape>,
    IEquiv,
    IToHiccup {

    readonly type: string;
    attribs?: IObjectOf<any>;
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

export type Attribs = IObjectOf<any>;

export type Tessellator = (points: Vec[]) => Vec[][];

const dispatch = (x: IShape) => x.type;

export const area: MultiFn1O<IShape, boolean, number> = defmulti(dispatch);

export const arcLength = defmulti<IShape, number>(dispatch);

export const asCubic = defmulti<IShape, Cubic2[]>(dispatch);

export const asPolygon: MultiFn1O<IShape, number | SamplingOpts, Polygon2> = defmulti(dispatch);

export const asPolyline: MultiFn1O<IShape, number | SamplingOpts, Polygon2> = defmulti(dispatch);

export const bounds = defmulti<IShape, AABBLike>(dispatch);

export const center = defmulti<IShape, IShape>(dispatch);

export const centroid: MultiFn1O<IShape, Vec, Vec> = defmulti(dispatch);

export const classifyPoint = defmulti<IShape, Vec, Vec>(dispatch);

export const convexHull = defmulti<IShape, Vec[]>(dispatch);

export const depth = defmulti<IShape, number>(dispatch);
depth.add(DEFAULT, (x) => bounds(x).size[2] || 0);

export const difference = defmulti<IShape, IShape, IShape>(dispatch);

export const extrude = defmulti<IShape, IShape>(dispatch);

export const height = defmulti<IShape, number>(dispatch);
height.add(DEFAULT, (x) => bounds(x).size[1]);

export const intersect = defmulti<IShape, IShape>(dispatch);

export const pointAt = defmulti<IShape, number, IShape>(dispatch);

export const resample = defmulti<IShape, IShape>(dispatch);

/**
 * Returns new shape of same type with a shallow copy of the original
 * geometry (vertex list) simplified using Douglas-Peucker algorithm.
 *
 * @param shape
 * @param eps simplification threshold (default: 0.1)
 */
export const simplify: MultiFn1O<IShape, number, IShape> = defmulti(dispatch);

export const splitAt = defmulti<IShape, number, [IShape, IShape]>(dispatch);

export const tessellate = defmulti<IShape, Iterable<Tessellator>, Vec[][]>(dispatch);

export const union = defmulti<IShape, IShape>(dispatch);

export const vertices: MultiFn1O<IShape, number | Partial<SamplingOpts>, Vec[]> = defmulti(dispatch);

export const width = defmulti<IShape, number>(dispatch);
width.add(DEFAULT, (x) => bounds(x).size[0]);

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

    copy() {
        return new PointContainer(this.type, this._copy(), this.attribs);
    }

    equiv(o: any) {
        return o instanceof PointContainer &&
            equiv(this.points, o.points);
    }

    toHiccup() {
        return [this.type, this.attribs, this.points];
    }

    protected _copy() {
        return this.points.map((p) => copy(p));
    }
}

export class Arc2 implements
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

    pointAtTheta(theta: number, pos?: Vec) {
        return add(rotateZ(mul(set2(pos || [], cossin(theta)), this.r), this.axis), this.pos);
    }

    toHiccup() {
        return ["path", this.attribs, [
            ["M", pointAt(this, 0)],
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
            pointAt(this, 1)
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

export class Cubic2 extends PointContainer {

    static fromLine(a: Vec, b: Vec, attribs?: Attribs) {
        return new Cubic2([a, mixNewN(a, b, 1 / 3), mixNewN(b, a, 1 / 3), b], attribs);
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

export class Line2 extends PointContainer {

    constructor(points: Vec[], attribs?: Attribs) {
        super(Type.LINE2, points, attribs);
    }

    copy() {
        return new Line2(this._copy(), { ...this.attribs });
    }
}

export class Quadratic2 extends PointContainer {

    static fromLine(a: Vec, b: Vec, attribs?: Attribs) {
        return new Quadratic2([a, mixNewN(a, b, 0.5), b], attribs);
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

export class Polygon2 extends PointContainer {

    constructor(points: Vec[], attribs?: Attribs) {
        super(Type.POLYGON2, points, attribs);
    }

    copy() {
        return new Polygon2(this._copy(), { ...this.attribs });
    }
}

export class Polyline2 extends PointContainer {

    constructor(points: Vec[], attribs?: Attribs) {
        super(Type.POLYLINE2, points, attribs);
    }

    copy() {
        return new Polyline2(this._copy(), { ...this.attribs });
    }
}

export class Quad2 extends PointContainer {

    constructor(points: Vec[], attribs?: Attribs) {
        super(Type.POLYGON2, points, attribs);
    }

    copy() {
        return new Quad2(this._copy(), { ...this.attribs });
    }

    get type() {
        return Type.QUAD2;
    }
}

export class Rect2 implements
    AABBLike,
    IShape {

    static fromMinMax(min: Vec, max: Vec, attribs?: Attribs) {
        return new Rect2(min, subNew(max, min), attribs);
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
        super(Type.POLYGON2, points, attribs);
    }

    copy() {
        return new Triangle2(this._copy(), { ...this.attribs });
    }

    get type() {
        return Type.TRIANGLE2;
    }
}
