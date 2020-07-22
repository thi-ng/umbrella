import * as assert from "assert";
import { ParseContext, parseString, qualifiedID } from "../src";

const $ctx: Partial<ParseContext> = { opts: { prefixes: true } };

describe("egf @prefix", () => {
    it("@prefix decl", () => {
        assert.throws(() => parseString(`@prefix :`, $ctx), "1");
        assert.throws(() => parseString(`@prefix : `, $ctx), "2");
        assert.throws(() => parseString(`@prefix a&b: abc`, $ctx), "3");
        assert.equal(parseString(`@prefix : abc`, $ctx).prefixes[""], "abc");
        // prettier-ignore
        assert.equal(parseString(`@prefix _:   abc`, $ctx).prefixes["_"], "abc");
        // prettier-ignore
        assert.equal(parseString(`@prefix $1a-b_C:   abc`, $ctx).prefixes["$1a-b_C"], "abc");
    });

    it("qfn", () => {
        const qfn = (id: string) =>
            qualifiedID({ "": "self/", thi: "thi.ng/" }, id);
        assert.equal(qfn(":a"), "self/a");
        assert.equal(qfn("thi:a"), "thi.ng/a");
        assert.throws(() => qfn("foo:a"));
    });

    it("resolve w/ prefix", () => {
        const { nodes, prefixes } = parseString(
            `
@prefix : self/
@prefix thi: thi.ng/
:a
    partof #ref thi:b

thi:b
    parentof #ref :a
`,
            { opts: { prefixes: true, resolve: true } }
        );
        assert.equal(prefixes[""], "self/");
        assert.equal(prefixes["thi"], "thi.ng/");
        assert.equal(nodes["self/a"].partof.$id, "thi.ng/b");
        assert.equal(nodes["thi.ng/b"].parentof.$id, "self/a");
    });
});
