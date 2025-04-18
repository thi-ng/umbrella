// SPDX-License-Identifier: Apache-2.0
import type { IReducible, ReductionFn } from "./api.js";
import { isReduced, Reduced } from "./reduced.js";

export function range(): Range;
export function range(to: number): Range;
export function range(from: number, to: number): Range;
export function range(from: number, to: number, step: number): Range;
export function range(from?: number, to?: number, step?: number) {
	return new Range(from!, to!, step!);
}

/**
 * Simple class wrapper around given range interval and implementing `Iterable`
 * and {@link IReducible} interfaces, the latter is used to accelerate use with
 * {@link reduce}.
 */
export class Range implements Iterable<number>, IReducible<number, any> {
	protected from: number;
	protected to: number;
	protected step: number;

	constructor(to: number);
	constructor(from: number, to: number);
	constructor(from: number, to: number, step: number);
	constructor(from?: number, to?: number, step?: number) {
		if (from === undefined) {
			from = 0;
			to = Infinity;
		} else if (to === undefined) {
			to = from;
			from = 0;
		}
		step = step === undefined ? (from < to ? 1 : -1) : step;
		this.from = from;
		this.to = to;
		this.step = step;
	}

	*[Symbol.iterator]() {
		let { from, to, step } = this;
		if (step > 0) {
			while (from < to) {
				yield from;
				from += step;
			}
		} else if (step < 0) {
			while (from > to) {
				yield from;
				from += step;
			}
		}
	}

	$reduce<T>(
		rfn: ReductionFn<number, T>,
		acc: T | Reduced<T>
	): T | Reduced<T> {
		const step = this.step;
		if (step > 0) {
			for (
				let i = this.from, n = this.to;
				i < n && !isReduced(acc);
				i += step
			) {
				acc = rfn(acc, i);
			}
		} else {
			for (
				let i = this.from, n = this.to;
				i > n && !isReduced(acc);
				i += step
			) {
				acc = rfn(acc, i);
			}
		}
		return acc;
	}
}
