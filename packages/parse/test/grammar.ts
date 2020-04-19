import * as assert from "assert";
import { defContext, defGrammar, Parser, xfCollect, xfJoin } from "../src";

const check = (
    parser: Parser<string>,
    src: string,
    res: boolean,
    pos: number
) => {
    const ctx = defContext(src);
    assert.equal(parser(ctx), res, `src: '${src}'`);
    assert.equal(ctx.state!.p, pos, `src: '${src}' pos: ${ctx.state!.p}`);
    return ctx;
};

describe("parse", () => {
    it("grammar", () => {
        const lang = defGrammar(
            "_: [ ]+ => discard ; num: [0-9a-f]+ => join ; prog: (<_> | <num>)* => collect ;",
            { discard: () => null, join: xfJoin, collect: xfCollect }
        );
        const ctx = check(lang!.rules.prog, "decafbad 55 aa", true, 14);
        assert.deepEqual(ctx.result, ["decafbad", "55", "aa"]);
    });
});
