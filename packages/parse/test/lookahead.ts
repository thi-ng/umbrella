import { group } from "@thi.ng/testament";
import * as assert from "assert";
import {
    defContext,
    defGrammar,
    join,
    lookahead,
    oneOf,
    string,
    stringD,
} from "../src/index.js"

group("lookahead", {
    "oneof (no capture)": () => {
        const ctx = defContext("ababaaabbabba");
        assert.ok(join(lookahead(oneOf("ab"), stringD("abba")))(ctx));
        assert.strictEqual(ctx.result, "ababaa");
        assert.deepStrictEqual(ctx.state, {
            p: 6,
            l: 1,
            c: 7,
            done: false,
            last: "a",
        });
        assert.ok(string("abba")(ctx));
        assert.ok(!ctx.done);
    },

    "oneof (capture)": () => {
        const ctx = defContext("ababaaabbabba");
        assert.ok(join(lookahead(oneOf("ab"), string("abba"), true))(ctx));
        assert.strictEqual(ctx.result, "ababaaabba");
        assert.deepStrictEqual(ctx.state, {
            p: 10,
            l: 1,
            c: 11,
            done: false,
            last: "a",
        });
        assert.ok(string("bba")(ctx));
        assert.ok(ctx.done);
    },

    "string (no capture)": () => {
        const ctx = defContext("abababbabba");
        assert.ok(join(lookahead(string("ab"), stringD("abba")))(ctx));
        assert.strictEqual(ctx.result, "abab");
        assert.deepStrictEqual(ctx.state, {
            p: 4,
            l: 1,
            c: 5,
            done: false,
            last: "b",
        });
        assert.ok(string("abba")(ctx));
        assert.ok(!ctx.done);
    },

    "string (capture)": () => {
        const ctx = defContext("abababbabba");
        assert.ok(join(lookahead(string("ab"), string("abba"), true))(ctx));
        assert.strictEqual(ctx.result, "abababba");
        assert.deepStrictEqual(ctx.state, {
            p: 8,
            l: 1,
            c: 9,
            done: false,
            last: "a",
        });
        assert.ok(string("bba")(ctx));
        assert.ok(ctx.done);
    },

    "grammar (no capture)": () => {
        const ctx = defContext("ababaaabbabba");
        const lang = defGrammar(`foo: [ab](?-"abba"!) => join ;`);
        assert.ok(lang);
        assert.ok(lang.rules.foo(ctx));
        assert.strictEqual(ctx.result, "ababaa");
        assert.deepStrictEqual(ctx.state, {
            p: 6,
            l: 1,
            c: 7,
            done: false,
            last: "a",
        });
        assert.ok(string("abba")(ctx));
        assert.ok(!ctx.done);
    },

    "grammar (capture)": () => {
        const ctx = defContext("ababaaabbabba");
        const lang = defGrammar(`foo: [ab](?+"abba") => join ;`);
        assert.ok(lang);
        assert.ok(lang.rules.foo(ctx));
        assert.strictEqual(ctx.result, "ababaaabba");
        assert.deepStrictEqual(ctx.state, {
            p: 10,
            l: 1,
            c: 11,
            done: false,
            last: "a",
        });
        assert.ok(string("bba")(ctx));
        assert.ok(ctx.done);
    },
});
