// SPDX-License-Identifier: Apache-2.0
import type { NumOrString } from "@thi.ng/api";
import { expect, test } from "bun:test";
import {
	asAsyncIterable,
	comp,
	concat,
	delayed,
	filter,
	intercept,
	iterator,
	map,
	mapcat,
	merge,
	mult,
	multiplex,
	multiplexObj,
	partition,
	pubsub,
	push,
	range,
	repeatedly,
	run,
	sidechain,
	source,
	step,
	sync,
	take,
	throttle,
	transduce,
	wait,
	zip,
} from "../src/index.js";

test("asAsyncIterable", async (done) => {
	expect(await push(asAsyncIterable([1, 2, 3], 10))).toEqual([1, 2, 3]);
	done();
});

test("comp", async (done) => {
	expect(
		await transduce(
			comp(
				filter(async (x) => !!(x & 1)),
				map(async (x) => x * 10),
				partition(2, true)
			),
			push<number[]>(),
			repeatedly((i) => i, 10)
		)
	).toEqual([[10, 30], [50, 70], [90]]);
	done();
});

test("concat", async (done) => {
	expect(
		await push(
			concat(
				repeatedly(async (i) => i + 1, 3),
				undefined,
				null,
				[4, 5]
			)
		)
	).toEqual([1, 2, 3, 4, 5]);
	done();
});

test("filter", async (done) => {
	expect(
		await transduce(
			filter(async (x) => !!(x & 1)),
			push<number>(),
			[1, 2, 3]
		)
	).toEqual([1, 3]);
	done();
});

test("intercept", async (done) => {
	expect(
		await transduce(
			intercept<string>([
				(x) => (x === "a" ? "A" : x),
				(x) => (x === "b" ? "BB" : x),
			]),
			push(),
			"abc"
		)
	).toEqual(["A", "BB", "c"]);

	// example from docstring
	const xform = intercept<string[]>([
		(tags) =>
			!tags.find((x) => /^title:/.test(x)) ? [...tags, "untitled"] : tags,
	]);
	// dynamically add 2nd interceptor
	xform.prepend((tags) => (tags.includes("temp") ? null : tags));

	expect(
		await transduce(xform, push(), [
			["photo1", "title:test"],
			["photo2"],
			["photo3", "temp"],
		])
	).toEqual([
		["photo1", "title:test"],
		["photo2", "untitled"],
	]);
	done();
});

test("iterator", async (done) => {
	expect(
		await push(
			iterator(
				comp(
					partition(2, true),
					map<number[], number[]>((x) => x.map((y) => y * 10))
				),
				repeatedly((i) => i + 1, 3, 10)
			)
		)
	).toEqual([[10, 20], [30]]);
	done();
});

test("map", async (done) => {
	expect(
		await transduce(
			map(async (x) => x * 10),
			push<number>(),
			[1, 2, 3]
		)
	).toEqual([10, 20, 30]);
	done();
});

test("mapcat", async (done) => {
	expect(
		await transduce(
			mapcat(async (x) => [x, x * 10]),
			push<number>(),
			[1, 2, 3]
		)
	).toEqual([1, 10, 2, 20, 3, 30]);
	done();
});

test("merge", async (done) => {
	expect(
		await push(
			merge<NumOrString>([
				repeatedly((i) => i, 5, 30),
				repeatedly((i) => String(i * 10), 3, 50),
			])
		)
	).toEqual([0, "0", 1, "10", 2, 3, "20", 4]);
	expect(
		await push(merge([repeatedly((i) => i, 0), repeatedly((i) => i, 0)]))
	).toEqual([]);
	done();
});

test("mult", async (done) => {
	const root = mult(
		(async function* () {
			yield "hello";
			await wait(100);
			yield "world";
			await wait(100);
			yield "good bye";
		})()
	);

	// 1st subscriber (vanilla JS)
	const sub1 = (async () => {
		const res = [];
		for await (let x of root.subscribe()) res.push(x);
		return res;
	})();

	// 2nd subscriber (transducer), attached only after delay
	await wait(90);
	const sub2 = transduce(
		map(async (x) => {
			await wait(70);
			return x.toUpperCase();
		}),
		push<string>(),
		root.subscribe()
	);

	expect(await Promise.all([sub1, sub2])).toEqual([
		["hello", "world", "good bye"],
		["WORLD", "GOOD BYE"],
	]);
	done();
});

test("multiplex", async (done) => {
	expect(
		await transduce(
			multiplex(
				map(async (x) => [x, x * 10]),
				partition(2, 1),
				map(async (x) => `x=${x}`)
			),
			push(),
			[1, 2, 3]
		)
	).toEqual([
		[[1, 10], undefined, "x=1"],
		[[2, 20], [1, 2], "x=2"],
		[[3, 30], [2, 3], "x=3"],
	]);
	done();
});

test("multiplexObj", async (done) => {
	expect(
		await transduce(
			multiplexObj({
				a: map(async (x) => [x, x * 10]),
				b: partition(2, 1),
				c: map(async (x) => `x=${x}`),
			}),
			push(),
			[1, 2, 3]
		)
	).toEqual([
		{ a: [1, 10], b: undefined, c: "x=1" },
		{ a: [2, 20], b: [1, 2], c: "x=2" },
		{ a: [3, 30], b: [2, 3], c: "x=3" },
	]);
	done();
});

test("partition", async (done) => {
	expect(
		await transduce(partition(2, 1), push<number[]>(), [1, 2, 3])
	).toEqual([
		[1, 2],
		[2, 3],
	]);
	expect(await transduce(partition(2), push<number[]>(), [1, 2, 3])).toEqual([
		[1, 2],
	]);
	expect(
		await transduce(partition(2, true), push<number[]>(), [1, 2, 3])
	).toEqual([[1, 2], [3]]);
	done();
});

