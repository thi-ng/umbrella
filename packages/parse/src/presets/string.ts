import { alt } from "../combinators/alt";
import { zeroOrMore } from "../combinators/repeat";
import { seq } from "../combinators/seq";
import { litD } from "../prims/lit";
import { noneOf } from "../prims/none-of";
import { join } from "../xform/join";
import { ESC, UNICODE } from "./escape";

const quote = litD('"');

export const STRING = join(
    seq([quote, zeroOrMore(alt([UNICODE, ESC, noneOf('"')])), quote], "string")
);
