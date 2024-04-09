import { expect, test } from "bun:test";
import {
	asAsync,
	fromAsync,
	fromIterable,
	fromIterableSync,
} from "../src/index.js";

async function* $async<T>(src: T[]) {
	yield* src;
}

test("fromAsync", ($done) => {
	let res: number[] = [];
	fromAsync($async([1, 2, 3])).subscribe({
		next(x) {
			res.push(x);
		},
		done() {
			expect(res).toEqual([1, 2, 3]);
			$done();
		},
	});
});

test("asAsync (fromIterable)", async (done) => {
	let res: number[] = [];
	for await (let x of asAsync(fromIterable([1, 2, 3]))) {
		res.push(x);
	}
	expect(res).toEqual([1, 2, 3]);
	done();
});

test("asAsync (fromIterableSync)", async (done) => {
	let res: number[] = [];
	for await (let x of asAsync(fromIterableSync([1, 2, 3]))) {
		res.push(x);
	}
	expect(res).toEqual([1, 2, 3]);
	done();
});
