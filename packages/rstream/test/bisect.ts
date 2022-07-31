import { group } from "@thi.ng/testament";
import { map } from "@thi.ng/transducers";
import * as assert from "assert";
import { bisect, fromIterable, Stream, subscription } from "../src/index.js";

let src: Stream<number>;

group(
	"bisect",
	{
		"raw subscribers": ({ done }) => {
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
					assert.deepStrictEqual(odds, [1, 3]);
					assert.deepStrictEqual(evens, [2, 4]);
					done();
				},
			});
		},

		subs: ({ done, setTimeout }) => {
			const odds: number[] = [],
				evens: number[] = [];
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
						assert.deepStrictEqual(odds, [10, 30]);
						assert.deepStrictEqual(evens, [200, 400]);
						assert.strictEqual(doneCount, 2);
						done();
					}, 0);
				},
			});
		},
	},
	{
		beforeEach: () => {
			src = fromIterable([1, 2, 3, 4]);
		},
	}
);
