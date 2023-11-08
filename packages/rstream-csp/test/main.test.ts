import { Channel } from "@thi.ng/csp";
import { State } from "@thi.ng/rstream";
import { expect, test } from "bun:test";
import { fromChannel } from "../src/index.js";

test("receives all values", (done) => {
	let ch = Channel.range(5);
	let src = fromChannel(ch);
	let buf: number[] = [];
	src.subscribe({
		next(x) {
			buf.push(x);
		},
		done() {
			expect(buf).toEqual([0, 1, 2, 3, 4]);
			expect(ch.isClosed()).toBeTrue();
			expect(src.getState()).toBe(State.DONE);
			done();
		},
	});
});
