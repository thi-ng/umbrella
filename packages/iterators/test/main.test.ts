import { expect, test } from "bun:test";
import * as ti from "../src/index.js";

test("butLast", () => {
	expect([...ti.butLast([])]).toEqual([]);
	expect([...ti.butLast([1])]).toEqual([]);
	expect([...ti.butLast([1, 2])]).toEqual([1]);
	expect([...ti.butLast([1, 2, 3])]).toEqual([1, 2]);
	expect([...ti.butLast("hello")]).toEqual(["h", "e", "l", "l"]);
	expect([...ti.butLast(ti.range(10))]).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);
});

test("cached", () => {
	let cache = ti.cached(ti.range(3));
	let a = cache();
	let b = cache();
	let c = cache();
	expect(a.next().value).toBe(0);
	expect(a.next().value).toBe(1);
	expect(b.next().value).toBe(0);
	expect(c.next().value).toBe(0);
	expect(a.next().value).toBe(2);
	expect(c.next().value).toBe(1);
	expect(b.next().value).toBe(1);
	expect(a.next().value).toBe(undefined);
	expect(ti.iterator(a)).toBe(a);
	expect(ti.cached([])().next().value).toBe(undefined);
});

test("consume", () => {
	let i;
	expect([...((i = ti.range(3)), ti.consume(i), i)]).toEqual([]);
	expect([...((i = ti.range(3)), ti.consume(i, 3), i)]).toEqual([]);
	expect([...((i = ti.range(3)), ti.consume(i, 10), i)]).toEqual([]);
	expect([...((i = ti.range(3)), ti.consume(i, 2), i)]).toEqual([2]);
	expect([...((i = ti.range(3)), ti.consume(i, -2), i)]).toEqual([0, 1, 2]);
});

test("concat", () => {
	expect([...ti.concat([])]).toEqual([]);
	expect([...ti.concat<any>([], "", ti.range(0))]).toEqual([]);
	expect([...ti.concat<any>([1, 2, 3], "abc", ti.range(3))]).toEqual([
		1,
		2,
		3,
		"a",
		"b",
		"c",
		0,
		1,
		2,
	]);
	expect([...ti.concat.apply(null, <any>["abc", null, [1, 2, 3]])]).toEqual([
		"a",
		"b",
		"c",
		1,
		2,
		3,
	]);
});

test("constantly", () => {
	const f = ti.constantly(1);
	expect(f()).toBe(1);
	expect(f(2)).toBe(1);
	expect(f(2, 3)).toBe(1);
});

test("cycle", () => {
	expect([...ti.cycle([])]).toEqual([]);
	expect([...ti.take(7, ti.cycle(ti.range(3)))]).toEqual([
		0, 1, 2, 0, 1, 2, 0,
	]);
	expect([...ti.take(7, ti.cycle("abc"))]).toEqual([
		"a",
		"b",
		"c",
		"a",
		"b",
		"c",
		"a",
	]);
});

test("dedupe", () => {
	expect([...ti.dedupe([])]).toEqual([]);
	expect([...ti.dedupe([1, 2, 2, 3, 4, 4, 4, 3])]).toEqual([1, 2, 3, 4, 3]);
	expect([...ti.dedupe("abbcccaabb")]).toEqual(["a", "b", "c", "a", "b"]);
});

test("dedupeWith", () => {
	let coll = [
		{ a: 1 },
		{ a: 1, b: 2 },
		{ a: 2, b: 2 },
		{ a: 2, b: 2 },
		{ a: 3 },
	];
	let eq = (a: any, b: any) => a.a === b.a;
	expect([...ti.dedupeWith(eq, [])]).toEqual([]);
	expect([...ti.dedupeWith(eq, coll)]).toEqual([
		{ a: 1 },
		{ a: 2, b: 2 },
		{ a: 3 },
	]);
});

test("dense", () => {
	expect([...ti.dense([, 1, , 2, false, null, undefined, 0, 3])]).toEqual([
		1,
		2,
		false,
		0,
		3,
	]);
});

