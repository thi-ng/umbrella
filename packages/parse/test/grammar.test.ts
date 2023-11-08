import { assert } from "@thi.ng/errors";
import { expect, test } from "bun:test";
import { defContext, defGrammar, type Parser } from "../src/index.js";

const check = (
	parser: Parser<string>,
	src: string,
	res: boolean,
	pos: number
) => {
	const ctx = defContext(src);
	assert(parser(ctx) === res, `src: '${src}'`);
	assert(ctx.state!.p === pos, `src: '${src}' pos: ${ctx.state!.p}`);
	return ctx;
};

const checkDiscard = (grammar: string, input: string) => {
	const lang = defGrammar(grammar);
	const ctx = defContext(input);
	expect(lang!.rules.a(ctx)).toBeTrue();
	expect(ctx.done).toBeTrue();
	expect(ctx.children!.length).toBe(1);
};

test("basics", () => {
	const lang = defGrammar(
		"_: [ ]+ => discard ; num: [0-9a-f]+ => join ; prog: (<_> | <num>)* => collect ;"
	);
	const ctx = check(lang!.rules.prog, "decafbad 55 aa", true, 14);
	expect(ctx.result).toEqual(["decafbad", "55", "aa"]);
});

test("discard flag", () => {
	const lang = defGrammar(`
title: [^\\u005d]* => join ;
url: [^\\u0029]* => join ;
end: ')' ;
link: '['! <title> "]("! <url> <end>! => collect ;
`);
	const ctx = defContext("[abc](def)");
	expect(lang!.rules.link(ctx)).toBeTrue();
	expect(ctx.result).toEqual(["abc", "def"]);
});

test("discard lit", () => {
	checkDiscard(`a: 'a'! 'b' ;`, "ab");
});

test("discard string", () => {
	checkDiscard(`a: "a"! 'b' ;`, "ab");
});

test("discard charsel", () => {
	checkDiscard(`a: [A-B]! 'b' ;`, "Ab");
});

test("discard charsel inv", () => {
	checkDiscard(`a: [^A-B]! 'b' ;`, "ab");
});

test("discard ref", () => {
	checkDiscard(`aa: . ; a: <aa>! 'b' ;`, "xb");
});

test("discard alt1", () => {
	checkDiscard(`a: ('a')! 'b' ;`, "ab");
});

test("discard alt2", () => {
	checkDiscard(`a: ('a' | 'A')! 'b' ;`, "Ab");
});

test("discard alt2 ref", () => {
	checkDiscard(`aa: 'a' ; AA: 'A'; a: (<aa> | <AA>)! 'b' ;`, "Ab");
});

test("rule ref xform", () => {
	const lang = defGrammar(
		`a: [a-z](?+','!) => join ; aa: <a>+ ; b: [a-z,]+ => <aa> ;`
	);
	const ctx = defContext("abc,def,g,hij,", { retain: true });
	expect(lang!.rules.b(ctx)).toBeTrue();
	expect(ctx.children).toEqual([
		{ id: "a", state: { p: 0, l: 1, c: 1 }, children: null, result: "abc" },
		{ id: "a", state: { p: 4, l: 1, c: 5 }, children: null, result: "def" },
		{ id: "a", state: { p: 8, l: 1, c: 9 }, children: null, result: "g" },
		{
			id: "a",
			state: { p: 10, l: 1, c: 11 },
			children: null,
			result: "hij",
		},
	]);
});
