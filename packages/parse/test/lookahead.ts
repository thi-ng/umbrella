import * as assert from "assert";
import { defContext, join, lookahead, oneOf, stringD, string } from "../src";

describe("lookahead", () => {
    it("oneof", () => {
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
    });

    it("string", () => {
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
    });
});
