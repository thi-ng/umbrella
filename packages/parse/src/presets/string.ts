import { alt } from "../combinators/alt.js";
import { zeroOrMore } from "../combinators/repeat.js";
import { seq } from "../combinators/seq.js";
import { litD } from "../prims/lit.js";
import { noneOf } from "../prims/none-of.js";
import { join } from "../xform/join.js";
import { ESC, UNICODE } from "./escape.js";

const quote = litD('"');

export const STRING = join(
	seq([quote, zeroOrMore(alt([UNICODE, ESC, noneOf('"')])), quote], "string")
);
