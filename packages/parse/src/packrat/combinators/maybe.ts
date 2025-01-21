import type { Discarded, Parser } from "../api.js";
import { pass, type PassOpts } from "../prims/pass.js";

export const maybe = (
	parser: Parser,
	{ id = "maybe", discard = false, result }: PassOpts = {}
): Parser => {
	const $pass = pass({ id, result, discard });
	return (ctx) => {
		ctx.debug?.("maybe", id);
		return parser(ctx) || $pass(ctx);
	};
};

export const maybeD = (parser: Parser, opts?: Discarded<PassOpts>) =>
	maybe(parser, { ...opts, discard: true });
