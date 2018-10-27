import { ICopy, IObjectOf } from "@thi.ng/api";
import { DEFAULT, defmulti, MultiFn1O } from "@thi.ng/defmulti";
import { copy, subNew, Vec, mixNewN } from "@thi.ng/vectors2/api";

import "@thi.ng/vectors2/vec2";

export enum Type {
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

export interface Shape extends
    ICopy<Shape> {
    readonly type: string;
    attribs?: IObjectOf<any>;
}

export interface AABBLike extends Shape {
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

const dispatch = (x: Shape) => x.type;

export const area: MultiFn1O<Shape, boolean, number> = defmulti(dispatch);

export const arcLength = defmulti<Shape, number>(dispatch);

export const asCubic = defmulti<Shape, Cubic2>(dispatch);

export const asPolygon: MultiFn1O<Shape, number | SamplingOpts, Polygon2> = defmulti(dispatch);

export const asPolyline: MultiFn1O<Shape, number | SamplingOpts, Polygon2> = defmulti(dispatch);

export const bounds = defmulti<Shape, AABBLike>(dispatch);

export const center = defmulti<Shape, Shape>(dispatch);

export const centroid: MultiFn1O<Shape, Vec, Vec> = defmulti(dispatch);

export const classifyPoint = defmulti<Shape, Vec, Vec>(dispatch);

export const convexHull = defmulti<Shape, Vec[]>(dispatch);

export const depth = defmulti<Shape, number>(dispatch);
depth.add(DEFAULT, (x) => bounds(x).size[2] || 0);

export const difference = defmulti<Shape, Shape, Shape>(dispatch);

export const extrude = defmulti<Shape, Shape>(dispatch);

export const height = defmulti<Shape, number>(dispatch);
height.add(DEFAULT, (x) => bounds(x).size[1]);

export const intersect = defmulti<Shape, Shape>(dispatch);

export const pointAt = defmulti<Shape, number, Shape>(dispatch);

export const resample = defmulti<Shape, Shape>(dispatch);

/**
 * Returns new shape of same type with a shallow copy of the original
 * geometry (vertex list) simplified using Douglas-Peucker algorithm.
 *
 * @param shape
 * @param eps simplification threshold (default: 0.1)
 */
export const simplify: MultiFn1O<Shape, number, Shape> = defmulti(dispatch);

export const splitAt = defmulti<Shape, number, [Shape, Shape]>(dispatch);

export const tessellate = defmulti<Shape, Iterable<Tessellator>, Vec[][]>(dispatch);

export const union = defmulti<Shape, Shape>(dispatch);

export const vertices: MultiFn1O<Shape, number | Partial<SamplingOpts>, Vec[]> = defmulti(dispatch);

export const width = defmulti<Shape, number>(dispatch);
width.add(DEFAULT, (x) => bounds(x).size[0]);

export abstract class AShape extends Array<any> implements
    Shape {

    constructor(type: string, attribs: Attribs, ...xs: any[]) {
        super(type, attribs, ...xs);
    }

    get type() {
        return this[0];
    }

    get attribs() {
        return this[1];
    }

    set attribs(attr: Attribs) {
        this[1] = attr;
    }

    abstract copy(): Shape;
}

/**
 * [type, {}, points]
 */
export class PointContainer extends AShape {

    constructor(type: Type, points: Vec[], attribs?: Attribs) {
        super(type, attribs, points);
    }

    get points(): Vec[] {
        return this[2];
    }

    set points(pts: Vec[]) {
        this[2] = pts;
    }

