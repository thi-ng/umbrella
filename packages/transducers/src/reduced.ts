import type { IDeref } from "@thi.ng/api";

export class Reduced<T> implements IDeref<T> {
	protected value: T;

	constructor(val: T) {
		this.value = val;
	}

	deref() {
		return this.value;
	}
}

export const reduced = (x: any): any => new Reduced(x);

export const isReduced = <T>(x: any): x is Reduced<T> => x instanceof Reduced;

export const ensureReduced = (x: any) =>
	x instanceof Reduced ? x : new Reduced(x);

export const unreduced = (x: any) => (x instanceof Reduced ? x.deref() : x);
