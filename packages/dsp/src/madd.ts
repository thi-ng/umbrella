import type { ICopy, IReset } from "@thi.ng/api";
import { AGen } from "./agen.js";

/**
 * Returns new multiply-add gen producing `y(t) = factor * y(t-1) +
 * offset`. If `clamp` is given, the curve will be clamped at that
 * value.
 *
 * @param factor - default 1
 * @param start - default 1
 * @param offset - default 0
 * @param clamp - optional final value
 */
export const madd = (
	factor?: number,
	start?: number,
	offset?: number,
	clamp?: number
) => new MAdd(factor, start, offset, clamp);

export class MAdd extends AGen<number> implements ICopy<MAdd>, IReset {
	constructor(
		protected _factor = 1,
		protected _start = 1,
		protected _offset = 0,
		protected _clamp?: number
	) {
		super(0);
		this.reset();
	}

	copy() {
		return new MAdd(this._factor, this._start, this._offset, this._clamp);
	}

	reset() {
		this._val = (this._start - this._offset) / this._factor;
		return this;
	}

	next() {
		let v = this._val * this._factor + this._offset;
		return (this._val =
			this._clamp !== undefined
				? this._start < this._clamp
					? Math.min(v, this._clamp)
					: Math.max(v, this._clamp)
				: v);
	}
}
