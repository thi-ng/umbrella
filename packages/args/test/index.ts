import * as assert from "assert";
import { group } from "@thi.ng/testament";
import {
	coerceInt,
	flag,
	float,
	hex,
	int,
	ints,
	json,
	KVDict,
	KVMultiDict,
	kvPairs,
	kvPairsMulti,
	oneOf,
	parse,
	size,
	string,
	tuple,
	Tuple,
} from "../src/index.js";

group("args", {
	"basic / string": () => {
		assert.deepStrictEqual(
			parse<{ a?: string }>({ a: string({}) }, ["--a", "a"], {
				start: 0,
			}),
			{ result: { a: "a" }, index: 2, done: true, rest: [] }
		);
		assert.deepStrictEqual(
			parse<{ a?: string }>({ a: string({ alias: "A" }) }, ["-A", "a"], {
				start: 0,
			}),
			{ result: { a: "a" }, index: 2, done: true, rest: [] }
		);
		assert.deepStrictEqual(
			parse<{ a?: string }>({ a: string({}) }, [], {
				start: 0,
			}),
			{ result: {}, index: 0, done: true, rest: [] }
		);
		assert.deepStrictEqual(
			parse<{ a: string }>({ a: string({ default: "a" }) }, [], {
				start: 0,
			}),
			{ result: { a: "a" }, index: 0, done: true, rest: [] }
		);
		assert.throws(() =>
			parse<{ a: string }>({ a: string({ optional: false }) }, [], {
				showUsage: false,
			})
		);
	},

	flag: () => {
		assert.deepStrictEqual(
			parse<{ a?: boolean }>({ a: flag({}) }, ["--a"], {
				start: 0,
			}),
			{ result: { a: true }, index: 1, done: true, rest: [] }
		);
		assert.deepStrictEqual(
			parse<{ a: boolean }>({ a: flag({ default: false }) }, [], {
				start: 0,
			}),
			{ result: { a: false }, index: 0, done: true, rest: [] }
		);
	},

	number: () => {
		assert.deepStrictEqual(
			parse<{ a?: number }>({ a: float({}) }, ["--a", "1.23"], {
				start: 0,
			}),
			{ result: { a: 1.23 }, index: 2, done: true, rest: [] }
		);
		assert.deepStrictEqual(
			parse<{ a?: number }>({ a: int({}) }, ["--a", "123"], {
				start: 0,
			}),
			{ result: { a: 123 }, index: 2, done: true, rest: [] }
		);
		assert.deepStrictEqual(
			parse<{ a?: number }>({ a: hex({}) }, ["--a", "123"], {
				start: 0,
			}),
			{ result: { a: 0x123 }, index: 2, done: true, rest: [] }
		);
		assert.throws(() =>
			parse<{ a?: number }>({ a: int({}) }, ["--a", "a"], {
				start: 0,
				showUsage: false,
			})
		);
	},

	enum: () => {
		type E = "abc" | "xyz";
		const opts: E[] = ["abc", "xyz"];
		assert.deepStrictEqual(
			parse<{ a?: E }>({ a: oneOf(opts, {}) }, ["--a", "abc"], {
				start: 0,
			}),
			{ result: { a: "abc" }, index: 2, done: true, rest: [] }
		);
		assert.deepStrictEqual(
			parse<{ a?: E }>({ a: oneOf(opts, { default: "xyz" }) }, []),
			{ result: { a: "xyz" }, index: 2, done: true, rest: [] }
		);
		assert.throws(() =>
			parse<{ a?: E }>({ a: oneOf(opts, {}) }, ["--a", "def"], {
				start: 0,
				showUsage: false,
			})
		);
	},

	kv: () => {
		assert.deepStrictEqual(
			parse<{ a?: KVDict }>(
				{ a: kvPairs({}) },
				["--a", "foo=bar", "--a", "baz"],
				{
					start: 0,
				}
			),
			{
				result: { a: { foo: "bar", baz: "true" } },
				index: 4,
				done: true,
				rest: [],
			}
		);
		assert.deepStrictEqual(
			parse<{ a?: KVDict }>({ a: kvPairs({}, ":") }, ["--a", "foo:bar"], {
				start: 0,
			}),
			{
				result: { a: { foo: "bar" } },
				index: 2,
				done: true,
				rest: [],
			}
		);
		assert.throws(() =>
			parse<{ a?: KVDict }>(
				{ a: kvPairs({}, ":", true) },
				["--a", "foo"],
				{
					start: 0,
					showUsage: false,
				}
			)
		);
	},

	kvMulti: () => {
		assert.deepStrictEqual(
			parse<{ a?: KVMultiDict }>(
				{ a: kvPairsMulti({}) },
				[
					"--a",
					"foo=aa",
					"--a",
					"bar=bb",
					"--a",
					"foo=cc",
					"--a",
					"debug",
				],
				{ start: 0 }
			),
			{
				result: {
					a: { foo: ["aa", "cc"], bar: ["bb"], debug: ["true"] },
				},
				index: 8,
				done: true,
				rest: [],
			}
		);
	},

	json: () => {
		assert.deepStrictEqual(
			parse<{ a: any }>(
				{ a: json<any, any>({}) },
				["--a", '{"foo":[23]}'],
				{
					start: 0,
				}
			),
			{ result: { a: { foo: [23] } }, index: 2, done: true, rest: [] }
		);
	},

	"number[]": () => {
		assert.deepStrictEqual(
			parse<{ a?: number[] }>({ a: ints({}) }, ["--a", "1", "--a", "2"], {
				start: 0,
			}),
			{ result: { a: [1, 2] }, index: 4, done: true, rest: [] }
		);
		assert.deepStrictEqual(
			parse<{ a?: number[] }>(
				{ a: ints({ delim: "," }) },
				["--a", "1,2", "--a", "3,4"],
				{
					start: 0,
				}
			),
			{ result: { a: [1, 2, 3, 4] }, index: 4, done: true, rest: [] }
		);
	},

	tuple: () => {
		const res = {
			result: { a: new Tuple([1, 2, 3]) },
			index: 2,
			done: true,
			rest: [],
		};
		assert.deepStrictEqual(
			parse<{ a?: Tuple<number> }>(
				{ a: tuple(coerceInt, 3, {}) },
				["--a", "1,2,3"],
				{
					start: 0,
				}
			),
			res
		);
		assert.deepStrictEqual(
			parse<{ a?: Tuple<number> }>(
				{ a: size(3, {}, "x") },
				["--a", "1x2x3"],
				{
					start: 0,
				}
			),
			res
		);
	},

	"stop early": () => {
		assert.deepStrictEqual(
			parse<{ a?: number }>({ a: int({}) }, ["--a", "1", "foo"], {
				start: 0,
			}),
			{ result: { a: 1 }, index: 2, done: false, rest: ["foo"] }
		);
		assert.deepStrictEqual(
			parse<{ a?: number }>(
				{ a: int({}) },
				["--a", "1", "--", "ignore"],
				{
					start: 0,
				}
			),
			{ result: { a: 1 }, index: 3, done: false, rest: ["ignore"] }
		);
	},

	"long alias": () => {
		assert.deepStrictEqual(
			parse<{ a?: string }>(
				{ a: string({ alias: "aaa" }) },
				["-aaa", "a"],
				{
					start: 0,
				}
			),
			{ result: { a: "a" }, index: 2, done: true, rest: [] }
		);
	},
});
