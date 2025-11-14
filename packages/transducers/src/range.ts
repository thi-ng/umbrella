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
		const { from, to, step } = this;
		for (
			let i = 0, x: number;
			(x = from + i * step),
				(step >= 0 && x < to) || (step < 0 && x > to);
			i++
		) {
			yield x;
		}
	}

	$reduce<T>(
		rfn: ReductionFn<number, T>,
		acc: T | Reduced<T>
	): T | Reduced<T> {
		const { from, to, step } = this;
		for (
			let i = 0, x: number;
			(x = from + i * step),
				!isReduced(acc) &&
					((step >= 0 && x < to) || (step < 0 && x > to));
			i++
		) {
			acc = rfn(<T>acc, x);
		}
		return acc;
	}
}
