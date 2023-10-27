// thing:no-export
import { type IDeref } from "@thi.ng/api";
import type { IDistance, INeighborhood } from "@thi.ng/distance";
import type { ReadonlyVec } from "@thi.ng/vectors";

/**
 * In principle the same as eponymous class in thi.ng/distance, but with several
 * small optimizations for this package.
 *
 * @internal
 */
export class Radial<T> implements INeighborhood<ReadonlyVec, T>, IDeref<T[]> {
	protected _r!: number;
	protected _items: T[] = [];

	constructor(
		public dist: IDistance<ReadonlyVec>,
		public target: ReadonlyVec,
		public radius = Infinity
	) {
		this.setRadius(radius);
	}

	deref() {
		return this._items;
	}

	reset() {
		this._items.length = 0;
		return this;
	}

	setRadius(r: number) {
		this.radius = Math.max(0, r);
		this._r = this.dist.to(this.radius);
		this.reset();
	}

	includesDistance(d: number, eucledian = true) {
		return (eucledian ? this.dist.to(d) : d) <= this._r;
	}

	includesPosition(pos: ReadonlyVec): boolean {
		return this.dist.metric(this.target, pos) <= this._r;
	}

	consider(pos: ReadonlyVec, val: T) {
		const d = this.dist.metric(this.target, pos);
		d <= this._r && this._items.push(val);
		return d;
	}
}
