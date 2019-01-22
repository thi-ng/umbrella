import { ICopy, IObjectOf, IToHiccup } from "@thi.ng/api";
import { isNumber } from "@thi.ng/checks";
import { equiv } from "@thi.ng/equiv";
import { illegalState } from "@thi.ng/errors";
import {
    add2,
    add3,
    maddN2,
    ReadonlyVec,
    set,
    Vec
} from "@thi.ng/vectors";
import { arcPointAt, arcPointAtTheta } from "./internal/arc-point";
import { copyPoints } from "./internal/copy-points";

export const enum SegmentType {
    MOVE,
    LINE,
    POLYLINE,
    ARC,
    CUBIC,
    QUADRATIC,
    CLOSE,
}

export const enum Type {
    AABB = 1,
    ARC,
    CIRCLE,
    CUBIC,
    CUBIC3,
    ELLIPSE,
    GROUP,
    LINE,
    LINE3,
    PATH,
    POINTS,
    POINTS3,
    POLYGON,
    POLYGON3,
    POLYLINE,
    POLYLINE3,
    QUAD,
    QUAD3,
    QUADRATIC,
    QUADRATIC3,
    RECT,
    SPHERE,
    TRIANGLE,
    TRIANGLE3,
    RAY,
    RAY3,
}

export const enum IntersectionType {
    NONE,
    PARALLEL,
    COINCIDENT,
    COINCIDENT_NO_INTERSECT,
    INTERSECT,
    INTERSECT_OUTSIDE,
}

export const DEFAULT_SAMPLES = 20;

export type Attribs = IObjectOf<any>;

export type Tessellator = (points: Vec[]) => Vec[][];

export type VecPair = [Vec, Vec];

export interface IShape extends
    ICopy<IShape> {

    readonly type: number | string;
    attribs?: Attribs;
}

export interface AABBLike extends IShape {
    pos: Vec;
    size: Vec;

    max(): Vec;
}

export interface IHiccupShape extends IShape, IToHiccup { }

export interface IHiccupPathSegment {
    toHiccupPathSegments(): any[];
}

export interface IntersectionResult {
    type: IntersectionType;
}

