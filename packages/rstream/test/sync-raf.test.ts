import { expect, test } from "bun:test";
import { State, stream, syncRAF } from "../src/index.js";

test("basic", (done) => {
	const a = stream();
	const a2 = syncRAF(a);
	a.next(1);
	expect(a.deref()).toBe(1);
	expect(a2.deref()).toBe(undefined);
	setTimeout(() => {
		expect(a.deref()).toBe(2);
		expect(a2.deref()).toBe(2);
		done();
	}, 20);
	a.next(2);
});

test("early done", (done) => {
	const a = stream();
	const a2 = syncRAF(a);
	a.next(1);
	a.done();
	setTimeout(() => {
		expect(a.getState()).toBe(State.UNSUBSCRIBED);
		expect(a.deref()).toBe(undefined);
		expect(a2.getState()).toBe(State.UNSUBSCRIBED);
		expect(a2.deref()).toBe(undefined);
		done();
	}, 20);
});
