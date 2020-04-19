import { always } from "../prims/always";
import { litD } from "../prims/lit";
import { seq } from "../combinators/seq";
import { hoist } from "../xform/hoist";
import { xform } from "../combinators/xform";
import { repeat } from "../combinators/repeat";
import { HEX_DIGIT } from "./hex";
import { stringD } from "../prims/string";
import { xfInt } from "../xform/number";

export const ESC = hoist(seq([litD("\\"), always()], "esc"));

/**
 * Matches a single `\uNNNN` escaped unicode hex literal and transforms
 * it into it actual character via `String.fromCharCode()`.
 */
export const UNICODE = xform(
    seq([stringD("\\u"), repeat(HEX_DIGIT, 4, 4)], "unicode"),
    ($, ctx) => (
        ($!.result = String.fromCharCode(xfInt(16)($, ctx)!.result)), $
    )
);
