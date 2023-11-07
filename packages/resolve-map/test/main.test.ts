import type { Fn0 } from "@thi.ng/api";
import * as tx from "@thi.ng/transducers";
import { expect, test } from "bun:test";
import { Resolved, resolve, resolved, type ResolveFn } from "../src/index.js";

test("simple", () => {
	expect(
		resolve<{
			a: number;
			b: number;
		}>({ a: 1, b: "@a" })
	).toEqual({
		a: 1,
		b: 1,
	});
});

test("linked refs", () => {
	expect(
		resolve<{
			a: number;
			b: number;
			c: number;
		}>({ a: "@c", b: "@a", c: 1 })
	).toEqual({
		a: 1,
		b: 1,
		c: 1,
	});
});

test("array refs", () => {
	expect(
		resolve<{ a: number; b: number; c: number[] }>({
			a: "@c/1",
			b: "@a",
			c: [1, 2],
		})
	).toEqual({
		a: 2,
		b: 2,
		c: [1, 2],
	});
});

test("abs vs rel refs", () => {
	interface Inner {
		b: number;
		c: number;
	}
	expect(
		resolve<{
			a1: Inner;
			a2: Inner;
			a3: Inner;
		}>({
			a1: { b: 1, c: "@b" },
			a2: { b: 2, c: "@b" },
			a3: { b: 3, c: "@/a1/b" },
		})
	).toEqual({ a1: { b: 1, c: 1 }, a2: { b: 2, c: 2 }, a3: { b: 3, c: 1 } });
});

test("rel parent refs", () => {
	expect(
		resolve<{
			a: { b: { c: number; d: number; e: number }; c: { d: number } };
			c: { d: number };
		}>({
			a: { b: { c: "@../c/d", d: "@c", e: "@/c/d" }, c: { d: 1 } },
			c: { d: 10 },
		})
	).toEqual({ a: { b: { c: 1, d: 1, e: 10 }, c: { d: 1 } }, c: { d: 10 } });
});

test("cycles", () => {
	expect(() => resolve({ a: "@a" })).toThrow();
	expect(() => resolve({ a: { b: "@b" } })).toThrow();
	expect(() => resolve({ a: { b: "@/a" } })).toThrow();
	expect(() => resolve({ a: { b: "@/a/b" } })).toThrow();
	expect(() => resolve({ a: "@b", b: "@a" })).toThrow();
});

test("function refs", () => {
	expect(
		resolve<{
			a: number;
			b: { c: number; d: number };
			e: number;
		}>({
			a: (x: ResolveFn) => x("b/c") * 10,
			b: { c: "@d", d: "@/e" },
			e: () => 1,
		})
	).toEqual({ a: 10, b: { c: 1, d: 1 }, e: 1 });
	const res = resolve<{
		a: number;
		b: { c: number; d: number };
		e: Fn0<number>;
	}>({
		a: (x: ResolveFn) => x("b/c")() * 10,
		b: { c: "@d", d: "@/e" },
		e: () => () => 1,
	});
	expect(res.a).toBe(10);
	expect(res.b.c).toBe(<any>res.e);
	expect(res.b.d).toBe(<any>res.e);
	expect(res.e()).toBe(1);
});

test("function resolves only once", () => {
	let n = 0;
	expect(
		resolve<{ a: number; b: { c: number; d: number }; e: number }>({
			a: (x: ResolveFn) => x("b/c"),
			b: { c: "@d", d: "@/e" },
			e: () => (n++, 1),
		})
	).toEqual({ a: 1, b: { c: 1, d: 1 }, e: 1 });
	expect(n).toBe(1);
});

test("deep resolve of yet unknown refs", () => {
	expect(
		resolve<{
			a: number;
			b: { c: { d: { e: number } } };
			x: number;
		}>({
			a: "@b/c/d",
			b: ($: ResolveFn) => ({ c: { d: { e: $("/x") } } }),
			x: 1,
		})
	).toEqual(<any>{ a: { e: 1 }, b: { c: { d: { e: 1 } } }, x: 1 }); // ???
});

