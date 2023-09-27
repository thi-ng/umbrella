import { clamp01 } from "@thi.ng/math/interval";
import type { IGen } from "./api.js";
import { AProc2 } from "./aproc.js";
import { __ensureGenN } from "./internal/ensure.js";

export const mix = (t?: number) => new Mix(t);

export class Mix extends AProc2<number, number, number> {
	protected _t!: IGen<number>;

	constructor(t: number | IGen<number> = 0.5) {
		super(0);
		this.mix = t;
	}

	get mix() {
		return this._t.deref();
	}

	set mix(t: number | IGen<number>) {
		this._t = __ensureGenN(t, clamp01);
	}

	next(a: number, b: number) {
		return (this._val = a + (b - a) * this._t.next());
	}
}
