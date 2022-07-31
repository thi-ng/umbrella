import type { Parser, ScopeTransform } from "../api.js";
import { xform } from "../combinators/xform.js";
import { xfJoin } from "./join.js";

/**
 * First joins all children via {@link xfJoin}, then parses resulting string
 * using `JSON.parse()`.
 *
 * @param scope -
 */
export const xfJson: ScopeTransform<string> = (scope) => {
	scope!.result = JSON.parse(xfJoin(scope)!.result);
	return scope;
};

/**
 * Syntax sugar for `xform(parser, xfJson)`.
 *
 * @param parser -
 */
export const json = (parser: Parser<string>) => xform(parser, xfJson);
