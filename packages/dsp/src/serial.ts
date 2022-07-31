import type { IProc } from "./api.js";
import { AProc } from "./aproc.js";

/**
 * Composes the given {@link IProc}s into a single new processor instance. The
 * returned `IProc` processes the given procs in serial (sequence), i.e. output
 * from 1st proc is used as input for 2nd etc.
 *
 * @remarks
 * Provides optimized (loop free) versions for 2-4 inputs
 *
 * @param a -
 * @param b -
 */
export function serial<A, B, C>(a: IProc<A, B>, b: IProc<B, C>): IProc<A, C>;
export function serial<A, B, C, D>(
	a: IProc<A, B>,
	b: IProc<B, C>,
	c: IProc<C, D>
): IProc<A, D>;
export function serial<A, B, C, D, E>(
	a: IProc<A, B>,
	b: IProc<B, C>,
	c: IProc<C, D>,
	d: IProc<D, E>
): IProc<A, E>;
export function serial<A, B, C, D, E>(
	a: IProc<A, B>,
	b: IProc<B, C>,
	c: IProc<C, D>,
	d: IProc<D, E>,
	...xs: IProc<any, any>[]
): IProc<A, any>;
export function serial(...procs: IProc<any, any>[]): IProc<any, any> {
	const [a, b, c, d] = procs;
	switch (procs.length) {
		case 2:
			return new Serial2(a, b);
		case 3:
			return new Serial3(a, b, c);
		case 4:
			return new Serial4(a, b, c, d);
		default:
			return new Serial(procs);
	}
}

export class Serial2<A, B, C> extends AProc<A, C> {
	constructor(protected _a: IProc<A, B>, protected _b: IProc<B, C>) {
		super(<any>null);
	}

	next(x: A) {
		return (this._val = this._b.next(this._a.next(x)));
	}
}

export class Serial3<A, B, C, D> extends AProc<A, D> {
	constructor(
		protected _a: IProc<A, B>,
		protected _b: IProc<B, C>,
		protected _c: IProc<C, D>
	) {
		super(<any>null);
	}

	next(x: A) {
		return (this._val = this._c.next(this._b.next(this._a.next(x))));
	}
}

export class Serial4<A, B, C, D, E> extends AProc<A, E> {
	constructor(
		protected _a: IProc<A, B>,
		protected _b: IProc<B, C>,
		protected _c: IProc<C, D>,
		protected _d: IProc<D, E>
	) {
		super(<any>null);
	}

	next(x: A) {
		return (this._val = this._d.next(
			this._c.next(this._b.next(this._a.next(x)))
		));
	}
}

export class Serial extends AProc<any, any> {
	constructor(protected _procs: IProc<any, any>[]) {
		super(<any>null);
	}

	next(x: any) {
		return (this._val = this._procs.reduce((x, p) => p.next(x), x));
	}
}