export interface LineIntersection extends IntersectionResult {
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

export interface PCLike extends IShape {
    points: Vec[];
}

export interface PCLikeConstructor {
    new(pts: Vec[], attribs: Attribs): PCLike;
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
     * - Arc
     * - Circle
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
    iter?: (pts: ReadonlyVec[]) => Iterable<ReadonlyVec>;
    size: number;
}

export abstract class APC implements
    PCLike {

    points: Vec[];
    attribs: Attribs;

    constructor(points: Vec[], attribs?: Attribs) {
        this.points = points;
        this.attribs = attribs;
    }

    abstract get type(): number | string;
    abstract copy(): IShape;

    *[Symbol.iterator]() {
        yield* this.points;
    }
}

export class AABB implements
    AABBLike {

    pos: Vec;
    size: Vec;
    attribs: Attribs;

    constructor(pos: Vec = [0, 0, 0], size: Vec = [1, 1, 1], attribs?: Attribs) {
        this.pos = pos;
        this.size = size;
        this.attribs = attribs;
    }

    get type() {
        return Type.AABB;
    }

    copy() {
        return new AABB(set([], this.pos), set([], this.size), { ...this.attribs });
    }

    max() {
        return add3([], this.pos, this.size);
    }
}


export class Arc implements
    IHiccupShape,
    IHiccupPathSegment {

    pos: Vec;
    r: Vec;
    start: number;
    end: number;
    axis: number;
    xl: boolean;
    cw: boolean;
    attribs: Attribs;

    constructor(
        pos: Vec,
        r: Vec,
        axis: number,
        start: number,
        end: number,
        xl = false,
        cw = false,
        attribs?: Attribs) {

        this.pos = pos;
        this.r = r;
        this.axis = axis;
        this.start = start;
        this.end = end;
        this.xl = xl;
        this.cw = cw;
        this.attribs = attribs;
    }

    get type() {
        return Type.ARC;
    }

    copy() {
        return new Arc(
            set([], this.pos),
            set([], this.r),
            this.axis,
            this.start,
            this.end,
            this.xl,
            this.cw,
            { ...this.attribs }
        );
    }

    equiv(o: any) {
        return o instanceof Arc &&
            equiv(this.pos, o.pos) &&
            equiv(this.r, o.r) &&
            this.start === o.start &&
            this.end === o.end &&
            this.axis === o.axis &&
            this.xl === o.xl &&
            this.cw && o.cw;
    }

    pointAt(t: number, out: Vec = []) {
        return arcPointAt(this.pos, this.r, this.axis, this.start, this.end, t, out);
    }

    pointAtTheta(theta: number, out: Vec = []) {
        return arcPointAtTheta(this.pos, this.r, this.axis, theta, out);
    }

    toHiccup() {
        return ["path", this.attribs, [
            ["M", this.pointAt(0)],
            ...this.toHiccupPathSegments()
        ]];
    }

    toHiccupPathSegments() {
        return [
            [
                "A",
                this.r[0],
                this.r[1],
                this.axis,
                this.xl,
                this.cw,
                this.pointAt(1)
            ]
        ];
    }
}

export class Circle implements
    IHiccupShape {

    pos: Vec;
    r: number;
    attribs: Attribs;

    constructor(pos: Vec = [0, 0], r = 1, attribs?: Attribs) {
        this.pos = pos;
        this.r = r;
        this.attribs = attribs;
    }

    get type() {
        return Type.CIRCLE;
    }

    copy() {
        return new Circle(set([], this.pos), this.r, { ...this.attribs });
    }

    toHiccup() {
        return ["circle", this.attribs, this.pos, this.r];
    }
}

export class Cubic extends APC implements
    IHiccupPathSegment {

    get type() {
        return Type.CUBIC;
    }

    copy() {
        return new Cubic(copyPoints(this.points), { ...this.attribs });
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

export class Ellipse implements
    IHiccupShape {

    pos: Vec;
    r: Vec;
    attribs: Attribs;

    constructor(pos: Vec = [0, 0], r: number | Vec = [1, 1], attribs?: Attribs) {
        this.pos = pos;
        this.r = isNumber(r) ? [r, r] : r;
        this.attribs = attribs;
    }

    get type() {
        return Type.ELLIPSE;
    }

    copy() {
        return new Ellipse(set([], this.pos), set([], this.r), { ...this.attribs });
    }

    toHiccup() {
        return ["ellipse", this.attribs, this.pos, this.r];
    }
}

export class Group implements
    IHiccupShape {

    children: IHiccupShape[];
    attribs: Attribs;

    constructor(children: IHiccupShape[], attribs?: Attribs) {
        this.children = children;
        this.attribs = attribs;
    }

    get type() {
        return Type.GROUP;
    }

    *[Symbol.iterator]() {
        yield* this.children;
    }

    copy() {
        return new Group(
            <IHiccupShape[]>this.children.map((c) => c.copy()),
            { ...this.attribs }
        );
    }

    equiv(o: any) {
        return o instanceof Group &&
            equiv(this.children, o.children);
    }

    toHiccup() {
        return ["g", this.attribs, ...this.children.map((x) => x.toHiccup())];
    }
}

export class Line extends APC implements
    IHiccupShape,
    IHiccupPathSegment {

    get type() {
        return Type.LINE;
    }

    copy() {
        return new Line(copyPoints(this.points), { ...this.attribs });
    }

    toHiccup() {
        return ["line", this.attribs, this.points[0], this.points[1]];
    }

    toHiccupPathSegments() {
        const [a, b] = this.points;
        return [
            a[0] === b[0] ?
                ["V", b[1]] :
                a[1] === b[1] ?
                    ["H", b[0]] :
                    ["L", b]
        ];
    }
}

export class Path implements
    IHiccupShape {

    segments: PathSegment[];
    closed: boolean;
    attribs: Attribs;

    constructor(segments?: PathSegment[], attribs?: Attribs) {
        this.segments = segments || [];
        this.attribs = attribs;
        this.closed = false;
    }

    get type() {
        return Type.PATH;
    }

    *[Symbol.iterator]() {
        yield* this.segments;
    }

    copy() {
        const p = new Path([...this.segments], { ...this.attribs });
        p.closed = this.closed;
        return p;
    }

    equiv(o: any) {
        return o instanceof Path &&
            equiv(this.segments, o.segments);
    }

    add(s: PathSegment) {
        if (this.closed) illegalState("path already closed");
        this.segments.push(s);
    }

    toHiccup() {
        let dest: any[] = [];
        const segments = this.segments;
        const n = segments.length;
        if (n > 1) {
            dest.push(["M", segments[0].point]);
            for (let i = 1; i < n; i++) {
                dest = dest.concat(segments[i].geo.toHiccupPathSegments());
            }
            if (this.closed) {
                dest.push(["Z"]);
            }
        }
        return ["path", this.attribs || {}, dest];
    }
}

export class Points extends APC implements
    IHiccupShape {

    get type() {
        return Type.POINTS;
    }

    copy() {
        return new Points(copyPoints(this.points), { ...this.attribs });
    }

    toHiccup() {
        return ["points", this.attribs, this.points];
    }
}

export class Polygon extends APC implements
    IHiccupShape {

    get type() {
        return Type.POLYGON;
    }

    copy() {
        return new Polygon(copyPoints(this.points), { ...this.attribs });
    }

    toHiccup() {
        return ["polygon", this.attribs, this.points];
    }
}

export class Polyline extends APC implements
    IHiccupShape,
    IHiccupPathSegment {

    get type() {
        return Type.POLYLINE;
    }

    copy() {
        return new Polyline(copyPoints(this.points), { ...this.attribs });
    }

    toHiccup() {
        return ["polyline", { ...this.attribs, fill: "none" }, this.points];
    }

    toHiccupPathSegments() {
        const res: any[] = [];
        for (let pts = this.points, n = pts.length, i = 1; i < n; i++) {
            res.push(["L", pts[i]]);
        }
        return res;
    }
}

export class Quad extends APC implements
    IHiccupShape {

    get type() {
        return Type.QUAD;
    }

    copy() {
        return new Quad(copyPoints(this.points), { ...this.attribs });
    }

    toHiccup() {
        return ["polygon", this.attribs, this.points];
    }
}

export class Quadratic extends APC implements
    IHiccupShape,
    IHiccupPathSegment {

    get type() {
        return Type.QUADRATIC;
    }

    copy() {
        return new Quadratic(copyPoints(this.points), { ...this.attribs });
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

export class Ray implements
    IHiccupShape {

    pos: Vec;
    dir: Vec;
    attribs: Attribs;

    constructor(pos: Vec, dir: Vec, attribs?: Attribs) {
        this.pos = pos;
        this.dir = dir;
        this.attribs = attribs;
    }

    get type() {
        return Type.RAY;
    }

    copy() {
        return new Ray(set([], this.pos), set([], this.dir), { ...this.attribs });
    }

    toHiccup() {
        return ["line", this.attribs, this.pos, maddN2([], this.pos, this.dir, 1e6)];
    }
}

export class Rect implements
    AABBLike,
    IHiccupShape {

    pos: Vec;
    size: Vec;
    attribs: Attribs;

    constructor(pos: Vec = [0, 0], size: number | Vec = [1, 1], attribs?: Attribs) {
        this.pos = pos;
        this.size = isNumber(size) ? [size, size] : size;
        this.attribs = attribs;
    }

    get type() {
        return Type.RECT;
    }

    copy() {
        return new Rect(set([], this.pos), set([], this.size), { ...this.attribs });
    }

    max() {
        return add2([], this.pos, this.size);
    }

    toHiccup() {
        return ["rect", this.attribs, this.pos, this.size[0], this.size[1]];
    }
}

export class Sphere implements
    IHiccupShape {

    pos: Vec;
    r: number;
    attribs: Attribs;

    constructor(pos: Vec = [0, 0, 0], r = 1, attribs?: Attribs) {
        this.pos = pos;
        this.r = r;
        this.attribs = attribs;
    }

    get type() {
        return Type.SPHERE;
    }

    copy() {
        return new Sphere(set([], this.pos), this.r, { ...this.attribs });
    }

    toHiccup() {
        return ["sphere", this.attribs, this.pos, this.r];
    }
}

export class Triangle extends APC implements
    IHiccupShape {

    get type() {
        return Type.TRIANGLE;
    }

    copy() {
        return new Triangle(copyPoints(this.points), { ...this.attribs });
    }

    toHiccup() {
        return ["polygon", this.attribs, this.points];
    }
}
