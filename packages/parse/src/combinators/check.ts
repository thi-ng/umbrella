import type { Predicate } from "@thi.ng/api";
import type { Parser } from "../api.js";
import type { ParseScope } from "../context.js";
import { parseError } from "../error.js";
import { xform } from "./xform.js";

export const check = <T>(
	parser: Parser<T>,
	pred: Predicate<ParseScope<T>>,
	msg = "check failed"
) =>
	xform(parser, (scope, ctx) => {
		if (!pred(scope!)) parseError(ctx, msg);
		return scope;
	});
