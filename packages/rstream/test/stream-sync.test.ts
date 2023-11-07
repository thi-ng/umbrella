import { Atom } from "@thi.ng/atom";
import { comp, filter, last, map, take } from "@thi.ng/transducers";
import { expect, test } from "bun:test";
import {
	CloseMode,
	State,
	fromInterval,
	fromIterable,
	fromPromise,
	fromView,
	stream,
	sync,
	transduce,
} from "../src/index.js";
import { TIMEOUT } from "./config.js";
import { assertActive, assertUnsub } from "./utils.js";

const adder = () =>
	map((ports: any) => {
		let sum = 0;
		for (let p in ports) {
			sum += ports[p];
		}
		return sum;
	});

test("dataflow & teardown", () => {
	let a, b, c;
	let a1done = false,
		a2done = false;
	let a1buf: any, a2buf: any;
	const db = new Atom<any>({
		a1: { ins: { a: 1, b: 2 } },
		a2: { ins: { b: 10 } },
	});
	const a1 = sync({
		id: "a1",
		src: {
			a: (a = fromView(db, {
				path: ["a1", "ins", "a"],
				id: "a",
			})),
			b: (b = fromView(db, {
				path: ["a1", "ins", "b"],
				id: "b",
			})),
		},
		xform: adder(),
	});
	const a1res = a1.subscribe(
		{
			next(x) {
				a1buf = x;
			},
			done() {
				a1done = true;
			},
		},
		{ id: "a1res" }
	);
	const a2 = sync({
		id: "a2",
		src: <any>[
			a1,
			(c = fromView(db, { path: ["a2", "ins", "b"], id: "c" })),
		],
		xform: adder(),
	});
	const res = a2.subscribe(
		{
			next(x) {
				a2buf = x;
			},
			done() {
				a2done = true;
			},
		},
		{ id: "res" }
	);
	expect(a1buf).toBe(3);
	expect(a2buf).toBe(13);
	db.reset({
		a1: { ins: { a: 100, b: 200 } },
		a2: { ins: { b: 1000 } },
	});
	expect(a1buf).toBe(300);
	expect(a2buf).toBe(1300);
	// teardown from end result
	res.unsubscribe();
	expect(a1done).toBeFalse();
	expect(a2done).toBeFalse();
	assertActive(a);
	assertActive(b);
	assertActive(a1);
	assertActive(a1res);
	assertUnsub(c);
	assertUnsub(a2);
	assertUnsub(res);
	// teardown from a1 result
	a1res.unsubscribe();
	assertUnsub(a);
	assertUnsub(b);
	assertUnsub(a1);
	assertUnsub(a1res);
	expect(a1done).toBeFalse();
	expect(a2done).toBeFalse();
});

test("mergeOnly", (done) => {
	const src = {
		a: stream(),
		b: stream(),
		c: stream(),
	};
	const res: any[] = [];
	const main = sync({ src, mergeOnly: true }).subscribe({
		next(x) {
			res.push(x);
		},
		done() {
			expect(res).toEqual([
				{ c: 1 },
				{ c: 1, b: 2 },
				{ c: 1, b: 2, a: 3 },
				{ c: 1, b: 2, a: 4 },
			]);
			done();
		},
	});

	src.c.next(1);
	src.b.next(2);
	src.a.next(3);
	src.a.next(4);
	main.done!();
});

test("mergeOnly (w/ required keys)", (done) => {
	const src = {
		a: stream(),
		b: stream(),
		c: stream(),
	};
	const res: any[] = [];
	const main = sync({
		src,
		mergeOnly: true,
	})
		.transform(
			// ensure `a` & `b` are present
			filter((tuple: any) => tuple.a != null && tuple.b != null)
		)
		.subscribe({
			next(x) {
				res.push(x);
			},
			done() {
				expect(res).toEqual([
					{ c: 1, b: 2, a: 3 },
					{ c: 1, b: 2, a: 4 },
				]);
				done();
			},
		});

	src.c.next(1);
	src.b.next(2);
	src.a.next(3);
	src.a.next(4);
	main.done!();
});

test("fromPromise", (done) => {
	const delayed = <T>(x: T, t: number) =>
		new Promise<T>((resolve) => setTimeout(() => resolve(x), t));

	transduce(
		sync({
			src: {
				t: fromInterval(5),
				a: fromPromise(delayed("aa", 20)),
				b: fromPromise(delayed("bb", 40)),
			},
		}),
		comp(
			take(1),
			map(({ a, b }: any) => ({ a, b }))
		),
		last()
	).then((res) => {
		expect(res).toEqual({ a: "aa", b: "bb" });
		done();
	});
});

test("never closes", (done) => {
	const main = sync({
		src: {
			a: fromIterable([1, 2, 3], { delay: TIMEOUT, id: "a" }),
			b: fromIterable([1, 2, 3, 4], { delay: TIMEOUT, id: "b" }),
		},
		closeIn: CloseMode.NEVER,
		closeOut: CloseMode.NEVER,
		reset: true,
	});

	const acc: any[] = [];
	const sub = main.subscribe({
		next(x) {
			acc.push(x);
		},
	});

	setTimeout(() => sub.unsubscribe(), 3.5 * TIMEOUT);
	setTimeout(() => {
		expect(main.getState()).toBe(State.ACTIVE);
		expect(acc).toEqual([
			{ a: 1, b: 1 },
			{ a: 2, b: 2 },
			{ a: 3, b: 3 },
		]);
		done();
	}, 5 * TIMEOUT);
});

test("input removal (clean)", (done) => {
	const main = sync({
		src: {
			a: fromIterable([1]),
			b: fromIterable([1, 2]),
		},
		clean: true,
	});
	const acc: any[] = [];
	main.subscribe({
		next(x) {
			acc.push(x);
		},
	});
	setTimeout(() => {
		expect(acc).toEqual([{ a: 1, b: 1 }, { b: 2 }]);
		done();
	}, TIMEOUT);
});
