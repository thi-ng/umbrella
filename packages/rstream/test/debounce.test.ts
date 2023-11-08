import { expect, test } from "bun:test";
import { debounce, fromIterable } from "../src/index.js";
import { TIMEOUT } from "./config.js";

test("basic", (done) => {
	const acc: number[] = [];
	fromIterable([1, 2, 3], { delay: TIMEOUT })
		.subscribe(debounce(TIMEOUT * 1.5))
		.subscribe({
			next(x) {
				acc.push(x);
			},
		});
	setTimeout(() => {
		expect(acc).toEqual([3]);
		done();
	}, TIMEOUT * 5);
});

test("no last", (done) => {
	const acc: number[] = [];
	fromIterable([1, 2, 3], { delay: TIMEOUT })
		.subscribe(debounce(TIMEOUT * 1.5, { emitLast: false }))
		.subscribe({
			next(x) {
				acc.push(x);
			},
		});
	setTimeout(() => {
		expect(acc).toEqual([]);
		done();
	}, TIMEOUT * 5);
});
// { maxTrials: 3, timeOut: TIMEOUT * 6 }
