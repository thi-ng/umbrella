import type { Parser, Scope } from "../api.js";
import { xform } from "../combinators/xform.js";

export const xfCount = (scope: Scope) => {
	scope!.result = scope!.children?.length || 0;
	scope.children = undefined;
	return scope;
};

export const count = (parser: Parser) => xform(parser, xfCount);
