import * as assert from "assert";
import {
    flag,
    float,
    hex,
    int,
    ints,
    json,
    KVDict,
    kvPairs,
    oneOf,
    parse,
    string,
} from "../src";

describe("args", () => {
    it("basic / string", () => {
        assert.deepStrictEqual(
            parse<{ a?: string }>({ a: string({}) }, ["--a", "a"], {
                start: 0,
            }),
            { result: { a: "a" }, index: 2 }
        );
        assert.deepStrictEqual(
            parse<{ a?: string }>({ a: string({ alias: "A" }) }, ["-A", "a"], {
                start: 0,
            }),
            { result: { a: "a" }, index: 2 }
        );
        assert.deepStrictEqual(
            parse<{ a?: string }>({ a: string({}) }, [], {
                start: 0,
            }),
            { result: {}, index: 0 }
        );
        assert.deepStrictEqual(
            parse<{ a: string }>({ a: string({ default: "a" }) }, [], {
                start: 0,
            }),
            { result: { a: "a" }, index: 0 }
        );
        assert.throws(() =>
            parse<{ a: string }>({ a: string({ optional: false }) }, [], {
                showUsage: false,
            })
        );
    });

    it("flag", () => {
        assert.deepStrictEqual(
            parse<{ a?: boolean }>({ a: flag({}) }, ["--a"], {
                start: 0,
            }),
            { result: { a: true }, index: 1 }
        );
        assert.deepStrictEqual(
            parse<{ a: boolean }>({ a: flag({ default: false }) }, [], {
                start: 0,
            }),
            { result: { a: false }, index: 0 }
        );
    });

    it("number", () => {
        assert.deepStrictEqual(
            parse<{ a?: number }>({ a: float({}) }, ["--a", "1.23"], {
                start: 0,
            }),
            { result: { a: 1.23 }, index: 2 }
        );
        assert.deepStrictEqual(
            parse<{ a?: number }>({ a: int({}) }, ["--a", "123"], {
                start: 0,
            }),
            { result: { a: 123 }, index: 2 }
        );
        assert.deepStrictEqual(
            parse<{ a?: number }>({ a: hex({}) }, ["--a", "123"], {
                start: 0,
            }),
            { result: { a: 0x123 }, index: 2 }
        );
        assert.throws(() =>
            parse<{ a?: number }>({ a: int({}) }, ["--a", "a"], {
                start: 0,
                showUsage: false,
            })
        );
    });

    it("enum", () => {
        type E = "abc" | "xyz";
        const opts: E[] = ["abc", "xyz"];
        assert.deepStrictEqual(
            parse<{ a?: E }>({ a: oneOf(opts, {}) }, ["--a", "abc"], {
                start: 0,
            }),
            { result: { a: "abc" }, index: 2 }
        );
        assert.deepStrictEqual(
            parse<{ a?: E }>({ a: oneOf(opts, { default: "xyz" }) }, []),
            { result: { a: "xyz" }, index: 2 }
        );
        assert.throws(() =>
            parse<{ a?: E }>({ a: oneOf(opts, {}) }, ["--a", "def"], {
                start: 0,
                showUsage: false,
            })
        );
    });

    it("kv", () => {
        assert.deepStrictEqual(
            parse<{ a?: KVDict }>(
                { a: kvPairs({}) },
                ["--a", "foo=bar", "--a", "baz"],
                {
                    start: 0,
                }
            ),
            { result: { a: { foo: "bar", baz: "true" } }, index: 4 }
        );
        assert.deepStrictEqual(
            parse<{ a?: KVDict }>({ a: kvPairs({}, ":") }, ["--a", "foo:bar"], {
                start: 0,
            }),
            { result: { a: { foo: "bar" } }, index: 2 }
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
    });

    it("json", () => {
        assert.deepStrictEqual(
            parse<{ a: any }>(
                { a: json<any, any>({}) },
                ["--a", '{"foo":[23]}'],
                {
                    start: 0,
                }
            ),
            { result: { a: { foo: [23] } }, index: 2 }
        );
    });

    it("number[]", () => {
        assert.deepStrictEqual(
            parse<{ a?: number[] }>({ a: ints({}) }, ["--a", "1", "--a", "2"], {
                start: 0,
            }),
            { result: { a: [1, 2] }, index: 4 }
        );
        assert.deepStrictEqual(
            parse<{ a?: number[] }>(
                { a: ints({ comma: true }) },
                ["--a", "1,2", "--a", "3,4"],
                {
                    start: 0,
                }
            ),
            { result: { a: [1, 2, 3, 4] }, index: 4 }
        );
    });
});
