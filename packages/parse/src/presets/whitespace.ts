import { WS as _WS } from "@thi.ng/strings/groups";
import { oneOrMoreD, zeroOrMoreD } from "../combinators/repeat.js";
import { oneOf, oneOfD } from "../prims/one-of.js";

/**
 * Matches & discards single whitespace char: ` \t\n\r`.
 */
export const WS = oneOfD(_WS);

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
export const WS0 = zeroOrMoreD(WS);

/**
 * One or more {@link WS}. Result will be discarded.
 */
export const WS1 = oneOrMoreD(WS);

/**
 * Zero or more {@link SPACE}. Result will be discarded.
 */
export const SPACES0 = zeroOrMoreD(SPACE);

/**
 * One or more {@link SPACE}. Result will be discarded.
 */
export const SPACES = oneOrMoreD(SPACE);
