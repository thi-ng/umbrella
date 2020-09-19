import * as assert from "assert";
import { ParseContext, parseString } from "../src";

const $ctx: Partial<ParseContext> = { opts: { prefixes: true } };

describe("escape", () => {
    it("node id", () => {
        assert.deepStrictEqual(parseString(`\\u0046oo`).nodes, {
            Foo: { $id: "Foo" },
        });
    });

    it("node id (qfn)", () => {
        assert.deepStrictEqual(
            parseString(`@prefix foo: FOO\n\\u0066oo:\\u0062ar`, $ctx).nodes,
            {
                FOObar: { $id: "FOObar" },
            }
        );
    });

    it("prefix decl", () => {
        assert.strictEqual(
            parseString(`@prefix \\u0066oo: \\u0046OO`, $ctx).prefixes.foo,
            "FOO"
        );
    });

    it("prop name (qfn)", () => {
        assert.deepStrictEqual(
            parseString(`@prefix a: foo\nx\n\t\\u0061:\\u0062ar baz`, $ctx)
                .nodes,
            {
                x: { $id: "x", foobar: "baz" },
            }
        );
    });

    it("tag id", () => {
        assert.deepStrictEqual(parseString(`a\n\tfoo #\\u006eum 42`).nodes, {
            a: { $id: "a", foo: 42 },
        });
    });

    it("string value", () => {
        assert.deepStrictEqual(parseString(`a\n\tfoo \\u0062ar`).nodes, {
            a: { $id: "a", foo: "bar" },
        });
    });

    it("string multi-line value", () => {
        assert.deepStrictEqual(
            parseString(`a\n\tfoo >>>abc\\ndef\nghi<<<`).nodes,
            {
                a: { $id: "a", foo: "abc\ndef\nghi" },
            }
        );
    });

    it("#list multi-line value", () => {
        assert.deepStrictEqual(
            parseString(`a\n\tfoo #list >>>\nabc\\ndef\nghi<<<`).nodes,
            {
                a: { $id: "a", foo: ["abc\ndef", "ghi"] },
            }
        );
    });

    it("ref", () => {
        assert.deepStrictEqual(
            parseString(`a\n\tfoo -> \\u0062`, { opts: { resolve: true } })
                .nodes,
            {
                a: { $id: "a", foo: { $id: "b" } },
                b: { $id: "b" },
            }
        );
    });

    it("ref <>", () => {
        assert.deepStrictEqual(
            parseString(`a\n\tfoo -> <\\u0062:b>`, {
                opts: { prefixes: true, resolve: true },
            }).nodes,
            {
                a: { $id: "a", foo: { $id: "b:b" } },
                "b:b": { $id: "b:b" },
            }
        );
    });
});
