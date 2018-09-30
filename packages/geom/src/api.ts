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

export interface ICollate {
    /**
     * Collates all points into a single buffer and remaps existing
     * vertices (by default). Points will written from given `start`
     * index, using layout defined by `cstride` and `estride`.
     *
     * @param remap
     * @param buf
     * @param start
     * @param cstride
     * @param estride
     */
    collate(remap?: boolean, buf?: Vec, start?: number, cstride?: number, estride?: number): this;
}

export interface IEdges<T> {
    edges(opts?: any): Iterable<T>;
}

export interface IToPolygon2 {
    // FIXME return type should be interface
    toPolygon2(opts?: any): any;
}

export interface IVertices<T> {
    vertices(opts?: any): Iterable<T>;
}