    copy() {
        return new PointContainer(
            this.type,
            this.points.map((p) => copy(p)),
            { ...this.attribs }
        );
    }
}

/**
 * ["circle", {}, pos, r]
 */
export class Circle2 extends AShape implements
    ICopy<Circle2> {

    constructor(pos: Vec, r: number, attribs?: Attribs) {
        super(Type.CIRCLE2, attribs, pos, r);
    }

    copy() {
        return new Circle2(copy(this.pos), this.r, { ...this.attribs });
    }

    get pos(): Vec {
        return this[2];
    }

    set pos(v: Vec) {
        this[2] = v;
    }

    get r(): number {
        return this[3];
    }

    set r(r: number) {
        this[3] = r;
    }
}

/**
 * ```
 * ["cubic", {}, points]
 * ```
 */
export class Cubic2 extends PointContainer implements
    ICopy<Cubic2> {

    static fromLine(a: Vec, b: Vec, attribs?: Attribs) {
        return new Cubic2([a, mixNewN(a, b, 1 / 3), mixNewN(b, a, 1 / 3), b], attribs);
    }

    constructor(points: Vec[], attribs?: Attribs) {
        super(Type.CUBIC2, points, attribs);
    }

    copy() {
        return new Cubic2(this.points.map(copy), { ...this.attribs });
    }
}

/**
 * ["ellipse", {}, pos, r]
 */
export class Ellipse2 extends AShape implements
    ICopy<Ellipse2> {

    constructor(pos: Vec, r: Vec, attribs?: Attribs) {
        super(Type.ELLIPSE2, attribs, pos, r);
    }

    copy() {
        return new Ellipse2(copy(this.pos), this.r, { ...this.attribs });
    }

    get pos(): Vec {
        return this[2];
    }

    set pos(v: Vec) {
        this[2] = v;
    }

    get r(): Vec {
        return this[3];
    }

    set r(r: Vec) {
        this[3] = r;
    }
}

/**
 * ["circle", {}, pos, r]
 */
export class Group2 extends AShape implements
    ICopy<Group2> {

    constructor(attribs?: Attribs, ...children: Shape[]) {
        super(Type.GROUP, attribs, children);
    }

    copy() {
        return new Group2({ ...this.attribs }, ...<Shape[]>this.children.map((c) => c.copy()));
    }

    get children(): Shape[] {
        return this[2];
    }

    set children(children: Shape[]) {
        this[2] = children;
    }
}

/**
 * ```
 * ["quadratic", {}, points]
 * ```
 */
export class Quadratic2 extends PointContainer implements
    ICopy<Quadratic2> {

    static fromLine(a: Vec, b: Vec, attribs?: Attribs) {
        return new Quadratic2([a, mixNewN(a, b, 0.5), b], attribs);
    }

    constructor(points: Vec[], attribs?: Attribs) {
        super(Type.QUADRATIC2, points, attribs);
    }

    copy() {
        return new Quadratic2(this.points.map(copy), { ...this.attribs });
    }
}

/**
 * ```
 * ["polygon", {}, points]
 * ```
 */
export class Polygon2 extends PointContainer implements
    ICopy<Polygon2> {

    constructor(points: Vec[], attribs?: Attribs) {
        super(Type.POLYGON2, points, attribs);
    }

    copy() {
        return new Polygon2(this.points, { ...this.attribs });
    }
}

/**
 * ```
 * ["polygon", {}, points]
 * ```
 */
export class Polyline2 extends PointContainer implements
    ICopy<Polyline2> {

    constructor(points: Vec[], attribs?: Attribs) {
        super(Type.POLYLINE2, points, attribs);
    }

    copy() {
        return new Polyline2(this.points.map(copy), { ...this.attribs });
    }
}

/**
 * ```
 * ["quad", {}, points]
 * ```
 */
export class Quad2 extends PointContainer implements
    ICopy<Quad2> {

    constructor(points: Vec[], attribs?: Attribs) {
        super(Type.POLYGON2, points, attribs);
    }

    copy() {
        return new Quad2(this.points.map(copy), { ...this.attribs });
    }

    get type() {
        return Type.QUAD2;
    }
}

/**
 * ```
 * ["rect", {}, pos, size]
 * ```
 */
export class Rect2 extends AShape implements
    AABBLike,
    ICopy<Rect2> {

    static fromMinMax(min: Vec, max: Vec, attribs?: Attribs) {
        return new Rect2(min, subNew(max, min), attribs);
    }

    constructor(pos: Vec, size: Vec, attribs?: Attribs) {
        super(Type.RECT2, attribs, pos, size);
    }

    copy() {
        return new Rect2(copy(this.pos), copy(this.size), { ...this.attribs });
    }

    get pos(): Vec {
        return this[2];
    }

    set pos(v: Vec) {
        this[2] = v;
    }

    get size(): Vec {
        return this[3];
    }

    set size(v: Vec) {
        this[3] = v;
    }
}

export class Triangle2 extends PointContainer implements
    ICopy<Triangle2> {

    constructor(points: Vec[], attribs?: Attribs) {
        super(Type.POLYGON2, points, attribs);
    }

    copy() {
        return new Triangle2(this.points.map(copy), { ...this.attribs });
    }

    get type() {
        return Type.TRIANGLE2;
    }
}
