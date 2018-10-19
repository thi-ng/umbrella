import { IObjectOf } from "@thi.ng/api/api";
import { IVector, ReadonlyVec, Vec } from "@thi.ng/vectors/api";
import { Vec2 } from "@thi.ng/vectors/vec2";

export const DEFAULT_SAMPLES = 32;

export type Attribs = IObjectOf<any>;

export type Tessellator<T extends IVector<T>> =
    (points: ReadonlyArray<T>) => T[][];

export const enum LineIntersectionType {
    PARALLEL,
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

export interface CollateOpts {
    buf: Vec;
    start: number;
    cstride: number;
    estride: number;
}

export interface LineIntersection<T> {
    type: LineIntersectionType;
    isec?: T;
    det?: number;
    alpha?: number;
    beta?: number;
}

export interface PathSegment {
    type: SegmentType;
    point?: Vec2;
    geo?: IBoundsRaw<Vec2> & IVertices<Vec2, any> & IHiccupPathSegment & IToCubic;
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

export interface SubdivKernel<T extends IVector<T>> {
    fn: (pts: T[], i: number, nump: number) => T[];
    size: number;
}

export interface IArea {
    /**
     * Computes and returns area. For types where orientation is taken
     * into account, setting `signed` to false will always return the
     * absolute area (default is `true`).
     *
     * @param unsigned
     */
    area(signed?: boolean): number;
}

export interface IArcLength {
    /**
     * Returns arc length, or for closed shapes, circumference.
     */
    arcLength(): number;
}

export interface IBoundsRaw<V> {
    /**
     * @return min / max points
     */
    boundsRaw(): [V, V];
}

export interface IBounds<T> {
    /**
     * Bounding shape
     */
    bounds(): T;
}

export interface ICentroid<T> {
    /**
     * Computes & returns centroid. If `c` is given it MUST be a zero
     * vector and will be used to store result.
     *
     * @param c
     */
    centroid(c?: T): T;
}

export interface ICenter<T> {
    center(origin?: Readonly<T>): this;
}

export interface IClassifyPoint<T> {
    classifyPoint(p: Readonly<T>): number;
}

export interface IPointInside<T> {
    pointInside(p: Readonly<T>): boolean;
}

export interface ICollate {
    /**
     * Collates all points into a single buffer and remaps existing
     * vertices (by default). Points will written from given `start`
     * index, using layout defined by `cstride` and `estride`.
     *
     * @param opts
     */
    collate(opts?: Partial<CollateOpts>): Vec;
}

export interface IEdges<T> {
    edges(opts?: any): Iterable<T>;
}

export interface IHiccupPathSegment {
    toHiccupPathSegments(): any[];
}

export interface IPointMap<A, B> {
    mapPoint(p: Readonly<A>, out?: B): B;
    unmapPoint(p: Readonly<B>, out?: A): A;
}

export interface IToCubic {
    toCubic(): Iterable<any>;
}

export interface IToPolygon<O> {
    // FIXME return type should be interface
    toPolygon(opts?: O): any;
}

export interface ITessellateable<T extends IVector<T>> {
    tessellate(tessel: Tessellator<T>, iter?: number): T[][];
    tessellate(tessel: Iterable<Tessellator<T>>): T[][];
}

export interface ITransformable<M> {
    transform(mat: M): this;
}

export interface IUnion<T> {
    union(x: T): T;
}

export interface IVertices<T, O> {
    vertices(opts?: O): Iterable<T>;
}

export interface JsonShape {
    type: string;
    attribs?: Attribs;
}

export interface JsonArc2 extends JsonShape {
    pos: Vec;
    r: Vec;
    axis: number;
    start: number;
    end: number;
    xl: boolean;
    clockwise: boolean;
}

export interface JsonCircle2 extends JsonShape {
    pos: Vec;
    r: number;
}

export interface JsonCubic2 extends JsonShape {
    points: Vec[];
}

export interface JsonQuadratic2 extends JsonShape {
    points: Vec[];
}

export interface JsonPolygon2 extends JsonShape {
    points: Vec[];
}

export interface JsonPolyline2 extends JsonShape {
    points: Vec[];
}

export interface JsonRect2 extends JsonShape {
    pos: Vec;
    size: Vec[];
}

export type HiccupArc2 =
    ["arc", Attribs, ReadonlyVec, ReadonlyVec, number, number, number, boolean, boolean];

export type HiccupCircle2 =
    ["circle", Attribs, ReadonlyVec, number];

export type HiccupLine2 =
    ["line", Attribs, ReadonlyVec, ReadonlyVec];

export type HiccupPolygon2 =
    ["polygon", Attribs, number[] | number[][]];

export type HiccupPolyline2 =
    ["polyline", Attribs, number[] | number[][]];

export type HiccupRect2 =
    ["rect", Attribs, ReadonlyVec, number, number, number?];
