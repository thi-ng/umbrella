// SPDX-License-Identifier: Apache-2.0
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

export const reduced = <T>(x: T) => new Reduced<T>(x);

export const isReduced = <T>(x: any): x is Reduced<T> => x instanceof Reduced;

export const ensureReduced = <T>(x: T) =>
	x instanceof Reduced ? x : new Reduced<T>(x);

export const unreduced = <T>(x: T | Reduced<T>) =>
	x instanceof Reduced ? <T>x.deref() : x;