test("drop", () => {
	expect([...ti.drop(100, [])]).toEqual([]);
	expect([...ti.drop(4, [1, 2, 3])]).toEqual([]);
	expect([...ti.drop(3, [1, 2, 3])]).toEqual([]);
	expect([...ti.drop(2, [1, 2, 3])]).toEqual([3]);
	expect([...ti.drop(0, [1])]).toEqual([1]);
	expect([...ti.drop(-1, [1])]).toEqual([1]);
	expect([...ti.drop(3, ti.range(5))]).toEqual([3, 4]);
});

test("dropNth", () => {
	expect([...ti.dropNth(2, [])]).toEqual([]);
	expect([...ti.dropNth(1, ti.range(6))]).toEqual([]);
	expect([...ti.dropNth(2, ti.range(6))]).toEqual([0, 2, 4]);
	expect([...ti.dropNth(3, ti.range(6))]).toEqual([0, 1, 3, 4]);
	expect([...ti.dropNth(-1, ti.range(6))]).toEqual([]);
});

test("dropWhile", () => {
	expect([...ti.dropWhile((_) => false, [])]).toEqual([]);
	expect([...ti.dropWhile((_) => true, [1, 2, 3])]).toEqual([]);
	expect([...ti.dropWhile((x) => x < 3, ti.range(6))]).toEqual([3, 4, 5]);
	expect([...ti.dropWhile((x) => x > 3, ti.range(6))]).toEqual([
		0, 1, 2, 3, 4, 5,
	]);
});

test("ensureIterable", () => {
	expect(() => ti.ensureIterable([])).not.toThrow();
	expect(() => ti.ensureIterable({})).toThrow();
});

test("every", () => {
	let nums = <IterableIterator<number>>ti.iterator([2, 4, 6, 8, 10]);
	expect(ti.every((_) => true, [])).toBeFalse();
	expect(ti.every((x) => x % 2 === 0, nums)).toBeTrue();
	expect(nums.next()).toEqual({ value: undefined, done: true });
	nums = ti.iterator([2, 3, 4]) as IterableIterator<number>;
	expect(ti.every((x) => x % 2 === 0, nums)).toBeFalse();
	expect(nums.next()).toEqual({ value: 4, done: false });
});

test("filter", () => {
	expect([...ti.filter((_) => true, [])]).toEqual([]);
	expect([...ti.filter((x) => x % 3 === 0, ti.range(10))]).toEqual([
		0, 3, 6, 9,
	]);
});

test("flatten", () => {
	expect([...ti.flatten([])]).toEqual([]);
	expect([...ti.flatten([null, [null, [undefined]]])]).toEqual([
		null,
		null,
		undefined,
	]);
	expect([...ti.flatten([1, ti.range(2, 4), [4, [5, ["abc"]]]])]).toEqual([
		1,
		2,
		3,
		4,
		5,
		"abc",
	]);
	expect([...ti.flatten([{ a: 23, b: 42, c: [1, 2, 3] }])]).toEqual([
		"a",
		23,
		"b",
		42,
		"c",
		1,
		2,
		3,
	]);
	expect([...ti.flatten([{ a: 23, b: 42, c: [1, 2, 3] }], false)]).toEqual([
		{ a: 23, b: 42, c: [1, 2, 3] },
	]);
});

test("flattenWith", () => {
	let tx = (x: any) =>
		typeof x == "string"
			? ti.map((x) => x.charCodeAt(0), x)
			: ti.maybeIterator(x);
	expect([
		...ti.flattenWith(tx, [
			"ROOT",
			undefined,
			["CHILD_1", null, ["CHILD_2"]],
		]),
	]).toEqual([
		82,
		79,
		79,
		84,
		undefined,
		67,
		72,
		73,
		76,
		68,
		95,
		49,
		null,
		67,
		72,
		73,
		76,
		68,
		95,
		50,
	]);
});

test("fnil", () => {
	let f = ti.fnil(
		(x) => x + 1,
		() => 0
	);
	expect(f()).toBe(1);
	expect(f(1)).toBe(2);
	f = ti.fnil(
		(a, b) => a + b,
		() => 0,
		() => 10
	);
	expect(f()).toBe(10);
	expect(f(1)).toBe(11);
	expect(f(1, 2)).toBe(3);
	f = ti.fnil(
		(a, b, c) => a + b + c,
		() => 0,
		() => 10,
		() => 100
	);
	expect(f()).toBe(110);
	expect(f(1)).toBe(111);
	expect(f(1, 2)).toBe(103);
	expect(f(1, 2, 3)).toBe(6);
	expect(() => ti.fnil(() => {})).toThrow();
});

