import type { ICopy, IReset } from "@thi.ng/api";
import { AGen } from "./agen.js";

export const alt = (n = 1) => new Alt(n, -n);

export const altT = <T>(a: T, b: T) => new Alt(a, b);

export const altB = (x = true) => new Alt(x, !x);

export class Alt<T> extends AGen<T> implements ICopy<Alt<T>>, IReset {
	protected _flip = true;

	constructor(protected _a: T, protected _b: T) {
		super(_b);
	}

	copy() {
		return new Alt(this._a, this._b);
	}

	reset() {
		this._flip = true;
		return this;
	}

	next() {
		return (this._val = (this._flip = !this._flip) ? this._b : this._a);
	}
}
