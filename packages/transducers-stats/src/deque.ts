import type { Predicate2 } from "@thi.ng/api";

/** @internal */
export class Deque {
	index: number[] = [];

	constructor(public samples: number[], public pred: Predicate2<number>) {}

	head() {
		return this.samples[this.index[0]];
	}

	add(x: number) {
		const { index, samples, pred } = this;
		while (index.length && pred(samples[index[index.length - 1]], x)) {
			index.pop();
		}
		index.push(samples.length - 1);
	}

	shift() {
		const { index } = this;
		if (index[0] === 0) index.shift();
		for (let i = 0; i < index.length; i++) index[i]--;
	}
}
