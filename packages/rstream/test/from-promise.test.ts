import { expect, test } from "bun:test";
import {
	fromIterable,
	fromPromise,
	resolve,
	type ISubscribable,
} from "../src/index.js";
import { TIMEOUT } from "./config.js";
import { assertActive } from "./utils.js";

const dummySub = (src: ISubscribable<any>) => {
	const state = { err: undefined, called: false };
	const sub = src.subscribe({
		next(_) {
			expect().fail("called next()");
		},
		done() {
			expect().fail("called done()");
		},
		error(e) {
			state.err = e;
			state.called = true;
			return true;
		},
	});
	return { sub, state };
};

test("resolves to sub", (done) => {
	let src = fromPromise(Promise.resolve(23));
	let called = false;
	src.subscribe({
		next(x) {
			expect(x).toBe(23);
			called = true;
		},
		done() {
			expect(called).toBeTrue();
			done();
		},
	});
});

test("rejected promise", (done) => {
	let called1 = false;
	let err: any;
	let src = fromPromise(Promise.reject<number>(23), {
		error: (e) => {
			err = e;
			called1 = true;
			return true;
		},
	});
	const { sub, state } = dummySub(src);
	setTimeout(() => {
		expect(called1).toBeTrue();
		expect(state.called).toBeFalse();
		expect(err).toBe(23);
		expect(state.err).toBe(undefined);
		assertActive(src);
		assertActive(sub);
		done();
	}, TIMEOUT);
});

test("promise w/ error", (done) => {
	let called1 = false;
	let err: any;
	let src = fromPromise(
		new Promise(() => {
			throw new Error("foo");
		}),
		{
			error: (e) => {
				err = e;
				called1 = true;
				return true;
			},
		}
	);
	const { sub, state } = dummySub(src);
	setTimeout(() => {
		expect(called1).toBeTrue();
		expect(state.called).toBeFalse();
		expect(err.message).toBe("foo");
		expect(state.err).toBe(undefined);
		assertActive(src);
		assertActive(sub);
		done();
	}, TIMEOUT);
});

test("resolves via Resolver", (done) => {
	let src = fromIterable([Promise.resolve(23)]);
	let called = false;
	src.subscribe(resolve()).subscribe({
		next(x) {
			expect(x).toBe(23);
			called = true;
		},
		done() {
			expect(called).toBeTrue();
			done();
		},
	});
});
// { maxTrials: 3 }
