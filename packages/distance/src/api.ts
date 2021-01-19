import type { FnU2, IReset, Pair } from "@thi.ng/api";

export type Metric<T> = FnU2<T, number>;

export type Neighbor<T> = Pair<number, T>;

export interface IDistance<T> {
    /**
     * The actual distance function metric.
     */
    readonly metric: Metric<T>;

    /**
     * Converts Eucledian distance `x` into the metric of this instance.
     *
     * @param x
     */
    to(x: number): number;

    /**
     * Converts `x` from the metric of this instance into an Eucledian value.
     *
     * @param x
     */
    from(x: number): number;
}

export interface INeighborhood<P, T> extends IReset {
    /**
     * The neighborhood's target position / centroid
     */
    readonly target: P;
    /**
     * The neighborhood's original radius (Eucledian metric)
     */
    readonly radius: number;

    /**
     * Returns true, if distance `d` is <= current radius of this neighborhood.
     * If `eucledian` is true (default: true), then `d` will first be converted
     * into the metric used by this neighborhood using {@link IDistance.to}.
     *
     * @param d
     * @param eucledian
     */
    includesDistance(d: number, eucledian?: boolean): boolean;

    /**
     * Computes distance metric between `pos` and this neighborhood's target
     * pos. If result distance is <= current radius, adds `val` to neighborhood
     * and shrinks neighborhood radius to new distance. Returns distance metric.
     *
     * @param pos
     * @param val
     */
    consider(pos: P, val: T): number;
}
