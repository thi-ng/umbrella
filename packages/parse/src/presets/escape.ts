import type { IObjectOf } from "@thi.ng/api";
import { repeat } from "../combinators/repeat";
import { seq } from "../combinators/seq";
import { xform } from "../combinators/xform";
import { always } from "../prims/always";
import { litD } from "../prims/lit";
import { stringD } from "../prims/string";
import { xfInt } from "../xform/number";
import { HEX_DIGIT } from "./hex";

const ESC_VALUES: IObjectOf<string> = {
    0: "\0",
    b: "\b",
    t: "\t",
    n: "\n",
    v: "\v",
    f: "\f",
    r: "\r",
};

export const ESC = xform(seq([litD("\\"), always()], "esc"), ($) => {
    const id = $!.children![0].result;
    const resolved = ESC_VALUES[id];
    $!.result = resolved !== undefined ? resolved : id;
    $!.children = null;
    return $;
});

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
