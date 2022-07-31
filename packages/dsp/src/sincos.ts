import type { IReset } from "@thi.ng/api";
import { TAU } from "@thi.ng/math/api";
import { AGen } from "./agen.js";

/**
 * Generator of sine & cosine values of given frequency in the form of
 * [sin,cos] tuples. Start phase always zero.
 *
 * @remarks
 * Implementation based on a self-oscillating SVF (state-variable
 * filter) without using any trig functions. Therefore, ~30% faster, but
 * precision only useful for very low (< ~2Hz) frequencies. Due to
 * floating point error accumulation, phase & amplitude drift will occur
 * for higher frequencies.
 *
 * References:
 * - http://www.earlevel.com/main/2003/03/02/the-digital-state-variable-filter/
 *
 * @param freq - normalized freq
 * @param amp - amplitude (default: 1)
 */
export class SinCos extends AGen<number[]> implements IReset {
	protected _f!: number;
	protected _s!: number;
	protected _c!: number;

	constructor(protected _freq: number, protected _amp = 1) {
		super([0, _amp]);
		this.calcCoeffs();
	}

	reset() {
		this.calcCoeffs();
		return this;
	}

	next() {
		this._val = [this._s, this._c];
		this._s += this._f * this._c;
		this._c -= this._f * this._s;
		return this._val;
	}

	freq() {
		return this._freq;
	}

	setFreq(freq: number) {
		this._freq = freq;
		this.calcCoeffs();
	}

	amp() {
		return this._amp;
	}

	setAmp(amp: number) {
		this._amp = amp;
		this.calcCoeffs();
	}

	protected calcCoeffs() {
		this._f = TAU * this._freq;
		this._s = 0;
		this._c = this._amp;
	}
}
