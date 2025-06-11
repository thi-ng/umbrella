import type { IDistance, Metric } from "./api.js";

export class Untransformed<T> implements IDistance<T> {
	constructor(public readonly metric: Metric<T>) {}

	to(x: number) {
		return x;
	}

	from(x: number) {
		return x;
	}
}