test("fork", () => {
	const f = ti.fork([1, 2, 3, 4], 3);
	const fa = f();
	const fb = f();
	expect(fa.next().value).toBe(1);
	expect(fa.next().value).toBe(2);
	expect(fb.next().value).toBe(1);

	expect(fa.next().value).toBe(3);
	expect(fa.next().value).toBe(4);
	expect(fb.next().value).toBe(2);
	expect(fa.next().done).toBeTrue();
	expect(fb.next().value).toBe(3);
	expect(fb.next().value).toBe(4);
	expect(fb.next().done).toBeTrue();
});

test("frequencies", () => {
	expect([
		...ti.frequencies([
			[1, 2],
			[2, 3],
			[1, 2],
			[2, 4],
		]),
	]).toEqual([
		[[1, 2], 2],
		[[2, 3], 1],
		[[2, 4], 1],
	]);
	expect([
		...ti.frequencies(ti.filter((x) => /[a-z]/i.test(x), "hello world!")),
	]).toEqual([
		["h", 1],
		["e", 1],
		["l", 3],
		["o", 2],
		["w", 1],
		["r", 1],
		["d", 1],
	]);
	expect([
		...ti.frequencies([1, 2, 3, 4, 5, 9, 3], (x: number) => x & ~1),
	]).toEqual([
		[0, 1],
		[2, 3],
		[4, 2],
		[8, 1],
	]);
});

test("groupBy", () => {
	expect(ti.groupBy((x) => x & ~1, [1, 2, 3, 4, 5, 9, 3])).toEqual({
		"0": [1],
		"2": [2, 3, 3],
		"4": [4, 5],
		"8": [9],
	});
});

test("identity", () => {
	const x = { a: 1 };
	expect(ti.identity(x)).toBe(x);
	expect(ti.identity(null)).toBe(null);
	expect(ti.identity(undefined)).toBe(undefined);
});

test("indexed", () => {
	expect([...ti.indexed([10, 20, 30])]).toEqual([
		[0, 10],
		[1, 20],
		[2, 30],
	]);
});

test("interleave", () => {
	expect(() => ti.interleave().next()).toThrow();
	expect([
		...ti.interleave(ti.range(), ti.range(100, 200), ti.range(200, 205)),
	]).toEqual([
		0, 100, 200, 1, 101, 201, 2, 102, 202, 3, 103, 203, 4, 104, 204,
	]);
});

test("interpose", () => {
	expect([...ti.interpose("/", ti.range(5))]).toEqual([
		0,
		"/",
		1,
		"/",
		2,
		"/",
		3,
		"/",
		4,
	]);
});

test("iterate", () => {
	expect([
		...ti.take(
			10,
			ti.iterate((x) => x * 2, 1)
		),
	]).toEqual([1, 2, 4, 8, 16, 32, 64, 128, 256, 512]);
});

test("maybeIterator", () => {
	expect(ti.maybeIterator("a")).toBeDefined();
	expect(ti.maybeIterator([])).toBeDefined();
	expect(ti.maybeIterator(ti.range())).toBeDefined();
	expect(ti.maybeIterator(undefined)).toBeUndefined();
	expect(ti.maybeIterator(null)).toBeUndefined();
	expect(ti.maybeIterator(0)).toBeUndefined();
	expect(ti.maybeIterator({})).toBeUndefined();
});

test("maybeObjectIterator", () => {
	expect(ti.maybeObjectIterator({})).toBeDefined();
	expect(ti.maybeObjectIterator([])).toBeDefined();
	expect(ti.maybeObjectIterator(undefined)).toBeUndefined();
	expect(ti.maybeObjectIterator(null)).toBeUndefined();
	expect(ti.maybeObjectIterator(0)).toBeUndefined();
	expect(ti.maybeObjectIterator("a")).toBeUndefined();
	expect(ti.maybeObjectIterator(ti.range())).toBeUndefined();
});

