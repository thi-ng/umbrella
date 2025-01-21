import type { Parser, Scope } from "../api.js";
import { xform } from "../combinators/xform.js";

export const xfJoin = (scope: Scope) => {
	if (!scope.result) {
		scope.result = scope.children?.map((x) => xfJoin(x).result).join("");
	}
	scope.children = undefined;
	return scope;
};

export const join = (parser: Parser) => xform(parser, xfJoin);
