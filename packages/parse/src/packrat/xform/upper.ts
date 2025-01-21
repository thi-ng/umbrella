import { isString } from "@thi.ng/checks/is-string";
import type { Parser, Scope } from "../api.js";
import { xform } from "../combinators/xform.js";

export const xfUpper = (scope: Scope) => {
	if (isString(scope.result)) {
		scope.result = scope.result.toUpperCase();
	}
	return scope;
};

export const upper = (parser: Parser) => xform(parser, xfUpper);