test("juxt", () => {
	let kernel = ti.juxt<number>(
		(x) => x - 1,
		(x) => x,
		(x) => x + 1
	);
	expect(ti.juxt((x) => x)(1)).toEqual([1]);
	expect(
		ti.juxt(
			(x) => x,
			(x) => x
		)(1)
	).toEqual([1, 1]);
	expect(kernel(1)).toEqual([0, 1, 2]);
	expect([...ti.map(kernel, ti.range(3))]).toEqual([
		[-1, 0, 1],
		[0, 1, 2],
		[1, 2, 3],
	]);
});

test("last", () => {
	expect(ti.last([])).toBe(undefined);
	expect(ti.last(ti.range(10))).toBe(9);
	expect(ti.last(ti.take(10, ti.range()))).toBe(9);
});

test("map", () => {
	expect([...ti.map((x) => x * 10)]).toEqual([]);
	expect([...ti.map((x) => x * 10, ti.range(3))]).toEqual([0, 10, 20]);
	expect([
		...ti.map(
			(x, y, z) => [x, y, z],
			ti.range(5),
			ti.range(0, 100, 10),
			ti.range(0, 1000, 100)
		),
	]).toEqual([
		[0, 0, 0],
		[1, 10, 100],
		[2, 20, 200],
		[3, 30, 300],
		[4, 40, 400],
	]);
});

test("mapcat", () => {
	expect([...ti.mapcat((x) => ti.repeat(x, 3), "hello")]).toEqual([
		"h",
		"h",
		"h",
		"e",
		"e",
		"e",
		"l",
		"l",
		"l",
		"l",
		"l",
		"l",
		"o",
		"o",
		"o",
	]);
	expect([
		...ti.mapcat(
			(x, y, z) => [x, y, z],
			ti.range(5),
			ti.range(0, 100, 10),
			ti.range(0, 1000, 100)
		),
	]).toEqual([0, 0, 0, 1, 10, 100, 2, 20, 200, 3, 30, 300, 4, 40, 400]);
	expect([
		...ti.mapcat((x) => (x < 5 ? ti.repeat(x, x) : null), ti.range(10)),
	]).toEqual([1, 2, 2, 3, 3, 3, 4, 4, 4, 4]);
});

test("mapIndexed", () => {
	expect([
		...ti.mapIndexed((i, a, b) => [i, a, b], "hello", "there"),
	]).toEqual([
		[0, "h", "t"],
		[1, "e", "h"],
		[2, "l", "e"],
		[3, "l", "r"],
		[4, "o", "e"],
	]);
});

test("objectIterator", () => {
	expect([...ti.objectIterator({ a: 23, b: 42, c: [1, 2, 3] })]).toEqual([
		["a", 23],
		["b", 42],
		["c", [1, 2, 3]],
	]);
});

test("partition", () => {
	expect(() => ti.partition(0, 0, ti.range(3)).next()).toThrow();
	expect(() => ti.partition(1, 0, ti.range(3)).next()).toThrow();
	expect([...ti.partition(1, 1, ti.range(3))]).toEqual([[0], [1], [2]]);
	expect([...ti.partition(3, 3, ti.range(7))]).toEqual([
		[0, 1, 2],
		[3, 4, 5],
	]);
	expect([...ti.partition(3, 3, ti.range(7), true)]).toEqual([
		[0, 1, 2],
		[3, 4, 5],
		[6],
	]);
	expect([...ti.partition(3, 1, ti.range(7))]).toEqual([
		[0, 1, 2],
		[1, 2, 3],
		[2, 3, 4],
		[3, 4, 5],
		[4, 5, 6],
	]);
	expect([...ti.partition(3, 1, ti.range(7), true)]).toEqual([
		[0, 1, 2],
		[1, 2, 3],
		[2, 3, 4],
		[3, 4, 5],
		[4, 5, 6],
		[5, 6],
	]);
	expect([...ti.partition(3, 5, ti.range(11))]).toEqual([
		[0, 1, 2],
		[5, 6, 7],
	]);
	expect([...ti.partition(3, 5, ti.range(11), true)]).toEqual([
		[0, 1, 2],
		[5, 6, 7],
		[10],
	]);
});

