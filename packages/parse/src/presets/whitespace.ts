import { discard } from "../combinators/discard";
import { oneOrMore, zeroOrMore } from "../combinators/repeat";
import { oneOf, oneOfD } from "../prims/one-of";

/**
 * Matches & discards single whitespace char: ` \t\n\r`.
 */
export const WS = oneOfD(" \t\n\r");

/**
 * Matches & discards single space or tab char.
 */
export const SPACE = oneOfD(" \t");

/**
 * Matches single `\n` or `\r` char.
 */
export const NL = oneOf("\n\r");

/**
 * Matches & discards single `\n` or `\r` char.
 */
export const DNL = oneOfD("\n\r");

/**
 * Zero or more {@link WS}. Result will be discarded.
 */
export const WS0 = discard(zeroOrMore(WS));

/**
 * One or more {@link WS}. Result will be discarded.
 */
export const WS1 = discard(oneOrMore(WS));

/**
 * Zero or more {@link SPACE}. Result will be discarded.
 */
export const SPACES0 = discard(zeroOrMore(SPACE));

/**
 * One or more {@link SPACE}. Result will be discarded.
 */
export const SPACES = discard(oneOrMore(SPACE));
