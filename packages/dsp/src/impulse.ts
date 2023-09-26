import type { ICopy, IReset } from "@thi.ng/api";
import { AGen } from "./agen.js";

/**
 * Numeric version of {@link impulseT}, using given `on` (default: 1) as
 * initial value and zero for the remaining values.
 *
 * @param on -
 */
export const impulse = (on = 1) => new Impulse(on, 0);

/**
 * Creates a new impulse gen, producing a single `on` for the first
 * invocation of {@link IGen.next}, then only `off` thereafter.
 *
 * @param on - impulse value
 * @param off -
 */
export const impulseT = <T>(on: T, off: T) => new Impulse<T>(on, off);

/**
 * Boolean version of {@link impulseT}, using given `start` (default:
 * true) as initial value and its inverse for the remaining values.
 *
 * @param start -
 */
export const impulseB = (start = true) => new Impulse(start, !start);

export class Impulse<T> extends AGen<T> implements ICopy<Impulse<T>>, IReset {
	constructor(protected _on: T, protected _off: T) {
		super(_on);
	}

	copy() {
		return new Impulse(this._on, this._off);
	}

	reset() {
		this._val = this._on;
		return this;
	}

	next() {
		const x = this._val;
		this._val = this._off;
		return x;
	}
}
