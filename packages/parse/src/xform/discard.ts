import type { Parser } from "../api";
import { xform } from "../combinators/xform";

/**
 * Discards AST node and any of its children.
 */
export const xfDiscard = () => null;

/**
 * Syntax sugar for `xform(parser, xfDiscard)`.
 *
 * @param parser
 */
export const discard = (parser: Parser<any>) => xform(parser, xfDiscard);
