import type { IDeref } from "@thi.ng/api";
import { Heap } from "@thi.ng/heaps";
import type { ReadonlyVec } from "@thi.ng/vectors";
import type { IDistance, INeighborhood, Neighbor } from "./api";
import { DIST_SQ, DIST_SQ1, DIST_SQ2, DIST_SQ3 } from "./squared";

/**
 * A {@link INeighborhood} implementation for K-nearest neighbor queries around
 * a given target location, initial query radius and {@link IDistance} metric to
 * determine proximity.
 *
 * @remarks
 * The K-nearest neighbors will be accumulated via an internal
 * {@link @thi.ng/heaps#Heap} and results can be optionally returned in order of
 * proximity. For K=1 it will be more efficient to use {@link Nearest} to avoid
 * the additional overhead.
 */
export class KNearest<D, T>
    implements INeighborhood<D, T>, IDeref<Neighbor<T>[]> {
    protected maxR!: number;
    protected heap = new Heap<Neighbor<T>>(null, {
        compare: (a, b) => b[0] - a[0],
    });

    constructor(
        public readonly dist: IDistance<D>,
        public readonly target: D,
        public readonly k: number,
        public readonly radius = Infinity,
        public sorted = false
    ) {
        this.reset();
    }

    reset() {
        this.maxR = this.dist.to(this.radius);
        this.heap.clear();
        return this;
    }

    /**
     * Returns an array of current nearest neighbor result tuples (each `[dist,
     * val]`). The array will contain at most `k` items and if the `sorted` ctor
     * arg was true, will be sorted by distance.
     *
     * @remarks
     * Use {@link KNearest.values} to obtain result values **without** their distance
     * metrics.
     */
    deref() {
        return this.sorted ? this.heap.max() : this.heap.values;
    }

    /**
     * Similar to {@link KNearest.deref}, but returns array of result values **without**
     * their distance metrics.
     */
    values() {
        return this.deref().map((x) => x[1]);
    }

    includesDistance(d: number, eucledian = true) {
        return (eucledian ? this.dist.to(d) : d) <= this.maxR;
    }

    consider(pos: D, val: T) {
        const d = this.dist.metric(this.target, pos);
        if (d <= this.maxR) {
            const heap = this.heap;
            if (heap.length === this.k) {
                heap.pushPop([d, val]);
                this.maxR = heap.peek()[0];
            } else {
                heap.push([d, val]);
            }
        }
        return d;
    }
}

/**
 * Defines a {@link KNearest} instance for arbitrary length vector positions
 * and, by default, using an infinite region radius and {@link DIST_SQ} distance
 * metric.
 *
 * @param p
 * @param k
 * @param r
 * @param dist
 * @param sorted
 */
export const knearest = <T>(
    p: ReadonlyVec,
    k: number,
    r?: number,
    dist = DIST_SQ,
    sorted?: boolean
) => new KNearest<ReadonlyVec, T>(dist, p, k, r, sorted);

/**
 * Defines a {@link KNearest} instance for 2D vector positions and, by default,
 * using an infinite region radius and {@link DIST_SQ2} distance metric.
 *
 * @param p
 * @param k
 * @param r
 * @param dist
 * @param sorted
 */
export const knearest2 = <T>(
    p: ReadonlyVec,
    k: number,
    r?: number,
    dist = DIST_SQ2,
    sorted?: boolean
) => new KNearest<ReadonlyVec, T>(dist, p, k, r, sorted);

/**
 * Defines a {@link KNearest} instance for 3D vector positions, by default,
 * using an infinite region radius and {@link DIST_SQ3} distance metric.
 *
 * @param p
 * @param k
 * @param r
 * @param dist
 * @param sorted
 */
export const knearest3 = <T>(
    p: ReadonlyVec,
    k: number,
    r?: number,
    dist = DIST_SQ3,
    sorted?: boolean
) => new KNearest<ReadonlyVec, T>(dist, p, k, r, sorted);

/**
 * Defines a {@link KNearest} instance for numeric positions and, by default,
 * using an infinite region radius and {@link DIST_SQ1} distance metric.
 *
 * @param p
 * @param k
 * @param r
 * @param dist
 * @param sorted
 */
export const knearestN = <T>(
    p: number,
    k: number,
    r?: number,
    dist = DIST_SQ1,
    sorted?: boolean
) => new KNearest<number, T>(dist, p, k, r, sorted);
