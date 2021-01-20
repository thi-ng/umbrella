import type { IDeref } from "@thi.ng/api";
import type { ReadonlyVec } from "@thi.ng/vectors";
import type { IDistance, Neighbor, INeighborhood } from "./api";
import { DIST_SQ, DIST_SQ1, DIST_SQ2, DIST_SQ3 } from "./squared";

/**
 * A {@link INeighborhood} implementation for nearest neighbor queries around a
 * given target location, initial query radius and {@link IDistance} metric to
 * determine proximity.
 */
export class Nearest<D, T>
    implements INeighborhood<D, T>, IDeref<Neighbor<T> | undefined> {
    maxR!: number;
    value?: T;

    constructor(
        public readonly dist: IDistance<D>,
        public readonly target: D,
        public readonly radius = Infinity
    ) {
        this.reset();
    }

    reset() {
        this.maxR = this.dist.to(this.radius);
        this.value = undefined;
        return this;
    }

    /**
     * Returns current nearest neighbor result tuple (`[dist, val]`) or
     * undefined, if no such result exists (yet).
     */
    deref() {
        return this.value != undefined
            ? <Neighbor<T>>[this.maxR, this.value]
            : undefined;
    }

    includesDistance(d: number, eucledian = true) {
        return (eucledian ? this.dist.to(d) : d) <= this.maxR;
    }

    consider(pos: D, val: T) {
        const d = this.dist.metric(this.target, pos);
        if (d <= this.maxR) {
            this.maxR = d;
            this.value = val;
        }
        return d;
    }
}

/**
 * Defines a {@link Nearest} instance for arbitrary length vector positions, by
 * default, using an infinite region radius and {@link DIST_SQ} distance
 * metric.
 *
 * @param p
 * @param r
 * @param dist
 */
export const nearest = <T>(p: ReadonlyVec, r?: number, dist = DIST_SQ) =>
    new Nearest<ReadonlyVec, T>(dist, p, r);

/**
 * Defines a {@link Nearest} instance for 2D vector positions, by default,
 * using an infinite region radius and {@link DIST_SQ2} distance metric.
 *
 * @param p
 * @param r
 * @param dist
 */
export const nearest2 = <T>(p: ReadonlyVec, r?: number, dist = DIST_SQ2) =>
    new Nearest<ReadonlyVec, T>(dist, p, r);

/**
 * Defines a {@link Nearest} instance for 3D vector positions, by default,
 * using an infinite region radius and {@link DIST_SQ3} distance metric.
 *
 * @param p
 * @param r
 * @param dist
 */
export const nearest3 = <T>(p: ReadonlyVec, r?: number, dist = DIST_SQ3) =>
    new Nearest<ReadonlyVec, T>(dist, p, r);

/**
 * Defines a {@link Nearest} instance for numeric positions and, by default,
 * using an infinite region radius and {@link DIST_SQ1} distance metric.
 *
 * @param p
 * @param r
 * @param dist
 */
export const nearestN = <T>(p: number, r?: number, dist = DIST_SQ1) =>
    new Nearest<number, T>(dist, p, r);
