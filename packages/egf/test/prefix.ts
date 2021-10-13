import * as assert from "assert";
import { group } from "@thi.ng/testament";
import { ParseContext, parseString, qualifiedID } from "../src/index.js"

const $ctx: Partial<ParseContext> = { opts: { prefixes: true } };

group("@prefix", {
    "@prefix decl": () => {
        assert.throws(() => parseString(`@prefix :`, $ctx), "1");
        assert.throws(() => parseString(`@prefix : `, $ctx), "2");
        assert.throws(() => parseString(`@prefix a&b: abc`, $ctx), "3");
        assert.strictEqual(
            parseString(`@prefix : abc`, $ctx).prefixes[""],
            "abc"
        );
        // prettier-ignore
        assert.strictEqual(parseString(`@prefix _:   abc`, $ctx).prefixes["_"], "abc");
        // prettier-ignore
        assert.strictEqual(parseString(`@prefix $1a-b_C:   abc`, $ctx).prefixes["$1a-b_C"], "abc");
    },

    qfn: () => {
        const qfn = (id: string) =>
            qualifiedID({ "": "self/", thi: "thi.ng/" }, id);
        assert.strictEqual(qfn(":a"), "self/a");
        assert.strictEqual(qfn("thi:a"), "thi.ng/a");
        assert.throws(() => qfn("foo:a"));
    },

    "resolve w/ prefix": () => {
        const { nodes, prefixes } = parseString(
            `
@prefix : self/
@prefix thi: thi.ng/
:a
    partof -> thi:b

thi:b
    parentof -> :a
`,
            { opts: { prefixes: true, resolve: true } }
        );
        assert.strictEqual(prefixes[""], "self/");
        assert.strictEqual(prefixes["thi"], "thi.ng/");
        assert.strictEqual(nodes["self/a"].partof.$id, "thi.ng/b");
        assert.strictEqual(nodes["thi.ng/b"].parentof.$id, "self/a");
    },
});
