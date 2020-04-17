import { discard } from "../combinators/discard";
import { oneOrMore, zeroOrMore } from "../combinators/repeat";
import { oneOf } from "../prims/one-of";

/**
 * Matches single whitespace char.
 */
export const WS = oneOf(" \t\n\r", "ws");

/**
 * Matches single `\n` or `\r` char.
 */
export const NL = oneOf("\n\r");

/**
 * Matches & discards single `\n` or `\r` char.
 */
export const DNL = discard(NL);

/**
 * Zero or more {@link WS}. Result will be discarded.
 */
export const WS_0 = discard(zeroOrMore(WS, "ws0"));

/**
 * One or more {@link WS}. Result will be discarded.
 */
export const WS_1 = discard(oneOrMore(WS, "ws1"));
