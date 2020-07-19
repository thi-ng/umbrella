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

    const checkDiscard = (grammar: string, input: string) => {
        const lang = defGrammar(grammar);
        const ctx = defContext(input);
        assert(lang!.rules.a(ctx));
        assert(ctx.done);
        assert.equal(ctx.children!.length, 1, grammar);
    };

    it("discard lit", () => {
        checkDiscard(`a: 'a'! 'b' ;`, "ab");
    });

    it("discard string", () => {
        checkDiscard(`a: "a"! 'b' ;`, "ab");
    });

    it("discard charsel", () => {
        checkDiscard(`a: [A-B]! 'b' ;`, "Ab");
    });

    it("discard charsel inv", () => {
        checkDiscard(`a: [^A-B]! 'b' ;`, "ab");
    });

    it("discard ref", () => {
        checkDiscard(`aa: . ; a: <aa>! 'b' ;`, "xb");
    });

    it("discard alt1", () => {
        checkDiscard(`a: ('a')! 'b' ;`, "ab");
    });

    it("discard alt2", () => {
        checkDiscard(`a: ('a' | 'A')! 'b' ;`, "Ab");
    });

    it("discard alt2 ref", () => {
        checkDiscard(`aa: 'a' ; AA: 'A'; a: (<aa> | <AA>)! 'b' ;`, "Ab");
    });

    it("rule ref xform", () => {
        const lang = defGrammar(
            `a: [a-z](?+','!) => join ; aa: <a>+ ; b: [a-z,]+ => <aa> ;`
        );
        const ctx = defContext("abc,def,g,hij,", { retain: true });
        assert(lang!.rules.b(ctx));
        // prettier-ignore
        assert.deepEqual(ctx.children, [
            { id: "a", state: { p: 0, l: 1, c: 1 }, children: null, result: "abc" },
            { id: "a", state: { p: 4, l: 1, c: 5 }, children: null, result: "def" },
            { id: "a", state: { p: 8, l: 1, c: 9 }, children: null, result: "g" },
            { id: "a", state: { p: 10, l: 1, c: 11 }, children: null, result: "hij" },
        ])
    });
});
