import { assert } from "@thi.ng/errors";
import { expect, test } from "bun:test";
import {
	DIGIT,
	WS,
	defContext,
	oneOrMore,
	seq,
	zeroOrMore,
	type Parser,
} from "../src/index.js";

const check = (
	parser: Parser<string>,
	src: string,
	res: boolean,
	pos: number
) => {
	const ctx = defContext(src);
	assert(parser(ctx) === res, `src: '${src}'`);
	assert(ctx.state!.p === pos, `src: '${src}' pos: ${ctx.state!.p}`);
};

test("initial ctx", () => {
	expect(defContext("").state).toEqual({
		p: 0,
		l: 1,
		c: 1,
		done: true,
	});
	expect(defContext(" ").state).toEqual({
		p: 0,
		l: 1,
		c: 1,
		done: false,
	});
});

test("zeroOrMore", () => {
	const ws = zeroOrMore(WS);
	const p1 = seq([DIGIT, ws, DIGIT]);
	const p2 = zeroOrMore(p1);

	check(ws, "", true, 0);
	check(ws, " ", true, 1);
	check(ws, "  ", true, 2);

	check(p1, "", false, 0);
	check(p1, "11", true, 2);
	check(p1, "1 1", true, 3);
	check(p1, "1 ", false, 0);
	check(p1, "1  ", false, 0);
	check(p1, "1  x", false, 0);

	check(p2, "", true, 0);
	check(p2, "11", true, 2);
	check(p2, "1 1", true, 3);
	check(p2, "1 x", true, 0);
	check(p2, "1 122", true, 5);
});

test("oneOrMore", () => {
	const ws = oneOrMore(WS);
	const p1 = seq([DIGIT, ws, DIGIT]);
	const p2 = oneOrMore(p1);
	const p3 = oneOrMore(seq([DIGIT, zeroOrMore(WS), DIGIT]));

	check(ws, "", false, 0);
	check(ws, " ", true, 1);
	check(ws, "  ", true, 2);

	check(p1, "", false, 0);
	check(p1, "11", false, 0);
	check(p1, "1 1", true, 3);
	check(p1, "1 ", false, 0);
	check(p1, "1  ", false, 0);
	check(p1, "1  x", false, 0);

	check(p2, "", false, 0);
	check(p2, "11", false, 0);
	check(p2, "1 1", true, 3);
	check(p2, "1 x", false, 0);
	check(p2, "1 12 2", true, 6);

	check(p3, "", false, 0);
	check(p3, "1", false, 0);
	check(p3, "1x", false, 0);
	check(p3, "1 x", false, 0);
	check(p3, "11", true, 2);
	check(p3, "1111", true, 4);
	check(p3, "111 1", true, 5);
	check(p3, "11x", true, 2);
});
