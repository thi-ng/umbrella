import { map, partition } from "@thi.ng/transducers";
import { expect, test } from "bun:test";
import {
	CloseMode,
	State,
	Stream,
	fromIterable,
	fromIterableSync,
	stream,
	subscription,
	type ISubscription,
} from "../src/index.js";
import { TIMEOUT } from "./config.js";
import { assertActive, assertError, assertIdle, assertUnsub } from "./utils.js";

let src: Stream<number>;

test("fsm", () => {
	src = stream();
	assertIdle(src);
	const sub = src.subscribe({
		next() {
			throw 1;
		},
	});
	let state2: State = State.IDLE;
	let err: any;
	let sub2: ISubscription<any, any>;
	sub2 = src.subscribe({
		next() {
			throw 1;
		},
		done() {
			state2 = sub2.getState();
		},
		error(e) {
			err = e;
			return true;
		},
	});
	assertActive(src);
	assertActive(sub);
	assertActive(sub2);
	src.next(1);
	assertActive(src);
	assertError(sub);
	assertActive(sub2);
	src.done();
	assertUnsub(src);
	assertError(sub);
	assertUnsub(sub2);
	expect<State>(state2).toBe(State.DONE);
	expect(err).toBe(1);

	expect(() => src.subscribe({})).toThrow();
});

test("new sub receives last", (done) => {
	let buf: any[] = [];
	src = fromIterable([1, 2, 3], { delay: TIMEOUT });
	src.subscribe({
		next(x) {
			buf.push(x);
		},
	});
	setTimeout(
		() =>
			src.subscribe({
				next(x) {
					buf.push(x);
				},
				done() {
					expect(buf).toEqual([1, 2, 2, 3, 3]);
					done();
				},
			}),
		TIMEOUT * 2.5
	);
});

test("unsub does not trigger Subscription.done()", (done) => {
	let buf: any[] = [];
	let called = false;
	src = fromIterable([1, 2, 3], { delay: TIMEOUT });
	const sub = src.subscribe({
		next(x) {
			buf.push(x);
		},
		done() {
			called = true;
		},
	});
	setTimeout(() => sub.unsubscribe(), TIMEOUT * 1.5);
	setTimeout(() => {
		expect(buf).toEqual([1]);
		expect(src.getState()).toBe(State.UNSUBSCRIBED);
		expect((<any>src).subs.length).toBe(0);
		expect(called).toBeFalse();
		done();
	}, TIMEOUT * 4);
});

test("no new values after unsub", (done) => {
	let buf: any[] = [];
	let called = false;
	src = fromIterable([1, 2, 3], { delay: TIMEOUT });
	const sub = src.subscribe(
		{
			next(x) {
				buf.push(x);
			},
			done() {
				called = true;
			},
		},
		{ xform: partition<number>(2, true) }
	);
	setTimeout(() => sub.unsubscribe(), TIMEOUT * 2.5);
	setTimeout(() => {
		expect(buf).toEqual([[1, 2]]);
		expect(src.getState()).toBe(State.UNSUBSCRIBED);
		expect(called).toBeFalse();
		done();
	}, TIMEOUT * 4);
});

test("done state", (done) => {
	let state = State.IDLE;
	src = fromIterable([1]);
	const sub = src.subscribe({
		done() {
			state = sub.getState();
		},
	});
	setTimeout(() => {
		expect(state).toBe(State.DONE);
		assertUnsub(sub);
		assertUnsub(src);
		done();
	}, TIMEOUT * 2);
});

test("completing transducer sends all values", (done) => {
	let buf: any[] = [];
	src = fromIterable([1, 2, 3], { delay: 10 });
	src.subscribe(
		{
			next(x) {
				buf.push(x);
			},
			done() {
				expect(buf).toEqual([[1, 2], [3]]);
				expect(src.getState()).toBe(State.DONE);
				done();
			},
		},
		{ xform: partition(2, true) }
	);
});

test("transform", () => {
	let buf: any[] = [];
	fromIterableSync([1], { closeIn: CloseMode.NEVER })
		.transform(map((x: number) => x + 10))
		.subscribe({
			next(x) {
				buf.push(x);
			},
		});
	expect(buf).toEqual([11]);
});

test("sub w/ xform", () => {
	let buf: any[] = [];
	fromIterableSync([1], { closeIn: CloseMode.NEVER }).subscribe(
		{
			next(x) {
				buf.push(x);
			},
		},
		{ xform: map((x: number) => x + 10) }
	);
	expect(buf).toEqual([11]);
});

test("child sub w/ xform", () => {
	let buf: any[] = [];
	fromIterableSync([1], { closeIn: CloseMode.NEVER }).subscribe(
		subscription({
			next(x) {
				buf.push(x);
			},
		}),
		{ xform: map((x: number) => x + 10) }
	);
	expect(buf).toEqual([11]);
});

test("stream source error", () => {
	let err: any;
	const src = stream(
		() => {
			throw "eek";
		},
		{
			error(e) {
				err = e;
				return false;
			},
		}
	);
	const sub = src.subscribe({});
	expect(err).toBe("eek");
	assertError(src);
	assertActive(sub);
});
