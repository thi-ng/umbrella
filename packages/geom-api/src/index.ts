import { ICopy, IObjectOf, IToHiccup } from "@thi.ng/api";
import { ReadonlyVec, Vec } from "@thi.ng/vectors";

export const DEFAULT_SAMPLES = 20;

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

export type Attribs = IObjectOf<any>;

export type Tessellator = (points: ReadonlyVec[]) => Vec[][];

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

export interface SphereLike extends IShape {
    pos: Vec;
    r: number;
}

export interface IHiccupShape extends IShape, IToHiccup {
}

export interface IHiccupPathSegment {
    toHiccupPathSegments(): any[];
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
     * type's `DEFAULT_RES` if neither this nor `theta` option is given.
     */
    num: number;
    /**
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
     * Approximate desired distance between sampled result points. If
     * given, takes priority over the `num` option, but the latter MIGHT
     * be used as part of the sampling process (implementation
     * specific).
     */
    dist: number;
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

export const enum IntersectionType {
    NONE,
    PARALLEL,
    COINCIDENT,
    COINCIDENT_NO_INTERSECT,
    INTERSECT,
    INTERSECT_OUTSIDE,
}

export interface IntersectionResult {
    type: IntersectionType;
    isec?: Vec | Vec[];
    det?: number;
    alpha?: number;
    beta?: number;
    inside?: boolean;
}
