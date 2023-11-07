import { map } from "@thi.ng/transducers";
import { beforeEach, expect, test } from "bun:test";
import { Stream, bisect, fromIterable, subscription } from "../src/index.js";

let src: Stream<number>;

beforeEach(() => {
	src = fromIterable([1, 2, 3, 4]);
});

test("raw subscribers", (done) => {
	const odds: number[] = [];
	const evens: number[] = [];
	src.subscribe(
		bisect<number>(
			(x) => !!(x & 1),
			{
				next(x) {
					odds.push(x);
				},
			},
			{
				next(x) {
					evens.push(x);
				},
			}
		)
	);
	src.subscribe({
		next() {},
		done() {
			expect(odds).toEqual([1, 3]);
			expect(evens).toEqual([2, 4]);
			done();
		},
	});
});

test("subs", (done) => {
	const odds: number[] = [];
	const evens: number[] = [];
	const subo = subscription<number, number>(
		{
			next(x) {
				odds.push(x);
			},
			done() {
				doneCount++;
			},
		},
		{ xform: map<number, number>((x) => x * 10) }
	);
	const sube = subscription<number, number>(
		{
			next(x) {
				evens.push(x);
			},
			done() {
				doneCount++;
			},
		},
		{ xform: map<number, number>((x) => x * 100) }
	);
	let doneCount = 0;
	src.subscribe(bisect((x) => !!(x & 1), subo, sube));
	src.subscribe({
		next() {},
		done() {
			setTimeout(() => {
				expect(odds).toEqual([10, 30]);
				expect(evens).toEqual([200, 400]);
				expect(doneCount).toBe(2);
				done();
			}, 0);
		},
	});
});
