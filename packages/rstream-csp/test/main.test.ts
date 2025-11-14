// SPDX-License-Identifier: Apache-2.0
import { fromAsyncIterable } from "@thi.ng/csp";
import { State } from "@thi.ng/rstream";
import { expect, test } from "bun:test";
import { fromChannel } from "../src/index.js";

test("receives all values", (done) => {
	let ch = fromAsyncIterable(
		(async function* () {
			yield 1;
			yield 2;
			yield 3;
		})()
	);
	let src = fromChannel(ch);
	let buf: number[] = [];
	src.subscribe({
		next(x) {
			buf.push(x);
		},
		done() {
			expect(buf).toEqual([1, 2, 3]);
			expect(ch.closed()).toBeTrue();
			expect(src.getState()).toBe(State.DONE);
			done();
		},
	});
});
