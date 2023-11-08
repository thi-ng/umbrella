import { expect, test } from "bun:test";
import { CloseMode, fromIterable, metaStream, reactive } from "../src/index.js";
import { TIMEOUT } from "./config.js";
import { assertActive, assertUnsub } from "./utils.js";

test("basic", (done) => {
	const acc: number[] = [];
	const src = fromIterable([1, 2, 3], { delay: TIMEOUT });
	const meta = metaStream<number, number>((x) =>
		fromIterable([x * 10, x * 20, x * 30], { delay: TIMEOUT >> 2 })
	);
	const sub = src.subscribe(meta);
	const sub2 = sub.subscribe({
		next(x) {
			acc.push(x);
		},
	});
	setTimeout(() => {
		expect(acc).toEqual([10, 20, 30, 20, 40, 60, 30, 60, 90]);
		assertUnsub(meta);
		assertUnsub(sub);
		assertUnsub(sub2);
		done();
	}, 5 * TIMEOUT);
});

test("null", (done) => {
	const acc: number[] = [];
	const src = fromIterable([1, 2, 3], { delay: TIMEOUT });
	const meta = metaStream<number, number>((x) =>
		x & 1 ? reactive(x) : null
	);
	const sub = src.subscribe(meta);
	const sub2 = sub.subscribe({
		next(x) {
			acc.push(x);
		},
	});
	setTimeout(() => {
		expect(acc).toEqual([1, 3]);
		assertUnsub(meta);
		assertUnsub(sub);
		assertUnsub(sub2);
		done();
	}, 5 * TIMEOUT);
});

test("closein", (done) => {
	const src = fromIterable([1], { delay: TIMEOUT });
	const meta = metaStream((x) => fromIterable([x]), {
		closeIn: CloseMode.NEVER,
	});
	const sub = src.subscribe(meta);
	const child = sub.subscribe({});
	setTimeout(() => {
		assertUnsub(src);
		assertActive(meta);
		assertActive(sub);
		assertActive(child);
		done();
	}, 3 * TIMEOUT);
});

test("closeout", (done) => {
	const src = fromIterable([1], { delay: TIMEOUT });
	const meta = src.subscribe(
		metaStream((x) => fromIterable([x * 10]), {
			closeIn: CloseMode.NEVER,
			closeOut: CloseMode.NEVER,
		})
	);
	const acc: number[] = [];
	const child = meta.subscribe({
		next(x) {
			acc.push(x);
		},
	});
	setTimeout(() => {
		child.unsubscribe();
		assertUnsub(src);
		assertActive(meta);
		meta.subscribe({
			next(x) {
				acc.push(x);
			},
		});
		expect(acc).toEqual([10, 10]);
		done();
	}, 3 * TIMEOUT);
});
