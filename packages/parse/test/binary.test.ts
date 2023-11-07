import { assert } from "@thi.ng/errors";
import { test } from "bun:test";
import {
	defContext,
	lit,
	oneOrMore,
	range,
	seq,
	string,
	type Parser,
} from "../src/index.js";

const check = (
	parser: Parser<number>,
	src: ArrayLike<number>,
	res: boolean,
	pos: number
) => {
	const ctx = defContext(src);
	assert(parser(ctx) === res, `src: '${src}'`);
	assert(ctx.state!.p === pos, `src: '${src}' pos: ${ctx.state!.p}`);
};

test("binary basics", () => {
	check(seq([string([1, 2, 3, 4]), lit(5)]), [1, 2, 3, 4, 5], true, 5);
	check(seq([oneOrMore(range(0, 4)), lit(5)]), [1, 2, 3, 4, 5], true, 5);
});
