import { beforeEach, expect, test } from "bun:test";
import {
	State,
	Stream,
	Subscription,
	fromIterable,
	type ISubscription,
} from "../src/index.js";
import { TIMEOUT } from "./config.js";

let src: Stream<number>;
let data = [10, 20, 30];

beforeEach(() => {
	src = fromIterable(data);
});

test("is a stream", () => {
	expect(src instanceof Stream).toBeTrue();
	expect(src instanceof Subscription).toBeTrue();
});

test("has an ID", () => {
	expect(src.id.startsWith("iterable-")).toBeTrue();
});

test("starts in IDLE state", () => {
	expect(src.getState()).toBe(State.IDLE);
});

test("delivers all values", (done) => {
	let buf: any[] = [];
	src.subscribe({
		next(x) {
			buf.push(x);
		},
		done() {
			expect(buf).toEqual(data);
			done();
		},
	});
});

test("finishes", (done) => {
	let sub: ISubscription<any, any> = src.subscribe({
		next() {},
		done() {
			expect(src.getState()).toBe(State.DONE);
			expect(sub.getState()).toBe(State.DONE);
			done();
		},
	});
});

test("works with delay", (done) => {
	let buf: any[] = [];
	let t0 = Date.now();
	src = fromIterable(data, { delay: 10 });
	src.subscribe({
		next(x) {
			buf.push(x);
		},
		done() {
			expect(buf).toEqual(data);
			expect(Date.now() - t0 >= (data.length + 1) * 10).toBeTrue();
			done();
		},
	});
});

test("can be cancelled", (done) => {
	let buf: any[] = [];
	let doneCalled = false;
	src = fromIterable(data, { delay: TIMEOUT });
	src.subscribe({
		next(x) {
			buf.push(x);
		},
		done() {
			doneCalled = true;
		},
	});
	setTimeout(() => src.cancel(), TIMEOUT * 1.5);
	setTimeout(() => {
		expect(buf).toEqual([data[0]]);
		expect(doneCalled).toBeFalse();
		done();
	}, TIMEOUT * 4);
});
// maxTrials: 3,
// timeOut: TIMEOUT * 5,
