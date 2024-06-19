import { alt } from "../combinators/alt.js";
import { zeroOrMore } from "../combinators/repeat.js";
import { seq } from "../combinators/seq.js";
import { litD } from "../prims/lit.js";
import { noneOf } from "../prims/none-of.js";
import { join } from "../xform/join.js";
import { ESC, UNICODE } from "./escape.js";

/** @internal */
const QUOTE = litD('"');

export const STRING = join(
	seq([QUOTE, zeroOrMore(alt([UNICODE, ESC, noneOf('"')])), QUOTE], "string")
);
