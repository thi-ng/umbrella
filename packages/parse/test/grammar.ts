import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { defContext, defGrammar, Parser } from "../src/index.js";

const check = (
	parser: Parser<string>,
	src: string,
	res: boolean,
	pos: number
) => {
	const ctx = defContext(src);
	assert.strictEqual(parser(ctx), res, `src: '${src}'`);
	assert.strictEqual(ctx.state!.p, pos, `src: '${src}' pos: ${ctx.state!.p}`);
	return ctx;
};

const checkDiscard = (grammar: string, input: string) => {
	const lang = defGrammar(grammar);
	const ctx = defContext(input);
	assert.ok(lang!.rules.a(ctx));
	assert.ok(ctx.done);
	assert.strictEqual(ctx.children!.length, 1, grammar);
};

group("grammar", {
	basics: () => {
		const lang = defGrammar(
			"_: [ ]+ => discard ; num: [0-9a-f]+ => join ; prog: (<_> | <num>)* => collect ;"
		);
		const ctx = check(lang!.rules.prog, "decafbad 55 aa", true, 14);
		assert.deepStrictEqual(ctx.result, ["decafbad", "55", "aa"]);
	},

	"discard flag": () => {
		const lang = defGrammar(`
title: [^\\u005d]* => join ;
url: [^\\u0029]* => join ;
end: ')' ;
link: '['! <title> "]("! <url> <end>! => collect ;
`);
		const ctx = defContext("[abc](def)");
		assert.ok(lang!.rules.link(ctx));
		assert.deepStrictEqual(ctx.result, ["abc", "def"]);
	},

	"discard lit": () => {
		checkDiscard(`a: 'a'! 'b' ;`, "ab");
	},

	"discard string": () => {
		checkDiscard(`a: "a"! 'b' ;`, "ab");
	},

	"discard charsel": () => {
		checkDiscard(`a: [A-B]! 'b' ;`, "Ab");
	},

	"discard charsel inv": () => {
		checkDiscard(`a: [^A-B]! 'b' ;`, "ab");
	},

	"discard ref": () => {
		checkDiscard(`aa: . ; a: <aa>! 'b' ;`, "xb");
	},

	"discard alt1": () => {
		checkDiscard(`a: ('a')! 'b' ;`, "ab");
	},

	"discard alt2": () => {
		checkDiscard(`a: ('a' | 'A')! 'b' ;`, "Ab");
	},

	"discard alt2 ref": () => {
		checkDiscard(`aa: 'a' ; AA: 'A'; a: (<aa> | <AA>)! 'b' ;`, "Ab");
	},

	"rule ref xform": () => {
		const lang = defGrammar(
			`a: [a-z](?+','!) => join ; aa: <a>+ ; b: [a-z,]+ => <aa> ;`
		);
		const ctx = defContext("abc,def,g,hij,", { retain: true });
		assert.ok(lang!.rules.b(ctx));
		// prettier-ignore
		assert. deepStrictEqual(ctx.children, [
            { id: "a", state: { p: 0, l: 1, c: 1 }, children: null, result: "abc" },
            { id: "a", state: { p: 4, l: 1, c: 5 }, children: null, result: "def" },
            { id: "a", state: { p: 8, l: 1, c: 9 }, children: null, result: "g" },
            { id: "a", state: { p: 10, l: 1, c: 11 }, children: null, result: "hij" },
        ])
	},
});
