import type { ISeqable } from "@thi.ng/api";
import { expect, test } from "bun:test";
import { concat, ensureSeq, iterator } from "../src/index.js";

export class Range implements ISeqable<number> {
	n: number;

	constructor(n: number) {
		this.n = n;
	}

	seq() {
		const $seq = (i: number) =>
			i < this.n
				? {
						first() {
							return i;
						},
						next() {
							return $seq(i + 1);
						},
				  }
				: undefined;
		return $seq(0);
	}
}

test("basics", () => {
	expect<any>(ensureSeq(new Range(0))).toBe(undefined);
	expect<any>(new Range(0).seq()).toBe(undefined);
	expect<any>(new Range(1).seq()!.first()).toBe(0);
	expect<any>(new Range(1).seq()!.next()).toBe(undefined);
	expect([...iterator(new Range(3))]).toEqual([0, 1, 2]);
	expect([...iterator(new Range(0))]).toEqual([]);
	expect([
		...iterator(concat(new Range(3), new Range(0), new Range(4))),
	]).toEqual([0, 1, 2, 0, 1, 2, 3]);
});
