// SPDX-License-Identifier: Apache-2.0
import type { AppContext } from "../api.js";

/**
 * User stylable external link component.
 *
 * @param ctx - njected context object
 * @param attribs - ser provided attribs
 * @param uri - ink target
 * @param body - ink body
 */
export function externalLink(
	_: AppContext,
	attribs: any,
	uri: string,
	body: any
) {
	return ["a", { ...attribs, href: uri }, body];
}
