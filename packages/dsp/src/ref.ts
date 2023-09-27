import { AGen } from "./agen.js";
import type { IGen, IProc } from "./api.js";
import { AProc } from "./aproc.js";

export const refG = <T>(src: IGen<T>) => new RefG(src);

export class RefG<T> extends AGen<T> {
	constructor(protected _src: IGen<T>) {
		super(_src.deref());
	}

	next() {
		return this._src.deref();
	}
}

export const refP = <A, B>(src: IProc<A, B>) => new RefP(src);

export class RefP<A, B> extends AProc<A, B> {
	constructor(protected _src: IProc<A, B>) {
		super(_src.deref());
	}

	next() {
		return this._src.deref();
	}
}