test("partitionBy", () => {
	expect([...ti.partitionBy((x) => (x / 5) | 0, ti.range(11))]).toEqual([
		[0, 1, 2, 3, 4],
		[5, 6, 7, 8, 9],
		[10],
	]);
});

test(
	"randomSample",
	() => {
		ti.run((_) => {
			let l = [...ti.randomSample(0.5, ti.range(100))].length;
			expect(l >= 30 && l <= 70).toBeTrue();
		}, ti.range(100));
	},
	{ retry: 3 }
);

test("range", () => {
	expect([...ti.take(5, ti.range())]).toEqual([0, 1, 2, 3, 4]);
	expect([...ti.range(5)]).toEqual([0, 1, 2, 3, 4]);
	expect([...ti.range(1, 5)]).toEqual([1, 2, 3, 4]);
	expect([...ti.range(1, 5, 2)]).toEqual([1, 3]);
	expect([...ti.range(1, 5, -2)]).toEqual([]);
	expect([...ti.range(5, 1)]).toEqual([5, 4, 3, 2]);
	expect([...ti.range(5, 1, -2)]).toEqual([5, 3]);
	expect([...ti.range(5, 1, 2)]).toEqual([]);
});

test("reduce", () => {
	expect(ti.reduce((acc, x) => acc + x, -1, [])).toBe(-1);
	expect(ti.reduce((acc, x) => acc + x, 0, ti.range(10))).toBe(45);
	expect(
		ti.reduce(
			(acc, x) => {
				return (acc += x), acc >= 15 ? ti.reduced(acc) : acc;
			},
			0,
			ti.range()
		)
	).toBe(15);
});

test("reductions", () => {
	expect([...ti.reductions((acc, x) => acc + x, -1, [])]).toEqual([-1]);
	expect([...ti.reductions((acc, x) => acc + x, 0, ti.range(10))]).toEqual([
		0, 1, 3, 6, 10, 15, 21, 28, 36, 45,
	]);
	expect([
		...ti.reductions(
			(acc, x) => {
				return (acc += x), acc >= 15 ? ti.reduced(acc) : acc;
			},
			0,
			ti.range()
		),
	]).toEqual([0, 1, 3, 6, 10, 15]);
});

test("repeat", () => {
	expect([...ti.repeat(1, 3)]).toEqual([1, 1, 1]);
	expect([...ti.take(3, ti.repeat(1))]).toEqual([1, 1, 1]);
	expect([...ti.repeat(1, 0)]).toEqual([]);
	expect([...ti.repeat(1, -1)]).toEqual([]);
});

test("repeatedly", () => {
	let f = () => 1;
	expect([...ti.repeatedly(f, 3)]).toEqual([1, 1, 1]);
	expect([...ti.take(3, ti.repeatedly(f))]).toEqual([1, 1, 1]);
	expect([...ti.repeatedly(f, 0)]).toEqual([]);
	expect([...ti.repeatedly(f, -1)]).toEqual([]);
});

test("reverse", () => {
	expect([...ti.reverse([])]).toEqual([]);
	expect([...ti.reverse(ti.range(0))]).toEqual([]);
	expect([...ti.reverse("")]).toEqual([]);
	expect([...ti.reverse("a")]).toEqual(["a"]);
	expect([...ti.reverse([0])]).toEqual([0]);
	expect([...ti.reverse(ti.range(3))]).toEqual([2, 1, 0]);
	expect([...ti.reverse("abc")]).toEqual(["c", "b", "a"]);
});

test("some", () => {
	let nums = ti.iterator([1, 2, 3]) as IterableIterator<number>;
	expect(ti.some((x) => x % 2 === 0, nums)).toBe(2);
	expect(nums.next()).toEqual({ value: 3, done: false });
	nums = ti.iterator([1, 2, 3]) as IterableIterator<number>;
	expect(ti.some((x) => x > 3, nums)).toBeUndefined();
	expect(nums.next()).toEqual({ value: undefined, done: true });
});

