import * as assert from "assert";
import { defContext, defGrammar, Parser } from "../src";

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

describe("grammar", () => {
    it("basics", () => {
        const lang = defGrammar(
            "_: [ ]+ => discard ; num: [0-9a-f]+ => join ; prog: (<_> | <num>)* => collect ;"
        );
        const ctx = check(lang!.rules.prog, "decafbad 55 aa", true, 14);
        assert.deepEqual(ctx.result, ["decafbad", "55", "aa"]);
    });

    it("discard flag", () => {
        const lang = defGrammar(`
title: [^\\u005d]* => join ;
url: [^\\u0029]* => join ;
end: ')' ;
link: '['! <title> "]("! <url> <end>! => collect ;
`);
        const ctx = defContext("[abc](def)");
        assert(lang!.rules.link(ctx));
        assert.deepEqual(ctx.result, ["abc", "def"]);
    });
});
