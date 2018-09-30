import { ICopy } from "@thi.ng/api/api";
import { IDistance, IMix, Vec } from "@thi.ng/vectors/api";

export type SampleableVector<T> =
    ICopy<T> &
    IDistance<T> &
    IMix<T>;

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

export interface ArcSamplingOpts {
    /**
     * Number of points to sample & return. Defaults to
     * `Arc2.DEFAULT_RES` if neither this nor `theta` option is given.
     */
    num: number;
    /**
     * Target angle between sampled points. If greater than the actual
     * range of the arc, only the 2 end points will be returned. This
     * option is used to derive a `num` value and will take priority if
     * `num` is given as well.
     *
     * This option is useful to adapt the sampling based on actual angle
     * range, rather than a fixed number of samples.
     */
    theta: number;
    /**
     * If `false` (default), the arc's end point will be omitted from
     * the result array and if `num` option was given, results in
     * `num-1` points. However, this option has no influence on the
     * angular resolution calculation.
     *
     * This option is useful when building paths of consecutive
     * segments, where the end point of one segment coincides with the
     * start point of the next segment and so can be used to avoid
     * duplicate vertices in the concatenated result.
     */
    includeLast: boolean;
}

export interface IBounds<T> {
    bounds(): T;
    /**
     * Dimension along x-axis.
     */
    width(): number;
    /**
     * Dimension along y-axis.
     */
    height(): number;
    /**
     * Dimension along z-axis.
     */
    depth(): number;
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

export interface CollateOpts {
    buf: Vec;
    start: number;
    cstride: number;
    estride: number;
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

export interface IToPolygon2 {
    // FIXME return type should be interface
    toPolygon2(opts?: any): any;
}

export interface IVertices<T, O> {
    vertices(opts?: O): Iterable<T>;
}
