import { isString } from "@thi.ng/checks/is-string";
import type { ListBaseOpts, NumOrNode } from "../api.js";
import { $addChild, $attribs, $comment, $el } from "../dom.js";

/** @internal */
export const __initList = (
	parent: ParentNode,
	index: NumOrNode,
	{ el, attribs }: ListBaseOpts<any>
) => {
	if (isString(el)) {
		return { el: $el(el, attribs, null, parent, index) };
	} else if (el) {
		if (attribs) $attribs(el, attribs);
		$addChild(parent, el, index);
		return { el };
	}
	return { el: <Element>parent, anchor: $comment("", parent, index) };
};
