import { group } from "@thi.ng/testament";
import * as assert from "assert";
import {
	INT,
	WS0,
	alt,
	collect,
	defContext,
	discard,
	oneOf,
	seq,
	xform,
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
	assert.strictEqual(parser(ctx), res, `src: '${src}'`);
	assert.strictEqual(ctx.state!.p, pos, `src: '${src}' pos: ${ctx.state!.p}`);
};

group("parse", {
	SVG: () => {
		const wsc = discard(zeroOrMore(oneOf(" \n,")));
		const point = collect(seq([INT, wsc, INT]));
		const move = collect(seq([oneOf("Mm"), WS0, point, WS0]));
		const line = collect(seq([oneOf("Ll"), WS0, point, WS0]));
		const curve = collect(
			seq([oneOf("Cc"), WS0, point, wsc, point, wsc, point, WS0])
		);
		const close = xform(oneOf("Zz"), ($) => (($!.result = [$!.result]), $));
		const path = collect(zeroOrMore(alt([move, line, curve, close])));
		check(point, "1-2", true, 3);
		check(move, "M1-2", true, 4);
		check(line, "l1-2", true, 4);
		check(curve, "c1-2-3 4,5 6", true, 12);
		check(path, "M0,1L2 3c4,5-6,7 8 9z", true, 21);

		const ctx = defContext("M0,1L2 3c4,5-6,7 8 9z");
		assert.ok(path(ctx));
		assert.ok(ctx.done);
		assert.deepStrictEqual(ctx.result, [
			["M", [0, 1]],
			["L", [2, 3]],
			["c", [4, 5], [-6, 7], [8, 9]],
			["z"],
		]);
	},
});
