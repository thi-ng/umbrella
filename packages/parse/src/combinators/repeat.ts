import type { Parser } from "../api.js";
import { discard } from "../xform/discard.js";

export const repeat =
	<T>(
		parser: Parser<T>,
		min: number,
		max: number,
		id = "repeat"
	): Parser<T> =>
	(ctx) => {
		if (ctx.done) {
			return min < 1 ? ctx.addChild(id) : false;
		}
		ctx.start(id);
		for (let i = 0; i < max; i++) {
			if (!parser(ctx)) {
				if (i < min) {
					return ctx.discard();
				}
				break;
			}
		}
		return ctx.end();
	};

export const zeroOrMore = <T>(
	parser: Parser<T>,
	id = "repeat0",
	max = Infinity
) => repeat(parser, 0, max, id);

export const oneOrMore = <T>(
	parser: Parser<T>,
	id = "repeat1",
	max = Infinity
) => repeat(parser, 1, max, id);

export const repeatD = <T>(parser: Parser<T>, min: number, max: number) =>
	discard(repeat(parser, min, max));

export const zeroOrMoreD = <T>(parser: Parser<T>, max = Infinity) =>
	repeatD(parser, 0, max);

export const oneOrMoreD = <T>(parser: Parser<T>, max = Infinity) =>
	repeatD(parser, 1, max);
