import type { IDeref } from "@thi.ng/api";
import { clamp0 } from "@thi.ng/math/interval";
import type { ReadonlyVec } from "@thi.ng/vectors";
import type { IDistance, INeighborhood, Neighbor } from "./api.js";
import { DIST_SQ, DIST_SQ1, DIST_SQ2, DIST_SQ3 } from "./squared.js";

/**
 * A {@link INeighborhood} implementation for radial neighbor queries around a
 * given target location, initial query radius and {@link IDistance} metric to
 * determine proximity. Unbounded and unsorted version of {@link KNearest}.
 *
 * @remarks
 * Qualifying neighbors will be accumulated in order of processing via an
 * internal array and can be obtained via {@link Radial.deref} or
 * {@link Radial.values}.
 *
 * @typeParam D - spatial position for distance metric
 * @typeParam T - indexed value
 */
export class Radial<D, T>
	implements INeighborhood<D, T>, IDeref<Neighbor<T>[]>
{
	protected _r!: number;
	protected _items!: [number, T][];

	constructor(
		public readonly dist: IDistance<D>,
		public target: D,
		public radius = Infinity
	) {
		this.setRadius(radius);
	}

	/**
	 * Clears current results.
	 */
	reset() {
		this._items = [];
		return this;
	}

	/**
	 * Resets search/reference position and clears current results.
	 *
	 * @param target
	 */
	setTarget(target: D) {
		this.target = target;
		this.reset();
	}

	/**
	 * Resets search/query radius and clears current results.
	 *
	 * @param r
	 */
	setRadius(r: number) {
		this.radius = clamp0(r);
		this._r = this.dist.to(this.radius);
		this.reset();
	}

	/**
	 * Returns an array of current neighbor result tuples (each `[dist, val]`).
	 *
	 * @remarks
	 * Use {@link Radial.values} to obtain result values **without** their
	 * distance metrics.
	 */
	deref() {
		return this._items;
	}

	/**
	 * Similar to {@link Radial.deref}, but returns array of result values **without**
	 * their distance metrics.
	 */
	values() {
		return this._items.map((x) => x[1]);
	}

	includesDistance(d: number, eucledian = true) {
		return (eucledian ? this.dist.to(d) : d) <= this._r;
	}

	includesPosition(pos: D) {
		return this.dist.metric(this.target, pos) < this._r;
	}

	consider(pos: D, val: T) {
		const d = this.dist.metric(this.target, pos);
		if (d <= this._r) {
			this._items.push([d, val]);
		}
		return d;
	}
}

/**
 * Defines a {@link Radial} instance for arbitrary length vector positions
 * and, by default, using an infinite region radius and {@link DIST_SQ} distance
 * metric.
 *
 * @param p -
 * @param r -
 * @param dist -
 */
export const radial = <T>(p: ReadonlyVec, r?: number, dist = DIST_SQ) =>
	new Radial<ReadonlyVec, T>(dist, p, r);

/**
 * Defines a {@link Radial} instance for 2D vector positions and, by default,
 * using an infinite region radius and {@link DIST_SQ2} distance metric.
 *
 * @param p -
 * @param r -
 * @param dist -
 */
export const radial2 = <T>(p: ReadonlyVec, r?: number, dist = DIST_SQ2) =>
	new Radial<ReadonlyVec, T>(dist, p, r);

/**
 * Defines a {@link Radial} instance for 3D vector positions, by default,
 * using an infinite region radius and {@link DIST_SQ3} distance metric.
 *
 * @param p -
 * @param r -
 * @param dist -
 */
export const radial3 = <T>(p: ReadonlyVec, r?: number, dist = DIST_SQ3) =>
	new Radial<ReadonlyVec, T>(dist, p, r);

/**
 * Defines a {@link Radial} instance for numeric positions and, by default,
 * using an infinite region radius and {@link DIST_SQ1} distance metric.
 *
 * @param p -
 * @param r -
 * @param dist -
 */
export const radialN = <T>(p: number, r?: number, dist = DIST_SQ1) =>
	new Radial<number, T>(dist, p, r);