test("destructure", () => {
	const stats = {
		// sequence average
		mean: ({ src: a }: any) => tx.mean(a),
		// sequence range
		range: ({ min, max }: any) => max - min,
		// computes sequence min val
		min: ({ src }: any) => tx.min(src),
		// computes sequence max val
		max: ({ src }: any) => tx.max(src),
		// sorted copy
		sorted: ({ src }: any) => [...src].sort((a, b) => a - b),
		// standard deviation
		sd: ({ src, mean }: any) =>
			Math.sqrt(
				tx.transduce(
					tx.map((x: number) => Math.pow(x - mean, 2)),
					tx.add(),
					src
				) /
					(src.length - 1)
			),
		// compute 10th - 90th percentiles
		percentiles: ({ sorted }: any) => {
			return tx.transduce(
				tx.map(
					(x: number) => sorted[Math.floor((x / 100) * sorted.length)]
				),
				tx.push(),
				tx.range(10, 100, 5)
			);
		},
	};
	expect(resolve({ ...stats, src: () => [1, 6, 7, 2, 4, 11, -3] })).toEqual({
		mean: 4,
		range: 14,
		min: -3,
		max: 11,
		sorted: [-3, 1, 2, 4, 6, 7, 11],
		sd: 4.546060565661952,
		percentiles: [-3, 1, 1, 1, 2, 2, 2, 4, 4, 4, 6, 6, 6, 7, 7, 7, 11, 11],
		src: [1, 6, 7, 2, 4, 11, -3],
	});
});

test("destructures w/ local renames", () => {
	expect(
		resolve<{
			a: number;
			b: number;
		}>({ a: 1, b: ({ a: aa }: any) => aa })
	).toEqual({
		a: 1,
		b: 1,
	});
});

test("destructures w/ trailing comma", () => {
	interface Test {
		a: number;
		b: number;
		c: number;
	}
	expect(
		// since prettier is running over this file
		// build function dynamically to force trailing comma
		resolve<Test>({
			a: 1,
			b: 2,
			c: new Function("{a,b,}", "return a + b"),
		})
	).toEqual({ a: 1, b: 2, c: 3 });
	expect(
		resolve<Test>({
			a: 1,
			b: 2,
			c: new Function("{ a, b, }", "return a + b"),
		})
	).toEqual({ a: 1, b: 2, c: 3 });
	expect(
		resolve<Test>({
			a: 1,
			b: 2,
			c: new Function("{ a, b: bb,  }", "return a + bb"),
		})
	).toEqual({ a: 1, b: 2, c: 3 });
});

test("custom prefix", () => {
	expect(
		resolve<{
			a: { b: { c: number; d: number; e: number }; c: { d: number } };
			c: { d: number };
		}>(
			{
				a: {
					b: { c: ">>>../c/d", d: ">>>c", e: ">>>/c/d" },
					c: { d: 1 },
				},
				c: { d: 10 },
			},
			{ prefix: ">>>" }
		)
	).toEqual({ a: { b: { c: 1, d: 1, e: 10 }, c: { d: 1 } }, c: { d: 10 } });
});

test("resolved", () => {
	interface Foo {
		a: { x: () => number; y: (() => number)[] };
		b: number;
		c: () => number;
	}
	const res = resolve<Foo>({
		a: ({ b }: Foo) => resolved({ x: () => b, y: [() => 1] }),
		b: () => 2,
		c: "@a/y/0",
	});
	expect(res.a instanceof Resolved).toBeFalse();
	expect(res.a.x()).toBe(2);
	expect(res.a.y[0]()).toBe(1);
	expect(res.b).toBe(2);
	expect(res.c()).toBe(1);
});

test("resolved (no unwrap)", () => {
	interface Foo {
		a: Resolved<{ x: () => number; y: (() => number)[] }>;
		b: number;
		c: () => number;
	}
	const res = resolve<Foo>(
		{
			a: ({ b }: Foo) => resolved({ x: () => b, y: [() => 1] }),
			b: () => 2,
			c: "@a/y/0",
		},
		{
			unwrap: false,
		}
	);
	expect(res.a instanceof Resolved).toBeTrue();
	expect(res.a.deref().x()).toBe(2);
	expect(res.a.deref().y[0]()).toBe(1);
	expect(res.b).toBe(2);
	expect(res.c()).toBe(1);
});

test("onlyFnRefs", () => {
	expect(
		resolve({ a: "@c", b: ({ a }: any) => a, c: 42 }, { onlyFnRefs: true })
	).toEqual(<any>{ a: "@c", b: "@c", c: 42 });
	expect(resolve({ a: "@c", b: ({ a }: any) => a, c: 42 })).toEqual(<any>{
		a: 42,
		b: 42,
		c: 42,
	});
});
