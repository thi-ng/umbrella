import type { ICopy, IReset } from "@thi.ng/api";
import { AProc } from "./aproc.js";

/**
 * Leaky integrator.
 *
 * https://en.wikipedia.org/wiki/Leaky_integrator
 *
 * @param coeff - leak (default: 1)
 */
export const integrator = (coeff?: number, start?: number) =>
	new Integrator(coeff, start);

export class Integrator
	extends AProc<number, number>
	implements ICopy<Integrator>, IReset
{
	constructor(protected _coeff = 1, protected _start = 0) {
		super(_start);
	}

	copy() {
		return new Integrator(this._coeff, this._start);
	}

	reset() {
		this._val = this._start;
		return this;
	}

	next(x: number) {
		return (this._val = this._val * this._coeff + x);
	}

	coeff() {
		return this._coeff;
	}

	setCoeff(c: number) {
		this._coeff = c;
	}
}
