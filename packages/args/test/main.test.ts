import { expect, test } from "bun:test";
import {
	Tuple,
	coerceInt,
	flag,
	float,
	hex,
	int,
	ints,
	json,
	kvPairs,
	kvPairsMulti,
	oneOf,
	parse,
	size,
	string,
	tuple,
	type KVDict,
	type KVMultiDict,
} from "../src/index.js";

test("basic / string", () => {
	expect(
		parse<{ a?: string }>({ a: string({}) }, ["--a", "a"], {
			start: 0,
		})
	).toEqual({ result: { a: "a" }, index: 2, done: true, rest: [] });
	expect(
		parse<{ a?: string }>({ a: string({ alias: "A" }) }, ["-A", "a"], {
			start: 0,
		})
	).toEqual({ result: { a: "a" }, index: 2, done: true, rest: [] });
	expect(
		parse<{ a?: string }>({ a: string({}) }, [], {
			start: 0,
		})
	).toEqual({ result: {}, index: 0, done: true, rest: [] });
	expect(
		parse<{ a: string }>({ a: string({ default: "a" }) }, [], {
			start: 0,
		})
	).toEqual({ result: { a: "a" }, index: 0, done: true, rest: [] });
	expect(() =>
		parse<{ a: string }>({ a: string({ optional: false }) }, [], {
			showUsage: false,
		})
	).toThrow();
});

test("flag", () => {
	expect(
		parse<{ a?: boolean }>({ a: flag({}) }, ["--a"], {
			start: 0,
		})
	).toEqual({ result: { a: true }, index: 1, done: true, rest: [] });
	expect(
		parse<{ a: boolean }>({ a: flag({ default: false }) }, [], {
			start: 0,
		})
	).toEqual({ result: { a: false }, index: 0, done: true, rest: [] });
});

test("number", () => {
	expect(
		parse<{ a?: number }>({ a: float({}) }, ["--a", "1.23"], {
			start: 0,
		})
	).toEqual({ result: { a: 1.23 }, index: 2, done: true, rest: [] });
	expect(
		parse<{ a?: number }>({ a: int({}) }, ["--a", "123"], {
			start: 0,
		})
	).toEqual({ result: { a: 123 }, index: 2, done: true, rest: [] });
	expect(
		parse<{ a?: number }>({ a: hex({}) }, ["--a", "123"], {
			start: 0,
		})
	).toEqual({ result: { a: 0x123 }, index: 2, done: true, rest: [] });
	expect(() =>
		parse<{ a?: number }>({ a: int({}) }, ["--a", "a"], {
			start: 0,
			showUsage: false,
		})
	).toThrow();
});

test("enum", () => {
	type E = "abc" | "xyz";
	const opts: E[] = ["abc", "xyz"];
	expect(
		parse<{ a?: E }>({ a: oneOf(opts, {}) }, ["--a", "abc"], {
			start: 0,
		})
	).toEqual({ result: { a: "abc" }, index: 2, done: true, rest: [] });
	expect(
		parse<{ a?: E }>({ a: oneOf(opts, { default: "xyz" }) }, [])
	).toEqual({
		result: { a: "xyz" },
		index: 2,
		done: true,
		rest: [],
	});
	expect(() =>
		parse<{ a?: E }>({ a: oneOf(opts, {}) }, ["--a", "def"], {
			start: 0,
			showUsage: false,
		})
	).toThrow();
});

test("kv", () => {
	expect(
		parse<{ a?: KVDict }>(
			{ a: kvPairs({}) },
			["--a", "foo=bar", "--a", "baz"],
			{
				start: 0,
			}
		)
	).toEqual({
		result: { a: { foo: "bar", baz: "true" } },
		index: 4,
		done: true,
		rest: [],
	});
	expect(
		parse<{ a?: KVDict }>({ a: kvPairs({}, ":") }, ["--a", "foo:bar"], {
			start: 0,
		})
	).toEqual({
		result: { a: { foo: "bar" } },
		index: 2,
		done: true,
		rest: [],
	});
	expect(() =>
		parse<{ a?: KVDict }>({ a: kvPairs({}, ":", true) }, ["--a", "foo"], {
			start: 0,
			showUsage: false,
		})
	).toThrow();
});

test("kvMulti", () => {
	expect(
		parse<{ a?: KVMultiDict }>(
			{ a: kvPairsMulti({}) },
			["--a", "foo=aa", "--a", "bar=bb", "--a", "foo=cc", "--a", "debug"],
			{ start: 0 }
		)
	).toEqual({
		result: {
			a: { foo: ["aa", "cc"], bar: ["bb"], debug: ["true"] },
		},
		index: 8,
		done: true,
		rest: [],
	});
});

test("json", () => {
	expect(
		parse<{ a: any }>({ a: json<any, any>({}) }, ["--a", '{"foo":[23]}'], {
			start: 0,
		})
	).toEqual({ result: { a: { foo: [23] } }, index: 2, done: true, rest: [] });
});

test("number[]", () => {
	expect(
		parse<{ a?: number[] }>({ a: ints({}) }, ["--a", "1", "--a", "2"], {
			start: 0,
		})
	).toEqual({ result: { a: [1, 2] }, index: 4, done: true, rest: [] });
	expect(
		parse<{ a?: number[] }>(
			{ a: ints({ delim: "," }) },
			["--a", "1,2", "--a", "3,4"],
			{
				start: 0,
			}
		)
	).toEqual({ result: { a: [1, 2, 3, 4] }, index: 4, done: true, rest: [] });
});

test("tuple", () => {
	const res = {
		result: { a: new Tuple([1, 2, 3]) },
		index: 2,
		done: true,
		rest: [],
	};
	expect(
		parse<{ a?: Tuple<number> }>(
			{ a: tuple(coerceInt, 3, {}) },
			["--a", "1,2,3"],
			{
				start: 0,
			}
		)
	).toEqual(res);
	expect(
		parse<{ a?: Tuple<number> }>(
			{ a: size(3, {}, "x") },
			["--a", "1x2x3"],
			{
				start: 0,
			}
		)
	).toEqual(res);
});

test("stop early", () => {
	expect(
		parse<{ a?: number }>({ a: int({}) }, ["--a", "1", "foo"], {
			start: 0,
		})
	).toEqual({ result: { a: 1 }, index: 2, done: false, rest: ["foo"] });
	expect(
		parse<{ a?: number }>({ a: int({}) }, ["--a", "1", "--", "ignore"], {
			start: 0,
		})
	).toEqual({ result: { a: 1 }, index: 3, done: false, rest: ["ignore"] });
});

test("long alias", () => {
	expect(
		parse<{ a?: string }>({ a: string({ alias: "aaa" }) }, ["-aaa", "a"], {
			start: 0,
		})
	).toEqual({ result: { a: "a" }, index: 2, done: true, rest: [] });
});