test("pubsub", async (done) => {
	const src = source<string>();
	const bus = pubsub(src, (x) => x[0]);
	const a1 = bus.subscribeTopic("a");
	const b1 = bus.subscribeTopic("b");
	const av = push(a1);
	const bv = push(b1);
	src.write("a1");
	await delayed(null, 1);
	src.write("a2");
	await delayed(null, 1);
	src.write("b1");
	await delayed(null, 1);
	bus.subscribeOnce("b", (x) => expect(x).toBe("b2"));
	src.write("b2");
	await delayed(null, 1);
	src.write("b3");
	await delayed(null, 1);
	expect(bus.unsubscribeTopic("a", a1)).toBeTrue();
	expect(bus.unsubscribeTopic("b", b1)).toBeTrue();
	expect(await av).toEqual(["a1", "a2"]);
	expect(await bv).toEqual(["b1", "b2", "b3"]);
	done();
});

test("range", async (done) => {
	expect(await push(take(3, range(5)))).toEqual([0, 1, 2]);
	expect(await push(range(3, 5))).toEqual([0, 1, 2]);
	expect(await push(range(1, 3, 5))).toEqual([1, 2]);
	expect(await push(range(1, 10, 2, 5))).toEqual([1, 3, 5, 7, 9]);
	expect(await push(range(3, 0, 5))).toEqual([3, 2, 1]);
	expect(await push(range(10, -1, -3, 5))).toEqual([10, 7, 4, 1]);
	done();
});

test("repeatedly", async (done) => {
	expect(await push(repeatedly(async (i) => i * 10, 3, 10))).toEqual([
		0, 10, 20,
	]);
	done();
});

test("run", async (done) => {
	const res: any[] = [];
	await run(
		map(async (x) => delayed(x * 10, 10)),
		async (x) => res.push(x),
		[1, 2, 3]
	);
	expect(res).toEqual([10, 20, 30]);
	done();
});

test(
	"sidechain",
	async (done) => {
		expect(
			await push(
				sidechain(
					repeatedly((i) => i, 100, 110),
					repeatedly(() => true, 3, 250)
				)
			)
		).toEqual([0, 2, 4]);
		expect(
			await push(
				sidechain(
					repeatedly((i) => i, 100, 110),
					repeatedly(() => true, 3, 250),
					{ lastOnly: false }
				)
			)
		).toEqual([[0], [1, 2], [3, 4]]);
		done();
	},
	{ retry: 5 }
);

test("source", async (done) => {
	let src = source<number>();

	setTimeout(() => src.write(1), 0);
	setTimeout(() => src.write(2), 0);
	setTimeout(() => src.close(), 0);

	expect(await push(src)).toEqual([1, 2]);

	src = source<number>();
	src.write(10);
	src.write(20);
	expect(() => src.write(30)).toThrow();

	done();
});

test("step", async (done) => {
	expect(await step(mapcat(async (x) => [x, x]))(1)).toEqual([1, 1]);
	expect(await step(mapcat(async (x) => [x]))(1)).toEqual(1);
	expect(
		await step(
			mapcat(async (x) => [x]),
			false
		)(1)
	).toEqual([1]);
	done();
});

test(
	"sync",
	async (done) => {
		const res = await push(
			sync({
				a: repeatedly((i) => i, 5, 70),
				b: repeatedly((i) => String(i * 10), 3, 100),
			})
		);
		expect(res).toEqual([
			{ a: 0, b: "0" },
			{ a: 1, b: "0" },
			{ a: 1, b: "10" },
			{ a: 2, b: "10" },
			{ a: 2, b: "20" },
			{ a: 3, b: "20" },
			{ a: 4, b: "20" },
		]);
		expect(
			await push(
				sync({
					a: repeatedly((i) => i, 0),
					b: repeatedly((i) => i, 0),
				})
			)
		).toEqual([]);
		done();
	},
	{ retry: 5 }
);

test("sync (reset)", async (done) => {
	expect(
		await push(
			sync(
				{
					a: repeatedly((i) => i, 2),
					b: repeatedly((i) => i, 4),
				},
				{ reset: true }
			)
		)
	).toEqual([
		{ a: 0, b: 0 },
		{ a: 1, b: 1 },
		{ a: 1, b: 2 },
		{ a: 1, b: 3 },
	]);
	done();
});

test("sync (merge only)", async (done) => {
	expect(
		await push(
			sync(
				{
					a: repeatedly((i) => i, 2),
					b: repeatedly((i) => i, 4),
				},
				{ mergeOnly: true }
			)
		)
	).toEqual([
		{ a: 0 },
		{ a: 0, b: 0 },
		{ a: 1, b: 0 },
		{ a: 1, b: 1 },
		{ a: 1, b: 2 },
		{ a: 1, b: 3 },
	]);
	done();
});

test("take", async (done) => {
	expect(
		await transduce(
			take(3),
			push(),
			repeatedly(async (i) => i * 10)
		)
	).toEqual([0, 10, 20]);
	done();
});

test("throttle", async (done) => {
	expect(
		await transduce(
			throttle(() => {
				let last = -1;
				return async (x) => {
					let res = x !== last;
					last = x;
					return res;
				};
			}),
			push<number>(),
			[1, 1, 2, 3, 3, 2, 2, 1]
		)
	).toEqual([1, 2, 3, 2, 1]);
	done();
});

test("zip", async (done) => {
	expect(
		await push(
			zip(
				[1, 2, 3, 4],
				repeatedly((i) => (i + 1) * 10, Infinity, 10),
				range(100, 400, 100, 5)
			)
		)
	).toEqual([
		[1, 10, 100],
		[2, 20, 200],
		[3, 30, 300],
	]);
	done();
});