test("take", () => {
	expect([...ti.take(3, [1, 2, 3, 4])]).toEqual([1, 2, 3]);
	expect([...ti.take(3, [])]).toEqual([]);
	expect([...ti.take(0, [1])]).toEqual([]);
	expect([...ti.take(-1, [1])]).toEqual([]);
});

test("takeNth", () => {
	expect([...ti.takeNth(3, [])]).toEqual([]);
	expect([...ti.takeNth(3, ti.range(10))]).toEqual([0, 3, 6, 9]);
});

test("takeWhile", () => {
	let input = ti.range(10);
	expect([...ti.takeWhile((_) => true, [])]).toEqual([]);
	expect([...ti.takeWhile((x) => x < 5, input)]).toEqual([0, 1, 2, 3, 4]);
	expect([...input]).toEqual([6, 7, 8, 9]);
});

test("takeLast", () => {
	expect([...ti.takeLast(5, [])]).toEqual([]);
	expect([...ti.takeLast(5, ti.range(1000))]).toEqual([
		995, 996, 997, 998, 999,
	]);
	expect([...ti.takeLast(5, ti.range(3))]).toEqual([0, 1, 2]);
});

test("walk", () => {
	let walk = (post: any) => {
		let res: any[] = [];
		ti.walk(
			(x) => res.push(x),
			[
				[1, { a: [2] }],
				["3", [4]],
			],
			post
		);
		return res;
	};
	expect(walk(false)).toEqual([
		[
			[1, { a: [2] }],
			["3", [4]],
		],
		[1, { a: [2] }],
		1,
		{ a: [2] },
		["a", [2]],
		"a",
		[2],
		2,
		["3", [4]],
		"3",
		[4],
		4,
	]);
	expect(walk(true)).toEqual([
		1,
		"a",
		2,
		[2],
		["a", [2]],
		{ a: [2] },
		[1, { a: [2] }],
		"3",
		4,
		[4],
		["3", [4]],
		[
			[1, { a: [2] }],
			["3", [4]],
		],
	]);
});

test("walkIterator", () => {
	expect([
		...ti.walkIterator(
			[
				[1, { a: [2] }],
				["3", [4]],
			],
			false
		),
	]).toEqual([
		[
			[1, { a: [2] }],
			["3", [4]],
		],
		[1, { a: [2] }],
		1,
		{ a: [2] },
		["a", [2]],
		"a",
		[2],
		2,
		["3", [4]],
		"3",
		[4],
		4,
	]);
	expect([
		...ti.walkIterator(
			[
				[1, { a: [2] }],
				["3", [4]],
			],
			(x) => (Array.isArray(x) ? x : null),
			false
		),
	]).toEqual([
		[
			[1, { a: [2] }],
			["3", [4]],
		],
		[1, { a: [2] }],
		1,
		{ a: [2] },
		["3", [4]],
		"3",
		[4],
		4,
	]);
	expect([
		...ti.walkIterator(
			[
				[1, { a: [2] }],
				["3", [4]],
			],
			true
		),
	]).toEqual([
		1,
		"a",
		2,
		[2],
		["a", [2]],
		{ a: [2] },
		[1, { a: [2] }],
		"3",
		4,
		[4],
		["3", [4]],
		[
			[1, { a: [2] }],
			["3", [4]],
		],
	]);
});

test("zip", () => {
	let langs = [
		{ id: "js", name: "JavaScript" },
		{ id: "clj", name: "Clojure" },
		{ id: "ts", name: "TypeScript" },
	];
	expect(ti.zip("abcdef", ti.range())).toEqual({
		a: 0,
		b: 1,
		c: 2,
		d: 3,
		e: 4,
		f: 5,
	});
	expect(
		ti.zip(ti.range(5, 10), ti.range(100, 200), [...new Uint8Array(16)])
	).toEqual([0, 0, 0, 0, 0, 100, 101, 102, 103, 104, 0, 0, 0, 0, 0, 0]);
	expect(
		ti.zip(
			ti.map((x) => x.id, langs),
			langs
		)
	).toEqual({
		js: { id: "js", name: "JavaScript" },
		clj: { id: "clj", name: "Clojure" },
		ts: { id: "ts", name: "TypeScript" },
	});
});
