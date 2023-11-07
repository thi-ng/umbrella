import { expect, test } from "bun:test";
import { timeout } from "../src/index.js";
import { TIMEOUT } from "./config.js";

test("times out", (done) => {
	let err: any;
	timeout(TIMEOUT).subscribe({
		error(e) {
			err = e;
			return true;
		},
	});
	setTimeout(() => {
		expect(err instanceof Error).toBeTrue();
		done();
	}, TIMEOUT * 2);
});

test("times out with error object", (done) => {
	const errorObj = "error object";
	let err: any;
	timeout(TIMEOUT, { error: errorObj }).subscribe({
		error(e) {
			err = e;
			return true;
		},
	});
	setTimeout(() => {
		expect(err).toBe(errorObj);
		done();
	}, TIMEOUT * 2);
});

test("cancels timeout in cleanup()", (done) => {
	let called = false;
	timeout(TIMEOUT)
		.subscribe({
			error() {
				called = true;
				return true;
			},
		})
		.unsubscribe();

	setTimeout(() => {
		expect(called).toBeFalse();
		done();
	}, TIMEOUT * 2);
});

test("resets timeout when value received", (done) => {
	const buf: any[] = [];
	let res: any[] | undefined;
	const t = timeout(TIMEOUT, { reset: true });
	t.subscribe({
		next(x) {
			buf.push(x);
		},
		error() {
			res === undefined && (res = [...buf]);
			return true;
		},
	});

	setTimeout(() => t.next(1), TIMEOUT * 0.7);
	setTimeout(() => t.next(2), TIMEOUT * 1.5);
	setTimeout(() => t.next(3), TIMEOUT * 2.9);
	setTimeout(() => {
		expect(res).toEqual([1, 2]);
		expect(buf).toEqual([1, 2, 3]);
		done();
	}, TIMEOUT * 3.5);
});
