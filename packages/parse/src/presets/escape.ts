import { ESCAPES } from "@thi.ng/strings/escape";
import { repeat } from "../combinators/repeat.js";
import { seq } from "../combinators/seq.js";
import { xform } from "../combinators/xform.js";
import { always } from "../prims/always.js";
import { litD } from "../prims/lit.js";
import { stringD } from "../prims/string.js";
import { xfInt } from "../xform/number.js";
import { HEX_DIGIT } from "./hex.js";

export const ESC = xform(seq([litD("\\"), always()], "esc"), ($) => {
	const id = $!.children![0].result;
	const resolved = ESCAPES[id];
	$!.result = resolved !== undefined ? resolved : `\\${id}`;
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
