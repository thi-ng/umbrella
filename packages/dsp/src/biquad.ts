import type { IReset } from "@thi.ng/api";
import { unsupported } from "@thi.ng/errors/unsupported";
import { PI, SQRT2, SQRT2_2 } from "@thi.ng/math/api";
import { clamp05 } from "@thi.ng/math/interval";
import type { BiquadType, FilterConfig, IFilter } from "./api.js";
import { AProc } from "./aproc.js";
import { dbMag } from "./convert.js";

export const biquad = (
	type: BiquadType,
	fc: number,
	q?: number,
	gain?: number
) => new Biquad(type, fc, q, gain);

export const biquadLP = (fc: number, q?: number) => new Biquad("lp", fc, q);

export const biquadHP = (fc: number, q?: number) => new Biquad("hp", fc, q);

export const biquadBP = (fc: number, q?: number) => new Biquad("bp", fc, q);

export const biquadNotch = (fc: number, q?: number) =>
	new Biquad("notch", fc, q);

export const biquadPeak = (fc: number, q?: number, gain = 6) =>
	new Biquad("peak", fc, q, gain);

export const biquadLoShelf = (fc: number, gain = -6) =>
	new Biquad("loshelf", fc, undefined, gain);

export const biquadHiShelf = (fc: number, gain = -6) =>
	new Biquad("hishelf", fc, undefined, gain);

export class Biquad extends AProc<number, number> implements IReset, IFilter {
	protected _a0!: number;
	protected _a1!: number;
	protected _a2!: number;
	protected _b1!: number;
	protected _b2!: number;
	protected _z1!: number;
	protected _z2!: number;

	constructor(
		protected _type: BiquadType,
		protected _freq: number,
		protected _q = SQRT2_2,
		protected _gain = 0
	) {
		super(0);
		this.reset();
		this.calcCoeffs();
	}

	reset() {
		this._z1 = this._z2 = this._val = 0;
		return this;
	}

	next(x: number) {
		const out = x * this._a0 + this._z1;
		this._z1 = x * this._a1 + this._z2 - this._b1 * out;
		this._z2 = x * this._a2 - this._b2 * out;
		return (this._val = out);
	}

	freq() {
		return this._freq;
	}

	q() {
		return this._q;
	}

	gain() {
		return this._gain;
	}

	set(fc: number, q: number, gain: number) {
		this._freq = clamp05(fc);
		this._q = q;
		this._gain = gain;
		this.calcCoeffs();
	}

	setFreq(fc: number) {
		this._freq = clamp05(fc);
		this.calcCoeffs();
	}

	setQ(q: number) {
		this._q = q;
		this.calcCoeffs();
	}

	setGain(g: number) {
		this._gain = g;
		this.calcCoeffs();
	}

	filterCoeffs(): FilterConfig {
		return {
			zeroes: [this._a0, this._a1, this._a2],
			poles: [1, this._b1, this._b2],
		};
	}

	protected calcCoeffs() {
		const k = Math.tan(PI * this._freq);
		const k2 = k * k;
		const k22 = 2 * (k2 - 1);
		const kq = k / this._q;
		const k2kqp1 = 1 + kq + k2;
		const k2kqm1 = 1 - kq + k2;
		const ksqrt2 = k * SQRT2;
		const v = dbMag(Math.abs(this._gain));
		const kvq = k * (v / this._q);
		const ksqrt2v = k * Math.sqrt(2 * v);
		let norm = 1 / k2kqp1;
		switch (this._type) {
			case "lp":
				this._a0 = k2 * norm;
				this._a1 = 2 * this._a0;
				this._a2 = this._a0;
				this._b1 = k22 * norm;
				this._b2 = k2kqm1 * norm;
				break;

			case "hp":
				this._a0 = norm;
				this._a1 = -2 * this._a0;
				this._a2 = this._a0;
				this._b1 = k22 * norm;
				this._b2 = k2kqm1 * norm;
				break;

			case "bp":
				this._a0 = kq * norm;
				this._a1 = 0;
				this._a2 = -this._a0;
				this._b1 = k22 * norm;
				this._b2 = k2kqm1 * norm;
				break;

			case "notch":
				this._a0 = (1 + k2) * norm;
				this._a1 = k22 * norm;
				this._a2 = this._a0;
				this._b1 = this._a1;
				this._b2 = k2kqm1 * norm;
				break;

			case "peak": {
				const z1 = 1 + kvq + k2;
				const z2 = 1 - kvq + k2;
				if (this._gain >= 0) {
					this._a0 = z1 * norm;
					this._a1 = k22 * norm;
					this._a2 = z2 * norm;
					this._b1 = this._a1;
					this._b2 = k2kqm1 * norm;
				} else {
					norm = 1 / z1;
					this._a0 = k2kqp1 * norm;
					this._a1 = k22 * norm;
					this._a2 = k2kqm1 * norm;
					this._b1 = this._a1;
					this._b2 = z2 * norm;
				}
				break;
			}

			case "loshelf": {
				const z1 = 1 + ksqrt2 + k2;
				const z2 = 1 - ksqrt2 + k2;
				const vk2 = v * k2;
				const y1 = 1 + ksqrt2v + vk2;
				const y2 = 1 - ksqrt2v + vk2;
				const vk22 = 2 * (vk2 - 1);
				if (this._gain >= 0) {
					norm = 1 / z1;
					this._a0 = y1 * norm;
					this._a1 = vk22 * norm;
					this._a2 = y2 * norm;
					this._b1 = k22 * norm;
					this._b2 = z2 * norm;
				} else {
					norm = 1 / y1;
					this._a0 = z1 * norm;
					this._a1 = k22 * norm;
					this._a2 = z2 * norm;
					this._b1 = vk22 * norm;
					this._b2 = y2 * norm;
				}
				break;
			}

			case "hishelf": {
				const z1 = 1 + ksqrt2 + k2;
				const z2 = 1 - ksqrt2 + k2;
				const y1 = v + ksqrt2v + k2;
				const y2 = v - ksqrt2v + k2;
				const vk2 = 2 * (k2 - v);
				if (this._gain >= 0) {
					norm = 1 / z1;
					this._a0 = y1 * norm;
					this._a1 = vk2 * norm;
					this._a2 = y2 * norm;
					this._b1 = k22 * norm;
					this._b2 = z2 * norm;
				} else {
					norm = 1 / y1;
					this._a0 = z1 * norm;
					this._a1 = k22 * norm;
					this._a2 = z2 * norm;
					this._b1 = vk2 * norm;
					this._b2 = y2 * norm;
				}
				break;
			}

			default:
				unsupported(`invalid filter type: ${this._type}`);
		}
	}
}
