import type { Parser, PassValue } from "../api.js";
import { pass } from "../prims/pass.js";

export const maybe =
	<T, R = any>(
		parser: Parser<T>,
		result?: PassValue<R>,
		id = "maybe"
	): Parser<T> =>
	(ctx) =>
		parser(ctx) || pass(result, id)(ctx);
