import * as assert from "assert";
import {
    defContext,
    defGrammar,
    join,
    lookahead,
    oneOf,
    string,
    stringD,
} from "../src";

describe("lookahead", () => {
    it("oneof (no capture)", () => {
        const ctx = defContext("ababaaabbabba");
        assert(join(lookahead(oneOf("ab"), stringD("abba")))(ctx));
        assert.equal(ctx.result, "ababaa");
        assert.deepEqual(ctx.state, {
            p: 6,
            l: 1,
            c: 7,
            done: false,
            last: "a",
        });
        assert(string("abba")(ctx));
        assert(!ctx.done);
    });

    it("oneof (capture)", () => {
        const ctx = defContext("ababaaabbabba");
        assert(join(lookahead(oneOf("ab"), string("abba"), true))(ctx));
        assert.equal(ctx.result, "ababaaabba");
        assert.deepEqual(ctx.state, {
            p: 10,
            l: 1,
            c: 11,
            done: false,
            last: "a",
        });
        assert(string("bba")(ctx));
        assert(ctx.done);
    });

    it("string (no capture)", () => {
        const ctx = defContext("abababbabba");
        assert(join(lookahead(string("ab"), stringD("abba")))(ctx));
        assert.equal(ctx.result, "abab");
        assert.deepEqual(ctx.state, {
            p: 4,
            l: 1,
            c: 5,
            done: false,
            last: "b",
        });
        assert(string("abba")(ctx));
        assert(!ctx.done);
    });

    it("string (capture)", () => {
        const ctx = defContext("abababbabba");
        assert(join(lookahead(string("ab"), string("abba"), true))(ctx));
        assert.equal(ctx.result, "abababba");
        assert.deepEqual(ctx.state, {
            p: 8,
            l: 1,
            c: 9,
            done: false,
            last: "a",
        });
        assert(string("bba")(ctx));
        assert(ctx.done);
    });

    it("grammar (no capture)", () => {
        const ctx = defContext("ababaaabbabba");
        const lang = defGrammar(`foo: [ab](?-"abba"!) => join ;`);
        assert(lang);
        assert(lang.rules.foo(ctx));
        assert.equal(ctx.result, "ababaa");
        assert.deepEqual(ctx.state, {
            p: 6,
            l: 1,
            c: 7,
            done: false,
            last: "a",
        });
        assert(string("abba")(ctx));
        assert(!ctx.done);
    });

    it("grammar (capture)", () => {
        const ctx = defContext("ababaaabbabba");
        const lang = defGrammar(`foo: [ab](?+"abba") => join ;`);
        assert(lang);
        assert(lang.rules.foo(ctx));
        assert.equal(ctx.result, "ababaaabba");
        assert.deepEqual(ctx.state, {
            p: 10,
            l: 1,
            c: 11,
            done: false,
            last: "a",
        });
        assert(string("bba")(ctx));
        assert(ctx.done);
    });
});
